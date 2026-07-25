import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-black relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative" data-aos="fade-right">
            <div className="absolute inset-0 border-2 border-[var(--gold)] translate-x-6 translate-y-6 rounded-2xl z-0" />
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format" 
                alt="Royal Properties Building"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-xl border border-[var(--gold)]/30 backdrop-blur-xl z-20 hidden md:block">
              <div className="text-4xl font-serif font-bold text-white mb-1">10+</div>
              <div className="text-[var(--gold)] text-sm tracking-widest uppercase">Years of Trust</div>
            </div>
          </div>

          {/* Content Side */}
          <div data-aos="fade-left">
            <span className="text-[var(--gold)] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
              About Royal Properties
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
              Redefining Luxury Real Estate in Kanpur
            </h2>
            
            <p className="text-[var(--gray)] text-lg leading-relaxed mb-6">
              Since 1995, Royal Properties has been at the forefront of the luxury real estate market in Kanpur. We don't just sell properties; we curate lifestyles.
            </p>
            <p className="text-[var(--gray)] text-lg leading-relaxed mb-10">
              Our portfolio comprises handpicked villas, premium apartments, and exclusive commercial spaces that meet the highest standards of quality, design, and location. Transparency and client satisfaction are the cornerstones of our business.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="border-l-2 border-[var(--gold)] pl-6">
                <div className="text-3xl font-serif font-bold text-white mb-2">₹500Cr+</div>
                <div className="text-[var(--gray)] text-sm tracking-wider uppercase">Property Sold</div>
              </div>
              <div className="border-l-2 border-[var(--gold)] pl-6">
                <div className="text-3xl font-serif font-bold text-white mb-2">100%</div>
                <div className="text-[var(--gray)] text-sm tracking-wider uppercase">Client Satisfaction</div>
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-3 text-[var(--gold)] font-semibold uppercase tracking-widest hover:text-white transition-colors group">
              Learn More 
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
