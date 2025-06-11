import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Globe, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div 
    className="glass-effect neon-border p-4 rounded-lg flex items-center space-x-3"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className={`w-7 h-7 ${color}`} />
    <div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-xl font-bold text-foreground">{value.toLocaleString()}</div>
    </div>
  </motion.div>
);

const EphemeralStats = () => {
  const [linksCiphered, setLinksCiphered] = useState(Math.floor(Math.random() * 50) + 10);
  const [globalClicks, setGlobalClicks] = useState(Math.floor(Math.random() * 1000) + 500);
  const [activeUsers, setActiveUsers] = useState(Math.floor(Math.random() * 100) + 20);

  useEffect(() => {
    const interval = setInterval(() => {
      setLinksCiphered(prev => prev + Math.floor(Math.random() * 5));
      setGlobalClicks(prev => prev + Math.floor(Math.random() * 20));
      setActiveUsers(prev => Math.max(10, prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <StatCard icon={Zap} label="Links Ciphered (Last Minute)" value={linksCiphered} color="text-purple-400" />
          <StatCard icon={Globe} label="Global Clicks (Now)" value={globalClicks} color="text-cyan-400" />
          <StatCard icon={Activity} label="Active Connections" value={activeUsers} color="text-pink-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default EphemeralStats;