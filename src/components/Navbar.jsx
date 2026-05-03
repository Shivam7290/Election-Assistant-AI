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
    <nav 
      className="glass" 
      role="navigation" 
      aria-label="Main Navigation"
      style={{ position: 'sticky', top: 0, zIndex: 50, padding: '1rem 0' }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <motion.div
          className="flex items-center"
          style={{ color: 'var(--color-primary)', gap: '0.5rem', flexShrink: 0 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Vote size={32} aria-hidden="true" />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em', whiteSpace: 'nowrap' }}>
            VoteGuide <span style={{ color: 'var(--color-secondary)' }}>AI</span>
          </span>
        </motion.div>

        {/* Navigation Links - Hidden on small screens */}
        <motion.div
          style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="nav-links"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-label={link.label}
              style={{ fontWeight: 600, color: 'var(--color-text-main)', whiteSpace: 'nowrap', textDecoration: 'none' }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.target.style.color = 'var(--color-text-main)'}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Right Side Buttons */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--color-bg-hover)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)',
              flexShrink: 0
            }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={toggleLanguage}
            aria-label={`Switch to ${language === 'English' ? 'Hindi' : 'English'}`}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              backgroundColor: 'var(--color-bg-hover)',
              color: 'var(--color-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'var(--transition-fast)',
              whiteSpace: 'nowrap'
            }}
          >
            <Languages size={18} aria-hidden="true" />
            {language === 'English' ? 'हिंदी' : 'English'}
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
        @media (max-width: 480px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
