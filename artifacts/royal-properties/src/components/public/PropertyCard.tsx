import { MapPin, Bed, Bath, Maximize } from 'lucide-react';

interface PropertyCardProps {
  property: any;
  onClick: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <div 
      className="group glass-panel rounded-[16px] overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 relative border border-[var(--gold)]/10 hover:border-[var(--gold)]/40 shadow-xl"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format'} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Badges */}
        {property.badge && (
          <div className="absolute top-4 left-4 z-20 bg-[var(--gold)] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {property.badge}
          </div>
        )}
        
        <div className="absolute bottom-4 right-4 z-20 glass-panel backdrop-blur-md px-4 py-2 rounded-lg border border-[var(--gold)]/30">
          <span className="text-white font-serif font-bold text-lg">{property.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white font-serif text-xl font-bold mb-2 group-hover:text-[var(--gold)] transition-colors line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-[var(--gray)] mb-4 text-sm">
          <MapPin size={16} className="text-[var(--gold)] shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--gold)]/10 text-[var(--gray)] text-sm">
          <div className="flex gap-4">
            {property.beds > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed size={16} className="text-[var(--gold)]" />
                <span>{property.beds}</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath size={16} className="text-[var(--gold)]" />
                <span>{property.baths}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize size={16} className="text-[var(--gold)]" />
              <span>{property.area}</span>
            </div>
          </div>
          
          <div className="text-[var(--gold)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View 
          </div>
        </div>
      </div>
    </div>
  );
}
