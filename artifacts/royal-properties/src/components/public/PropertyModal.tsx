import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, MapPin, Bed, Bath, Maximize, CheckCircle2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyModalProps {
  property: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PropertyModal({ property, open, onOpenChange }: PropertyModalProps) {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100dvh] p-0 m-0 bg-[#050505] border-none rounded-none overflow-y-auto [&>button]:hidden">
        
        {/* Close Button */}
        <button 
          onClick={() => onOpenChange(false)}
          className="fixed top-6 right-6 z-[99] w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-[var(--gold)] flex items-center justify-center text-white hover:bg-[var(--gold)] hover:text-black transition-all"
        >
          <X size={24} />
        </button>

        {/* Dialog Title for Accessibility */}
        <DialogTitle className="sr-only">{property.title}</DialogTitle>

        <div className="w-full">
          {/* Hero Image */}
          <div className="relative w-full h-[50vh] md:h-[70vh]">
            <img 
              src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format'} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
              <div className="container mx-auto">
                <div className="flex flex-wrap gap-3 mb-4">
                  {property.badge && (
                    <span className="bg-[var(--gold)] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {property.badge}
                    </span>
                  )}
                  <span className="bg-black/50 backdrop-blur-md border border-[var(--gold)]/30 text-[var(--gold)] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {property.status}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                  {property.title}
                </h2>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-[var(--gray)]">
                  <div className="flex items-center gap-2 text-lg">
                    <MapPin className="text-[var(--gold)]" />
                    <span>{property.location}</span>
                  </div>
                  <div className="text-3xl font-serif text-[var(--gold)]">
                    {property.price}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Specs */}
                <div className="flex flex-wrap gap-8 py-6 border-y border-[var(--gold)]/20">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--gold)]/10">
                        <Bed className="text-[var(--gold)]" />
                      </div>
                      <div>
                        <div className="text-2xl font-serif text-white">{property.beds}</div>
                        <div className="text-[var(--gray)] text-xs uppercase tracking-widest">Bedrooms</div>
                      </div>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--gold)]/10">
                        <Bath className="text-[var(--gold)]" />
                      </div>
                      <div>
                        <div className="text-2xl font-serif text-white">{property.baths}</div>
                        <div className="text-[var(--gray)] text-xs uppercase tracking-widest">Bathrooms</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--gold)]/10">
                      <Maximize className="text-[var(--gold)]" />
                    </div>
                    <div>
                      <div className="text-2xl font-serif text-white">{property.area}</div>
                      <div className="text-[var(--gray)] text-xs uppercase tracking-widest">Area</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-2xl font-serif text-white mb-6">Property Overview</h3>
                  <p className="text-[var(--gray)] leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>

                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-6">Premium Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map((amenity: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 text-[var(--gray)]">
                          <CheckCircle2 size={18} className="text-[var(--gold)] shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Gallery */}
                {property.images && property.images.length > 1 && (
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-6">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.images.slice(1).map((img: string, idx: number) => (
                        <div key={idx} className="aspect-square rounded-xl overflow-hidden">
                          <img src={img} alt={`${property.title} ${idx+2}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                
                {/* Contact Card */}
                <div className="glass-panel p-8 rounded-2xl border border-[var(--gold)]/30 text-center sticky top-8">
                  <div className="w-20 h-20 mx-auto rounded-full border border-[var(--gold)] flex items-center justify-center mb-6 bg-black">
                    <span className="text-[var(--gold)] font-serif text-2xl font-bold">RP</span>
                  </div>
                  <h4 className="text-xl font-serif text-white mb-2">Interested in this property?</h4>
                  <p className="text-[var(--gray)] text-sm mb-8">
                    Contact our experts for a detailed discussion and site visit.
                  </p>
                  
                  <a 
                    href={`https://wa.me/919876543210?text=I'm interested in ${property.title} (${property.price})`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 mb-4"
                  >
                    WhatsApp Now
                  </a>
                  
                  <a 
                    href="tel:+919876543210"
                    className="w-full bg-transparent border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    Call Us
                  </a>
                </div>
                
                {/* Location Advantages */}
                {property.location_advantages && property.location_advantages.length > 0 && (
                  <div className="glass-panel p-8 rounded-2xl">
                    <h4 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                      <Navigation size={20} className="text-[var(--gold)]" /> Location Advantages
                    </h4>
                    <ul className="space-y-4">
                      {property.location_advantages.map((adv: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-[var(--gray)] text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-1.5 shrink-0" />
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
