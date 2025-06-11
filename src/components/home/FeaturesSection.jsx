
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeaturesSection = ({ features }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2 
            variants={featureVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Unlock</span>
            <span className="text-white"> Next-Gen Features</span>
          </motion.h2>
          <motion.p 
            variants={featureVariants}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            CIPHERTECH isn't just a URL shortener. It's a command center for your digital links, packed with futuristic capabilities.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={featureVariants}
              whileHover={{ y: -10, scale: 1.03, transition: { type: "spring", stiffness: 300 } }}
            >
              <Card className="glass-effect neon-border h-full hover:pulse-glow transition-all duration-300 ease-in-out overflow-hidden">
                <CardHeader className="items-center text-center pt-8">
                  <motion.div
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                    className="mb-5 p-4 rounded-xl bg-gradient-to-br from-purple-600/70 to-cyan-600/70 w-fit shadow-lg"
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-2xl text-white font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <p className="text-gray-400 text-center text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;