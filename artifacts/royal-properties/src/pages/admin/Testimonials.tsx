import { useTestimonials } from '@/hooks/useProperties';
import { Star, Edit, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif text-white">Client Testimonials</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-[var(--gold)] text-black px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors"
        >
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1a1a24] p-6 rounded-xl border border-[var(--gold)]/30 space-y-4 max-w-2xl">
          <h3 className="text-white font-serif text-lg mb-4">Add New Testimonial</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Client Name" className="bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white" />
            <input type="text" placeholder="Designation (e.g. CEO)" className="bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white" />
          </div>
          <textarea rows={3} placeholder="Testimonial text..." className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white" />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[var(--gray)]">Rating:</span>
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-[var(--gold)] fill-[var(--gold)] cursor-pointer" />)}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-[var(--gold)]/20 rounded text-white hover:bg-white/5">Cancel</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-[var(--gold)] rounded text-black font-semibold">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/30 text-[var(--gray)] text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Testimonial</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--gold)]/10">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-[var(--gray)]">Loading...</td></tr>
              ) : testimonials?.map((t: any) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center shrink-0 text-[var(--gold)] font-bold">
                        {t.photo ? <img src={t.photo} className="w-full h-full object-cover" alt="" /> : t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{t.name}</div>
                        <div className="text-[var(--gray)] text-xs">{t.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < t.rating ? "text-[var(--gold)] fill-[var(--gold)]" : "text-gray-700"} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--gray)] text-sm max-w-md truncate">
                    {t.testimonial}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-[var(--gray)] hover:text-white hover:bg-white/10 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-[var(--gray)] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
