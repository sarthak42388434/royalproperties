import { supabase } from './supabase';
import { sampleProperties, sampleBlogs, sampleTestimonials } from './seedData';

// Helper to determine if we should fall back to seed data
const handleResult = (error: any, data: any, seedFallback: any) => {
  // If no setup or table doesn't exist, use seed
  if (error || !data || data.length === 0) {
    return seedFallback;
  }
  return data;
};

// Properties
export const getProperties = async (filters: any = {}) => {
  let query = supabase.from('properties').select('*');
  
  if (filters.published !== undefined) {
    query = query.eq('published', filters.published);
  }
  if (filters.featured !== undefined) {
    query = query.eq('featured', filters.featured);
  }
  if (filters.city) {
    query = query.eq('city', filters.city);
  }
  if (filters.property_type) {
    query = query.eq('property_type', filters.property_type);
  }
  if (filters.purpose) {
    query = query.eq('purpose', filters.purpose);
  }
  if (filters.beds && filters.beds !== 'Any') {
    if (filters.beds === '5+') {
      query = query.gte('beds', 5);
    } else {
      query = query.eq('beds', parseInt(filters.beds));
    }
  }
  if (filters.minPrice) {
    query = query.gte('price_value', parseInt(filters.minPrice));
  }
  if (filters.maxPrice) {
    query = query.lte('price_value', parseInt(filters.maxPrice));
  }
  
  // Sort
  if (filters.sort === 'Price Low→High') {
    query = query.order('price_value', { ascending: true });
  } else if (filters.sort === 'Price High→Low') {
    query = query.order('price_value', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;
  return handleResult(error, data, sampleProperties);
};

export const getPropertyById = async (id: string) => {
  const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
  if (error || !data) {
    return sampleProperties.find(p => p.id === id) || null;
  }
  return data;
};

// Blogs
export const getBlogs = async (publishedOnly = false) => {
  let query = supabase.from('blogs').select('*').order('created_at', { ascending: false });
  if (publishedOnly) {
    query = query.eq('published', true);
  }
  const { data, error } = await query;
  return handleResult(error, data, sampleBlogs);
};

export const getBlogById = async (id: string) => {
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
  if (error || !data) {
    return sampleBlogs.find(b => b.id === id) || null;
  }
  return data;
};

// Testimonials
export const getTestimonials = async () => {
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  return handleResult(error, data, sampleTestimonials);
};

// Contact Messages
export const createContactMessage = async (message: any) => {
  const { data, error } = await supabase.from('contact_messages').insert([message]).select();
  return { data, error };
};

export const getContactMessages = async () => {
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
};

// Admin Auth
export const checkAdminSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};
