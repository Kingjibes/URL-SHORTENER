
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTheme } from '@/contexts/ThemeContext';

const QrCodeDialog = ({ open, onOpenChange, shortUrl, qrCodeValue }) => {
  const { theme } = useTheme();
  const [addLogo, setAddLogo] = useState(false);
  const [qrColors, setQrColors] = useState({ fgColor: '#A855F7', bgColor: '#141420' });

  useEffect(() => {
    if (open) {
      const primaryColorDark = '#A855F7'; 
      const cardBgDark = '#141420'; // A very dark, almost black for good contrast
      const primaryColorLight = '#6D28D9'; // Tailwind purple-700
      const cardBgLight = '#FFFFFF'; // Pure white for light mode

      if (theme === 'dark') {
        setQrColors({ fgColor: primaryColorDark, bgColor: cardBgDark });
      } else {
        setQrColors({ fgColor: primaryColorLight, bgColor: cardBgLight });
      }
    }
  }, [open, theme]);

  const downloadQrCode = () => {
    const canvas = document.getElementById('qrcode-canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `cipherlink-qr-${shortUrl.split('/').pop()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast({ title: "📥 QR Code Downloading" });
    } else {
       toast({ title: "Error generating QR Code for download.", variant: "destructive" });
    }
  };

  const handleAddLogoChange = (checked) => {
    setAddLogo(checked);
    toast({
      title: "🚧 Feature In Progress",
      description: "Branded QR codes with logos are coming soon! 🚀",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass-effect neon-border">
        <DialogHeader>
          <DialogTitle className="gradient-text text-2xl">CipherLink QR Code</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Scan this QR code to access: <br/><span className="text-primary font-mono break-all">{shortUrl}</span>
          </DialogDescription>
        </DialogHeader>
        <motion.div 
          className="py-4 flex justify-center items-center bg-card/90 rounded-md shadow-inner"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        >
          {qrCodeValue && (
            <QRCode
              id="qrcode-canvas"
              value={qrCodeValue}
              size={256}
              bgColor={qrColors.bgColor}
              fgColor={qrColors.fgColor}
              level="H" // High error correction level
              includeMargin={true}
              renderAs="canvas" // Important for downloading
            />
          )}
        </motion.div>
        <div className="flex items-center space-x-2 mt-2 mb-4 justify-center">
          <Checkbox id="add-logo-qr" checked={addLogo} onCheckedChange={handleAddLogoChange} disabled />
          <Label htmlFor="add-logo-qr" className="text-sm text-muted-foreground cursor-not-allowed">
            Add CIPHERTECH Logo (Soon)
          </Label>
        </div>
        <DialogFooter>
          <Button onClick={downloadQrCode} className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white pulse-glow w-full sm:w-auto transition-transform hover:scale-105">Download QR</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto transition-colors">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeDialog;
