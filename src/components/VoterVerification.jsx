import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VoterVerification({ language }) {
  const [voterId, setVoterId] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleVerify = (e) => {
    e.preventDefault();
    if (!voterId.trim()) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Mock validation: success if length > 5, else error
      if (voterId.length > 5) {
        setStatus('success');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#059669']
        });
      } else {
        setStatus('error');
      }
    }, 2000);
  };

  const text = {
    title: language === 'English' ? 'Verify Your Voter ID' : 'अपना वोटर आईडी सत्यापित करें',
    desc: language === 'English' ? 'Enter your EPIC number to check your registration status on the electoral roll.' : 'मतदाता सूची में अपनी पंजीकरण स्थिति जांचने के लिए अपना ईपीआईसी (EPIC) नंबर दर्ज करें।',
    placeholder: language === 'English' ? 'Enter Voter ID (EPIC)...' : 'वोटर आईडी (EPIC) दर्ज करें...',
    button: language === 'English' ? 'Verify' : 'सत्यापित करें',
    successTitle: language === 'English' ? 'Verification Successful!' : 'सत्यापन सफल!',
    successDesc: language === 'English' ? 'Your Voter ID is active. You are eligible to vote.' : 'आपका वोटर आईडी सक्रिय है। आप मतदान करने के पात्र हैं।',
    errorTitle: language === 'English' ? 'Record Not Found' : 'रिकॉर्ड नहीं मिला',
    errorDesc: language === 'English' ? 'Please check your EPIC number or register as a new voter.' : 'कृपया अपना EPIC नंबर जांचें या नए मतदाता के रूप में पंजीकरण करें।'
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>{text.title}</h2>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>{text.desc}</p>

      <form onSubmit={handleVerify} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <input
          type="text"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value.toUpperCase())}
          placeholder={text.placeholder}
          disabled={status === 'loading'}
          style={{
            flex: 1,
            padding: '1rem 1.5rem',
            borderRadius: '2rem',
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--color-bg-input)',
            color: 'var(--color-text-main)',
            outline: 'none',
            fontSize: '1.1rem',
            transition: 'border-color var(--transition-fast)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
        <button 
          type="submit"
          disabled={status === 'loading' || !voterId.trim()}
          className="btn-primary"
          style={{ borderRadius: '2rem', padding: '0 2rem' }}
        >
          {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          {status !== 'loading' && text.button}
        </button>
      </form>

      <div style={{ minHeight: '100px' }}>
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}
            >
              <CheckCircle size={40} color="#10b981" style={{ margin: '0 auto 0.5rem' }} />
              <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>{text.successTitle}</h3>
              <p style={{ color: 'var(--color-text-main)' }}>{text.successDesc}</p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ padding: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '1rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}
            >
              <AlertCircle size={40} color="#ef4444" style={{ margin: '0 auto 0.5rem' }} />
              <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>{text.errorTitle}</h3>
              <p style={{ color: 'var(--color-text-main)' }}>{text.errorDesc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {status === 'loading' && <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`}</style>}
    </div>
  );
}
