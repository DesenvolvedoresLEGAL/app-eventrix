ALTER TABLE public.profiles
ADD COLUMN tenant_id uuid;


ALTER TABLE public.profiles
ADD CONSTRAINT profiles_tenant_id_fkey
FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);
