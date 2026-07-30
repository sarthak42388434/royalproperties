import { useState, useEffect, useRef } from 'react';
import { useProperty, useCreateProperty, useUpdateProperty } from '@/hooks/useProperties';
import { useLocation } from 'wouter';
import { Save, ArrowLeft, Image as ImageIcon, MapPin, List, Globe, Loader2, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/storage';

const generateSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Office', 'Farm House'];
const PURPOSES = ['For Sale', 'For Rent'];
const STATUSES = ['Available', 'Sold', 'Rented', 'Under Construction'];
const AMENITIES_LIST = [
  'Power Backup', '24/7 Security', 'Parking', 'Lift/Elevator',
  'Swimming Pool', 'Gym', 'Park/Garden', 'Club House',
  'CCTV Surveillance', 'Intercom', 'Fire Safety', 'Water Supply',
];

export default function PropertyForm({ id }: { id?: string }) {
  const isEdit = !!id;
  const { data: property, isLoading: loadingProperty } = useProperty(id);
  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('basic');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<any>({
    title: '', slug: '', description: '',
    price: '', price_value: 0,
    property_type: 'Apartment', purpose: 'For Sale', status: 'Available', badge: '',
    featured: false, published: false,
    location: '', city: 'Kanpur',
    beds: 0, baths: 0, area: '',
    images: [], amenities: [],
    google_maps_link: '', youtube_link: '',
    meta_title: '', meta_description: '',
  });

  useEffect(() => {
    if (isEdit && property) setFormData({ ...property });
  }, [property, isEdit]);

  const set = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleTitleChange = (title: string) => {
    setFormData((prev: any) => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) || !prev.slug ? generateSlug(title) : prev.slug,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploadingImage(true);
    const newImages = [...(formData.images || [])];
    for (const file of Array.from(files)) {
      try {
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const url = await uploadFile(file, 'properties', filename);
        newImages.push(url);
      } catch {
        toast({ title: 'Upload failed', description: `Could not upload ${file.name}`, variant: 'destructive' });
      }
    }
    setFormData((prev: any) => ({ ...prev, images: newImages }));
    setUploadingImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setFormData((prev: any) => ({ ...prev, images: prev.images.filter((_: any, i: number) => i !== index) }));
  };

  const toggleAmenity = (name: string) => {
    const arr = formData.amenities || [];
    set('amenities', arr.includes(name) ? arr.filter((a: string) => a !== name) : [...arr, name]);
  };

  const handleSave = async (published: boolean) => {
    const payload = { ...formData, published };
    if (!payload.slug) payload.slug = generateSlug(payload.title);

    const mutation = isEdit
      ? updateMutation.mutateAsync({ id: id!, data: payload })
      : createMutation.mutateAsync(payload);

    try {
      await mutation;
      toast({ title: 'Success', description: `Property ${isEdit ? 'updated' : 'created'} successfully!` });
      setLocation('/admin/properties');
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Failed to save property.', variant: 'destructive' });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isEdit && loadingProperty) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-[var(--gold)]" size={32} />
    </div>
  );

  const inputCls = 'w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] placeholder-[var(--gray)]';
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setLocation('/admin/properties')}
            className="w-10 h-10 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gray)] hover:bg-white/5 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-2xl font-serif text-white">{isEdit ? 'Edit Property' : 'Add New Property'}</h2>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => handleSave(false)} disabled={isSaving}
            className="px-6 py-2 rounded-lg border border-[var(--gold)]/30 text-white hover:bg-[var(--gold)]/10 transition-colors disabled:opacity-50 flex items-center gap-2">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : null} Save Draft
          </button>
          <button type="button" onClick={() => handleSave(true)} disabled={isSaving}
            className="px-6 py-2 rounded-lg bg-[var(--gold)] text-black font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={18} />} Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--gold)]/10 overflow-x-auto">
        {[
          { id: 'basic', label: 'Basic Info', icon: <List size={16} /> },
          { id: 'location', label: 'Location', icon: <MapPin size={16} /> },
          { id: 'images', label: 'Images', icon: <ImageIcon size={16} /> },
          { id: 'seo', label: 'SEO', icon: <Globe size={16} /> },
        ].map(tab => (
          <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 border-b-2 flex items-center gap-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-transparent text-[var(--gray)] hover:text-white'
            }`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 p-6 md:p-8">

        {/* BASIC */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Property Title *</label>
                <input type="text" required value={formData.title}
                  onChange={e => handleTitleChange(e.target.value)} className={inputCls} />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Slug (auto-generated)</label>
                <input type="text" value={formData.slug}
                  onChange={e => set('slug', e.target.value)} className={inputCls} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Description</label>
              <textarea rows={5} value={formData.description}
                onChange={e => set('description', e.target.value)} className={`${inputCls} resize-none`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Price Display (e.g. ₹85 Lakhs)</label>
                <input type="text" placeholder="₹85 Lakhs" value={formData.price}
                  onChange={e => set('price', e.target.value)} className={inputCls} />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Price Value (in Lakhs)</label>
                <input type="number" value={formData.price_value}
                  onChange={e => set('price_value', Number(e.target.value))} className={inputCls} />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Badge Label</label>
                <input type="text" placeholder="e.g. Hot Deal" value={formData.badge}
                  onChange={e => set('badge', e.target.value)} className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Property Type</label>
                <select value={formData.property_type} onChange={e => set('property_type', e.target.value)} className={selectCls}>
                  {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Purpose</label>
                <select value={formData.purpose} onChange={e => set('purpose', e.target.value)} className={selectCls}>
                  {PURPOSES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Status</label>
                <select value={formData.status} onChange={e => set('status', e.target.value)} className={selectCls}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Bedrooms</label>
                <input type="number" min={0} value={formData.beds}
                  onChange={e => set('beds', Number(e.target.value))} className={inputCls} />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Bathrooms</label>
                <input type="number" min={0} value={formData.baths}
                  onChange={e => set('baths', Number(e.target.value))} className={inputCls} />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Area</label>
                <input type="text" placeholder="e.g. 1500 sq.ft" value={formData.area}
                  onChange={e => set('area', e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES_LIST.map(a => (
                  <button key={a} type="button" onClick={() => toggleAmenity(a)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      formData.amenities?.includes(a)
                        ? 'bg-[var(--gold)]/20 border-[var(--gold)] text-[var(--gold)]'
                        : 'border-[var(--gold)]/20 text-[var(--gray)] hover:border-[var(--gold)]/50'
                    }`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-8 border-t border-[var(--gold)]/10 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.featured} onChange={e => set('featured', e.target.checked)}
                  className="w-5 h-5 rounded bg-black border-[var(--gold)]/30 text-[var(--gold)] focus:ring-[var(--gold)]" />
                <span className="text-white">Featured Property</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.published} onChange={e => set('published', e.target.checked)}
                  className="w-5 h-5 rounded bg-black border-[var(--gold)]/30 text-[var(--gold)] focus:ring-[var(--gold)]" />
                <span className="text-white">Published</span>
              </label>
            </div>
          </div>
        )}

        {/* LOCATION */}
        {activeTab === 'location' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">City</label>
                <input type="text" value={formData.city}
                  onChange={e => set('city', e.target.value)} className={inputCls} />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Area / Locality</label>
                <input type="text" placeholder="e.g. Kakadeo, Naveen Nagar" value={formData.location}
                  onChange={e => set('location', e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Google Maps Embed Link (optional)</label>
              <input type="url" placeholder="https://maps.google.com/..." value={formData.google_maps_link}
                onChange={e => set('google_maps_link', e.target.value)} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">YouTube Video Link (optional)</label>
              <input type="url" placeholder="https://youtube.com/..." value={formData.youtube_link}
                onChange={e => set('youtube_link', e.target.value)} className={inputCls} />
            </div>
          </div>
        )}

        {/* IMAGES */}
        {activeTab === 'images' && (
          <div className="space-y-6">
            <input type="file" ref={fileInputRef} multiple accept="image/*"
              onChange={handleImageUpload} className="hidden" />

            <div
              onClick={() => !uploadingImage && fileInputRef.current?.click()}
              className="border-2 border-dashed border-[var(--gold)]/20 rounded-xl p-12 text-center cursor-pointer hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/5 transition-all"
            >
              {uploadingImage ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 size={36} className="animate-spin text-[var(--gold)]" />
                  <span className="text-[var(--gray)]">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload size={36} className="text-[var(--gold)]" />
                  <div>
                    <p className="text-white font-medium">Click to upload images</p>
                    <p className="text-[var(--gray)] text-sm mt-1">PNG, JPG, WEBP supported. Multiple files allowed.</p>
                  </div>
                </div>
              )}
            </div>

            {formData.images?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((img: string, i: number) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-[var(--gold)]/20">
                    <img src={img} className="w-full h-full object-cover" alt={`Property ${i + 1}`} />
                    {i === 0 && (
                      <div className="absolute top-2 left-2 bg-[var(--gold)] text-black text-xs font-bold px-2 py-0.5 rounded">
                        Featured
                      </div>
                    )}
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[var(--gray)] text-sm">The first image will be used as the featured image.</p>
          </div>
        )}

        {/* SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Meta Title</label>
              <input type="text" value={formData.meta_title}
                onChange={e => set('meta_title', e.target.value)} className={inputCls}
                placeholder={formData.title || 'SEO page title'} />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Meta Description</label>
              <textarea rows={4} value={formData.meta_description}
                onChange={e => set('meta_description', e.target.value)} className={`${inputCls} resize-none`}
                placeholder="Brief description for search engines (150-160 chars)" />
              <p className="text-[var(--gray)] text-xs">{formData.meta_description?.length || 0} / 160 characters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
