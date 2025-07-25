-- Migration: 20250723205035_seed_organizer_types
-- Descrição: Seed de tipos de organizadores
-- Tabela: organizer_types
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
INSERT INTO organizer_types (code, name, description, sort_order) VALUES
('tradicional', 'Organizador Tradicional', 'Empresas especializadas em organização de eventos corporativos', 1),
('centro_convencoes', 'Centro de Convenções', 'Centros de convenções e espaços para eventos', 2),
('associacao', 'Associação/Entidade', 'Associações profissionais, sindicatos e entidades de classe', 3),
('agencia_eventos', 'Agência de Eventos', 'Agências especializadas em marketing e eventos', 4),
('corporativo', 'Empresa Corporativa', 'Departamentos internos de empresas que organizam seus próprios eventos', 5),
('governo', 'Órgão Público', 'Prefeituras, secretarias e órgãos governamentais', 6),
('startup', 'Startup/Tech', 'Startups e empresas de tecnologia', 7),
('educacional', 'Instituição Educacional', 'Universidades, escolas e instituições de ensino', 8),
('ong', 'ONG/Terceiro Setor', 'ONGs e organizações do terceiro setor', 9);
COMMIT;

--ROLLBACK;
-- DELETE FROM organizer_types WHERE code IN ('tradicional', 'centro_convencoes', 'associacao', 'agencia_eventos', 'corporativo', 'governo', 'startup', 'educacional', 'ong');
-- COMMIT;