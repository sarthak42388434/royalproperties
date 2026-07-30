import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getContactMessages, updateContactMessage, deleteContactMessage } from '@/lib/database';

export const useAuth = () =>
  useQuery({
    queryKey: ['admin-session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

export const useLogout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => { await supabase.auth.signOut(); },
    onSuccess: () => qc.setQueryData(['admin-session'], null),
  });
};

export const useMessages = () =>
  useQuery({ queryKey: ['contact-messages'], queryFn: () => getContactMessages() });

export const useMarkMessageRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => updateContactMessage(id, { status: 'read' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact-messages'] }),
  });
};

export const useArchiveMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => updateContactMessage(id, { status: 'archived' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact-messages'] }),
  });
};

export const useDeleteMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContactMessage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact-messages'] }),
  });
};
