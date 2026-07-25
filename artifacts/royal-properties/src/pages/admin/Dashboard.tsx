import { useProperties, useBlogs, useTestimonials } from '@/hooks/useProperties';
import { useMessages } from '@/hooks/useAdmin';
import { Link } from 'wouter';
import { Building, FileText, MessageSquare, Star, Plus } from 'lucide-react';

export default function Dashboard() {
  const { data: properties } = useProperties({});
  const { data: blogs } = useBlogs();
  const { data: testimonials } = useTestimonials();
  const { data: messages } = useMessages();

  const stats = [
    { label: 'Total Properties', value: properties?.length || 0, icon: <Building className="text-[var(--gold)]" />, bg: 'bg-blue-500/10' },
    { label: 'Published Blogs', value: blogs?.length || 0, icon: <FileText className="text-[var(--gold)]" />, bg: 'bg-green-500/10' },
    { label: 'Client Testimonials', value: testimonials?.length || 0, icon: <Star className="text-[var(--gold)]" />, bg: 'bg-yellow-500/10' },
    { label: 'Unread Messages', value: messages?.filter((m:any) => m.status === 'unread').length || 0, icon: <MessageSquare className="text-[var(--gold)]" />, bg: 'bg-red-500/10' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Quick Actions */}
      <div className="flex gap-4 mb-8">
        <Link href="/admin/properties/new" className="bg-[var(--gold)] text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors">
          <Plus size={18} /> Add Property
        </Link>
        <Link href="/admin/blogs/new" className="bg-[#1a1a24] text-white border border-[var(--gold)]/20 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:border-[var(--gold)] transition-colors">
          <Plus size={18} /> Add Blog
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#1a1a24] p-6 rounded-xl border border-[var(--gold)]/10 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} border border-[var(--gold)]/20`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-3xl font-serif text-white mb-1">{stat.value}</div>
              <div className="text-[var(--gray)] text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Properties Table */}
      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="p-6 border-b border-[var(--gold)]/10 flex justify-between items-center">
          <h2 className="text-xl font-serif text-white">Recent Properties</h2>
          <Link href="/admin/properties" className="text-[var(--gold)] text-sm hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/30 text-[var(--gray)] text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Property</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--gold)]/10">
              {properties?.slice(0, 5).map((property: any) => (
                <tr key={property.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-black shrink-0">
                        <img src={property.images?.[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-white line-clamp-1">{property.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--gray)]">{property.city}</td>
                  <td className="px-6 py-4 text-[var(--gold)]">{property.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${property.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {property.published ? 'Published' : 'Draft'}
                    </span>
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
