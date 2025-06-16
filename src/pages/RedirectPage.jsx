import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, AlertCircle, ShieldOff, Clock, KeyRound, EyeOff, CalendarX2, TimerOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [urlData, setUrlData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [errorState, setErrorState] = useState(null); 
  const [passwordInput, setPasswordInput] = useState('');
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.95 },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 120,
    damping: 20,
  };

  const proceedToRedirect = (data) => {
    const newClicks = (data.clicks || 0) + 1;
    const newDestructClicksCurrent = data.is_self_destruct && data.destruct_clicks_max !== null ? (data.destruct_clicks_current || 0) + 1 : data.destruct_clicks_current;

    const referrer = document.referrer || 'Direct';
    const userAgent = navigator.userAgent;
    const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
    
    let currentAnalytics = data.analytics || { referrers: {}, devices: {} };
    if (!currentAnalytics.referrers) currentAnalytics.referrers = {};
    if (!currentAnalytics.devices) currentAnalytics.devices = {};
    currentAnalytics.referrers[referrer] = (currentAnalytics.referrers[referrer] || 0) + 1;
    currentAnalytics.devices[device] = (currentAnalytics.devices[device] || 0) + 1;

    const updatePayload = { 
      clicks: newClicks, 
      last_clicked_at: new Date().toISOString(),
      analytics: currentAnalytics
    };

    if (data.is_self_destruct && data.destruct_clicks_max !== null) {
      updatePayload.destruct_clicks_current = newDestructClicksCurrent;
    }

    supabase.from('short_urls').update(updatePayload).eq('id', data.id)
      .then(({ error: updateError }) => {
        if (updateError) {
          console.error('Error updating URL analytics:', updateError);
          toast({ title: "Analytics Error", description: "Could not update link analytics.", variant: "destructive" });
        }
      });
    
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchUrlData = async () => {
      if (!shortCode) {
        setIsLoading(false);
        setErrorState('notFound');
        return;
      }

      const { data, error } = await supabase
        .from('short_urls')
        .select('*')
        .eq('short_code', shortCode)
        .single();

      if (error || !data) {
        console.error('Error fetching URL data or URL not found:', error);
        setUrlData(null);
        setErrorState('notFound');
        setIsLoading(false);
        return;
      }
      
      setUrlData(data); 
      const now = new Date();

      if (data.activate_at && new Date(data.activate_at) > now) {
        setErrorState('notActiveYet');
        setIsLoading(false);
        return;
      }

      if (data.deactivate_at && new Date(data.deactivate_at) < now) {
        setErrorState('expiredTime');
        setIsLoading(false);
        return;
      }

      if (data.is_self_destruct) {
        if (data.destruct_at && new Date(data.destruct_at) < now) {
          setErrorState('expiredTime');
          setIsLoading(false);
          return;
        }
        if (data.destruct_clicks_max !== null && data.destruct_clicks_current >= data.destruct_clicks_max) {
          setErrorState('expiredClicks');
          setIsLoading(false);
          return;
        }
      }
      
      if (data.password_hash) {
        setErrorState('passwordRequired');
        setIsLoading(false);
        return;
      }
      
      proceedToRedirect(data);
    };

    fetchUrlData();
  }, [shortCode]);

  useEffect(() => {
    if (!errorState && urlData && countdown > 0 && !isLoading) { 
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!errorState && urlData && countdown === 0 && !isLoading) {
      window.location.href = urlData.original_url;
    }
  }, [urlData, countdown, errorState, isLoading]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsPasswordIncorrect(false);
    const simulatedCorrectPassword = urlData.password_hash.replace('simulated_hash_for_', '');
    if (passwordInput === simulatedCorrectPassword) {
      toast({ title: "✅ Access Granted!", description: "Cipher Key accepted. Redirecting..." });
      setErrorState(null); 
      proceedToRedirect(urlData); 
    } else {
      setIsPasswordIncorrect(true);
      toast({ title: "❌ Access Denied", description: "Incorrect Cipher Key. Please try again.", variant: "destructive" });
    }
  };

  if (isLoading && !errorState) { 
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

  const ErrorDisplay = ({ icon: Icon, title, message, originalUrl, details }) => (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <Card className="glass-effect neon-border cyber-glow">
            <CardContent className="p-10 md:p-12">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 15 }}
                className="mb-8"
              >
                <div className="p-5 rounded-full bg-red-500/20 w-fit mx-auto shadow-lg">
                  <Icon className="h-16 w-16 text-red-400" />
                </div>
              </motion.div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h1>
              <p className="text-muted-foreground mb-6 text-lg">{message}</p>
              {details && <p className="text-sm text-muted-foreground/80 mb-6">{details}</p>}
              {originalUrl && (
                <div className="bg-card/80 rounded-lg p-4 mb-8 border border-red-500/30">
                  <p className="text-sm text-muted-foreground mb-1">Original (now inactive) URL:</p>
                  <p className="text-red-400 font-mono text-sm break-all">{originalUrl}</p>
                </div>
              )}
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold px-10 py-3 text-lg cyber-glow transform hover:scale-105 transition-transform"
              >
                Return to CIPHERTECH
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );

  if (errorState === 'notFound') {
    return <ErrorDisplay icon={AlertCircle} title="Link Not Found" message="The short URL you're looking for doesn't exist or may have been deleted. Please check the URL and try again." />;
  }
  if (errorState === 'expiredClicks') {
    return <ErrorDisplay icon={ShieldOff} title="Link Expired" message="This link has reached its maximum click limit and is no longer active." originalUrl={urlData?.original_url} />;
  }
  if (errorState === 'expiredTime') {
    return <ErrorDisplay icon={Clock} title="Link Expired" message="This link was time-limited or scheduled and has now expired or is no longer active." originalUrl={urlData?.original_url} />;
  }
  if (errorState === 'notActiveYet') {
    return <ErrorDisplay 
              icon={TimerOff} 
              title="Link Not Yet Active" 
              message="This link is scheduled to activate later. Please try again after the activation time." 
              originalUrl={urlData?.original_url}
              details={`Activates on: ${new Date(urlData?.activate_at).toLocaleString()}`} 
            />;
  }


  if (errorState === 'passwordRequired') {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="container mx-auto px-4">
          <Card className="glass-effect neon-border cyber-glow max-w-md mx-auto">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 15 }}
                className="mb-4"
              >
                <div className="p-4 rounded-full bg-yellow-500/20 w-fit mx-auto shadow-lg">
                  <KeyRound className="h-10 w-10 text-yellow-400" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl gradient-text">Cipher Key Required</CardTitle>
              <CardDescription className="text-muted-foreground">
                This link is protected. Please enter the Cipher Key to proceed.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cipher-key" className="text-muted-foreground">Enter Cipher Key</Label>
                  <div className="relative">
                    <Input
                      id="cipher-key"
                      type={showPassword ? "text" : "password"}
                      value={passwordInput}
                      onChange={(e) => { setPasswordInput(e.target.value); setIsPasswordIncorrect(false); }}
                      className={`input-cyber h-12 text-lg ${isPasswordIncorrect ? 'border-red-500 ring-red-500 focus-visible:ring-red-500' : ''}`}
                      required
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5"/> : <EyeOff className="h-5 w-5 opacity-50"/>}
                    </Button>
                  </div>
                  {isPasswordIncorrect && <p className="text-sm text-red-400">Incorrect Cipher Key. Please try again.</p>}
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold py-3 text-lg pulse-glow">
                  Unlock Link
                </Button>
                 <p className="text-xs text-muted-foreground/70 text-center pt-2">
                  For security, password attempts may be limited. True password hashing should be handled server-side.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <Card className="glass-effect neon-border cyber-glow">
            <CardContent className="p-10 md:p-12">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 150, damping: 15 }}
                className="mb-8"
              >
                <div className="p-5 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 w-fit mx-auto shadow-xl pulse-glow">
                  <ExternalLink className="h-16 w-16 text-white" />
                </div>
              </motion.div>
              
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Engaging Warp Drive...</h1>
              <p className="text-muted-foreground mb-6 text-lg">You're being hyper-jumped to:</p>
              
              <div className="bg-card/80 rounded-lg p-4 mb-8 border border-primary/40 shadow-inner">
                <p className="text-primary font-mono text-base break-all">{urlData?.original_url}</p>
              </div>
              
              <motion.div
                key={countdown}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-7xl font-bold gradient-text mb-6"
              >
                {countdown}
              </motion.div>
              
              <p className="text-muted-foreground text-md mb-8">
                Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
              </p>
              
              <Button
                onClick={() => window.location.href = urlData.original_url}
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/20 hover:text-primary px-8 py-3 text-md cyber-glow transform hover:scale-105 transition-transform"
              >
                Jump Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default RedirectPage;