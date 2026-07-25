import { useState } from 'react';
import { useProperties } from '@/hooks/useProperties';
import PropertyFilters from './PropertyFilters';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';
import { Loader2 } from 'lucide-react';

export default function PropertiesSection() {
  const [filters, setFilters] = useState({
    city: '',
    property_type: '',
    purpose: '',
    beds: 'Any',
    sort: 'Newest',
    published: true
  });
  
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const { data: properties, isLoading } = useProperties(filters);

  return (
    <section id="properties" className="py-24 bg-[#0a0a0f] relative z-10 min-h-screen">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-[var(--gold)] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Exclusive Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Premium Properties
          </h2>
        </div>

        <PropertyFilters filters={filters} setFilters={setFilters} />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[var(--gold)]/10" data-aos="fade-up">
          <span className="text-[var(--gray)] font-serif italic text-lg">
            {isLoading ? 'Searching...' : `${properties?.length || 0} properties found`}
          </span>
          
          <select 
            className="bg-transparent text-[var(--gold)] border-none outline-none font-semibold cursor-pointer appearance-none"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="Newest" className="bg-[#111118]">Newest First</option>
            <option value="Price Low→High" className="bg-[#111118]">Price: Low to High</option>
            <option value="Price High→Low" className="bg-[#111118]">Price: High to Low</option>
          </select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--gold)]" />
          </div>
        ) : properties?.length === 0 ? (
          <div className="text-center py-24 glass-panel rounded-2xl">
            <h3 className="text-2xl font-serif text-white mb-2">No properties found</h3>
            <p className="text-[var(--gray)]">Try adjusting your filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property: any, index: number) => (
              <div key={property.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <PropertyCard 
                  property={property} 
                  onClick={() => setSelectedProperty(property)} 
                />
              </div>
            ))}
          </div>
        )}

      </div>

      <PropertyModal 
        property={selectedProperty} 
        open={!!selectedProperty} 
        onOpenChange={(open) => !open && setSelectedProperty(null)} 
      />
    </section>
  );
}
