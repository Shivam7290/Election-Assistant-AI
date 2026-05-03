import React from 'react';
import { Bell, FileSignature, Megaphone, CheckSquare, BarChart, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Timeline({ language }) {
  const steps = [
    {
      icon: <Bell size={24} />,
      title: language === 'English' ? 'Notification' : 'अधिसूचना',
      desc: language === 'English' ? 'Election Commission announces the dates.' : 'चुनाव आयोग तारीखों की घोषणा करता है।'
    },
    {
      icon: <FileSignature size={24} />,
      title: language === 'English' ? 'Nomination' : 'नामांकन',
      desc: language === 'English' ? 'Candidates file their papers.' : 'उम्मीदवार अपना पर्चा दाखिल करते हैं।'
    },
    {
      icon: <Megaphone size={24} />,
      title: language === 'English' ? 'Campaigning' : 'प्रचार',
      desc: language === 'English' ? 'Parties reach out to voters.' : 'पार्टियां मतदाताओं तक पहुंचती हैं।'
    },
    {
      icon: <CheckSquare size={24} />,
      title: language === 'English' ? 'Voting Day' : 'मतदान का दिन',
      desc: language === 'English' ? 'Citizens cast their votes.' : 'नागरिक अपना वोट डालते हैं।'
    },
    {
      icon: <BarChart size={24} />,
      title: language === 'English' ? 'Counting' : 'मतगणना',
      desc: language === 'English' ? 'Votes are counted under high security.' : 'कड़ी सुरक्षा में वोटों की गिनती होती है।'
    },
    {
      icon: <Trophy size={24} />,
      title: language === 'English' ? 'Results' : 'परिणाम',
      desc: language === 'English' ? 'Winners are declared.' : 'विजेताओं की घोषणा की जाती है।'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {language === 'English' ? 'The Election Flow' : 'चुनाव का प्रवाह'}
      </h3>
      
      <motion.div 
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Connecting Line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: 'calc(100% - 40px)' }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{ 
            position: 'absolute', 
            left: '23px', 
            top: '20px', 
            width: '2px', 
            backgroundColor: 'var(--color-primary)', 
            opacity: 0.3,
            zIndex: 0
          }}
        />

        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            style={{ display: 'flex', gap: '1.5rem', position: 'relative', zIndex: 1 }}
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-bg-card)',
                border: '2px solid var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)',
                transition: 'background-color var(--transition-normal)'
              }}
            >
              {step.icon}
            </motion.div>
            <div style={{ paddingTop: '0.25rem' }}>
              <h4 style={{ fontWeight: 600, fontSize: '1.1rem' }}>{step.title}</h4>
              <p className="text-muted">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
