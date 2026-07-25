import { useMessages } from '@/hooks/useAdmin';
import { Mail, Phone, Trash2, Archive, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Messages() {
  const { data: messages, isLoading } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      
      {/* List */}
      <div className="w-1/2 md:w-1/3 bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--gold)]/10 bg-black/20">
          <h2 className="text-lg font-serif text-white">Inbox</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-6 text-center text-[var(--gray)]">Loading messages...</div>
          ) : messages?.length === 0 ? (
            <div className="p-6 text-center text-[var(--gray)]">No messages.</div>
          ) : (
            messages?.map((msg: any) => (
              <div 
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 border-b border-[var(--gold)]/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedMessage?.id === msg.id ? 'bg-[var(--gold)]/5 border-l-2 border-l-[var(--gold)]' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-medium ${msg.status === 'unread' ? 'text-white' : 'text-[var(--gray)]'}`}>{msg.name}</span>
                  <span className="text-[10px] text-[var(--gray)]">{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-[var(--gray)] line-clamp-1">{msg.message}</div>
                {msg.status === 'unread' && (
                  <span className="mt-2 inline-block w-2 h-2 rounded-full bg-[var(--gold)]" />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 bg-[#1a1a24] rounded-xl border border-[var(--gold)]/10 flex flex-col overflow-hidden">
        {selectedMessage ? (
          <>
            <div className="p-6 border-b border-[var(--gold)]/10 flex justify-between items-start bg-black/20">
              <div>
                <h3 className="text-2xl font-serif text-white mb-2">{selectedMessage.name}</h3>
                <div className="flex gap-4 text-[var(--gray)] text-sm">
                  <span className="flex items-center gap-1.5"><Mail size={14} className="text-[var(--gold)]" /> {selectedMessage.email}</span>
                  <span className="flex items-center gap-1.5"><Phone size={14} className="text-[var(--gold)]" /> {selectedMessage.phone}</span>
                </div>
              </div>
              <div className="flex gap-2 text-[var(--gray)]">
                <button className="p-2 rounded hover:bg-white/10 hover:text-white transition-colors" title="Mark Read">
                  <CheckCircle size={18} />
                </button>
                <button className="p-2 rounded hover:bg-white/10 hover:text-white transition-colors" title="Archive">
                  <Archive size={18} />
                </button>
                <button className="p-2 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="text-[var(--gray)] text-xs uppercase tracking-widest mb-4">Message Received on {new Date(selectedMessage.created_at).toLocaleString()}</div>
              <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>
            <div className="p-4 border-t border-[var(--gold)]/10 bg-black/20">
              <a 
                href={`mailto:${selectedMessage.email}`}
                className="inline-flex bg-[var(--gold)] text-black px-6 py-2.5 rounded-lg font-semibold items-center gap-2 hover:bg-[var(--gold-light)] transition-colors"
              >
                Reply via Email
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
  );
}
