-- 1. REMOVE AS POLÍTICAS ANTIGAS (opcional, caso existam)
DROP POLICY IF EXISTS "Enable all access for admin users" ON public.plans;

DROP POLICY IF EXISTS "Enable create access for all authenticated users" ON public.plans;

DROP POLICY IF EXISTS "Enable users to update their own data only" ON public.plans;

DROP POLICY IF EXISTS "Enable users to view their own data only" ON public.plans;

DROP POLICY IF EXISTS "Enable all access for admin users" ON public.tenants;

DROP POLICY IF EXISTS "Enable create access for all authenticated users" ON public.tenants;

DROP POLICY IF EXISTS "Enable users to update their own data only" ON public.tenants;

DROP POLICY IF EXISTS "Enable users to view their own data only" ON public.tenants;

-- 2. POLÍTICAS PARA TABELA plans (Planos são globais, só admin pode alterar)
CREATE POLICY "Enable all access for admin users" ON public.plans TO authenticated USING (public.is_admin ())
WITH
    CHECK (public.is_admin ());

-- Habilita SELECT para todos autenticados (opcional: todos podem ver os planos disponíveis)
CREATE POLICY "Enable read access for all authenticated users" ON public.plans FOR
SELECT
    TO authenticated USING (true);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS PARA TABELA tenants (Acesso só ao seu próprio tenant)
-- Adiciona owner_user_id ao tenant
ALTER TABLE public.tenants
ADD COLUMN IF NOT EXISTS owner_user_id uuid;

ALTER TABLE public.tenants ADD CONSTRAINT tenants_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.profiles (uuid);

-- Políticas RLS
CREATE POLICY "Enable users to update their own tenant only" ON public.tenants FOR
UPDATE TO authenticated USING (
    public.is_admin ()
    OR owner_user_id = auth.uid ()
);

CREATE POLICY "Enable users to view their own tenant only" ON public.tenants FOR
SELECT
    TO authenticated USING (
        public.is_admin ()
        OR owner_user_id = auth.uid ()
    );

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;