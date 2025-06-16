
import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Zap, Globe, Shield, BarChart3, Atom, Sparkles, Tag, Eye, Trophy, Palette, KeyRound, CalendarClock, Edit3, Brain } from 'lucide-react';
import UrlShortenerForm from '@/components/home/UrlShortenerForm';
import FeaturesSection from '@/components/home/FeaturesSection';
import RecentUrlsSection from '@/components/home/RecentUrlsSection';
import InteractiveGlobe from '@/components/home/InteractiveGlobe';
import EphemeralStats from '@/components/home/EphemeralStats';


const HomePage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 25, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } },
    out: { opacity: 0, y: -25, scale: 0.98, transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } },
  };


  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen overflow-hidden"
    >
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className="absolute w-full h-full bg-gradient-radial from-primary/15 via-transparent to-transparent"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            >
              <motion.div
                className="inline-flex items-center gap-2 mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/30 text-sm shadow-md"
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>The Future of Linking is Here</span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8">
                <span className="gradient-text">Cipher</span>
                <span className="text-foreground">. Link.</span>
                <span className="gradient-text"> Evolve.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                CIPHERTECH transmutes lengthy URLs into potent, intelligent short links. Command your digital presence with unparalleled precision and insight.
              </p>

              <UrlShortenerForm />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.25, type: "spring", stiffness:80, damping: 12 }}
              className="hidden lg:block relative aspect-square max-w-lg mx-auto"
            >
              <InteractiveGlobe />
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute top-10 left-5 w-28 h-28 bg-cyan-500/5 rounded-full blur-3xl floating-animation opacity-50 dark:opacity-30"
          style={{ animationDelay: '0s' }}
        />
        <motion.div 
          className="absolute bottom-10 right-5 w-36 h-36 bg-pink-500/5 rounded-full blur-3xl floating-animation opacity-50 dark:opacity-30"
          style={{ animationDelay: '1.2s' }}
        />
         <motion.div 
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl floating-animation opacity-40 dark:opacity-20"
          style={{ animationDelay: '2.5s' }}
        />
      </section>
      
      <EphemeralStats />
      <FeaturesSection features={featuresData} />
      <RecentUrlsSection />
    </motion.div>
  );
};

const featuresData = [
  {
    icon: Zap,
    title: "Hyper Speed",
    description: "Generate and redirect links at the speed of thought. No lag, just pure performance."
  },
  {
    icon: BarChart3,
    title: "Quantum Analytics",
    description: "Dive deep into link performance with real-time, granular data insights. (Advanced coming soon!)"
  },
  {
    icon: Shield,
    title: "Fortress Security",
    description: "Bank-grade encryption and robust infrastructure ensure your links are always safe."
  },
  {
    icon: Atom,
    title: "Self-Destruct Links",
    description: "Create ephemeral links that vanish after a set time or number of clicks for enhanced privacy."
  },
  {
    icon: Edit3,
    title: "Custom Aliases",
    description: "Brand your short links with custom aliases that are easy to remember and share. (UI Preview)"
  },
  {
    icon: KeyRound,
    title: "Cipher Key Protection",
    description: "Secure your links with password protection, ensuring only authorized access. (UI Preview)"
  },
  {
    icon: CalendarClock,
    title: "Chrono-Links",
    description: "Schedule when your links become active or expire, giving you full temporal control. (UI Preview)"
  },
  {
    icon: Brain,
    title: "AI-Powered Suggestions",
    description: "Future-forward: Get AI suggestions for optimal link aliases and engagement strategies. (Conceptual)"
  }
];

export default HomePage;
