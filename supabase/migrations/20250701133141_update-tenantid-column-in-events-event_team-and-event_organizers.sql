ALTER TABLE public.events
ADD CONSTRAINT profiles_tenant_id_fkey
FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);

ALTER TABLE public.event_team
ADD CONSTRAINT profiles_tenant_id_fkey
FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);

ALTER TABLE public.event_organizers
ADD CONSTRAINT profiles_tenant_id_fkey
FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
