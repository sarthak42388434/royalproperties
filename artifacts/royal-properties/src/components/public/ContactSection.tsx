import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createContactMessage } from '@/lib/database';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const submitMutation = useMutation({
    mutationFn: (data: any) => createContactMessage({ ...data, status: 'unread' }),
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "One of our consultants will get back to you shortly.",
        variant: "default",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later or contact us via phone.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name, email, and phone number.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-24 bg-black relative z-10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info */}
          <div data-aos="fade-right">
            <span className="text-[var(--gold)] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
              Let's Discuss Your Dream Property
            </h2>
            <p className="text-[var(--gray)] leading-relaxed mb-12 text-lg">
              Whether you're looking to buy, sell, or invest, our team of expert consultants is ready to assist you with personalized advice.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-2">Office Address</h4>
                  <p className="text-[var(--gray)]">123 Royal Estate Building,<br />Swaroop Nagar, Kanpur 208002</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-2">Phone</h4>
                  <p className="text-[var(--gray)]">+91 98765 43210<br />+91 11 2345 6789</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-2">Email</h4>
                  <p className="text-[var(--gray)]">info@royalproperties.com<br />sales@royalproperties.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-2">Working Hours</h4>
                  <p className="text-[var(--gray)]">Mon - Sat: 10:00 AM - 7:00 PM<br />Sunday: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div data-aos="fade-left">
            <div className="glass-panel p-8 md:p-12 rounded-2xl border border-[var(--gold)]/20">
              <h3 className="text-2xl font-serif text-white mb-8">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Your Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Email Address *</label>
                  <input 
                    type="email" 
                    className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  className="w-full gold-gradient-bg text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all disabled:opacity-70"
                >
                  {submitMutation.isPending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
