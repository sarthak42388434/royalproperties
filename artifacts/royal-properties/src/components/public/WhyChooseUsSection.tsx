import { ShieldCheck, Gem, Target, Handshake, Award, Clock } from 'lucide-react';

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: <Gem size={32} />,
      title: "Premium Locations",
      description: "We only list properties in the most sought-after and high-appreciating neighborhoods."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Verified Listings",
      description: "Every property undergoes a strict legal and structural verification process."
    },
    {
      icon: <Handshake size={32} />,
      title: "Transparent Deals",
      description: "Zero hidden charges. Complete transparency from negotiation to registration."
    },
    {
      icon: <Target size={32} />,
      title: "Expert Guidance",
      description: "Our real estate consultants provide data-driven advice for your investments."
    },
    {
      icon: <Award size={32} />,
      title: "Award Winning",
      description: "Recognized as Kanpur's most trusted real estate consultancy for 3 consecutive years."
    },
    {
      icon: <Clock size={32} />,
      title: "End-to-End Support",
      description: "From property visits to loan assistance and interior design, we handle it all."
    }
  ];

  return (
    <section className="py-24 bg-[var(--dark)] relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-[var(--gold)] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            The Royal Advantage
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-10 rounded-2xl border border-[var(--gold)]/10 hover:border-[var(--gold)]/40 transition-all duration-300 group hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="w-16 h-16 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] mb-8 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-[var(--gray)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
