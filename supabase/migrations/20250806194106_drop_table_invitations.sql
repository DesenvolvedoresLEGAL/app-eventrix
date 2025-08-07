-- Migration: 20250806194106_drop_table_invitations.sql
-- Table: invitations
-- Description: Deleta tabela para gerenciamento de invitations
-- Author: Gustavo Mota
-- Date: 2025-08-05

BEGIN;
DROP TABLE invitations CASCADE;
COMMIT;

-- ROLLBACK
-- CREATE TABLE public.invitations (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   email text NOT NULL,
--   token text NOT NULL,
--   role uuid REFERENCES user_roles(id) NOT NULL,
--   tenant_id uuid NOT NULL REFERENCES public.tenants(id),
--   invited_by uuid NOT NULL REFERENCES public.profiles(id),
--   created_at timestamptz NOT NULL DEFAULT now(),
--   expires_at timestamptz NOT NULL,
--   accepted_at timestamptz
-- );
-- COMMIT;