import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chatbot({ language, triggerQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 'initial',
      role: 'ai', 
      text: language === 'English' 
        ? "Hello! I am VoteGuide AI. How can I help you with the Indian election process today? Are you a first-time voter?" 
        : "नमस्ते! मैं वोटगाइड एआई हूँ। आज मैं भारतीय चुनाव प्रक्रिया में आपकी कैसे मदद कर सकता हूँ? क्या आप पहली बार मतदाता हैं?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Update greeting when language changes if no conversation happened yet
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{
        id: 'initial',
        role: 'ai',
        text: language === 'English' 
        ? "Hello! I am VoteGuide AI. How can I help you with the Indian election process today? Are you a first-time voter?" 
        : "नमस्ते! मैं वोटगाइड एआई हूँ। आज मैं भारतीय चुनाव प्रक्रिया में आपकी कैसे मदद कर सकता हूँ? क्या आप पहली बार मतदाता हैं?"
      }]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (triggerQuery && triggerQuery.text) {
      setIsOpen(true);
      // Slight delay to allow window to open before sending
      setTimeout(() => {
        handleSend(triggerQuery.text);
      }, 300);
    }
  }, [triggerQuery]);

  const handleSend = async (userText) => {
    if (!userText.trim() || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: userText,
        language: language,
        history: messages
      });

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: response.data.reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(),
        role: 'ai', 
        text: language === 'English' 
          ? "I'm sorry, I am having trouble connecting right now. Please check if the backend is running and the API key is valid."
          : "मुझे क्षमा करें, मुझे अभी जुड़ने में परेशानी हो रही है। कृपया जांचें कि क्या सर्वर चल रहा है।"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 100,
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { ease: "easeInOut", duration: 0.2 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="card flex-col flex"
            style={{ 
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: '380px',
              height: '600px',
              maxHeight: '80vh',
              maxWidth: 'calc(100vw - 4rem)',
              display: 'flex', 
              padding: 0, 
              overflow: 'hidden',
              zIndex: 99,
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Chat Header */}
            <div style={{ 
              padding: '1rem 1.5rem', 
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Bot color="white" />
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'white' }}>VoteGuide AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ color: 'white', opacity: 0.8 }}><X size={20} /></button>
            </div>

            {/* Messages Area */}
            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              backgroundColor: 'var(--color-bg-main)'
            }}>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: msg.role === 'user' ? 'var(--color-secondary)' : 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'white',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <div style={{
                      backgroundColor: msg.role === 'user' ? 'var(--color-bg-chat-user)' : 'var(--color-bg-chat-ai)',
                      color: msg.role === 'user' ? 'var(--color-text-chat-user)' : 'var(--color-text-chat-ai)',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '1rem',
                      borderTopRightRadius: msg.role === 'user' ? '0.25rem' : '1rem',
                      borderTopLeftRadius: msg.role === 'user' ? '1rem' : '0.25rem',
                      lineHeight: 1.5,
                      boxShadow: 'var(--shadow-sm)'
                    }} className="markdown-body">
                      {msg.role === 'user' ? (
                        msg.text
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: '0.75rem', alignSelf: 'flex-start' }}
                  >
                     <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-sm)'
                    }}>
                      <Bot size={18} />
                    </div>
                    <div style={{ backgroundColor: 'var(--color-bg-chat-ai)', padding: '0.75rem 1.25rem', borderRadius: '1rem', color: 'var(--color-text-chat-ai)' }}>
                      <Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} />
                      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--color-bg-card)', zIndex: 10 }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === 'English' ? "Type a message..." : "एक संदेश टाइप करें..."}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '2rem',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--color-bg-input)',
                    color: 'var(--color-text-main)',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    transition: 'border-color var(--transition-fast)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  disabled={isLoading}
                />
                <motion.button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  whileHover={input.trim() && !isLoading ? { scale: 1.05 } : {}}
                  whileTap={input.trim() && !isLoading ? { scale: 0.95 } : {}}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: input.trim() && !isLoading ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color var(--transition-fast)',
                    cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                    opacity: input.trim() && !isLoading ? 1 : 0.5
                  }}
                >
                  <Send size={20} style={{ marginLeft: '2px' }} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
