
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Twitter, Linkedin, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Label } from "@/components/ui/label";

const ContactPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 25, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } },
    out: { opacity: 0, y: -25, scale: 0.98, transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } },
  };


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "🚫 Missing Fields",
        description: "Please ensure all required fields are completed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Slightly faster simulation
    
    toast({
      title: "🚀 Message Transmitted!",
      description: "Thank you for reaching out. Our team will connect with you shortly."
    });
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Encrypted Email',
      description: 'Securely transmit your inquiries.',
      contact: 'connect@ciphertech.com',
      action: 'mailto:connect@ciphertech.com'
    },
    {
      icon: Phone,
      title: 'Direct Comms Line',
      description: 'For urgent & direct support.',
      contact: '+1 (555) CIPHER-0',
      action: 'tel:+15552474370'
    },
    {
      icon: MapPin,
      title: 'Our Cyberspace HQ',
      description: 'Visit our virtual headquarters.',
      contact: 'Sector 7, Cyber District',
      action: '#' 
    }
  ];
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen py-20 md:py-28"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-20 md:mb-28"
        >
          <motion.div
            className="inline-block mb-8"
            whileHover={{ scale: 1.15, filter: 'brightness(1.25)', transition: {type: "spring", stiffness: 280} }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 pulse-glow shadow-2xl">
              <MessageSquare className="h-16 w-16 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-white">Initiate</span>
            <span className="gradient-text"> Contact</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Queries? Insights? Support requests? Our lines are open.
            <br className="hidden md:block" />
            The CIPHERTECH collective is primed to assist your digital journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect neon-border cyber-glow h-full">
              <CardHeader className="p-6 md:p-8">
                <CardTitle className="text-2xl md:text-3xl gradient-text font-semibold">Transmit Your Message</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{delay: 0.15}}>
                      <Label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Alias *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Neo, Trinity"
                        className="h-12"
                        required
                      />
                    </motion.div>
                    <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{delay: 0.2}}>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Secure Channel (Email) *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your_secure_email@domain.com"
                        className="h-12"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{delay: 0.25}}>
                    <Label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject Line
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Nature of your transmission"
                      className="h-12"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{delay: 0.3}}>
                    <Label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message Payload *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Detail your query or feedback here..."
                      rows={6}
                      className="min-h-[150px]"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{delay: 0.35}}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold py-3.5 text-lg cyber-glow transform hover:scale-105 transition-transform duration-200"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Send className="h-5 w-5 mr-2" />
                      )}
                      {isSubmitting ? 'Transmitting...' : 'Send Transmission'}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="space-y-8 md:space-y-10"
          >
            <motion.div 
              className="space-y-6"
              initial="hidden" 
              animate="visible"
              variants={{visible: {transition: {staggerChildren: 0.12, delayChildren: 0.2}}}}
            >
              {contactInfo.map((info) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280 } }}
                >
                  <Card className="glass-effect neon-border hover:cyber-glow transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          whileHover={{ rotate: [0, 12, -10, 0], scale: 1.12 }}
                          transition={{ duration: 0.5 }}
                          className="p-3.5 rounded-lg bg-gradient-to-br from-purple-600/80 to-cyan-600/80 shadow-lg"
                        >
                          <info.icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-white text-lg mb-1">{info.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{info.description}</p
                          ><a
                            href={info.action}
                            onClick={(e) => { if(info.action === '#') { e.preventDefault(); toast({ title: "🚧 Feature In Progress", description: "This contact method is currently under development. 🚀" }); } }}
                            className="text-purple-400 hover:text-pink-400 transition-colors duration-200 text-sm font-medium break-all"
                          >
                            {info.contact}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{delay: 0.5}}>
              <Card className="glass-effect neon-border cyber-glow">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl text-white font-semibold">Join Our Network</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-400 text-sm mb-6">
                    Connect with the CIPHERTECH community across the digital expanse.
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        onClick={(e) => { e.preventDefault(); toast({ title: `🚧 ${social.label} Link`, description: "Social media links aren't set up yet!" });}}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -4, filter: 'brightness(1.25)', transition: { type: 'spring', stiffness: 300 } }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3.5 rounded-lg glass-effect hover:bg-purple-500/30 transition-all duration-300 group ${social.color} neon-border`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-6 w-6 text-gray-300 group-hover:text-current transition-colors duration-300" />
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
