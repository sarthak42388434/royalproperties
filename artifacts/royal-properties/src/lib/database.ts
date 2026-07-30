import { supabase } from './supabase';
import { sampleProperties, sampleBlogs, sampleTestimonials } from './seedData';

// Helper: fall back to seed data when Supabase isn't set up yet
const handleResult = (error: any, data: any, seedFallback: any) => {
  if (error || !data || data.length === 0) return seedFallback;
  return data;
};

// ─── PROPERTIES ───────────────────────────────────────────
export const getProperties = async (filters: any = {}) => {
  let query = supabase.from('properties').select('*');

  if (filters.published !== undefined) query = query.eq('published', filters.published);
  if (filters.featured !== undefined)  query = query.eq('featured', filters.featured);
  if (filters.city)                    query = query.ilike('city', `%${filters.city}%`);
  if (filters.property_type)           query = query.eq('property_type', filters.property_type);
  if (filters.purpose)                 query = query.eq('purpose', filters.purpose);
  if (filters.beds && filters.beds !== 'Any') {
    if (filters.beds === '5+') query = query.gte('beds', 5);
    else                       query = query.eq('beds', parseInt(filters.beds));
  }
  if (filters.minPrice) query = query.gte('price_value', parseInt(filters.minPrice));
  if (filters.maxPrice) query = query.lte('price_value', parseInt(filters.maxPrice));

  if (filters.sort === 'Price Low→High')      query = query.order('price_value', { ascending: true });
  else if (filters.sort === 'Price High→Low') query = query.order('price_value', { ascending: false });
  else                                         query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  return handleResult(error, data, sampleProperties);
};

export const getPropertyById = async (id: string) => {
  const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
  if (error || !data) return sampleProperties.find(p => p.id === id) || null;
  return data;
};

export const createProperty = async (payload: any) => {
  const { data, error } = await supabase.from('properties').insert([payload]).select().single();
  return { data, error };
};

export const updateProperty = async (id: string, payload: any) => {
  const { data, error } = await supabase.from('properties').update(payload).eq('id', id).select().single();
  return { data, error };
};

export const deleteProperty = async (id: string) => {
  const { error } = await supabase.from('properties').delete().eq('id', id);
  return { error };
};

export const duplicateProperty = async (id: string) => {
  const { data: original } = await supabase.from('properties').select('*').eq('id', id).single();
  if (!original) return { error: new Error('Property not found') };
  const { id: _id, created_at, updated_at, ...rest } = original;
  const copy = {
    ...rest,
    title: `${rest.title} (Copy)`,
    slug: `${rest.slug}-copy-${Date.now()}`,
    published: false,
  };
  const { data, error } = await supabase.from('properties').insert([copy]).select().single();
  return { data, error };
};

// ─── BLOGS ────────────────────────────────────────────────
export const getBlogs = async (publishedOnly = false) => {
  let query = supabase.from('blogs').select('*').order('created_at', { ascending: false });
  if (publishedOnly) query = query.eq('published', true);
  const { data, error } = await query;
  return handleResult(error, data, sampleBlogs);
};

export const getBlogById = async (id: string) => {
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
  if (error || !data) return sampleBlogs.find(b => b.id === id) || null;
  return data;
};

export const createBlog = async (payload: any) => {
  const { data, error } = await supabase.from('blogs').insert([payload]).select().single();
  return { data, error };
};

export const updateBlog = async (id: string, payload: any) => {
  const { data, error } = await supabase.from('blogs').update(payload).eq('id', id).select().single();
  return { data, error };
};

export const deleteBlog = async (id: string) => {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  return { error };
};

// ─── TESTIMONIALS ─────────────────────────────────────────
export const getTestimonials = async () => {
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  return handleResult(error, data, sampleTestimonials);
};

export const createTestimonial = async (payload: any) => {
  const { data, error } = await supabase.from('testimonials').insert([payload]).select().single();
  return { data, error };
};

export const deleteTestimonial = async (id: string) => {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  return { error };
};

// ─── CONTACT MESSAGES ─────────────────────────────────────
export const createContactMessage = async (message: any) => {
  const { data, error } = await supabase.from('contact_messages').insert([message]).select();
  return { data, error };
};

export const getContactMessages = async () => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
};

export const updateContactMessage = async (id: string, updates: any) => {
  const { error } = await supabase.from('contact_messages').update(updates).eq('id', id);
  return { error };
};

export const deleteContactMessage = async (id: string) => {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  return { error };
};

// ─── SETTINGS ─────────────────────────────────────────────
export const getSettings = async (): Promise<Record<string, string>> => {
  const { data, error } = await supabase.from('settings').select('key, value');
  if (error || !data) return {};
  return data.reduce((acc: Record<string, string>, row: any) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
};

export const updateSettings = async (updates: Record<string, string>) => {
  const rows = Object.entries(updates).map(([key, value]) => ({ key, value }));
  const { error } = await supabase.from('settings').upsert(rows, { onConflict: 'key' });
  return { error };
};

// ─── ADMIN AUTH ───────────────────────────────────────────
export const checkAdminSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};
