import { Save, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getSettings, updateSettings } from '@/lib/database';

const DEFAULTS = {
  site_name: 'Royal Properties Kanpur',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'royalpropertieskanpur@gmail.com',
  address: 'Swaroop Nagar, Kanpur 208002',
  facebook: 'https://facebook.com/royalproperties',
  instagram: 'https://instagram.com/royalproperties',
  linkedin: 'https://linkedin.com/company/royalproperties',
  hero_title: 'Find Your Royal Home',
  hero_subtitle: 'Premium properties in Kanpur with Royal Properties — your trusted real estate partner.',
  about_text: 'Royal Properties is Kanpur\'s leading real estate agency, specializing in residential and commercial properties.',
  footer_description: 'Your trusted real estate partner in Kanpur. We specialize in residential and commercial properties with complete transparency.',
};

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then(data => {
      if (Object.keys(data).length > 0) {
        setSettings({ ...DEFAULTS, ...data });
      }
      setLoading(false);
    });
  }, []);

  const set = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await updateSettings(settings);
      if (error) throw error;
      toast({ title: 'Settings Saved', description: 'Website settings updated successfully.' });
    } catch (err: any) {
      toast({
        title: 'Save failed',
        description: err?.message || 'Could not save settings. Run supabase-schema.sql first.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] placeholder-[var(--gray)]';

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-[var(--gold)]" size={32} />
    </div>
  );

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif text-white">Global Settings</h2>
        <button onClick={handleSave} disabled={saving}
          className="bg-[var(--gold)] text-black px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Save Changes
        </button>
      </div>

      {/* Contact */}
      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="p-6 border-b border-[var(--gold)]/10 bg-black/20">
          <h3 className="text-white font-serif">Contact Information</h3>
          <p className="text-[var(--gray)] text-sm mt-1">Displayed in footer and contact section.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Site Name</label>
              <input type="text" value={settings.site_name} onChange={e => set('site_name', e.target.value)} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Email Address</label>
              <input type="email" value={settings.email} onChange={e => set('email', e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Phone Number</label>
              <input type="text" value={settings.phone} onChange={e => set('phone', e.target.value)} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">WhatsApp Number (digits only)</label>
              <input type="text" placeholder="919876543210" value={settings.whatsapp} onChange={e => set('whatsapp', e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Office Address</label>
            <textarea rows={2} value={settings.address} onChange={e => set('address', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
        </div>
      </div>

      {/* Hero text */}
      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="p-6 border-b border-[var(--gold)]/10 bg-black/20">
          <h3 className="text-white font-serif">Homepage Text</h3>
          <p className="text-[var(--gray)] text-sm mt-1">Hero heading, about section, and footer description.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Hero Title</label>
            <input type="text" value={settings.hero_title} onChange={e => set('hero_title', e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Hero Subtitle</label>
            <textarea rows={2} value={settings.hero_subtitle} onChange={e => set('hero_subtitle', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">About Text</label>
            <textarea rows={4} value={settings.about_text} onChange={e => set('about_text', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Footer Description</label>
            <textarea rows={2} value={settings.footer_description} onChange={e => set('footer_description', e.target.value)} className={`${inputCls} resize-none`} />
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="p-6 border-b border-[var(--gold)]/10 bg-black/20">
          <h3 className="text-white font-serif">Social Media Links</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Facebook</label>
              <input type="url" value={settings.facebook} onChange={e => set('facebook', e.target.value)} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Instagram</label>
              <input type="url" value={settings.instagram} onChange={e => set('instagram', e.target.value)} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">LinkedIn</label>
              <input type="url" value={settings.linkedin} onChange={e => set('linkedin', e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
