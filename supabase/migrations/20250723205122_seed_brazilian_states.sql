-- Migration: 20250723205122_seed_brazilian_states.sql
-- Descrição: Seed de estados brasileiros
-- Tabela: brazilian_states
-- Autor: Gustavo Mota
-- Data: 23/07/2025

BEGIN;
INSERT INTO brazilian_states (code, name, region, capital, timezone) VALUES
-- Região Norte
('AC', 'Acre', 'Norte', 'Rio Branco', 'America/Rio_Branco'),
('AP', 'Amapá', 'Norte', 'Macapá', 'America/Belem'),
('AM', 'Amazonas', 'Norte', 'Manaus', 'America/Manaus'),
('PA', 'Pará', 'Norte', 'Belém', 'America/Belem'),
('RO', 'Rondônia', 'Norte', 'Porto Velho', 'America/Porto_Velho'),
('RR', 'Roraima', 'Norte', 'Boa Vista', 'America/Boa_Vista'),
('TO', 'Tocantins', 'Norte', 'Palmas', 'America/Araguaina'),

-- Região Nordeste
('AL', 'Alagoas', 'Nordeste', 'Maceió', 'America/Maceio'),
('BA', 'Bahia', 'Nordeste', 'Salvador', 'America/Bahia'),
('CE', 'Ceará', 'Nordeste', 'Fortaleza', 'America/Fortaleza'),
('MA', 'Maranhão', 'Nordeste', 'São Luís', 'America/Fortaleza'),
('PB', 'Paraíba', 'Nordeste', 'João Pessoa', 'America/Fortaleza'),
('PE', 'Pernambuco', 'Nordeste', 'Recife', 'America/Recife'),
('PI', 'Piauí', 'Nordeste', 'Teresina', 'America/Fortaleza'),
('RN', 'Rio Grande do Norte', 'Nordeste', 'Natal', 'America/Fortaleza'),
('SE', 'Sergipe', 'Nordeste', 'Aracaju', 'America/Maceio'),

-- Região Centro-Oeste
('GO', 'Goiás', 'Centro-Oeste', 'Goiânia', 'America/Sao_Paulo'),
('MT', 'Mato Grosso', 'Centro-Oeste', 'Cuiabá', 'America/Cuiaba'),
('MS', 'Mato Grosso do Sul', 'Centro-Oeste', 'Campo Grande', 'America/Campo_Grande'),
('DF', 'Distrito Federal', 'Centro-Oeste', 'Brasília', 'America/Sao_Paulo'),

-- Região Sudeste
('ES', 'Espírito Santo', 'Sudeste', 'Vitória', 'America/Sao_Paulo'),
('MG', 'Minas Gerais', 'Sudeste', 'Belo Horizonte', 'America/Sao_Paulo'),
('RJ', 'Rio de Janeiro', 'Sudeste', 'Rio de Janeiro', 'America/Sao_Paulo'),
('SP', 'São Paulo', 'Sudeste', 'São Paulo', 'America/Sao_Paulo'),

-- Região Sul
('PR', 'Paraná', 'Sul', 'Curitiba', 'America/Sao_Paulo'),
('RS', 'Rio Grande do Sul', 'Sul', 'Porto Alegre', 'America/Sao_Paulo'),
('SC', 'Santa Catarina', 'Sul', 'Florianópolis', 'America/Sao_Paulo');
COMMIT;

--ROLLBACK;
-- DELETE FROM brazilian_states WHERE code IN ('AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO', 'AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE', 'GO', 'MT', 'MS', 'DF', 'ES', 'MG', 'RJ', 'SP', 'PR', 'RS', 'SC');
-- COMMIT;