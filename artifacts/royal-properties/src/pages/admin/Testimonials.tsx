import { useTestimonials, useCreateTestimonial, useDeleteTestimonial } from '@/hooks/useProperties';
import { Star, Trash2, Plus, Loader2, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/storage';

const EMPTY_FORM = { name: '', designation: '', testimonial: '', rating: 5, photo: '' };

export default function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials();
  const createMutation = useCreateTestimonial();
  const deleteMutation = useDeleteTestimonial();
  const { toast } = useToast();

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const set = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadFile(file, 'testimonials', `${Date.now()}-${file.name.replace(/\s+/g, '-')}`);
      set('photo', url);
    } catch {
      toast({ title: 'Upload failed', description: 'Could not upload photo.', variant: 'destructive' });
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.testimonial.trim()) {
      toast({ title: 'Required', description: 'Name and testimonial text are required.', variant: 'destructive' });
      return;
    }
    try {
      await createMutation.mutateAsync(form);
      toast({ title: 'Saved', description: 'Testimonial added successfully.' });
      setForm({ ...EMPTY_FORM });
      setShowAdd(false);
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Could not save testimonial.', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: 'Deleted', description: 'Testimonial removed.' });
    } catch {
      toast({ title: 'Error', description: 'Could not delete testimonial.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif text-white">Client Testimonials</h2>
        <button onClick={() => setShowAdd(!showAdd)}
          className="bg-[var(--gold)] text-black px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1a1a24] p-6 rounded-xl border border-[var(--gold)]/30 space-y-4 max-w-2xl">
          <h3 className="text-white font-serif text-lg">New Testimonial</h3>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Client Name *" value={form.name}
              onChange={e => set('name', e.target.value)}
              className="bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white placeholder-[var(--gray)] focus:outline-none focus:border-[var(--gold)]" />
            <input type="text" placeholder="Designation (e.g. Business Owner)" value={form.designation}
              onChange={e => set('designation', e.target.value)}
              className="bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white placeholder-[var(--gray)] focus:outline-none focus:border-[var(--gold)]" />
          </div>

          <textarea rows={3} placeholder="Testimonial text *" value={form.testimonial}
            onChange={e => set('testimonial', e.target.value)}
            className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white placeholder-[var(--gray)] focus:outline-none focus:border-[var(--gold)] resize-none" />

          {/* Photo upload */}
          <div className="flex items-center gap-4">
            <input type="file" ref={photoInputRef} accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            {form.photo ? (
              <div className="relative">
                <img src={form.photo} alt="Photo" className="w-14 h-14 rounded-full object-cover border-2 border-[var(--gold)]" />
                <button onClick={() => set('photo', '')}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white">
                  <X size={10} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => photoInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="px-4 py-2 border border-[var(--gold)]/30 rounded-lg text-[var(--gold)] text-sm hover:bg-[var(--gold)]/10 transition-colors flex items-center gap-2">
                {uploadingPhoto ? <Loader2 size={14} className="animate-spin" /> : null}
                Upload Photo (optional)
              </button>
            )}
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-3">
            <span className="text-[var(--gray)] text-sm">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} type="button" onClick={() => set('rating', i)}>
                  <Star size={22} className={i <= form.rating ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-gray-600'} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => { setShowAdd(false); setForm({ ...EMPTY_FORM }); }}
              className="px-5 py-2 border border-[var(--gold)]/20 rounded-lg text-white hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} disabled={createMutation.isPending}
              className="px-5 py-2 bg-[var(--gold)] rounded-lg text-black font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50">
              {createMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : null} Save
            </button>
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
                <tr><td colSpan={4} className="px-6 py-12 text-center">
                  <Loader2 className="animate-spin text-[var(--gold)] mx-auto" size={24} />
                </td></tr>
              ) : testimonials?.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-[var(--gray)]">No testimonials yet.</td></tr>
              ) : testimonials?.map((t: any) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center shrink-0 text-[var(--gold)] font-bold">
                        {t.photo ? <img src={t.photo} className="w-full h-full object-cover" alt="" /> : t.name?.charAt(0)}
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
                        <Star key={i} size={14} className={i < t.rating ? 'text-[var(--gold)] fill-[var(--gold)]' : 'text-gray-700'} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--gray)] text-sm max-w-sm truncate">{t.testimonial}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button onClick={() => handleDelete(t.id, t.name)}
                        disabled={deleteMutation.isPending}
                        className="p-2 text-[var(--gray)] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
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
