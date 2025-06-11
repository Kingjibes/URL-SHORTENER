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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20 md:mb-28"
        >
          <motion.div
            className="inline-block mb-8"
            whileHover={{ scale: 1.1, filter: 'brightness(1.2)' }}
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
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="glass-effect neon-border cyber-glow h-full">
              <CardHeader className="p-6 md:p-8">
                <CardTitle className="text-2xl md:text-3xl gradient-text font-semibold">Transmit Your Message</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                  </div>
                  
                  <div>
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
                  </div>
                  
                  <div>
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
                  </div>
                  
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
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="space-y-8 md:space-y-10"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <Card className="glass-effect neon-border hover:cyber-glow transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
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
                            className="text-purple-400 hover:text-pink-400 transition-colors text-sm font-medium break-all"
                          >
                            {info.contact}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
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
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -3, filter: 'brightness(1.2)' }}
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