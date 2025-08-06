-- Migration: 20250806193000_create_table_invites.sql
-- Table: invites
-- Description: Cria tabela de convites para fluxo de magic link com índices de apoio.
-- Author: OpenAI ChatGPT
-- Date: 2025-08-06

BEGIN;
  CREATE TABLE public.invites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
    email text NOT NULL,
    role uuid REFERENCES public.user_roles(id) NOT NULL,
    token text UNIQUE NOT NULL,
    status text CHECK (status IN ('pending','accepted','revoked','expired')) DEFAULT 'pending',
    expires_at timestamptz NOT NULL,
    invited_by uuid REFERENCES public.profiles(id),
    accepted_at timestamptz,
    created_at timestamptz DEFAULT now()
  );

  CREATE INDEX idx_invites_tenant_status ON public.invites(tenant_id, status);
  CREATE INDEX idx_invites_email ON public.invites(email);
COMMIT;

-- ROLLBACK
-- DROP INDEX IF EXISTS public.idx_invites_email;
-- DROP INDEX IF EXISTS public.idx_invites_tenant_status;
-- DROP TABLE IF EXISTS public.invites;
-- COMMIT;
