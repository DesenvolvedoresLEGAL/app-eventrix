
-- Create storage buckets for event files
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('event-logos', 'event-logos', true),
  ('event-banners', 'event-banners', true);

-- Create policies for public access to the buckets
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id IN ('event-logos', 'event-banners'));

CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id IN ('event-logos', 'event-banners'));

CREATE POLICY "Users can update their uploads" ON storage.objects
FOR UPDATE USING (bucket_id IN ('event-logos', 'event-banners'));

CREATE POLICY "Users can delete their uploads" ON storage.objects
FOR DELETE USING (bucket_id IN ('event-logos', 'event-banners'));
