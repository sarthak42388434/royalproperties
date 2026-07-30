import { useProperties, useDeleteProperty, useDuplicateProperty, useUpdateProperty } from '@/hooks/useProperties';
import { Link } from 'wouter';
import { Plus, Edit, Trash2, Copy, Search, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const PAGE_SIZE = 10;

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { data: properties, isLoading } = useProperties({});
  const deleteMutation = useDeleteProperty();
  const duplicateMutation = useDuplicateProperty();
  const updateMutation = useUpdateProperty();
  const { toast } = useToast();

  const filtered = (properties || []).filter((p: any) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: 'Deleted', description: `"${title}" has been removed.` });
    } catch {
      toast({ title: 'Error', description: 'Could not delete property.', variant: 'destructive' });
    }
  };

  const handleDuplicate = async (id: string, title: string) => {
    try {
      await duplicateMutation.mutateAsync(id);
      toast({ title: 'Duplicated', description: `Copy of "${title}" created as draft.` });
    } catch {
      toast({ title: 'Error', description: 'Could not duplicate property.', variant: 'destructive' });
    }
  };

  const handleTogglePublish = async (property: any) => {
    try {
      await updateMutation.mutateAsync({ id: property.id, data: { published: !property.published } });
      toast({ title: property.published ? 'Unpublished' : 'Published', description: `"${property.title}" updated.` });
    } catch {
      toast({ title: 'Error', description: 'Could not update status.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray)]" size={18} />
          <input type="text" placeholder="Search properties..."
            className="w-full bg-[#1a1a24] border border-[var(--gold)]/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[var(--gold)]"
            value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setPage(1); }} />
        </div>
        <Link href="/admin/properties/new"
          className="bg-[var(--gold)] text-black px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors shrink-0">
          <Plus size={18} /> Add New Property
        </Link>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/30 text-[var(--gray)] text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Property</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--gold)]/10">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center">
                  <Loader2 className="animate-spin text-[var(--gold)] mx-auto" size={24} />
                </td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-[var(--gray)]">
                  {searchTerm ? 'No properties match your search.' : 'No properties yet. Add your first one!'}
                </td></tr>
              ) : (
                paginated.map((property: any) => (
                  <tr key={property.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded overflow-hidden bg-black shrink-0 border border-[var(--gold)]/20">
                          {property.images?.[0] ? (
                            <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[var(--gold)]/10 flex items-center justify-center text-[var(--gold)] text-xs">No img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white line-clamp-1 max-w-xs">{property.title}</div>
                          <div className="text-[var(--gray)] text-xs">{property.city} • {property.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--gray)] whitespace-nowrap">{property.property_type}</td>
                    <td className="px-6 py-4 text-[var(--gold)] whitespace-nowrap">{property.price}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(property)}
                        disabled={updateMutation.isPending}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${
                          property.published
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                        {property.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/properties/${property.id}`}
                          className="p-2 text-[var(--gray)] hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDuplicate(property.id, property.title)}
                          disabled={duplicateMutation.isPending}
                          className="p-2 text-[var(--gray)] hover:text-[var(--gold)] hover:bg-[var(--gold)]/10 rounded transition-colors" title="Duplicate">
                          <Copy size={16} />
                        </button>
                        <button onClick={() => handleDelete(property.id, property.title)}
                          disabled={deleteMutation.isPending}
                          className="p-2 text-[var(--gray)] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[var(--gold)]/10 flex items-center justify-between text-sm text-[var(--gray)]">
          <div>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </div>
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1 bg-black/30 rounded border border-[var(--gold)]/20 hover:border-[var(--gold)] transition-colors disabled:opacity-30">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`px-3 py-1 rounded border transition-colors ${p === page ? 'bg-[var(--gold)] text-black border-transparent font-medium' : 'bg-black/30 border-[var(--gold)]/20 hover:border-[var(--gold)]'}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1 bg-black/30 rounded border border-[var(--gold)]/20 hover:border-[var(--gold)] transition-colors disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
