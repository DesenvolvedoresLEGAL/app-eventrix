-- Migration: 20250806191236_alter_table_invitations_add_column_status.sql
-- Table: invitations
-- Description: Atualiza tabela de gerenciamento de convites adicionando coluna de status faltante.
-- Author: Gustavo Mota
-- Date: 2025-08-06

BEGIN;
  -- 1) Adicionar coluna de status com check e default
  ALTER TABLE public.invitations
    ADD COLUMN status text
      CHECK (status IN ('pending','accepted','revoked','expired'))
      DEFAULT 'pending';

  -- 2) Tornar token único
  ALTER TABLE public.invitations
    ADD CONSTRAINT invitations_token_unique UNIQUE (token);
COMMIT;


-- ROLLBACK
-- ALTER TABLE public.invitations
-- DROP CONSTRAINT IF EXISTS invitations_token_unique;

-- ALTER TABLE public.invitations
-- DROP COLUMN IF EXISTS status;
-- COMMIT;