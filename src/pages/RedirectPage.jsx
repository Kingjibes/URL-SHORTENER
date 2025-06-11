
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, AlertCircle, ShieldOff, Clock, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [urlData, setUrlData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [errorState, setErrorState] = useState(null); // null, 'notFound', 'expiredClicks', 'expiredTime', 'passwordProtected'

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
      
      if (data.password_hash) {
        const sessionPassword = sessionStorage.getItem(`cipher_pw_${shortCode}`);
        if (sessionPassword !== data.password_hash) {
          navigate(`/unlock/${shortCode}`);
          return;
        }
      }


      if (data.is_self_destruct) {
        if (data.destruct_at && new Date(data.destruct_at) < new Date()) {
          setErrorState('expiredTime');
          setUrlData(data); 
          setIsLoading(false);
          return;
        }
        if (data.destruct_clicks_max !== null && data.destruct_clicks_current >= data.destruct_clicks_max) {
          setErrorState('expiredClicks');
          setUrlData(data);
          setIsLoading(false);
          return;
        }
      }
      
      setUrlData(data);
      
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

      const { error: updateError } = await supabase
        .from('short_urls')
        .update(updatePayload)
        .eq('id', data.id);

      if (updateError) {
        console.error('Error updating URL analytics:', updateError);
        toast({
          title: "Analytics Error",
          description: "Could not update link analytics.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };

    fetchUrlData();
  }, [shortCode, navigate]);

  useEffect(() => {
    if (!errorState && urlData && countdown > 0 && !urlData.password_hash) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!errorState && urlData && countdown === 0 && !urlData.password_hash) {
      window.location.href = urlData.original_url;
    } else if (urlData && urlData.password_hash) {
       const sessionPassword = sessionStorage.getItem(`cipher_pw_${shortCode}`);
       if (sessionPassword === urlData.password_hash && countdown > 0) {
         const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
         return () => clearTimeout(timer);
       } else if (sessionPassword === urlData.password_hash && countdown === 0) {
         window.location.href = urlData.original_url;
       }
    }
  }, [urlData, countdown, errorState, shortCode]);

  if (isLoading) {
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

  const ErrorDisplay = ({ icon: Icon, title, message, originalUrl }) => (
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
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
              <p className="text-gray-300 mb-6 text-lg">{message}</p>
              {originalUrl && (
                <div className="bg-slate-800/60 rounded-lg p-4 mb-8 border border-red-500/30">
                  <p className="text-sm text-gray-400 mb-1">Original (now inactive/locked) URL:</p>
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
    return <ErrorDisplay icon={Clock} title="Link Expired" message="This link was time-limited and has now expired." originalUrl={urlData?.original_url} />;
  }

  // If password protected and not yet unlocked, this page won't render due to early navigate in useEffect.
  // This part is for successfully unlocked or non-password protected links.
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
              <p className="text-gray-300 mb-6 text-lg">You're being hyper-jumped to:</p>
              
              <div className="bg-slate-800/60 rounded-lg p-4 mb-8 border border-purple-500/40 shadow-inner">
                <p className="text-purple-300 font-mono text-base break-all">{urlData?.original_url}</p>
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
              
              <p className="text-gray-400 text-md mb-8">
                Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
              </p>
              
              <Button
                onClick={() => {
                   if (urlData?.original_url) window.location.href = urlData.original_url;
                }}
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 px-8 py-3 text-md cyber-glow transform hover:scale-105 transition-transform"
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
