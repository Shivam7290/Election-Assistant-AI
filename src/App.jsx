import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import ActionCards from './components/ActionCards';
import Timeline from './components/Timeline';
import VoterVerification from './components/VoterVerification';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

function App() {
  const [language, setLanguage] = useState('English');
  const [triggerQuery, setTriggerQuery] = useState(null);
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('voteguide-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('voteguide-theme', theme);
  }, [theme]);

  // Update page title based on language
  useEffect(() => {
    document.title = language === 'English' 
      ? 'Election Assistant AI - Your Guide to Indian Elections' 
      : 'इलेक्शन असिस्टेंट AI - भारतीय चुनावों के लिए आपका मार्गदर्शक';
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="app-container" role="application" aria-label="Election Assistant AI">
      <Navbar language={language} setLanguage={setLanguage} theme={theme} toggleTheme={toggleTheme} />
      
      <main className="main-content" role="main" id="main-content" aria-label="Main Content">
        
        {/* Skip to main content for screen readers */}
        <a 
          href="#main-content" 
          className="skip-link"
          style={{ 
            position: 'absolute', 
            top: '-40px', 
            left: 0, 
            background: '#1a73e8', 
            color: 'white', 
            padding: '8px', 
            zIndex: 9999,
            borderRadius: '0 0 4px 0'
          }}
          onFocus={(e) => e.target.style.top = '0'}
          onBlur={(e) => e.target.style.top = '-40px'}
        >
          Skip to main content
        </a>

        {/* HERO SECTION */}
        <section 
          id="hero" 
          className="section hero-bg" 
          aria-label="Hero Section"
          style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <motion.div 
            className="hero-content container"
            style={{ textAlign: 'center' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.h1 
              style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              aria-label={language === 'English' ? 'Your Guide to the Indian Elections' : 'भारतीय चुनावों के लिए आपका मार्गदर्शन'}
            >
              <span className="text-gradient">
                {language === 'English' ? 'Your Guide to the' : 'आपका मार्गदर्शन'}
              </span>
              <br />
              {language === 'English' ? 'Indian Elections' : 'भारतीय चुनावों के लिए'}
            </motion.h1>
            <p 
              className="text-muted" 
              style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}
              aria-label="App description"
            >
              {language === 'English' 
                ? 'Everything you need to know about voting, from registration to results. Use our intelligent tools or ask the AI assistant.'
                : 'पंजीकरण से लेकर परिणामों तक, मतदान के बारे में आपको जो कुछ भी जानना है। हमारे बुद्धिमान उपकरणों का उपयोग करें या एआई सहायक से पूछें।'}
            </p>
            <motion.a 
              href="#verify" 
              className="btn-primary" 
              style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '3rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              role="button"
              aria-label={language === 'English' ? 'Get Started with voter verification' : 'मतदाता सत्यापन के साथ शुरू करें'}
            >
              {language === 'English' ? 'Get Started' : 'शुरू करें'}
            </motion.a>
          </motion.div>
        </section>

        {/* VERIFY SECTION */}
        <section id="verify" className="section container" aria-label="Voter Verification Section">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <VoterVerification language={language} />
          </motion.div>
        </section>

        {/* TOOLS SECTION */}
        <section id="tools" className="section container" aria-label="Quick Tools Section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>
              {language === 'English' ? 'Quick Tools' : 'त्वरित उपकरण'}
            </h2>
            <p className="text-muted" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              {language === 'English' 
                ? 'Click any card to automatically ask our AI assistant for guidance.' 
                : 'मार्गदर्शन के लिए हमारे एआई सहायक से स्वचालित रूप से पूछने के लिए किसी भी कार्ड पर क्लिक करें।'}
            </p>
            <ActionCards language={language} onActionClick={(text) => setTriggerQuery({ text, id: Date.now() })} />
          </motion.div>
        </section>

        {/* TIMELINE SECTION */}
        <section id="timeline" className="section container" aria-label="Election Timeline Section" style={{ paddingBottom: '4rem' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <Timeline language={language} />
          </motion.div>
        </section>

      </main>

      <Footer language={language} />
      
      {/* FLOATING CHATBOT */}
      <Chatbot language={language} triggerQuery={triggerQuery} />
    </div>
  );
}

export default App;
