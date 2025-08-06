-- Migration: 20250805140420_create_table_user_roles.sql
-- Table: user_roles
-- Description: Cria tabela auxiliar para cargos de usuário
-- Author: Gustavo Mota
-- Date: 2025-08-05

BEGIN;
CREATE TABLE user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text
);
COMMIT;

-- ROLLBACK
-- DROP TABLE user_roles CASCADE;
-- COMMIT;