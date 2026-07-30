import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProperties, getPropertyById,
  createProperty, updateProperty, deleteProperty, duplicateProperty,
  getBlogs, getBlogById,
  createBlog, updateBlog, deleteBlog,
  getTestimonials, createTestimonial, deleteTestimonial,
} from '@/lib/database';

// ─── PROPERTIES ───────────────────────────────────────────
export const useProperties = (filters: any = {}) =>
  useQuery({ queryKey: ['properties', filters], queryFn: () => getProperties(filters) });

export const useProperty = (id: string | undefined) =>
  useQuery({ queryKey: ['property', id], queryFn: () => getPropertyById(id!), enabled: !!id });

export const useCreateProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createProperty(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['properties'] }),
  });
};

export const useUpdateProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateProperty(id, data),
    onSuccess: (_r, { id }) => {
      qc.invalidateQueries({ queryKey: ['properties'] });
      qc.invalidateQueries({ queryKey: ['property', id] });
    },
  });
};

export const useDeleteProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['properties'] }),
  });
};

export const useDuplicateProperty = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => duplicateProperty(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['properties'] }),
  });
};

// ─── BLOGS ────────────────────────────────────────────────
export const useBlogs = (publishedOnly = false) =>
  useQuery({ queryKey: ['blogs', publishedOnly], queryFn: () => getBlogs(publishedOnly) });

export const useBlog = (id: string | undefined) =>
  useQuery({ queryKey: ['blog', id], queryFn: () => getBlogById(id!), enabled: !!id });

export const useCreateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createBlog(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

export const useUpdateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateBlog(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

export const useDeleteBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

// ─── TESTIMONIALS ─────────────────────────────────────────
export const useTestimonials = () =>
  useQuery({ queryKey: ['testimonials'], queryFn: () => getTestimonials() });

export const useCreateTestimonial = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createTestimonial(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['testimonials'] }),
  });
};

export const useDeleteTestimonial = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['testimonials'] }),
  });
};
