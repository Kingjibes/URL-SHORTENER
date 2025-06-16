
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  const footerLinks = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "#", label: "Privacy Policy" },
    { to: "#", label: "Terms of Service" },
  ];
  
  const handleLinkClick = (e, label) => {
    if (label === "Privacy Policy" || label === "Terms of Service") {
      e.preventDefault();
      toast({
        title: `🚧 ${label} Page`,
        description: "This page isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      });
    }
  };
  
  const handleSocialClick = (e, label) => {
      e.preventDefault();
      toast({
        title: `🚧 ${label} Link`,
        description: "This social media link isn't set up yet. You can provide the URL in your next prompt! 🚀",
      });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailInput = e.target.elements[0];
    if (emailInput.value) {
        toast({
            title: "📬 Subscription Received!",
            description: `Thanks for subscribing, ${emailInput.value}! We'll keep you updated. (Backend not implemented).`,
        });
        emailInput.value = "";
    } else {
        toast({
            title: "📧 Email Missing",
            description: "Please enter your email to subscribe.",
            variant: "destructive"
        });
    }
  };


  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      className="glass-effect border-t border-purple-500/30 mt-auto py-12 z-10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 180 }}
                className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 pulse-glow"
              >
                <Zap className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-2xl font-bold gradient-text tracking-tight">CIPHERTECH</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Shorten, share, and track your links with futuristic precision.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    onClick={(e) => handleLinkClick(e, link.label)}
                    className="text-gray-400 hover:text-purple-300 transition-colors duration-300 text-sm group flex items-center"
                  >
                    <motion.span 
                      initial={{ x: -5, opacity: 0 }} 
                      whileHover={{ x: 0, opacity: 1 }}
                      className="mr-2"
                    >
                      <ArrowRight className="h-3 w-3 text-purple-400" />
                    </motion.span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  onClick={(e) => handleSocialClick(e, social.label)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -4, transition: { type: 'spring', stiffness: 300 } }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-lg glass-effect hover:bg-purple-500/20 transition-all duration-300 group neon-border"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-purple-300 transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-3">Stay updated with our latest features and news.</p>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input-cyber flex-1 text-sm h-10" 
                />
              </motion.div>
              <Button type="submit" variant="outline" size="sm" className="h-10 border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 cyber-glow">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-purple-500/20 text-center"
        >
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CIPHERTECH. Crafted by <span className="font-semibold text-purple-400">HACKERPRO</span>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
