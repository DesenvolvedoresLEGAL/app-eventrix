-- Migration: 20250723205055_seed_business_segments
-- Descrição: Seed de segmentos de negócios
-- Tabela: business_segments
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
INSERT INTO business_segments (code, name, description, icon_name, sort_order) VALUES
('tecnologia', 'Tecnologia & Inovação', 'Eventos de TI, startups, transformação digital', 'laptop', 1),
('saude', 'Saúde & Medicina', 'Congressos médicos, farmacêutico, equipamentos hospitalares', 'heart-pulse', 2),
('beleza', 'Beleza & Estética', 'Cosméticos, estética, cabelo, moda', 'sparkles', 3),
('automotivo', 'Automotivo', 'Automóveis, peças, concessionárias', 'car', 4),
('alimentacao', 'Alimentação & Bebidas', 'Food service, hortifruti, bebidas, gastronomia', 'utensils', 5),
('construcao', 'Construção & Arquitetura', 'Construção civil, decoração, móveis', 'building', 6),
('educacao', 'Educação & Treinamento', 'Educacional, cursos, capacitação profissional', 'graduation-cap', 7),
('moda', 'Moda & Têxtil', 'Confecção, calçados, acessórios, design', 'shirt', 8),
('energia', 'Energia & Sustentabilidade', 'Energia renovável, meio ambiente, sustentabilidade', 'zap', 9),
('agronegocio', 'Agronegócio', 'Agropecuária, maquinário agrícola, insumos', 'wheat', 10),
('industrial', 'Industrial & Manufatura', 'Indústria, maquinário, metalurgia', 'factory', 11),
('financeiro', 'Financeiro & Seguros', 'Bancos, fintechs, seguradoras, investimentos', 'banknote', 12),
('varejo', 'Varejo & E-commerce', 'Loja, franquias, marketplace', 'shopping-bag', 13),
('turismo', 'Turismo & Hospitalidade', 'Hotéis, agências de viagem, entretenimento', 'map-pin', 14),
('juridico', 'Jurídico & Compliance', 'Escritórios de advocacia, compliance, auditoria', 'scale', 15),
('marketing', 'Marketing & Publicidade', 'Agências, marketing digital, comunicação', 'megaphone', 16),
('logistica', 'Logística & Transporte', 'Transporte, armazenagem, distribuição', 'truck', 17),
('esportes', 'Esportes & Fitness', 'Esportes, academias, suplementos', 'dumbbell', 18),
('cultura', 'Cultura & Entretenimento', 'Arte, música, teatro, cinema', 'palette', 19),
('outros', 'Outros Segmentos', 'Demais segmentos não especificados', 'more-horizontal', 99);
COMMIT;

--ROLLBACK;
-- DELETE FROM business_segments WHERE code IN ('tecnologia', 'saude', 'beleza', 'automotivo', 'alimentacao', 'construcao', 'educacao', 'moda', 'energia', 'agronegocio', 'industrial', 'financeiro', 'varejo', 'turismo', 'juridico', 'marketing', 'logistica', 'esportes', 'cultura', 'outros');
-- COMMIT;