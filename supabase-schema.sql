-- ============================================================
-- Royal Properties — Supabase Database Setup
-- Run this entire script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/lxqzquxnktxrjnlupxfm/sql/new
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROPERTY TYPES ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS property_types (
  id   uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

INSERT INTO property_types (name) VALUES
  ('Apartment'), ('Villa'), ('Plot'), ('Commercial'), ('Office'), ('Farm House')
ON CONFLICT (name) DO NOTHING;

-- ─── LOCATIONS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS locations (
  id   uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

INSERT INTO locations (name) VALUES
  ('Kakadeo'), ('Naveen Nagar'), ('Pandu Nagar'), ('Govind Nagar'),
  ('Kidwai Nagar'), ('Shyam Nagar'), ('Armapur'), ('Kanpur')
ON CONFLICT (name) DO NOTHING;

-- ─── AMENITIES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS amenities_list (
  id   uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

INSERT INTO amenities_list (name) VALUES
  ('Power Backup'), ('24/7 Security'), ('Parking'), ('Lift/Elevator'),
  ('Swimming Pool'), ('Gym'), ('Park/Garden'), ('Club House'),
  ('CCTV Surveillance'), ('Intercom'), ('Fire Safety'), ('Water Supply'),
  ('Sewage Treatment'), ('Rainwater Harvesting'), ('Solar Panels')
ON CONFLICT (name) DO NOTHING;

-- ─── PROPERTIES ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS properties (
  id                    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title                 text NOT NULL,
  slug                  text UNIQUE NOT NULL,
  description           text,
  price                 text,             -- display label e.g. "₹85 Lakhs"
  price_value           numeric DEFAULT 0, -- numeric in Lakhs for filtering/sorting
  location              text,             -- full address string
  city                  text,             -- area/city for filter (e.g. "Kakadeo")
  property_type         text,
  purpose               text,             -- For Sale | For Rent | Investment | Commercial | Residential
  status                text DEFAULT 'Available', -- Available | Sold | Rented
  beds                  integer,
  baths                 integer,
  area                  text,             -- e.g. "1200 sq.ft"
  badge                 text,             -- card badge text
  featured              boolean DEFAULT false,
  published             boolean DEFAULT true,
  images                jsonb DEFAULT '[]'::jsonb, -- array of image URLs
  amenities             jsonb DEFAULT '[]'::jsonb, -- array of amenity names
  nearby                jsonb DEFAULT '[]'::jsonb, -- array of nearby place strings
  location_advantages   jsonb DEFAULT '[]'::jsonb,
  investment_highlights jsonb DEFAULT '[]'::jsonb,
  google_maps_link      text,
  youtube_link          text,
  meta_title            text,
  meta_description      text,
  created_at            timestamptz DEFAULT now()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_properties_published  ON properties (published);
CREATE INDEX IF NOT EXISTS idx_properties_featured   ON properties (featured);
CREATE INDEX IF NOT EXISTS idx_properties_city       ON properties (city);
CREATE INDEX IF NOT EXISTS idx_properties_type       ON properties (property_type);
CREATE INDEX IF NOT EXISTS idx_properties_purpose    ON properties (purpose);
CREATE INDEX IF NOT EXISTS idx_properties_price      ON properties (price_value);
CREATE INDEX IF NOT EXISTS idx_properties_created    ON properties (created_at DESC);

-- ─── BLOGS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           text NOT NULL,
  slug            text UNIQUE NOT NULL,
  description     text,
  content         text,
  featured_image  text,
  category        text,
  publish_date    date DEFAULT CURRENT_DATE,
  published       boolean DEFAULT false,
  meta_title      text,
  meta_description text,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs (published);
CREATE INDEX IF NOT EXISTS idx_blogs_created   ON blogs (created_at DESC);

-- ─── TESTIMONIALS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        text NOT NULL,
  designation text,
  rating      integer DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  photo       text,
  testimonial text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- ─── CONTACT MESSAGES ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       text NOT NULL,
  email      text NOT NULL,
  phone      text,
  message    text NOT NULL,
  status     text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_status  ON contact_messages (status);
CREATE INDEX IF NOT EXISTS idx_messages_created ON contact_messages (created_at DESC);

-- ─── SETTINGS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key        text UNIQUE NOT NULL,
  value      text,
  created_at timestamptz DEFAULT now()
);

-- Seed default settings
INSERT INTO settings (key, value) VALUES
  ('website_name',       'Royal Properties'),
  ('phone',              '+91 78975 00605'),
  ('whatsapp',           '917897500605'),
  ('email',              'royalpropertieskanpur@gmail.com'),
  ('address',            'Kanpur, Uttar Pradesh, India'),
  ('facebook_url',       ''),
  ('instagram_url',      ''),
  ('youtube_url',        ''),
  ('linkedin_url',       ''),
  ('hero_title',         'Find Your Dream Property in Kanpur'),
  ('hero_subtitle',      'Kanpur''s most trusted real estate partner. Premium plots, villas, apartments, and commercial spaces.'),
  ('about_text',         'Royal Properties has been serving Kanpur for over a decade, helping families find their dream homes and investors identify high-value opportunities.'),
  ('footer_description', 'Your trusted real estate partner in Kanpur. We specialize in residential and commercial properties with complete transparency.')
ON CONFLICT (key) DO NOTHING;

-- ─── STORAGE BUCKETS ──────────────────────────────────────
-- Run these one by one in Supabase Dashboard → Storage → New Bucket
-- OR use the Supabase dashboard to create them manually:
--   properties   (public)
--   blogs        (public)
--   testimonials (public)
--   site-assets  (public)

-- ─── ROW LEVEL SECURITY ───────────────────────────────────
-- Enable RLS on all tables
ALTER TABLE properties        ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials      ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_types    ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations         ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities_list    ENABLE ROW LEVEL SECURITY;

-- PUBLIC: Anyone can read published properties, blogs, testimonials, settings
CREATE POLICY "Public read published properties" ON properties
  FOR SELECT USING (published = true);

CREATE POLICY "Public read published blogs" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Public read testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Public read settings" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Public read property_types" ON property_types
  FOR SELECT USING (true);

CREATE POLICY "Public read locations" ON locations
  FOR SELECT USING (true);

CREATE POLICY "Public read amenities_list" ON amenities_list
  FOR SELECT USING (true);

-- PUBLIC: Anyone can insert contact messages (website contact form)
CREATE POLICY "Public insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- ADMIN: Authenticated users can do everything
CREATE POLICY "Admin full access properties" ON properties
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access blogs" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access messages" ON contact_messages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access settings" ON settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access property_types" ON property_types
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access locations" ON locations
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access amenities_list" ON amenities_list
  FOR ALL USING (auth.role() = 'authenticated');

-- ─── SAMPLE PROPERTIES (20 listings) ──────────────────────
INSERT INTO properties (
  title, slug, description, price, price_value, location, city,
  property_type, purpose, status, beds, baths, area, badge, featured, published, images,
  amenities, nearby, location_advantages, investment_highlights
) VALUES
(
  '3 BHK Premium Apartment in Kakadeo',
  'premium-apartment-kakadeo-001',
  'A beautifully designed 3 BHK apartment in the heart of Kakadeo with modern amenities and excellent connectivity.',
  '₹85 Lakhs', 85, 'Kakadeo, Kanpur', 'Kakadeo',
  'Apartment', 'For Sale', 'Available', 3, 2, '1450 sq.ft', 'Featured', true, true,
  '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format"]',
  '["Power Backup","24/7 Security","Parking","Lift/Elevator"]',
  '["Market - 0.5 km","School - 1 km","Hospital - 2 km"]',
  '["Metro connectivity","Prime residential area","Well-developed infrastructure"]',
  '["High rental demand","10% annual appreciation","Ready to move"]'
),
(
  'Luxury Villa in Naveen Nagar',
  'luxury-villa-naveen-nagar-001',
  'Exquisite 4 BHK villa with private garden, premium interiors, and premium fittings in one of Kanpur''s finest neighbourhoods.',
  '₹1.8 Crore', 180, 'Naveen Nagar, Kanpur', 'Naveen Nagar',
  'Villa', 'For Sale', 'Available', 4, 4, '3200 sq.ft', 'Luxury', true, true,
  '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format"]',
  '["Swimming Pool","Gym","Power Backup","24/7 Security","Parking","Club House"]',
  '["Golf Course - 2 km","Shopping Mall - 1.5 km","Hospital - 3 km"]',
  '["Elite neighbourhood","Large plot area","Gated community"]',
  '["Long-term capital appreciation","High resale value","Premium location premium"]'
),
(
  'Commercial Space in Govind Nagar',
  'commercial-space-govind-nagar-001',
  'Prime commercial space ideal for office, showroom or retail in the bustling Govind Nagar commercial district.',
  '₹42 Lakhs', 42, 'Govind Nagar, Kanpur', 'Govind Nagar',
  'Commercial', 'For Sale', 'Available', NULL, NULL, '800 sq.ft', 'For Sale', false, true,
  '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format"]',
  '["Power Backup","Parking","24/7 Security"]',
  '["Bus Stop - 200 m","Bank - 0.5 km","Restaurant - 0.3 km"]',
  '["High footfall area","Commercial hub","Easy road access"]',
  '["Rental yield 6-8% pa","High capital appreciation","Established market"]'
),
(
  '2 BHK Flat in Kidwai Nagar',
  'flat-kidwai-nagar-001',
  'Well-maintained 2 BHK flat in a quiet society with all basic amenities, perfect for a small family.',
  '₹38 Lakhs', 38, 'Kidwai Nagar, Kanpur', 'Kidwai Nagar',
  'Apartment', 'For Sale', 'Available', 2, 1, '950 sq.ft', 'Ready to Move', false, true,
  '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format"]',
  '["Power Backup","Parking","24/7 Security","Water Supply"]',
  '["School - 0.5 km","Market - 0.8 km","Hospital - 1.5 km"]',
  '["Peaceful locality","Good social infrastructure","Well-connected"]',
  '["Budget-friendly","Good rental demand","Stable value"]'
),
(
  'Investment Plot in Armapur',
  'plot-armapur-001',
  'Excellent 200 sq.yd residential plot in the developing Armapur area with clear title and immediate possession.',
  '₹25 Lakhs', 25, 'Armapur, Kanpur', 'Armapur',
  'Plot', 'Investment', 'Available', NULL, NULL, '200 sq.yd', 'Investment', false, true,
  '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format"]',
  '[]',
  '["Highway - 1 km","School - 2 km","Market - 1.5 km"]',
  '["Clear title","Fast developing area","Near upcoming metro"]',
  '["Plot value doubles in 5 years","Low maintenance","Build as per choice"]'
),
(
  'Office Space in Shyam Nagar',
  'office-shyam-nagar-001',
  'Modern ready-to-move office space in prime location with excellent connectivity and ample parking.',
  '₹55 Lakhs', 55, 'Shyam Nagar, Kanpur', 'Shyam Nagar',
  'Office', 'For Sale', 'Available', NULL, NULL, '1100 sq.ft', 'Office', false, true,
  '["https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&auto=format"]',
  '["Power Backup","Parking","CCTV Surveillance","Intercom","Lift/Elevator"]',
  '["IT Hub - 0.5 km","Restaurant - 0.3 km","ATM - 0.2 km"]',
  '["IT corridor","Excellent connectivity","Ready to use"]',
  '["7% rental yield","Growing IT sector demand","Modern infrastructure"]'
),
(
  'Farm House near Kanpur',
  'farm-house-kanpur-001',
  'Sprawling 1-acre farm house on the outskirts of Kanpur, ideal for weekend getaway or agro-tourism.',
  '₹95 Lakhs', 95, 'Kanpur Outskirts', 'Kanpur',
  'Farm House', 'For Sale', 'Available', 3, 2, '1 Acre', 'Unique', false, true,
  '["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format"]',
  '["Power Backup","Water Supply","Parking"]',
  '["City - 25 km","River - 3 km","Highway - 5 km"]',
  '["Peaceful environment","Large open area","Clean air"]',
  '["Agro-tourism potential","Weekend retreat","Eco-friendly living"]'
),
(
  '4 BHK Apartment in Pandu Nagar',
  'apartment-pandu-nagar-001',
  'Spacious 4 BHK premium apartment in a gated community in Pandu Nagar with modern amenities.',
  '₹1.2 Crore', 120, 'Pandu Nagar, Kanpur', 'Pandu Nagar',
  'Apartment', 'For Sale', 'Available', 4, 3, '2100 sq.ft', 'Premium', true, true,
  '["https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format"]',
  '["Swimming Pool","Gym","Power Backup","24/7 Security","Parking","Club House","CCTV Surveillance"]',
  '["Mall - 1 km","Hospital - 2 km","Metro - 0.5 km"]',
  '["Gated community","Premium fittings","Prime location"]',
  '["High rental income potential","Established area","Premium builder"]'
),
(
  'Studio Apartment for Rent in Kakadeo',
  'studio-kakadeo-rent-001',
  'Modern studio apartment perfect for working professionals. Fully furnished with all amenities.',
  '₹12,000/month', 0, 'Kakadeo, Kanpur', 'Kakadeo',
  'Apartment', 'For Rent', 'Available', 1, 1, '450 sq.ft', 'For Rent', false, true,
  '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format"]',
  '["Power Backup","24/7 Security","Parking","Water Supply","Intercom"]',
  '["Office Hub - 0.5 km","Café - 0.2 km","Gym - 0.3 km"]',
  '["Fully furnished","Near offices","Safe locality"]',
  '[]'
),
(
  '3 BHK Villa in Govind Nagar',
  'villa-govind-nagar-001',
  'Elegant 3 BHK independent villa with private terrace and garden in Govind Nagar.',
  '₹75 Lakhs', 75, 'Govind Nagar, Kanpur', 'Govind Nagar',
  'Villa', 'For Sale', 'Available', 3, 3, '2400 sq.ft', 'For Sale', false, true,
  '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format"]',
  '["Power Backup","24/7 Security","Parking","Park/Garden"]',
  '["School - 1 km","Hospital - 1.5 km","Market - 0.8 km"]',
  '["Independent house","Private garden","Good neighbourhood"]',
  '["Good appreciation","Rental potential","No society maintenance"]'
),
(
  'Residential Plot in Naveen Nagar',
  'plot-naveen-nagar-001',
  'Prime 150 sq.yd corner plot in Naveen Nagar with all utilities in place. Ready for construction.',
  '₹32 Lakhs', 32, 'Naveen Nagar, Kanpur', 'Naveen Nagar',
  'Plot', 'For Sale', 'Available', NULL, NULL, '150 sq.yd', 'Corner Plot', false, true,
  '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format"]',
  '[]',
  '["Park - 0.3 km","School - 1 km","Hospital - 2 km"]',
  '["Corner plot advantage","All utilities ready","Developing area"]',
  '["Build dream home","Long-term investment","Clear title"]'
),
(
  '2 BHK Flat for Rent in Shyam Nagar',
  'flat-shyam-nagar-rent-001',
  'Semi-furnished 2 BHK flat available for rent in a well-maintained society in Shyam Nagar.',
  '₹9,500/month', 0, 'Shyam Nagar, Kanpur', 'Shyam Nagar',
  'Apartment', 'For Rent', 'Available', 2, 1, '900 sq.ft', 'For Rent', false, true,
  '["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format"]',
  '["Power Backup","Parking","Water Supply","24/7 Security"]',
  '["Market - 0.5 km","School - 1 km","Bus Stop - 0.3 km"]',
  '["Semi-furnished","Good society","Peaceful area"]',
  '[]'
),
(
  'Commercial Shop in Kidwai Nagar',
  'shop-kidwai-nagar-001',
  'Ground floor commercial shop with high visibility and footfall in the Kidwai Nagar market area.',
  '₹18 Lakhs', 18, 'Kidwai Nagar, Kanpur', 'Kidwai Nagar',
  'Commercial', 'For Sale', 'Available', NULL, NULL, '300 sq.ft', 'Commercial', false, true,
  '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format"]',
  '["Power Backup","CCTV Surveillance"]',
  '["Market - on site","Bus Stop - 0.1 km","Parking - nearby"]',
  '["High footfall","Ground floor","Market visibility"]',
  '["Immediate rental income","5% annual appreciation","Established market"]'
),
(
  '3 BHK Premium Flat in Pandu Nagar',
  'flat-pandu-nagar-001',
  'Ready-to-move 3 BHK flat with premium interiors and modern fittings in a reputed society in Pandu Nagar.',
  '₹62 Lakhs', 62, 'Pandu Nagar, Kanpur', 'Pandu Nagar',
  'Apartment', 'For Sale', 'Available', 3, 2, '1300 sq.ft', 'Ready to Move', false, true,
  '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format"]',
  '["Power Backup","Parking","Lift/Elevator","24/7 Security","CCTV Surveillance"]',
  '["School - 0.8 km","Hospital - 1 km","Mall - 2 km"]',
  '["Premium society","Modern fittings","Great connectivity"]',
  '["Ready to move","Good resale value","Rental income potential"]'
),
(
  'Office Complex in Armapur',
  'office-armapur-001',
  'Multi-story office complex available for sale in Armapur. Ideal for corporate headquarters.',
  '₹3.5 Crore', 350, 'Armapur, Kanpur', 'Armapur',
  'Office', 'For Sale', 'Available', NULL, NULL, '8000 sq.ft', 'Corporate', true, true,
  '["https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&auto=format"]',
  '["Power Backup","24/7 Security","Parking","CCTV Surveillance","Lift/Elevator","Fire Safety","Intercom"]',
  '["Airport - 15 km","Railway Station - 5 km","Hotel - 1 km"]',
  '["Large floor plate","Corporate address","Ample parking"]',
  '["Corporate HQ potential","High rental income","Landmark property"]'
),
(
  'Independent House in Kakadeo',
  'house-kakadeo-001',
  'Spacious independent house with 5 bedrooms, double garage and large open terrace in Kakadeo.',
  '₹1.1 Crore', 110, 'Kakadeo, Kanpur', 'Kakadeo',
  'Villa', 'For Sale', 'Sold', 5, 4, '2800 sq.ft', 'Sold', false, true,
  '["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format"]',
  '["Power Backup","Parking","24/7 Security","Water Supply"]',
  '["School - 0.5 km","Hospital - 1 km","Park - 0.3 km"]',
  '["Prime location","Large plot","Good neighbourhood"]',
  '[]'
),
(
  '1 BHK Apartment in Govind Nagar',
  'apartment-govind-nagar-001',
  'Affordable 1 BHK apartment perfect for first-time buyers or investors looking for rental income.',
  '₹22 Lakhs', 22, 'Govind Nagar, Kanpur', 'Govind Nagar',
  'Apartment', 'For Sale', 'Available', 1, 1, '550 sq.ft', 'Affordable', false, true,
  '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format"]',
  '["Power Backup","Parking","Water Supply"]',
  '["Market - 0.3 km","Bus Stop - 0.2 km","School - 1.5 km"]',
  '["Budget-friendly","Good connectivity","Rental potential"]',
  '["Low entry price","Good rental yield","First home"]'
),
(
  'Villa Plot in Naveen Nagar',
  'villa-plot-naveen-nagar-001',
  'Premium 500 sq.yd villa plot in an upmarket gated township in Naveen Nagar. Ready for construction.',
  '₹1.4 Crore', 140, 'Naveen Nagar, Kanpur', 'Naveen Nagar',
  'Plot', 'Investment', 'Available', NULL, NULL, '500 sq.yd', 'Premium Plot', true, true,
  '["https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format"]',
  '[]',
  '["Club House - 0.5 km","School - 1 km","Hospital - 2 km"]',
  '["Township amenities","Premium locality","Large plot"]',
  '["Build custom villa","High appreciation","Gated community"]'
),
(
  '3 BHK Flat for Rent in Pandu Nagar',
  'flat-pandu-nagar-rent-001',
  'Fully furnished 3 BHK flat with premium interiors available for rent in Pandu Nagar.',
  '₹18,000/month', 0, 'Pandu Nagar, Kanpur', 'Pandu Nagar',
  'Apartment', 'For Rent', 'Available', 3, 2, '1350 sq.ft', 'Furnished', false, true,
  '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format"]',
  '["Power Backup","24/7 Security","Parking","Gym","Lift/Elevator","CCTV Surveillance"]',
  '["Mall - 1 km","Office - 0.5 km","Restaurant - 0.3 km"]',
  '["Fully furnished","Premium society","Work from home ready"]',
  '[]'
),
(
  'Showroom Space in Shyam Nagar',
  'showroom-shyam-nagar-001',
  'Prominent showroom space on the main road with glass facade and high visibility for retail business.',
  '₹28 Lakhs', 28, 'Shyam Nagar, Kanpur', 'Shyam Nagar',
  'Commercial', 'For Sale', 'Available', NULL, NULL, '600 sq.ft', 'Main Road', false, true,
  '["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format"]',
  '["Power Backup","Parking","CCTV Surveillance","Fire Safety"]',
  '["Bus Stop - 50 m","Hotel - 0.5 km","Market - on site"]',
  '["Main road frontage","Glass facade","High visibility"]',
  '["Premium retail location","High footfall","Strong rental demand"]'
);

-- ─── SAMPLE TESTIMONIALS ───────────────────────────────────
INSERT INTO testimonials (name, designation, rating, testimonial) VALUES
  ('Rajesh Kumar',    'Software Engineer',       5, 'Royal Properties helped us find our dream home in Kakadeo. The entire process was smooth, transparent, and stress-free. Highly recommended!'),
  ('Priya Sharma',    'Doctor',                  5, 'Excellent service! They understood our requirements perfectly and found the right property within our budget. Very professional team.'),
  ('Amit Agarwal',    'Business Owner',          5, 'Invested in a commercial property through Royal Properties. Their market knowledge and honest advice helped us make the right decision.'),
  ('Sunita Gupta',    'Teacher',                 4, 'Good experience overall. Found a lovely 3 BHK flat in Naveen Nagar. The team was patient and helpful throughout the process.'),
  ('Vikram Singh',    'Government Officer',      5, 'Trusted partners for real estate. They have deep knowledge of Kanpur''s property market and always give honest advice. Very satisfied.'),
  ('Meena Tiwari',    'Homemaker',               5, 'Finally found our perfect home after months of searching. Royal Properties made the journey enjoyable and worry-free. Thank you!'),
  ('Deepak Verma',    'IT Professional',         4, 'Good service and transparent dealings. The property documents were all in order. Would definitely use their services again.'),
  ('Anita Mishra',    'CA & Financial Advisor',  5, 'As a financial advisor, I appreciate their transparent pricing and honest guidance. Recommended Royal Properties to all my clients.');

-- ─── SAMPLE BLOGS ─────────────────────────────────────────
INSERT INTO blogs (title, slug, description, content, category, publish_date, published, featured_image) VALUES
(
  'Top 5 Localities to Invest in Kanpur in 2025',
  'top-localities-kanpur-2025',
  'Discover the best areas in Kanpur offering high returns and strong infrastructure for real estate investment.',
  'Kanpur''s real estate market continues to grow. Here are the top 5 localities: Kakadeo, Naveen Nagar, Govind Nagar, Pandu Nagar, and Kidwai Nagar...',
  'Investment', '2025-01-15', true,
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format'
),
(
  'Home Buying Guide: What to Check Before Buying a Flat',
  'home-buying-guide-flat',
  'A complete checklist for first-time home buyers in Kanpur to ensure a smooth, legally sound purchase.',
  'Buying your first flat? Here is everything you need to verify before signing: Title documents, RERA registration, builder reputation, OC/CC certificate...',
  'Guides', '2025-02-01', true,
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format'
),
(
  'Commercial Real Estate Trends in Kanpur 2025',
  'commercial-real-estate-kanpur-2025',
  'Explore how Kanpur''s commercial property market is evolving and where the best opportunities lie.',
  'Kanpur''s commercial real estate sector is witnessing robust demand driven by retail expansion and IT growth...',
  'Market Trends', '2025-02-20', true,
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format'
),
(
  'RERA Explained: Rights of Home Buyers in UP',
  'rera-rights-home-buyers-up',
  'Understanding RERA and how it protects home buyers in Uttar Pradesh from builder delays and fraud.',
  'The Real Estate (Regulation and Development) Act 2016 (RERA) transformed the real estate sector...',
  'Legal', '2025-03-05', true,
  'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&auto=format'
),
(
  'How to Calculate Home Loan EMI: A Simple Guide',
  'home-loan-emi-guide',
  'Learn how to calculate your home loan EMI and plan your finances before buying property in Kanpur.',
  'Understanding EMI calculation helps you plan your property purchase better. The formula is: EMI = [P x R x (1+R)^N] / [(1+R)^N-1]...',
  'Finance', '2025-03-20', true,
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format'
),
(
  'Vastu Tips for Your New Home in Kanpur',
  'vastu-tips-new-home',
  'Simple Vastu Shastra guidelines to bring positive energy, prosperity and peace to your new home.',
  'Vastu Shastra, the ancient Indian science of architecture, can significantly impact your well-being...',
  'Lifestyle', '2025-04-01', true,
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format'
);

-- ─── ADMIN USER SETUP ─────────────────────────────────────
-- Create the admin user via Supabase Dashboard:
-- Go to: Authentication > Users > Invite User (or Add User)
-- Email:    royalproperties_0611@royalproperties.com
-- Password: royalproperties42388434
--
-- OR use the Auth API to create:
-- SELECT * FROM auth.users;  (to check existing users)
--
-- IMPORTANT: After creating the user, they can log in at /admin

-- ============================================================
-- STORAGE SETUP (do this in Supabase Dashboard → Storage)
-- ============================================================
-- Create these 4 buckets as PUBLIC:
-- 1. properties
-- 2. blogs
-- 3. testimonials
-- 4. site-assets
--
-- For each bucket, set policy:
-- Allow public read: SELECT for all
-- Allow authenticated upload: INSERT for authenticated users
-- Allow authenticated delete: DELETE for authenticated users
-- ============================================================
