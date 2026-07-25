import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99997] flex flex-col items-center justify-center bg-[#050505]"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[100px] h-[100px] rounded-full border-2 border-[var(--gold)] flex items-center justify-center mb-8"
          >
            <div className="w-[80px] h-[80px] rounded-full bg-[var(--gold-dark)]/20" />
          </motion.div>
          
          <h1 className="text-[var(--gold)] font-serif text-2xl tracking-[0.3em] mb-8">
            ROYAL PROPERTIES
          </h1>
          
          <div className="w-[200px] h-[2px] bg-white/10 relative overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full gold-gradient-bg"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
