import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Users, Award, Code, Rocket, Brain, TrendingUp, Gauge, MessageCircle, Send as TelegramIcon, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    duration: 0.6,
  };

  const stats = [
    { number: '10M+', label: 'URLs Shortened', icon: Zap },
    { number: '500K+', label: 'Active Users', icon: Users },
    { number: '99.99%', label: 'Uptime SLA', icon: Target },
    { number: '150+', label: 'Countries Reached', icon: Award }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Intelligent Innovation',
      description: 'We constantly push the boundaries of what\'s possible in URL management technology, embedding AI for smarter links.'
    },
    {
      icon: Rocket,
      title: 'Hyper Performance',
      description: 'Lightning-fast redirects and real-time analytics powered by a globally distributed, cutting-edge infrastructure.'
    },
    {
      icon: Target,
      title: 'Unyielding Reliability',
      description: 'Enterprise-grade security with a 99.99% uptime guarantee, ensuring your mission-critical links are always operational.'
    }
  ];

  const powerStats = [
    { icon: Gauge, label: 'Avg. Redirect Speed', value: '25ms', unit: '', description: 'Blazing fast global redirects.' },
    { icon: TrendingUp, label: 'Peak Links Processed/Sec', value: '10k+', unit: '', description: 'Scalability to handle massive traffic.' },
    { icon: Code, label: 'Shortest Link Created', value: '1ms', unit: '', description: 'Record-breaking efficiency.' },
  ];

  const architectImageUrl = "YOUR_CUSTOM_IMAGE_URL_HERE"; // Replace with your image URL

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen py-20 md:py-28"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20 md:mb-28"
        >
          <motion.div
            className="inline-block mb-8"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 pulse-glow shadow-2xl">
              <Zap className="h-16 w-16 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="gradient-text">Decoding</span>
            <span className="text-white"> CIPHERTECH</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            We're not just shortening URLs; we're engineering the future of digital interaction.
            <br className="hidden md:block" />
            Crafted by visionaries, for innovators, with a relentless pursuit of excellence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-28"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
            >
              <Card className="glass-effect neon-border text-center hover:cyber-glow transition-all duration-300 h-full">
                <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center h-full">
                  <motion.div
                    whileHover={{ rotate: [0, 15, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-5 p-4 rounded-xl bg-gradient-to-br from-purple-600/80 to-cyan-600/80 w-fit"
                  >
                    <stat.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-20 md:mb-28"
        >
          <Card className="glass-effect neon-border cyber-glow overflow-hidden">
            <CardHeader className="bg-purple-900/10 p-8">
              <CardTitle className="text-3xl md:text-4xl gradient-text text-center font-bold">Our Genesis</CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                  CIPHERTECH emerged from a digital chasm: URL shorteners were archaic, sluggish, and devoid of the intelligence demanded by the modern web. 
                  Our architect, <span className="text-purple-300 font-semibold hover:text-pink-400 transition-colors">HACKERPRO</span>, 
                  a digital artisan, envisioned a nexus where cutting-edge tech fused with intuitive design.
                </p>
                <p>
                  What began as a spark of weekend ingenuity rapidly blazed into a global platform, the chosen conduit for millions. Performance, impenetrable security, and an unparalleled user journey are the cornerstones upon which CIPHERTECH is forged.
                </p>
                <p>
                  Today, CIPHERTECH orchestrates billions of digital handshakes annually, empowering enterprises, marketers, and developers to sculpt meaningful connections. Our directive is unwavering: to elevate web accessibility, one intelligent link at a time.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.15 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Our Core</span>
              <span className="gradient-text"> Directives</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The fundamental principles that energize every facet of CIPHERTECH.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 250 } }}
              >
                <Card className="glass-effect neon-border h-full hover:cyber-glow transition-all duration-300 overflow-hidden">
                  <CardHeader className="items-center text-center pt-8">
                    <motion.div
                      whileHover={{ rotateY: 360, scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                      className="mb-6 p-4 rounded-xl bg-gradient-to-br from-purple-600/80 to-cyan-600/80 w-fit shadow-xl"
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-white font-semibold">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <p className="text-gray-400 text-center text-sm leading-relaxed px-2">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.15 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">CIPHERTECH</span>
              <span className="text-white"> Power Metrics</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A glimpse into the high-octane performance that defines our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {powerStats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { type: 'spring', stiffness: 250 } }}
              >
                <Card className="glass-effect neon-border h-full hover:cyber-glow transition-all duration-300 overflow-hidden p-6">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium text-purple-300">{stat.label}</CardTitle>
                    <stat.icon className="h-6 w-6 text-pink-400" />
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                    <p className="text-xs text-gray-400 pt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-effect neon-border cyber-glow max-w-2xl mx-auto overflow-hidden">
            <CardHeader className="bg-purple-900/10 p-8">
              <CardTitle className="text-3xl md:text-4xl gradient-text">Meet The Architect</CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="mb-6"
              >
                <img  
                  className="w-36 h-36 md:w-40 md:h-40 rounded-full mx-auto mb-6 border-4 border-purple-500/50 shadow-xl cyber-glow object-cover"
                  alt="HACKERPRO - Founder of CIPHERTECH, a visionary in digital technology"
                  src={architectImageUrl === "https://zuctusbetucsmsywshyk.supabase.co/storage/v1/object/public/imgurl/2xphja_1749683914445.jpg" ? undefined : architectImageUrl}
                 src="https://images.unsplash.com/photo-1677442135131-4d7c123aef1c" />
              </motion.div>
              <h3 className="text-3xl font-bold text-purple-300 mb-2">HACKERPRO</h3>
              <p className="text-pink-400 mb-4 text-lg">Founder & Chief Innovation Officer</p>
              <p className="text-gray-300 leading-relaxed text-md mb-6">
                A digital alchemist with over a decade transmuting complex challenges into elegant, scalable web solutions. HACKERPRO champions the creation of tools that not only empower but also inspire users to redefine their digital horizons.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild variant="outline" className="border-green-500/50 text-green-300 hover:bg-green-500/20 hover:text-green-200 cyber-glow">
                  <a href="https://wa.me/+233557488116" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" /> WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 cyber-glow">
                  <a href="https://t.me/HACK_ERPRO" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <TelegramIcon className="h-5 w-5" /> Telegram
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
