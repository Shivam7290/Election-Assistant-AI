import React from 'react';
import { Vote, Languages, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ language, setLanguage, theme, toggleTheme }) {
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'English' ? 'Hindi' : 'English');
  };

  const navLinks = [
    { id: 'hero', label: language === 'English' ? 'Home' : 'मुख्य पृष्ठ' },
    { id: 'verify', label: language === 'English' ? 'Verify Voter ID' : 'वोटर आईडी सत्यापित करें' },
    { id: 'tools', label: language === 'English' ? 'Quick Tools' : 'त्वरित उपकरण' },
    { id: 'timeline', label: language === 'English' ? 'Timeline' : 'समय-रेखा' },
  ];

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '1rem 0' }}>
      <div className="container flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2" 
          style={{ color: 'var(--color-primary)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Vote size={32} />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em' }}>
            VoteGuide <span style={{ color: 'var(--color-secondary)' }}>AI</span>
          </span>
        </motion.div>
        
        {/* Navigation Links - Hidden on small screens */}
        <motion.div 
          className="hidden md:flex gap-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              style={{ fontWeight: 600, color: 'var(--color-text-main)' }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.target.style.color = 'var(--color-text-main)'}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            onClick={toggleTheme}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--color-bg-hover)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              backgroundColor: 'var(--color-bg-hover)',
              color: 'var(--color-primary)',
              fontWeight: 600,
              transition: 'var(--transition-fast)'
            }}
          >
            <Languages size={18} />
            {language === 'English' ? 'हिंदी (Hindi)' : 'English'}
          </button>
        </motion.div>
      </div>
      
      {/* Small CSS for responsive hiding */}
      <style>{`
        @media (max-width: 768px) {
          .hidden.md\\:flex { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
