import AdminSidebar from '@/components/admin/AdminSidebar';
import { useLocation } from 'wouter';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Capitalize path for header
  const pathParts = location.split('/').filter(Boolean);
  const title = pathParts[1] ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1) : 'Dashboard';

  return (
    <div className="flex h-screen bg-[#111118] text-white overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-[#0a0a0f] border-b border-[var(--gold)]/10 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-[var(--gray)] hover:text-white">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-serif text-white">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/50 flex items-center justify-center text-[var(--gold)] font-bold">
              A
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
