
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div 
    className="glass-effect neon-border p-4 md:p-5 rounded-lg flex items-center space-x-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
  >
    <Icon className={`w-7 h-7 md:w-8 md:h-8 ${color} flex-shrink-0`} />
    <div>
      <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
      <motion.div 
        className="text-lg sm:text-xl font-bold text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {value.toLocaleString()}
      </motion.div>
    </div>
  </motion.div>
);

const EphemeralStats = () => {
  const [linksCiphered, setLinksCiphered] = useState(Math.floor(Math.random() * 50) + 10);
  const [globalClicks, setGlobalClicks] = useState(Math.floor(Math.random() * 1000) + 500);
  const [activeUsers, setActiveUsers] = useState(Math.floor(Math.random() * 100) + 20);

  useEffect(() => {
    const interval = setInterval(() => {
      setLinksCiphered(prev => prev + Math.floor(Math.random() * 3) + 1); // More consistent increase
      setGlobalClicks(prev => prev + Math.floor(Math.random() * 15) + 5);
      setActiveUsers(prev => Math.max(10, prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2 + 1)));
    }, 2200); // Slightly faster updates
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          <StatCard icon={Zap} label="Links Ciphered (Live)" value={linksCiphered} color="text-purple-400" />
          <StatCard icon={Globe} label="Global Clicks (Real-time)" value={globalClicks} color="text-cyan-400" />
          <StatCard icon={Activity} label="Active Connections" value={activeUsers} color="text-pink-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default EphemeralStats;
