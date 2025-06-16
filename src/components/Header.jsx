
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const logoVariants = {
    hover: { rotate: [0, 15, -10, 10, 0], scale: 1.1, transition: { duration: 0.6 } }
  };
  
  const mobileMenuItemVariants = {
    open: { 
      opacity: 1, 
      x: 0, 
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    },
    closed: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const mobileMenuVariants = {
    open: { 
      opacity: 1, 
      height: 'auto', 
      transition: { staggerChildren: 0.07, delayChildren: 0.1, type: "spring", stiffness: 260, damping: 20 } 
    },
    closed: { 
      opacity: 0, 
      height: 0, 
      transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.3, when: "afterChildren" } 
    }
  };


  return (
    <motion.header 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="relative z-50 glass-effect border-b border-purple-500/30 shadow-lg"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 pulse-glow"
            >
              <Zap className="h-6 w-6 text-white" />
            </motion.div>
            <motion.span 
              className="text-3xl font-bold gradient-text tracking-tight"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              CIPHERTECH
            </motion.span>
          </Link>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-semibold transition-all duration-300 group ${
                    location.pathname === item.path 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeDesktopTab"
                      className="absolute inset-0 bg-primary/10 rounded-md neon-border border-primary/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: location.pathname === item.path ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                </Link>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sunIcon"
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moonIcon"
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Moon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="closeIcon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <X className="h-6 w-6 sm:h-7 sm:w-7" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menuIcon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="glass-effect rounded-xl p-4 space-y-2 border border-primary/30">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.path}
                    variants={mobileMenuItemVariants}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-primary/20 text-primary neon-border border-primary/50'
                          : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
