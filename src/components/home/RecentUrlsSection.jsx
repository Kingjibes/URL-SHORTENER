
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, BarChart3, Clock, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const RecentUrlsSection = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUrls = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('short_urls')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching URLs:', error);
      toast({
        title: 'Error Fetching Links',
        description: 'Could not retrieve your recent links. Please try again later.',
        variant: 'destructive',
      });
      setUrls([]);
    } else {
      setUrls(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUrls();
    
    const channel = supabase.channel('realtime short_urls')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'short_urls' }, payload => {
        fetchUrls(); 
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel);
    }

  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "✅ Copied!",
        description: "Short URL copied to clipboard."
      });
    } catch (err) {
      toast({
        title: "❌ Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive"
      });
    }
  };
  
  const handleDelete = (id) => {
     toast({
        title: "🚧 Feature In Progress",
        description: "Deleting links is coming soon! You can request this feature in your next prompt. 🚀",
      });
  };

  const handleEdit = (id) => {
     toast({
        title: "🚧 Feature In Progress",
        description: "Editing links is coming soon! You can request this feature in your next prompt. 🚀",
      });
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } 
    },
  };


  if (isLoading && urls.length === 0) {
    return (
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
          />
          <p className="text-gray-400 mt-4">Loading your links...</p>
        </div>
      </section>
    );
  }


  if (!isLoading && urls.length === 0) {
    return (
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">No Links Yet!</h2>
            <p className="text-lg text-gray-400">
              Start shortening URLs to see your link history here.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }


  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Your Link</span>
            <span className="gradient-text"> Arsenal</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Manage your recently created short links. Track clicks, copy, or manage them with ease.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {urls.map((urlData) => (
            <motion.div
              key={urlData.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
            >
              <Card className="glass-effect neon-border hover:shadow-purple-500/30 hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <a 
                        href={`${window.location.origin}/${urlData.short_code}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 break-all block mb-1"
                      >
                        {`${window.location.origin}/${urlData.short_code}`}
                      </a>
                      <p className="text-gray-400 truncate text-sm mb-2" title={urlData.original_url}>
                        {urlData.original_url}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <BarChart3 className="h-3.5 w-3.5 text-cyan-400" />
                          {urlData.clicks || 0} clicks
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-pink-400" />
                          {new Date(urlData.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3 sm:mt-0 flex-shrink-0">
                       <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(urlData.id)}
                        className="border-purple-500/40 text-purple-400 hover:bg-purple-500/20 h-10 w-10 transition-colors duration-200"
                        aria-label="Edit link"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                       <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(urlData.id)}
                        className="border-red-500/40 text-red-400 hover:bg-red-500/20 h-10 w-10 transition-colors duration-200"
                        aria-label="Delete link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(`${window.location.origin}/${urlData.short_code}`)}
                        className="border-purple-500/40 text-purple-400 hover:bg-purple-500/20 h-10 w-10 transition-colors duration-200"
                        aria-label="Copy short URL"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentUrlsSection;
