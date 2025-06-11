
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { isValidUrl, generateShortCode } from '@/lib/urlUtils';
import AdvancedOptions from './form/AdvancedOptions';
import UrlResultDisplay from './form/UrlResultDisplay';

const UrlShortenerForm = ({ onNewUrl }) => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSelfDestruct, setIsSelfDestruct] = useState(false);
  const [destructClicks, setDestructClicks] = useState('');
  const [destructHours, setDestructHours] = useState('');
  const [tags, setTags] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [password, setPassword] = useState('');
  const [activateAt, setActivateAt] = useState('');
  const [deactivateAt, setDeactivateAt] = useState('');

  const handleShorten = async () => {
    if (!url.trim()) {
      toast({ title: "⚠️ Input Required", description: "Please paste a URL to transform.", variant: "destructive" });
      return;
    }
    if (!isValidUrl(url)) {
      toast({ title: "🚫 Invalid URL", description: "The URL seems malformed. Ensure it includes http:// or https://.", variant: "destructive" });
      return;
    }

    if (customAlias && !/^[a-zA-Z0-9_-]+$/.test(customAlias)) {
      toast({ title: "⚙️ Invalid Custom Alias", description: "Alias can only contain letters, numbers, hyphens, and underscores.", variant: "destructive" });
      return;
    }
    if (password && password.length < 6) {
       toast({ title: "⚙️ Weak Cipher Key", description: "Password should be at least 6 characters.", variant: "destructive" });
       return;
    }
    
    if (isSelfDestruct) {
      if (!destructClicks && !destructHours) {
        toast({ title: "⚙️ Self-Destruct Config Missing", description: "Set max clicks or expiry time.", variant: "destructive" });
        return;
      }
      if (destructClicks && (isNaN(parseInt(destructClicks)) || parseInt(destructClicks) <= 0)) {
        toast({ title: "⚙️ Invalid Clicks", description: "Max clicks must be a positive number.", variant: "destructive" });
        return;
      }
      if (destructHours && (isNaN(parseFloat(destructHours)) || parseFloat(destructHours) <= 0)) {
        toast({ title: "⚙️ Invalid Expiry Time", description: "Expiry time must be positive.", variant: "destructive" });
        return;
      }
    }

    setIsLoading(true);
    setShortUrl('');
    setQrCodeValue('');

    let shortCodeToUse;
    let finalCustomAlias = null;

    if (customAlias.trim()) {
      finalCustomAlias = customAlias.trim();
      shortCodeToUse = `C-${finalCustomAlias}`;
      const { data: existingAlias, error: aliasCheckError } = await supabase
      .from('short_urls')
      .select('short_code')
      .eq('short_code', shortCodeToUse)
      .single();

      if (aliasCheckError && aliasCheckError.code !== 'PGRST116') {
           toast({ title: "Database Error", description: "Could not verify custom alias uniqueness.", variant: "destructive" });
           setIsLoading(false); return;
      }
      if (existingAlias) {
          toast({ title: "🚫 Alias Taken", description: "This custom alias is already in use. Try another.", variant: "destructive" });
          setIsLoading(false); return;
      }
    } else {
        let isUnique = false;
        let attempts = 0;
        shortCodeToUse = generateShortCode(); 
        while (!isUnique && attempts < 10) {
            const { data: existingUrl, error: checkError } = await supabase
            .from('short_urls').select('short_code').eq('short_code', shortCodeToUse).single();
            if (checkError && checkError.code !== 'PGRST116') {
                toast({ title: "Database Error", description: "Could not verify short code uniqueness.", variant: "destructive" });
                setIsLoading(false); return;
            }
            if (!existingUrl) isUnique = true;
            else { shortCodeToUse = generateShortCode(); attempts++; }
        }
        if (!isUnique) {
            toast({ title: "Generation Error", description: "Could not generate a unique short code.", variant: "destructive" });
            setIsLoading(false); return;
        }
    }
    
    const generatedFullShortUrl = `${window.location.origin}/${shortCodeToUse}`;
    
    const newUrlData = {
      original_url: url,
      short_code: shortCodeToUse,
      custom_alias: finalCustomAlias, 
      password_hash: password.trim() ? password.trim() : null, 
      analytics: { 
        referrers: {}, countries: {}, devices: {}, 
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [] 
      },
      is_self_destruct: isSelfDestruct,
      destruct_clicks_max: isSelfDestruct && destructClicks ? parseInt(destructClicks) : null,
      destruct_clicks_current: isSelfDestruct && destructClicks ? 0 : null,
      destruct_at: isSelfDestruct && destructHours ? new Date(Date.now() + parseFloat(destructHours) * 60 * 60 * 1000).toISOString() : null,
    };

    const { data: insertedUrl, error } = await supabase.from('short_urls').insert([newUrlData]).select().single();
    setIsLoading(false);

    if (error) {
      console.error('Error inserting URL:', error);
      toast({ title: "⚠️ Shortening Failed", description: error.message || "An unexpected error occurred.", variant: "destructive" });
    } else if (insertedUrl) {
      setShortUrl(generatedFullShortUrl);
      setQrCodeValue(generatedFullShortUrl);
      setUrl('');
      
      setIsSelfDestruct(false); setDestructClicks(''); setDestructHours('');
      setTags(''); setCustomAlias(''); setPassword('');
      setActivateAt(''); setDeactivateAt('');
      setShowAdvanced(false);

      if (onNewUrl) onNewUrl(insertedUrl); 
      let successMessage = `Your new CipherLink is ready. ${isSelfDestruct ? 'Self-destruct sequence initiated.' : ''}`;
      if (password.trim()) {
        successMessage += ' Cipher Key activated!';
      }
      toast({ title: "✨ Link Transformed!", description: successMessage });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="glass-effect neon-border cyber-glow p-2 sm:p-4">
        <CardContent className="p-4 sm:p-6">
          <div className="relative flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2">
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/80 pointer-events-none" />
              <Input
                type="url"
                placeholder="Paste your long URL here to digitize..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 !pl-12 text-base h-14 w-full input-cyber"
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleShorten()}
                disabled={isLoading}
              />
            </div>
            
            <AdvancedOptions
              showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced}
              isSelfDestruct={isSelfDestruct} setIsSelfDestruct={setIsSelfDestruct}
              destructClicks={destructClicks} setDestructClicks={setDestructClicks}
              destructHours={destructHours} setDestructHours={setDestructHours}
              tags={tags} setTags={setTags}
              customAlias={customAlias} setCustomAlias={setCustomAlias}
              password={password} setPassword={setPassword}
              activateAt={activateAt} setActivateAt={setActivateAt}
              deactivateAt={deactivateAt} setDeactivateAt={setDeactivateAt}
              isLoading={isLoading}
            />

            <Button
              onClick={handleShorten}
              disabled={isLoading}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold px-6 py-4 text-base h-14 pulse-glow transition-all duration-300 ease-in-out transform hover:scale-105 flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                'Cipher Link'
              )}
            </Button>
          </div>
          <UrlResultDisplay shortUrl={shortUrl} qrCodeValue={qrCodeValue} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UrlShortenerForm;
