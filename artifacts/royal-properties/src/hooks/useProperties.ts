import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProperties, getPropertyById, getBlogs, getTestimonials } from '@/lib/database';
import { supabase } from '@/lib/supabase';

export const useProperties = (filters: any = {}) => {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => getProperties(filters)
  });
};

export const useProperty = (id: string | undefined) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id!),
    enabled: !!id
  });
};

export const useBlogs = (publishedOnly = false) => {
  return useQuery({
    queryKey: ['blogs', publishedOnly],
    queryFn: () => getBlogs(publishedOnly)
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => getTestimonials()
  });
};
