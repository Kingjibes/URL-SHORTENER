
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Unlock, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const PasswordPromptPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [urlData, setUrlData] = useState(null);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    const fetchLinkData = async () => {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('short_urls')
        .select('short_code, password_hash, original_url')
        .eq('short_code', shortCode)
        .single();

      if (fetchError || !data) {
        setError('Link not found or invalid.');
        toast({ title: 'Error', description: 'Link not found or invalid.', variant: 'destructive' });
        navigate('/');
        return;
      }
      if (!data.password_hash) {
        navigate(`/${shortCode}`); 
        return;
      }
      setUrlData(data);
      setIsLoading(false);
    };
    fetchLinkData();
  }, [shortCode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) {
      setError('Password cannot be empty.');
      return;
    }
    setIsLoading(true);

    if (urlData && urlData.password_hash === password) {
      sessionStorage.setItem(`cipher_pw_${shortCode}`, password);
      toast({ title: 'Success', description: 'Cipher Key accepted! Redirecting...' });
      navigate(`/${shortCode}`);
    } else {
      setError('Incorrect Cipher Key. Please try again.');
      toast({ title: 'Access Denied', description: 'Incorrect Cipher Key.', variant: 'destructive' });
      setIsLoading(false);
    }
  };

  if (isLoading && !urlData) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 border-r-cyan-500 rounded-full"
        />
      </div>
    );
  }
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <Card className="w-full max-w-md glass-effect neon-border cyber-glow">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping:10 }}
            className="mx-auto mb-6 p-4 bg-primary/20 rounded-full w-fit"
          >
            <Lock className="h-12 w-12 text-primary" />
          </motion.div>
          <CardTitle className="gradient-text text-3xl">Cipher Key Required</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            This link is protected. Enter the Cipher Key to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password-prompt" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password-prompt"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-cyber h-12 text-lg !pl-10"
                  placeholder="Enter Cipher Key"
                  disabled={isLoading}
                />
                <Unlock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/70 pointer-events-none" />
              </div>
            </div>

            {error && (
              <motion.p 
                className="text-sm text-red-400 flex items-center gap-2"
                initial={{opacity: 0, y: -10}}
                animate={{opacity:1, y: 0}}
              >
                <AlertCircle className="w-4 h-4"/> {error}
              </motion.p>
            )}

            <div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold py-3 text-lg pulse-glow transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.span
                    className="flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-6 w-6" />
                  </motion.span>
                ) : (
                  'Unlock Link'
                )}
              </Button>
            </div>
          </form>
           <Button 
            variant="link" 
            className="mt-4 w-full text-muted-foreground hover:text-primary"
            onClick={() => navigate('/')}
            disabled={isLoading}
          >
            Cancel and return to CIPHERTECH
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PasswordPromptPage;
