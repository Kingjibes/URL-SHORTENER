import React from 'react';
import { motion } from 'framer-motion';
import { Settings2, Zap, Tag as TagIcon, KeyRound, CalendarClock, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/use-toast';

const AdvancedOptions = ({
  showAdvanced,
  setShowAdvanced,
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
  isLoading
}) => {

  const handleFeatureClick = (featureName) => {
     toast({
      title: `🚧 ${featureName} Feature`,
      description: "This advanced feature is currently under development and will be available soon! 🚀",
    });
  };

  return (
    <DropdownMenu onOpenChange={setShowAdvanced} open={showAdvanced}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 flex-shrink-0 border-primary/50 text-primary hover:bg-primary/20 hover:text-primary cyber-glow"
          aria-label="Advanced options"
          disabled={isLoading}
        >
          <Settings2 className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 glass-effect neon-border p-4" sideOffset={10}>
        <DropdownMenuLabel className="text-lg font-semibold text-primary">Advanced Options</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border my-2" />
        
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {/* Custom Alias */}
          <div>
            <Label htmlFor="custom-alias" className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-cyan-400"/> Custom Alias (Optional)
            </Label>
            <Input 
              id="custom-alias"
              type="text"
              placeholder="e.g., my-event"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="h-10 text-sm input-cyber"
              onFocus={() => handleFeatureClick("Custom Alias")}
            />
             <p className="text-xs text-muted-foreground/70 mt-1">Define a memorable path for your link.</p>
          </div>
          <DropdownMenuSeparator className="bg-border my-2" />

          {/* Self-Destruct */}
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="self-destruct-switch" className="text-muted-foreground flex items-center gap-2 cursor-pointer">
              <Zap className="w-4 h-4 text-pink-400"/> Self-Destruct Link
            </Label>
            <Switch
              id="self-destruct-switch"
              checked={isSelfDestruct}
              onCheckedChange={setIsSelfDestruct}
              className="data-[state=checked]:bg-pink-500"
            />
          </div>

          {isSelfDestruct && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pt-3 mt-2 border-t border-border"
            >
              <div>
                <Label htmlFor="destruct-clicks" className="text-sm text-muted-foreground mb-1 block">Max Clicks (optional)</Label>
                <Input 
                  id="destruct-clicks"
                  type="number"
                  placeholder="e.g., 10"
                  value={destructClicks}
                  onChange={(e) => setDestructClicks(e.target.value)}
                  className="h-10 text-sm input-cyber"
                />
              </div>
              <div>
                <Label htmlFor="destruct-hours" className="text-sm text-muted-foreground mb-1 block">Expire After (hours, optional)</Label>
                <Input 
                  id="destruct-hours"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 24"
                  value={destructHours}
                  onChange={(e) => setDestructHours(e.target.value)}
                  className="h-10 text-sm input-cyber"
                />
              </div>
            </motion.div>
          )}
          <DropdownMenuSeparator className="bg-border my-2" />

          {/* Tags */}
          <div>
            <Label htmlFor="tags-input" className="text-muted-foreground flex items-center gap-2 mb-1">
              <TagIcon className="w-4 h-4 text-cyan-400"/> Add Tags (comma-separated)
            </Label>
            <Input
              id="tags-input"
              type="text"
              placeholder="e.g., marketing, social"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="h-10 text-sm input-cyber"
              onFocus={() => handleFeatureClick("Link Tagging")}
            />
            <p className="text-xs text-muted-foreground/70 mt-1">Organize your CipherLinks.</p>
          </div>
          <DropdownMenuSeparator className="bg-border my-2" />

          {/* Password Protection */}
          <div>
            <Label htmlFor="password-protect" className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-yellow-400"/> Password Protect (Cipher Key)
            </Label>
            <Input 
              id="password-protect"
              type="password"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 text-sm input-cyber"
              onFocus={() => handleFeatureClick("Password Protection")}
            />
          </div>
          <DropdownMenuSeparator className="bg-border my-2" />
          
          {/* Chrono Links */}
          <div>
            <Label className="text-sm text-muted-foreground mb-1 block flex items-center gap-1">
              <CalendarClock className="w-3.5 h-3.5 text-green-400"/> Chrono-Link (Schedule Activation)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="activate-at" className="text-xs text-muted-foreground/80 mb-0.5 block">Activate At</Label>
                <Input 
                  id="activate-at"
                  type="datetime-local"
                  value={activateAt}
                  onChange={(e) => setActivateAt(e.target.value)}
                  className="h-10 text-sm input-cyber"
                  onFocus={() => handleFeatureClick("Chrono-Links")}
                />
              </div>
              <div>
                <Label htmlFor="deactivate-at" className="text-xs text-muted-foreground/80 mb-0.5 block">Deactivate At</Label>
                <Input 
                  id="deactivate-at"
                  type="datetime-local"
                  value={deactivateAt}
                  onChange={(e) => setDeactivateAt(e.target.value)}
                  className="h-10 text-sm input-cyber"
                  onFocus={() => handleFeatureClick("Chrono-Links")}
                />
              </div>
            </div>
          </div>

        </div>
        <DropdownMenuItem 
            onSelect={(e) => e.preventDefault()}
            className="mt-4 focus:bg-primary/20 p-0"
        >
            <Button 
                onClick={() => setShowAdvanced(false)} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
            >
                Done
            </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdvancedOptions;