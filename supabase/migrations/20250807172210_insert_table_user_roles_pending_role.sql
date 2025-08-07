-- Migration: 20250807172210_insert_table_user_roles_pending_role.sql
-- Table: user_roles
-- Description: Insere cargo pendente a tabela auxiliar de cargos
-- Author: Gustavo Mota
-- Date: 2025-08-08

BEGIN;

INSERT INTO user_roles (
  id,
  code,
  description
) VALUES
  ('e93078e6-d238-43af-a62b-777b267fb427', 'pending', 'Usuário owner com cadastro pendente')
ON CONFLICT (code) DO NOTHING;

COMMIT;

-- ROLLBACK;
-- DELETE FROM user_roles
--  WHERE code IN (
--    'pending'
-- );
-- COMMIT;