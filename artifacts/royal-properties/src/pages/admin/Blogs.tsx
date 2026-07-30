import { useBlogs, useDeleteBlog } from '@/hooks/useProperties';
import { Link } from 'wouter';
import { Plus, Edit, Trash2, Search, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: blogs, isLoading } = useBlogs(false);
  const deleteMutation = useDeleteBlog();
  const { toast } = useToast();

  const filteredBlogs = (blogs || []).filter((b: any) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast({ title: 'Deleted', description: `"${title}" has been removed.` });
    } catch {
      toast({ title: 'Error', description: 'Could not delete blog post.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray)]" size={18} />
          <input type="text" placeholder="Search articles..."
            className="w-full bg-[#1a1a24] border border-[var(--gold)]/20 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[var(--gold)]"
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <Link href="/admin/blogs/new"
          className="bg-[var(--gold)] text-black px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[var(--gold-light)] transition-colors shrink-0">
          <Plus size={18} /> Add New Post
        </Link>
      </div>

      <div className="bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/30 text-[var(--gray)] text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Post Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--gold)]/10">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center">
                  <Loader2 className="animate-spin text-[var(--gold)] mx-auto" size={24} />
                </td></tr>
              ) : filteredBlogs.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-[var(--gray)]">
                  {searchTerm ? 'No posts match your search.' : 'No blog posts yet.'}
                </td></tr>
              ) : (
                filteredBlogs.map((blog: any) => (
                  <tr key={blog.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded overflow-hidden bg-black shrink-0 border border-[var(--gold)]/20">
                          {blog.featured_image
                            ? <img src={blog.featured_image} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full bg-[var(--gold)]/10" />
                          }
                        </div>
                        <div className="font-medium text-white line-clamp-1 max-w-xs">{blog.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--gray)]">{blog.category || '—'}</td>
                    <td className="px-6 py-4 text-[var(--gray)] whitespace-nowrap">
                      {new Date(blog.publish_date || blog.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        blog.published ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/blogs/${blog.id}`}
                          className="p-2 text-[var(--gray)] hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => handleDelete(blog.id, blog.title)}
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
      </div>
    </div>
  );
}
