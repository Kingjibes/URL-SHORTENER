
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, QrCode, BarChartHorizontalBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import QrCodeDialog from './QrCodeDialog';

const UrlResultDisplay = ({ shortUrl, qrCodeValue }) => {
  const [showQrModal, setShowQrModal] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "✅ Copied to Clipboard!",
        description: "Short URL is now in your clipboard."
      });
    } catch (err) {
      toast({
        title: "❌ Copy Failed",
        description: "Could not copy to clipboard. Please try manually.",
        variant: "destructive"
      });
    }
  };
  
  const handleAnalyticsClick = () => {
    toast({
      title: "💡 Advanced Analytics",
      description: "Deeper insights and custom reports are part of our upcoming premium features! Stay tuned! 🚀",
    });
  };

  if (!shortUrl) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0, marginTop: 0 }}
        animate={{ opacity: 1, height: 'auto', marginTop: '24px' }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="p-4 bg-card/80 rounded-lg border border-primary/30 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">Your new CipherLink:</p>
            <motion.p 
              className="text-primary font-mono break-all text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
            >
              {shortUrl}
            </motion.p>
          </div>
          <motion.div 
            className="flex space-x-2 flex-shrink-0"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowQrModal(true)}
              className="border-primary/50 text-primary hover:bg-primary/20 hover:text-primary h-10 w-10 sm:h-12 sm:w-12 transition-colors duration-200"
              aria-label="Show QR Code"
            >
              <QrCode className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(shortUrl)}
              className="border-primary/50 text-primary hover:bg-primary/20 hover:text-primary h-10 w-10 sm:h-12 sm:w-12 transition-colors duration-200"
              aria-label="Copy short URL"
            >
              <Copy className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </motion.div>
        </div>
         <motion.div 
            className="mt-4 pt-3 border-t border-border/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-muted-foreground hover:text-primary hover:bg-primary/10 justify-start transition-colors duration-200"
            onClick={handleAnalyticsClick}
          >
            <BarChartHorizontalBig className="h-4 w-4 mr-2 text-primary/70"/>
            View Advanced Analytics (Coming Soon)
          </Button>
        </motion.div>
      </motion.div>
      <QrCodeDialog
        open={showQrModal}
        onOpenChange={setShowQrModal}
        shortUrl={shortUrl}
        qrCodeValue={qrCodeValue}
      />
    </>
  );
};

export default UrlResultDisplay;
