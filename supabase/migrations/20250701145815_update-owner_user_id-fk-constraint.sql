ALTER TABLE public.tenants
DROP CONSTRAINT IF EXISTS tenants_owner_user_id_fkey;

ALTER TABLE public.tenants
ADD CONSTRAINT tenants_owner_user_id_fkey
FOREIGN KEY (owner_user_id) REFERENCES public.profiles(auth_user_id);
    