-- Migration: 20250723181107_drop_legacy_public_enums.sql
-- Descrição: Remove os tipos ENUM criados no schema public antes da refatoração do banco de dados.
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;

DROP TYPE IF EXISTS event_category_enum;
DROP TYPE IF EXISTS event_status_enum;
DROP TYPE IF EXISTS font_style_enum;
DROP TYPE IF EXISTS staff_status_enum;
DROP TYPE IF EXISTS user_role;

COMMIT;

-- ROLLBACK (recria os enums):
-- BEGIN;
-- CREATE TYPE event_category_enum AS ENUM ('conferencia', 'workshop', 'seminario', 'feira/exposicao', 'festival', 'congresso', 'treinamento', 'lancamento de produto', 'networking', 'webinar', 'outro');
-- CREATE TYPE event_status_enum AS ENUM ('upcoming', 'in_progress', 'completed');
-- CREATE TYPE font_style_enum AS ENUM ('sans-serif', 'roboto', 'montserrat', 'open_sans', 'lato', 'nunito', 'serif', 'script', 'monospace');
-- CREATE TYPE staff_status_enum AS ENUM ('Ativo', 'Inativo', 'Suspenso');
-- CREATE TYPE user_role AS ENUM ('admin', 'organizer', 'exhibitors', 'staff');
-- COMMIT;
