import React from 'react';
import { UserPlus, CalendarDays, CheckSquare, FileText, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ActionCards({ language, onActionClick }) {
  const actions = [
    {
      icon: <UserPlus size={32} color="var(--color-primary)" />,
      title: language === 'English' ? 'Register to Vote' : 'वोट के लिए पंजीकरण करें',
      desc: language === 'English' ? 'Learn how to get your Voter ID.' : 'अपना वोटर आईडी प्राप्त करना सीखें।',
      celebrate: true
    },
    {
      icon: <CalendarDays size={32} color="var(--color-secondary)" />,
      title: language === 'English' ? 'Election Timeline' : 'चुनाव की समय-रेखा',
      desc: language === 'English' ? 'View the complete election process.' : 'पूरी चुनाव प्रक्रिया देखें।',
    },
    {
      icon: <CheckSquare size={32} color="var(--color-accent)" />,
      title: language === 'English' ? 'Voting Steps' : 'मतदान के चरण',
      desc: language === 'English' ? 'What to do at the polling booth.' : 'मतदान केंद्र पर क्या करें।',
    },
    {
      icon: <FileText size={32} color="#10b981" />,
      title: language === 'English' ? 'Required Documents' : 'आवश्यक दस्तावेज',
      desc: language === 'English' ? 'Check what you need to bring.' : 'जांचें कि आपको क्या लाना है।',
    },
    {
      icon: <HelpCircle size={32} color="#8b5cf6" />,
      title: language === 'English' ? 'FAQ' : 'सामान्य प्रश्न',
      desc: language === 'English' ? 'Common questions answered.' : 'सामान्य सवालों के जवाब।',
    }
  ];

  const handleCardClick = (action) => {
    if (action.celebrate) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1e3a8a', '#f97316', '#0284c7']
      });
    }

    if (!onActionClick) return;
    
    const queries = {
      'Register to Vote': 'How do I register to vote in India?',
      'वोट के लिए पंजीकरण करें': 'भारत में वोट के लिए पंजीकरण कैसे करें?',
      'Election Timeline': 'What is the timeline of the Indian election process?',
      'चुनाव की समय-रेखा': 'भारतीय चुनाव प्रक्रिया की समय-रेखा क्या है?',
      'Voting Steps': 'What are the step-by-step instructions for voting at the polling booth?',
      'मतदान के चरण': 'मतदान केंद्र पर वोट डालने के चरण क्या हैं?',
      'Required Documents': 'What documents are required to vote in India?',
      'आवश्यक दस्तावेज': 'भारत में मतदान के लिए कौन से दस्तावेज आवश्यक हैं?',
      'FAQ': 'What are some frequently asked questions by first-time voters?',
      'सामान्य प्रश्न': 'पहली बार मतदान करने वालों द्वारा पूछे जाने वाले सामान्य प्रश्न क्या हैं?'
    };

    onActionClick(queries[action.title] || action.title);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-4" 
      style={{ marginTop: '2rem' }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {actions.map((action, index) => (
        <motion.div 
          key={index} 
          className="card flex items-center gap-4" 
          style={{ cursor: 'pointer' }}
          onClick={() => handleCardClick(action)}
          variants={itemVariants}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div style={{ 
            backgroundColor: 'var(--color-bg-hover)', 
            padding: '1rem', 
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {action.icon}
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{action.title}</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>{action.desc}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
