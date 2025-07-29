-- Migration: 20250729113602_create_table_profiles.sql
-- Table: profiles
-- Decription: Cria a tebela de profiles no banco de dados.
-- Author: Gustavo Mota
-- Date: 29/07/2025

BEGIN;
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,                                                     -- PK vindo de auth.users
  first_name character varying(100) NOT NULL,                                 -- primeiro nome
  last_name character varying(100) NOT NULL,                                 -- ultimo nome
  full_name character varying(200) NOT NULL DEFAULT '',
  email character varying(255) NOT NULL,
  whatsapp_number character varying(20) null,
  is_active boolean NOT NULL DEFAULT true,                              -- flag de usuário ativo
  created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP, -- carimbo de criação
  updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP, -- carimbo de atualização
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_auth_id_fkey FOREIGN KEY (id)
    REFERENCES auth.users(id) ON DELETE CASCADE
);
COMMIT;

-- ROLLBACK;
-- DROP TABLE IF EXISTS public.profiles CASCADE;
-- COMMIT;