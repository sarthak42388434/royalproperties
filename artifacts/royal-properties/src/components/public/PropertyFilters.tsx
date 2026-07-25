import { Search, MapPin, Home, IndianRupee, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyFiltersProps {
  filters: any;
  setFilters: (f: any) => void;
}

export default function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  const handleSelect = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      property_type: '',
      purpose: '',
      beds: 'Any',
      sort: 'Newest'
    });
  };

  return (
    <div className="glass-panel p-4 md:p-6 rounded-[16px] mb-12" data-aos="fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* City */}
        <div className="flex flex-col">
          <label className="text-[var(--gray)] text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
            <MapPin size={12} /> Location
          </label>
          <select 
            className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] appearance-none"
            value={filters.city || ''}
            onChange={(e) => handleSelect('city', e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Kanpur">Kanpur</option>
            <option value="Lucknow">Lucknow</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="flex flex-col">
          <label className="text-[var(--gray)] text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
            <Home size={12} /> Type
          </label>
          <select 
            className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] appearance-none"
            value={filters.property_type || ''}
            onChange={(e) => handleSelect('property_type', e.target.value)}
          >
            <option value="">Any Type</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot">Plot</option>
          </select>
        </div>

        {/* Purpose */}
        <div className="flex flex-col">
          <label className="text-[var(--gray)] text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
            <IndianRupee size={12} /> Purpose
          </label>
          <select 
            className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] appearance-none"
            value={filters.purpose || ''}
            onChange={(e) => handleSelect('purpose', e.target.value)}
          >
            <option value="">Any</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Beds */}
        <div className="flex flex-col">
          <label className="text-[var(--gray)] text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
            Beds
          </label>
          <select 
            className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] appearance-none"
            value={filters.beds || 'Any'}
            onChange={(e) => handleSelect('beds', e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5+">5+ BHK</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex items-end gap-2">
          <button 
            className="flex-1 gold-gradient-bg text-black font-semibold h-[48px] rounded-lg hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all"
            onClick={() => setFilters({ ...filters })}
          >
            Search
          </button>
          <button 
            className="w-[48px] h-[48px] bg-black/50 border border-[var(--gold)]/20 rounded-lg flex items-center justify-center text-[var(--gray)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
            onClick={clearFilters}
            title="Clear Filters"
          >
            <RotateCcw size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
