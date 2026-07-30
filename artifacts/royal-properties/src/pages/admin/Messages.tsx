import { useMessages, useMarkMessageRead, useArchiveMessage, useDeleteMessage } from '@/hooks/useAdmin';
import { Mail, Phone, Trash2, Archive, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Messages() {
  const { data: messages, isLoading } = useMessages();
  const markReadMutation = useMarkMessageRead();
  const archiveMutation = useArchiveMessage();
  const deleteMutation = useDeleteMessage();
  const { toast } = useToast();

  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const filtered = (messages || []).filter((m: any) => {
    if (filter === 'unread') return m.status === 'unread';
    if (filter === 'archived') return m.status === 'archived';
    return m.status !== 'archived';
  });

  const handleMarkRead = async (msg: any) => {
    if (msg.status === 'read') return;
    await markReadMutation.mutateAsync(msg.id);
    setSelectedMessage({ ...msg, status: 'read' });
  };

  const handleArchive = async (msg: any) => {
    await archiveMutation.mutateAsync(msg.id);
    setSelectedMessage(null);
    toast({ title: 'Archived', description: 'Message archived.' });
  };

  const handleDelete = async (msg: any) => {
    if (!confirm('Delete this message? This cannot be undone.')) return;
    await deleteMutation.mutateAsync(msg.id);
    setSelectedMessage(null);
    toast({ title: 'Deleted', description: 'Message deleted.' });
  };

  const handleSelect = (msg: any) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') handleMarkRead(msg);
  };

  const unreadCount = (messages || []).filter((m: any) => m.status === 'unread').length;

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'unread', 'archived'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === f ? 'bg-[var(--gold)] text-black' : 'bg-[#1a1a24] text-[var(--gray)] border border-[var(--gold)]/20 hover:border-[var(--gold)]'
            }`}>
            {f} {f === 'unread' && unreadCount > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
          </button>
        ))}
      </div>

      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* List */}
        <div className="w-full md:w-80 bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center"><Loader2 className="animate-spin text-[var(--gold)] mx-auto" size={24} /></div>
            ) : filtered.length === 0 ? (
              <div className="p-6 text-center text-[var(--gray)]">No messages.</div>
            ) : filtered.map((msg: any) => (
              <div key={msg.id} onClick={() => handleSelect(msg)}
                className={`p-4 border-b border-[var(--gold)]/5 cursor-pointer hover:bg-white/5 transition-colors ${
                  selectedMessage?.id === msg.id ? 'bg-[var(--gold)]/5 border-l-2 border-l-[var(--gold)]' : ''
                }`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-medium text-sm ${msg.status === 'unread' ? 'text-white' : 'text-[var(--gray)]'}`}>
                    {msg.name}
                  </span>
                  <span className="text-[10px] text-[var(--gray)]">
                    {new Date(msg.created_at).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className="text-xs text-[var(--gray)] line-clamp-1">{msg.message}</div>
                <div className="flex items-center gap-2 mt-1">
                  {msg.status === 'unread' && <span className="w-2 h-2 rounded-full bg-[var(--gold)] inline-block" />}
                  {msg.status === 'archived' && <span className="text-[10px] text-blue-400">Archived</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="flex-1 bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 flex flex-col overflow-hidden">
          {selectedMessage ? (
            <>
              <div className="p-6 border-b border-[var(--gold)]/10 flex justify-between items-start bg-black/20">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-2">{selectedMessage.name}</h3>
                  <div className="flex flex-wrap gap-4 text-[var(--gray)] text-sm">
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} className="text-[var(--gold)]" /> {selectedMessage.email}
                    </span>
                    {selectedMessage.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone size={14} className="text-[var(--gold)]" /> {selectedMessage.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 text-[var(--gray)]">
                  <button onClick={() => handleMarkRead(selectedMessage)} disabled={selectedMessage.status === 'read'}
                    title="Mark Read"
                    className="p-2 rounded hover:bg-green-500/10 hover:text-green-400 transition-colors disabled:opacity-30">
                    <CheckCircle size={18} />
                  </button>
                  <button onClick={() => handleArchive(selectedMessage)} disabled={archiveMutation.isPending}
                    title="Archive"
                    className="p-2 rounded hover:bg-blue-500/10 hover:text-blue-400 transition-colors">
                    <Archive size={18} />
                  </button>
                  <button onClick={() => handleDelete(selectedMessage)} disabled={deleteMutation.isPending}
                    title="Delete"
                    className="p-2 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="text-[var(--gray)] text-xs uppercase tracking-widest mb-4">
                  Received {new Date(selectedMessage.created_at).toLocaleString('en-IN')}
                </div>
                <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="p-4 border-t border-[var(--gold)]/10 bg-black/20">
                <a href={`mailto:${selectedMessage.email}`}
                  className="inline-flex bg-[var(--gold)] text-black px-6 py-2.5 rounded-lg font-semibold items-center gap-2 hover:bg-[var(--gold-light)] transition-colors">
                  <Mail size={16} /> Reply via Email
                </a>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[var(--gray)]">
              <Mail size={48} className="text-[var(--gold)]/20 mb-4" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
