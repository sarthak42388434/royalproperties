import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { Save, ArrowLeft, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBlog, useCreateBlog, useUpdateBlog } from '@/hooks/useProperties';
import { uploadFile } from '@/lib/storage';

const generateSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function BlogForm({ id }: { id?: string }) {
  const isEdit = !!id;
  const { data: blog, isLoading } = useBlog(id);
  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState<any>({
    title: '', slug: '', description: '', content: '',
    category: '', published: false,
    featured_image: '',
    meta_title: '', meta_description: '',
  });

  useEffect(() => {
    if (isEdit && blog) setFormData({ ...blog });
  }, [blog, isEdit]);

  const set = (field: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleTitleChange = (title: string) => {
    setFormData((prev: any) => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) || !prev.slug ? generateSlug(title) : prev.slug,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const url = await uploadFile(file, 'blogs', filename);
      set('featured_image', url);
    } catch {
      toast({ title: 'Upload failed', description: 'Could not upload image.', variant: 'destructive' });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSave = async (published: boolean) => {
    const payload = { ...formData, published };
    if (!payload.slug) payload.slug = generateSlug(payload.title);
    if (!payload.publish_date) payload.publish_date = new Date().toISOString().split('T')[0];

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: id!, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      toast({ title: 'Success', description: `Blog post ${isEdit ? 'updated' : 'created'} successfully!` });
      setLocation('/admin/blogs');
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Failed to save blog post.', variant: 'destructive' });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isEdit && isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-[var(--gold)]" size={32} />
    </div>
  );

  const inputCls = 'w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] placeholder-[var(--gray)]';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setLocation('/admin/blogs')}
            className="w-10 h-10 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gray)] hover:bg-white/5 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-2xl font-serif text-white">{isEdit ? 'Edit Post' : 'Add New Post'}</h2>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => handleSave(false)} disabled={isSaving}
            className="px-6 py-2 rounded-lg border border-[var(--gold)]/30 text-white hover:bg-[var(--gold)]/10 transition-colors disabled:opacity-50">
            Save Draft
          </button>
          <button type="button" onClick={() => handleSave(true)} disabled={isSaving}
            className="px-6 py-2 rounded-lg bg-[var(--gold)] text-black font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={18} />} Publish
          </button>
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Post Title *</label>
            <input type="text" required value={formData.title}
              onChange={e => handleTitleChange(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Slug (auto-generated)</label>
            <input type="text" value={formData.slug}
              onChange={e => set('slug', e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Category</label>
            <input type="text" placeholder="e.g. Market Insights" value={formData.category}
              onChange={e => set('category', e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Publish Date</label>
            <input type="date" value={formData.publish_date || new Date().toISOString().split('T')[0]}
              onChange={e => set('publish_date', e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Short Description</label>
          <textarea rows={3} value={formData.description}
            onChange={e => set('description', e.target.value)} className={`${inputCls} resize-none`} />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Featured Image</label>
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
          <div onClick={() => !uploadingImage && fileInputRef.current?.click()}
            className="border-2 border-dashed border-[var(--gold)]/20 rounded-lg p-8 text-center cursor-pointer hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/5 transition-all">
            {uploadingImage ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 size={28} className="animate-spin text-[var(--gold)]" />
                <span className="text-[var(--gray)]">Uploading...</span>
              </div>
            ) : formData.featured_image ? (
              <div className="relative max-w-sm mx-auto">
                <img src={formData.featured_image} alt="Featured" className="w-full h-48 object-cover rounded-lg" />
                <button type="button" onClick={e => { e.stopPropagation(); set('featured_image', ''); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon size={28} className="text-[var(--gold)]" />
                <span className="text-[var(--gray)]">Click to upload featured image</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Content *</label>
          <textarea required rows={15} value={formData.content}
            onChange={e => set('content', e.target.value)} className={`${inputCls} resize-y`}
            placeholder="Write your blog post content here..." />
        </div>

        {/* SEO */}
        <div className="border-t border-[var(--gold)]/10 pt-6 space-y-4">
          <h3 className="text-white font-serif">SEO</h3>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Meta Title</label>
            <input type="text" value={formData.meta_title}
              onChange={e => set('meta_title', e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Meta Description</label>
            <textarea rows={3} value={formData.meta_description}
              onChange={e => set('meta_description', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
        </div>

        <div className="flex gap-8 border-t border-[var(--gold)]/10 pt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={formData.published}
              onChange={e => set('published', e.target.checked)}
              className="w-5 h-5 rounded bg-black border-[var(--gold)]/30 text-[var(--gold)] focus:ring-[var(--gold)]" />
            <span className="text-white">Published</span>
          </label>
        </div>
      </div>
    </div>
  );
}
