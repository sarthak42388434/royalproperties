import { useTestimonials } from '@/hooks/useProperties';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useTestimonials();

  if (isLoading || !testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[var(--dark)] relative z-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--gold)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-[var(--gold)] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: any, idx: number) => (
            <div 
              key={testimonial.id} 
              className="glass-panel p-10 rounded-2xl border border-[var(--gold)]/10 hover:border-[var(--gold)]/40 transition-colors relative"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <Quote className="absolute top-10 right-10 text-[var(--gold)]/10" size={80} />
              
              <div className="flex gap-1 mb-8 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "text-[var(--gold)] fill-[var(--gold)]" : "text-gray-700"} 
                  />
                ))}
              </div>

              <p className="text-[var(--gray)] leading-relaxed mb-10 text-lg relative z-10 italic">
                "{testimonial.testimonial}"
              </p>

              <div className="flex items-center gap-4 relative z-10 mt-auto">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--gold)]/50">
                  {testimonial.photo ? (
                    <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] font-serif font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-[var(--gold)] text-sm">{testimonial.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
