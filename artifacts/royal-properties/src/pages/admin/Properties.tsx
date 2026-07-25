import { useProperties } from '@/hooks/useProperties';
import { Link } from 'wouter';
import { Plus, Edit, Trash2, Copy, Search } from 'lucide-react';
import { useState } from 'react';

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: properties, isLoading } = useProperties({});

  const filteredProperties = properties?.filter((p: any) => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray)]" size={18} />
          <input 
            type="text" 
            placeholder="Search properties..." 
            className="w-full bg-[#1a1a24] border border-[var(--gold)]/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[var(--gold)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/admin/properties/new" className="bg-[var(--gold)] text-black px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors shrink-0">
          <Plus size={18} /> Add New Property
        </Link>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/30 text-[var(--gray)] text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium w-12">
                  <input type="checkbox" className="rounded border-[var(--gold)]/30 bg-black" />
                </th>
                <th className="px-6 py-4 font-medium">Property</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--gold)]/10">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-[var(--gray)]">Loading properties...</td></tr>
              ) : filteredProperties?.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-[var(--gray)]">No properties found.</td></tr>
              ) : (
                filteredProperties?.map((property: any) => (
                  <tr key={property.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-[var(--gold)]/30 bg-black" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden bg-black shrink-0 border border-[var(--gold)]/20">
                          <img src={property.images?.[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium text-white line-clamp-1">{property.title}</div>
                          <div className="text-[var(--gray)] text-xs">{property.city} • {property.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--gray)]">{property.property_type}</td>
                    <td className="px-6 py-4 text-[var(--gold)]">{property.price}</td>
                    <td className="px-6 py-4">
                      <button className={`px-3 py-1 rounded-full text-xs font-medium ${property.published ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                        {property.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/properties/${property.id}`} className="p-2 text-[var(--gray)] hover:text-white hover:bg-white/10 rounded transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button className="p-2 text-[var(--gray)] hover:text-[var(--gold)] hover:bg-[var(--gold)]/10 rounded transition-colors">
                          <Copy size={16} />
                        </button>
                        <button className="p-2 text-[var(--gray)] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-[var(--gold)]/10 flex items-center justify-between text-sm text-[var(--gray)]">
          <div>Showing 1 to {filteredProperties?.length} of {filteredProperties?.length} entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-black/30 rounded border border-[var(--gold)]/20 hover:border-[var(--gold)] transition-colors">Prev</button>
            <button className="px-3 py-1 bg-[var(--gold)] text-black rounded font-medium">1</button>
            <button className="px-3 py-1 bg-black/30 rounded border border-[var(--gold)]/20 hover:border-[var(--gold)] transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
