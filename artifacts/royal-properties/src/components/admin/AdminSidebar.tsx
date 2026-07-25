import { Link, useLocation } from 'wouter';
import { LayoutDashboard, Building, FileText, MessageSquare, Star, Settings, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Properties', path: '/admin/properties', icon: <Building size={20} /> },
  { name: 'Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
  { name: 'Testimonials', path: '/admin/testimonials', icon: <Star size={20} /> },
  { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
  { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
];

export default function AdminSidebar() {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation('/admin');
  };

  return (
    <div className="w-64 bg-[#0a0a0f] border-r border-[var(--gold)]/10 h-screen flex flex-col hidden md:flex shrink-0">
      
      <div className="p-6 border-b border-[var(--gold)]/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[var(--gold)] flex items-center justify-center bg-black">
            <span className="text-[var(--gold)] font-serif font-bold text-lg">RP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-serif font-bold tracking-wide">Royal Admin</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map(item => {
          const isActive = location === item.path || location.startsWith(item.path + '/');
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20' 
                  : 'text-[var(--gray)] hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[var(--gold)]/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--gray)] hover:bg-red-500/10 hover:text-red-500 w-full transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

    </div>
  );
}
