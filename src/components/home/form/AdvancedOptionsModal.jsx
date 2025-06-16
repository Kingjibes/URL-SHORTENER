
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Tag as TagIcon, KeyRound, CalendarClock, Edit3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';

const AdvancedOptionsModal = ({
  isOpen,
  onClose,
  isSelfDestruct,
  setIsSelfDestruct,
  destructClicks,
  setDestructClicks,
  destructHours,
  setDestructHours,
  tags,
  setTags,
  customAlias,
  setCustomAlias,
  password,
  setPassword,
  activateAt,
  setActivateAt,
  deactivateAt,
  setDeactivateAt,
}) => {

  const handleFeatureClick = (featureName, isImplemented = false) => {
    if (!isImplemented) {
      toast({
        title: `🚧 ${featureName} Feature`,
        description: "This advanced feature is currently under development and will be available soon! 🚀",
      });
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-[90vw] glass-effect neon-border p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold gradient-text">Advanced Cipher Options</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fine-tune your CipherLink with these powerful settings.
          </DialogDescription>
        </DialogHeader>
        
        <motion.div 
          className="space-y-5 max-h-[65vh] overflow-y-auto p-6 custom-scrollbar"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 }}}}
        >
          <motion.div variants={itemVariants}>
            <Label htmlFor="custom-alias-modal" className="text-sm text-muted-foreground mb-1.5 block flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-cyan-400"/> Custom Alias (Optional)
            </Label>
            <Input 
              id="custom-alias-modal"
              type="text"
              placeholder="e.g., my-super-event"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="h-11 text-sm input-cyber"
              onFocus={() => handleFeatureClick("Custom Alias", true)}
            />
             <p className="text-xs text-muted-foreground/80 mt-1.5">Define a memorable path for your link.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="border-t border-border/50 pt-5">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="self-destruct-switch-modal" className="text-muted-foreground flex items-center gap-2 cursor-pointer text-sm">
                <Zap className="w-4 h-4 text-pink-400"/> Self-Destruct Link
              </Label>
              <Switch
                id="self-destruct-switch-modal"
                checked={isSelfDestruct}
                onCheckedChange={setIsSelfDestruct}
                className="data-[state=checked]:bg-pink-500"
              />
            </div>

            {isSelfDestruct && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop:0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                exit={{ opacity: 0, height: 0, marginTop:0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3.5 pt-4 border-t border-border/30"
              >
                <div>
                  <Label htmlFor="destruct-clicks-modal" className="text-sm text-muted-foreground mb-1.5 block">Max Clicks (optional)</Label>
                  <Input 
                    id="destruct-clicks-modal"
                    type="number"
                    placeholder="e.g., 10"
                    value={destructClicks}
                    onChange={(e) => setDestructClicks(e.target.value)}
                    className="h-11 text-sm input-cyber"
                  />
                </div>
                <div>
                  <Label htmlFor="destruct-hours-modal" className="text-sm text-muted-foreground mb-1.5 block">Expire After (hours, optional)</Label>
                  <Input 
                    id="destruct-hours-modal"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 24"
                    value={destructHours}
                    onChange={(e) => setDestructHours(e.target.value)}
                    className="h-11 text-sm input-cyber"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="border-t border-border/50 pt-5">
            <Label htmlFor="tags-input-modal" className="text-muted-foreground flex items-center gap-2 mb-1.5 text-sm">
              <TagIcon className="w-4 h-4 text-cyan-400"/> Add Tags (comma-separated)
            </Label>
            <Input
              id="tags-input-modal"
              type="text"
              placeholder="e.g., marketing, social, campaign-x"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="h-11 text-sm input-cyber"
            />
            <p className="text-xs text-muted-foreground/80 mt-1.5">Organize your CipherLinks for easy tracking.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="border-t border-border/50 pt-5">
            <Label htmlFor="password-protect-modal" className="text-sm text-muted-foreground mb-1.5 block flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-yellow-400"/> Password Protect (Cipher Key)
            </Label>
            <Input 
              id="password-protect-modal"
              type="password"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 text-sm input-cyber"
              onFocus={() => handleFeatureClick("Password Protection", true)}
            />
             <p className="text-xs text-muted-foreground/80 mt-1.5">Secure your link. Min 6 characters recommended.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="border-t border-border/50 pt-5">
            <Label className="text-sm text-muted-foreground mb-1.5 block flex items-center gap-1.5">
              <CalendarClock className="w-4 h-4 text-green-400"/> Chrono-Link (Schedule Activation)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <Label htmlFor="activate-at-modal" className="text-xs text-muted-foreground/90 mb-1 block">Activate At</Label>
                <Input 
                  id="activate-at-modal"
                  type="datetime-local"
                  value={activateAt}
                  onChange={(e) => setActivateAt(e.target.value)}
                  className="h-11 text-sm input-cyber"
                />
              </div>
              <div>
                <Label htmlFor="deactivate-at-modal" className="text-xs text-muted-foreground/90 mb-1 block">Deactivate At</Label>
                <Input 
                  id="deactivate-at-modal"
                  type="datetime-local"
                  value={deactivateAt}
                  onChange={(e) => setDeactivateAt(e.target.value)}
                  className="h-11 text-sm input-cyber"
                />
              </div>
            </div>
             <p className="text-xs text-muted-foreground/80 mt-1.5">Set specific times for your link to be active.</p>
          </motion.div>
        </motion.div>

        <DialogFooter className="p-6 pt-4 border-t border-border/50">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto transition-colors duration-200">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={onClose} 
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-500 text-white pulse-glow transition-transform duration-200 hover:scale-105"
          >
            Save Advanced Options
          </Button>
        </DialogFooter>
        <DialogClose className="absolute right-5 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedOptionsModal;
