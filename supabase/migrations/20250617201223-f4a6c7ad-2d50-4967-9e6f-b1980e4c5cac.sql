
-- First, create the default organizer
INSERT INTO public.event_organizers (id, full_name, main_email, company)
VALUES ('0ce5d7a0-6d92-4502-93cb-946caf74ea53', 'Organizador Padrão', 'default@eventrix.com', 'Eventrix')
ON CONFLICT (id) DO NOTHING;

-- Update all events that might have invalid organizer_id to use the default organizer
UPDATE public.events 
SET organizer_id = '0ce5d7a0-6d92-4502-93cb-946caf74ea53' 
WHERE organizer_id NOT IN (SELECT id FROM public.event_organizers);

-- Now add the foreign key constraint
ALTER TABLE public.events 
ADD CONSTRAINT fk_events_organizer_id 
FOREIGN KEY (organizer_id) REFERENCES public.event_organizers(id) ON DELETE RESTRICT;

-- Remove the default value from organizer_id column
ALTER TABLE public.events ALTER COLUMN organizer_id DROP DEFAULT;

-- Make organizer_id NOT NULL to enforce the relationship
ALTER TABLE public.events ALTER COLUMN organizer_id SET NOT NULL;
