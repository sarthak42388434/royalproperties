import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Particle Network Canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: any[] = [];
    const particleCount = Math.floor(width / 20); // Responsive count

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update & Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 168, 76, 0.4)'; // gold-ish
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // GSAP Animations
    const tl = gsap.timeline();
    tl.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 2.5 })
      .fromTo('.hero-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
      .fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
      .fromTo('.hero-buttons', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
      .fromTo('.hero-stats', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.4")
      .fromTo('.hero-card-1', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=1")
      .fromTo('.hero-card-2', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=0.8");

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[100dvh] flex items-center bg-[var(--dark)] overflow-hidden">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[var(--dark)] z-0" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
        
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="hero-badge flex items-center gap-3 mb-6 opacity-0">
            <span className="w-8 h-[1px] bg-[var(--gold)]"></span>
            <span className="text-[var(--gold)] text-xs font-bold tracking-[0.3em] uppercase">
              Kanpur's Premier Real Estate
            </span>
          </div>

          <h1 className="hero-title text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 opacity-0">
            Find Your Dream <br />
            <span className="text-[var(--gold)] italic">Property</span> in Kanpur
          </h1>

          <p className="hero-subtitle text-[var(--gray)] text-lg md:text-xl max-w-xl mb-10 leading-relaxed opacity-0">
            Discover a curated collection of luxury villas, premium apartments, and exclusive commercial spaces that define elegant living.
          </p>

          <div className="hero-buttons flex flex-wrap gap-4 mb-16 opacity-0">
            <a href="#properties" className="gold-gradient-bg text-black px-8 py-4 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all flex items-center gap-2">
              Explore Properties <ArrowRight size={18} />
            </a>
            <a href="#contact" className="glass-panel text-white border border-[var(--gold)]/30 px-8 py-4 rounded-full font-semibold hover:bg-[var(--gold)]/10 transition-all">
              Contact Us
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0 hero-stats">
            {[
              { label: 'Clients', value: '500+' },
              { label: 'Properties', value: '150+' },
              { label: 'Years', value: '10+' },
              { label: 'Satisfaction', value: '98%' }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-serif font-bold text-white mb-1">{stat.value}</span>
                <span className="text-[var(--gold)] text-sm tracking-wider uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Floating Cards */}
        <div className="hidden lg:flex lg:col-span-5 relative h-[500px] items-center justify-center">
          
          <div className="hero-card-1 absolute top-10 right-10 glass-panel p-6 rounded-2xl w-64 backdrop-blur-md opacity-0 shadow-2xl border-l-[3px] border-l-[var(--gold)]">
            <div className="w-12 h-12 rounded-full bg-[var(--gold)]/20 flex items-center justify-center mb-4">
              <Star className="text-[var(--gold)]" size={24} />
            </div>
            <h3 className="text-white text-2xl font-serif font-bold mb-1">150+</h3>
            <p className="text-[var(--gray)] text-sm">Premium Listings</p>
          </div>

          <div className="hero-card-2 absolute bottom-20 left-10 glass-panel p-6 rounded-2xl w-64 backdrop-blur-md opacity-0 shadow-2xl border-l-[3px] border-l-[var(--gold)] z-10">
            <h3 className="text-white text-2xl font-serif font-bold mb-1">10+ Years</h3>
            <p className="text-[var(--gray)] text-sm mb-4">Of Excellence</p>
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-[var(--gold)] flex items-center justify-center text-xs font-bold">
                +1k
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
