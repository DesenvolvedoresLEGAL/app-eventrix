-- Migration: 20250805141132_insert_into_user_roles_basic_roles.sql
-- Table: user_roles
-- Description: Insere valores na tabela auxiliar de cargos de usuário
-- Author: Gustavo Mota
-- Date: 2025-08-05

BEGIN;
INSERT INTO user_roles VALUES ('4d2dfd28-07da-419b-9f36-6eb10eafacdb', 'owner','Dono da instituição'),('4d2867f8-8ea9-4799-b403-9e54ced7e1b8', 'admin','Administrador'),('ff710068-86e7-40a9-b5d0-12f76cf6a4b3', 'member','Usuário comum');
COMMIT;

-- ROLLBACK
-- DELETE FROM user_roles
-- WHERE code IN ('owner','admin','member');
-- COMMIT;