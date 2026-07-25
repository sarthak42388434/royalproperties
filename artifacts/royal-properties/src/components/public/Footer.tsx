import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-[var(--gold)]/20 pt-20 pb-6 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-[var(--gold)] flex items-center justify-center bg-black">
                <span className="text-[var(--gold)] font-serif font-bold text-lg">RP</span>
              </div>
              <span className="text-[var(--gold)] font-serif font-bold text-xl tracking-wide">
                Royal Properties
              </span>
            </div>
            <p className="text-[var(--gray)] mb-6 leading-relaxed">
              Kanpur's premier real estate consultancy, helping you find luxury homes, premium apartments, and lucrative commercial spaces since 1995.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6 tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Properties', 'About Us', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`/#${link.toLowerCase().replace(' ', '-')}`} className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/50"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6 tracking-wider">Property Types</h3>
            <ul className="space-y-4">
              {['Luxury Villas', 'Premium Apartments', 'Commercial Spaces', 'Residential Plots', 'Farm Houses'].map((type) => (
                <li key={type}>
                  <a href="/#properties" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/50"></span>
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6 tracking-wider">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-[var(--gold)] shrink-0 mt-1" size={20} />
                <span className="text-[var(--gray)] leading-relaxed">
                  123 Royal Estate Building, <br />
                  Swaroop Nagar, Kanpur 208002
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-[var(--gold)] shrink-0" size={20} />
                <span className="text-[var(--gray)]">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-[var(--gold)] shrink-0" size={20} />
                <span className="text-[var(--gray)]">info@royalproperties.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--gold)]/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--gray)] text-sm">
            © {new Date().getFullYear()} <span className="text-[var(--gold)]">Royal Properties</span>. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-[var(--gray)]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform z-50 group"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.327.093.144.421.678.91 1.15.632.611 1.155.803 1.294.887.139.084.221.072.304-.015.083-.087.359-.414.455-.558.096-.145.193-.121.327-.072.133.048.847.398.991.472.144.072.241.109.277.169.034.06.034.347-.11.752z" />
        </svg>
      </a>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 w-12 h-12 bg-black border border-[var(--gold)] text-[var(--gold)] rounded-full flex items-center justify-center hover:bg-[var(--gold)] hover:text-black transition-all z-50"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </footer>
  );
}
