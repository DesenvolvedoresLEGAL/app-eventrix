-- Migration: 20250804172454_alter_table_tenants_drop_organizer_type_id_column.sql
-- Table: tenants
-- Description: Remove a coluna de organizer type id
-- Author: Gustavo Mota
-- Date: 2025-02-04

BEGIN;
-- Remove a constraint de foreign key, se existir
ALTER TABLE public.tenants
  DROP CONSTRAINT IF EXISTS tenants_organizer_type_id_fkey;

-- Remove a coluna organizer_type_id
ALTER TABLE public.tenants
  DROP COLUMN IF EXISTS organizer_type_id;

COMMIT;

-- ROLLBACK
-- BEGIN;
-- ALTER TABLE public.tenants ADD COLUMN organizer_type_id uuid;
-- ALTER TABLE public.tenants ADD CONSTRAINT tenants_organizer_type_id_fkey
--   FOREIGN KEY (organizer_type_id) REFERENCES public.organizer_types(id);
-- COMMIT;
