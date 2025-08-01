-- Migration: 20250730195347_alter_table_tenants_create_profile_fk_constraint.sql
-- Table: tenants
-- Description: Criar uma chave estrangeira em tenants para a tabela profiles.
-- Author: Gustavo Mota
-- Date: 30/07/2025

BEGIN;
ALTER TABLE tenants
ADD CONSTRAINT tenants_profile_fkey
FOREIGN KEY (created_by)
REFERENCES profiles(id)
ON DELETE CASCADE
ON UPDATE NO ACTION;
COMMIT;

-- ROLLBACK;
-- ALTER TABLE itens_pedido
-- DROP CONSTRAINT IF EXISTS fk_itens_pedido_pedidos;
-- COMMIT;
