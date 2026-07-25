import { useState, useEffect } from 'react';
import { useProperty } from '@/hooks/useProperties';
import { useLocation } from 'wouter';
import { Save, ArrowLeft, Image as ImageIcon, MapPin, List, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PropertyForm({ id }: { id?: string }) {
  const isEdit = !!id;
  const { data: property, isLoading } = useProperty(id);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    description: '',
    price: '',
    price_value: 0,
    property_type: 'Apartment',
    purpose: 'For Sale',
    status: 'Available',
    badge: '',
    featured: false,
    published: false,
    location: '',
    city: 'Kanpur',
    beds: 0,
    baths: 0,
    area: '',
    images: [],
    amenities: [],
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    if (isEdit && property) {
      setFormData(property);
    }
  }, [property, isEdit]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: `Property ${isEdit ? 'updated' : 'created'} successfully!`,
    });
    setLocation('/admin/properties');
  };

  if (isEdit && isLoading) return <div className="text-white">Loading...</div>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setLocation('/admin/properties')} className="w-10 h-10 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gray)] hover:bg-white/5 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-2xl font-serif text-white">{isEdit ? 'Edit Property' : 'Add New Property'}</h2>
        </div>
        <div className="flex gap-3">
          <button type="button" className="px-6 py-2 rounded-lg border border-[var(--gold)]/30 text-white hover:bg-[var(--gold)]/10 transition-colors">
            Save Draft
          </button>
          <button type="submit" className="px-6 py-2 rounded-lg bg-[var(--gold)] text-black font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors">
            <Save size={18} /> Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--gold)]/10">
        {[
          { id: 'basic', label: 'Basic Info', icon: <List size={16} /> },
          { id: 'location', label: 'Location', icon: <MapPin size={16} /> },
          { id: 'images', label: 'Images', icon: <ImageIcon size={16} /> },
          { id: 'seo', label: 'SEO', icon: <Globe size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 border-b-2 flex items-center gap-2 font-medium transition-colors ${
              activeTab === tab.id 
                ? 'border-[var(--gold)] text-[var(--gold)]' 
                : 'border-transparent text-[var(--gray)] hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 p-6 md:p-8">
        
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Property Title *</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Slug</label>
                <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Description</label>
              <textarea rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Price (Display Text)</label>
                <input type="text" placeholder="e.g. ₹85 Lakhs" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Price Value (in Lakhs)</label>
                <input type="number" value={formData.price_value} onChange={e => setFormData({...formData, price_value: Number(e.target.value)})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Property Type</label>
                <select value={formData.property_type} onChange={e => setFormData({...formData, property_type: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] appearance-none">
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Bedrooms</label>
                <input type="number" value={formData.beds} onChange={e => setFormData({...formData, beds: Number(e.target.value)})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Bathrooms</label>
                <input type="number" value={formData.baths} onChange={e => setFormData({...formData, baths: Number(e.target.value)})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Area</label>
                <input type="text" placeholder="e.g. 1500 sq.ft" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
            </div>
            
            <div className="flex gap-8 border-t border-[var(--gold)]/10 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded bg-black border-[var(--gold)]/30 text-[var(--gold)] focus:ring-[var(--gold)]" />
                <span className="text-white">Featured Property</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="w-5 h-5 rounded bg-black border-[var(--gold)]/30 text-[var(--gold)] focus:ring-[var(--gold)]" />
                <span className="text-white">Published</span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">City</label>
                <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Full Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-6 text-center py-12">
            <div className="w-24 h-24 mx-auto rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] mb-4">
              <ImageIcon size={32} />
            </div>
            <h3 className="text-xl font-serif text-white mb-2">Upload Property Images</h3>
            <p className="text-[var(--gray)] mb-6">Drag and drop images here, or click to browse.</p>
            <button type="button" className="px-8 py-3 rounded-lg border border-[var(--gold)]/30 text-[var(--gold)] hover:bg-[var(--gold)]/10 transition-colors">
              Browse Files
            </button>
            {formData.images?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {formData.images.map((img: string, i: number) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[var(--gold)]/20">
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Meta Title</label>
              <input type="text" value={formData.meta_title} onChange={e => setFormData({...formData, meta_title: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Meta Description</label>
              <textarea rows={4} value={formData.meta_description} onChange={e => setFormData({...formData, meta_description: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] resize-none" />
            </div>
          </div>
        )}

      </div>
    </form>
  );
}
