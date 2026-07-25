import { useBlogs } from '@/hooks/useProperties';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'wouter';

export default function BlogSection() {
  const { data: blogs, isLoading } = useBlogs(true);

  if (isLoading || !blogs || blogs.length === 0) return null;

  const latestBlogs = blogs.slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-black relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6" data-aos="fade-up">
          <div>
            <span className="text-[var(--gold)] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
              Market Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Latest from the Blog
            </h2>
          </div>
          <Link href="/blogs" className="hidden md:inline-flex items-center gap-2 text-[var(--gold)] font-semibold uppercase tracking-widest hover:text-white transition-colors">
            View All Posts <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog: any, idx: number) => (
            <div 
              key={blog.id} 
              className="group cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={blog.featured_image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format'} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md text-[var(--gold)] border border-[var(--gold)]/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {blog.category}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[var(--gray)] text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[var(--gold)]" />
                  {new Date(blog.publish_date || blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-[var(--gold)]" />
                  Admin
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                {blog.title}
              </h3>
              
              <p className="text-[var(--gray)] line-clamp-3 mb-6">
                {blog.description}
              </p>

              <span className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                Read More <ArrowRight size={16} />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-[var(--gold)] font-semibold uppercase tracking-widest hover:text-white transition-colors">
            View All Posts <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
