import React from 'react';
import { Mail, Globe, MessageCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ language }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <footer style={{ 
      backgroundColor: 'var(--color-bg-card)', 
      padding: '4rem 0 2rem 0', 
      marginTop: 'auto', 
      borderTop: '1px solid var(--border-color)', 
      transition: 'background-color var(--transition-normal)' 
    }}>
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="grid md:grid-cols-2 gap-8" style={{ marginBottom: '3rem' }}>
          
          <motion.div variants={itemVariants}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>
              VoteGuide <span style={{ color: 'var(--color-secondary)' }}>AI</span>
            </h3>
            <p className="text-muted" style={{ maxWidth: '400px' }}>
              {language === 'English' 
                ? 'Empowering citizens with intelligent, neutral, and accessible information about the democratic process. Built for the Prompt War Challenge.' 
                : 'लोकतांत्रिक प्रक्रिया के बारे में बुद्धिमान, तटस्थ और सुलभ जानकारी के साथ नागरिकों को सशक्त बनाना। प्रॉम्प्ट वॉर चैलेंज के लिए बनाया गया।'}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', mdAlignItems: 'flex-end' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              {language === 'English' ? 'Connect With Us' : 'हमसे जुड़ें'}
            </h4>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <motion.a 
                href="mailto:shivam@example.com" 
                whileHover={{ scale: 1.2, color: 'var(--color-secondary)' }}
                style={{ color: 'var(--color-text-main)', transition: 'color var(--transition-fast)' }}
                title="Email"
              >
                <Mail size={24} />
              </motion.a>
              <motion.a 
                href="https://github.com/Shivam7290/Prompt-bar" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ scale: 1.2, color: 'var(--color-secondary)' }}
                style={{ color: 'var(--color-text-main)', transition: 'color var(--transition-fast)' }}
                title="Website"
              >
                <Globe size={24} />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, color: 'var(--color-secondary)' }}
                style={{ color: 'var(--color-text-main)', transition: 'color var(--transition-fast)' }}
                title="Social"
              >
                <MessageCircle size={24} />
              </motion.a>
            </div>
          </motion.div>
          
        </div>

        <motion.div 
          variants={itemVariants} 
          style={{ 
            textAlign: 'center', 
            paddingTop: '2rem', 
            borderTop: '1px solid var(--border-color)',
            color: 'var(--color-text-muted)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <p>© {new Date().getFullYear()} VoteGuide AI.</p>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Made with <Heart size={16} color="#ef4444" fill="#ef4444" className="animate-pulse" />
          </span>
        </motion.div>
      </motion.div>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .animate-pulse { animation: pulse 2s infinite; }
      `}</style>
    </footer>
  );
}
