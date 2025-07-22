create policy "Authenticated users can upload event banners"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'event-banners'::text) AND (auth.role() = 'authenticated'::text)));
create policy "Authenticated users can upload event logos"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'event-logos'::text) AND (auth.role() = 'authenticated'::text)));
create policy "Authenticated users can upload"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = ANY (ARRAY['event-logos'::text, 'event-banners'::text])));
create policy "Public Access for event banners"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'event-banners'::text));
create policy "Public Access for event logos"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'event-logos'::text));
create policy "Public Access"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = ANY (ARRAY['event-logos'::text, 'event-banners'::text])));
create policy "Users can delete their event banner uploads"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'event-banners'::text) AND (auth.role() = 'authenticated'::text)));
create policy "Users can delete their event logo uploads"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'event-logos'::text) AND (auth.role() = 'authenticated'::text)));
create policy "Users can delete their uploads"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = ANY (ARRAY['event-logos'::text, 'event-banners'::text])));
create policy "Users can update their event banner uploads"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'event-banners'::text) AND (auth.role() = 'authenticated'::text)));
create policy "Users can update their event logo uploads"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'event-logos'::text) AND (auth.role() = 'authenticated'::text)));
create policy "Users can update their uploads"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = ANY (ARRAY['event-logos'::text, 'event-banners'::text])));
