import { Save } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'Royal Properties Kanpur',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'info@royalproperties.com',
    address: '123 Royal Estate Building, Swaroop Nagar, Kanpur 208002',
    facebook: 'https://facebook.com/royalproperties',
    instagram: 'https://instagram.com/royalproperties',
    linkedin: 'https://linkedin.com/company/royalproperties',
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Website settings have been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif text-white">Global Settings</h2>
        <button 
          onClick={handleSave}
          className="bg-[var(--gold)] text-black px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="p-6 border-b border-[var(--gold)]/10 bg-black/20">
          <h3 className="text-white font-serif">Contact Information</h3>
          <p className="text-[var(--gray)] text-sm mt-1">Displayed in footer and contact section.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Site Name</label>
              <input type="text" value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Email Address</label>
              <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Phone Number</label>
              <input type="text" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">WhatsApp Number</label>
              <input type="text" value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Office Address</label>
            <textarea rows={2} value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)] resize-none" />
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="p-6 border-b border-[var(--gold)]/10 bg-black/20">
          <h3 className="text-white font-serif">Social Media Links</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Facebook</label>
              <input type="text" value={settings.facebook} onChange={e => setSettings({...settings, facebook: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">Instagram</label>
              <input type="text" value={settings.instagram} onChange={e => setSettings({...settings, instagram: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[var(--gray)] text-sm uppercase tracking-wider">LinkedIn</label>
              <input type="text" value={settings.linkedin} onChange={e => setSettings({...settings, linkedin: e.target.value})} className="w-full bg-black/50 border border-[var(--gold)]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold)]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
