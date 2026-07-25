import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getBlogById } from '@/lib/database';
import { useQuery } from '@tanstack/react-query';

export default function BlogForm({ id }: { id?: string }) {
  const isEdit = !!id;
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlogById(id!),
    enabled: !!id
  });
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: '',
    published: false,
    featured_image: '',
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    if (isEdit && blog) {
      setFormData(blog);
    }
  }, [blog, isEdit]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: `Blog post ${isEdit ? 'updated' : 'created'} successfully!`,
    });
    setLocation('/admin/blogs');
  };

  if (isEdit && isLoading) return <div className="text-white">Loading...</div>;

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setLocation('/admin/blogs')} className="w-10 h-10 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gray)] hover:bg-white/5 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-2xl font-serif text-white">{isEdit ? 'Edit Post' : 'Add New Post'}</h2>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="px-6 py-2 rounded-lg bg-[var(--gold)] text-black font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors">
            <Save size={18} /> Publish
          </button>
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 p-6 md:p-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Post Title *</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
          </div>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Category</label>
            <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Short Description</label>
          <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] resize-none" />
        </div>

        <div className="space-y-2">
          <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Featured Image</label>
          <div className="border-2 border-dashed border-[var(--gold)]/20 rounded-lg p-8 text-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer">
            {formData.featured_image ? (
              <div className="relative w-full max-w-sm mx-auto h-48 rounded-lg overflow-hidden">
                <img src={formData.featured_image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ImageIcon className="text-[var(--gold)] mb-2" size={32} />
                <span className="text-[var(--gray)]">Click to upload image</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Content *</label>
          <textarea required rows={15} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] resize-y" />
        </div>
        
        <div className="flex gap-8 border-t border-[var(--gold)]/10 pt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="w-5 h-5 rounded bg-black border-[var(--gold)]/30 text-[var(--gold)] focus:ring-[var(--gold)]" />
            <span className="text-white">Published</span>
          </label>
        </div>

      </div>
    </form>
  );
}
