
-- Create storage buckets for event files if they don't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('event-logos', 'event-logos', true),
  ('event-banners', 'event-banners', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for public access to the buckets
CREATE POLICY "Public Access for event logos" ON storage.objects
FOR SELECT USING (bucket_id = 'event-logos');

CREATE POLICY "Public Access for event banners" ON storage.objects
FOR SELECT USING (bucket_id = 'event-banners');

CREATE POLICY "Authenticated users can upload event logos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'event-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload event banners" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'event-banners' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their event logo uploads" ON storage.objects
FOR UPDATE USING (bucket_id = 'event-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their event banner uploads" ON storage.objects
FOR UPDATE USING (bucket_id = 'event-banners' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their event logo uploads" ON storage.objects
FOR DELETE USING (bucket_id = 'event-logos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their event banner uploads" ON storage.objects
FOR DELETE USING (bucket_id = 'event-banners' AND auth.role() = 'authenticated');
