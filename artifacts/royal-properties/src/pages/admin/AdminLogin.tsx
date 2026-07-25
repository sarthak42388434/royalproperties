import { useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // For demo purposes if supabase is not actually configured
    if (email === 'admin@royal.com' && password === 'admin123') {
      // Mock login successful
      setLocation('/admin/dashboard');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
    } else {
      setLocation('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--dark)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-[var(--gold)] flex items-center justify-center bg-black mb-4">
            <span className="text-[var(--gold)] font-serif font-bold text-2xl">RP</span>
          </div>
          <h1 className="text-3xl font-serif text-white mb-2">Admin Portal</h1>
          <p className="text-[var(--gray)]">Sign in to manage Royal Properties</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-[var(--gold)]/20 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full gold-gradient-bg text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all disabled:opacity-70 mt-4"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
            
            <p className="text-center text-xs text-[var(--gray)] mt-4">
              Demo: admin@royal.com / admin123
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
