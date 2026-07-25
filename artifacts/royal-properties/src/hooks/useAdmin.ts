import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getContactMessages } from '@/lib/database';

export const useAuth = () => {
  return useQuery({
    queryKey: ['admin-session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onSuccess: () => {
      queryClient.setQueryData(['admin-session'], null);
    }
  });
};

export const useMessages = () => {
  return useQuery({
    queryKey: ['contact-messages'],
    queryFn: () => getContactMessages()
  });
};
