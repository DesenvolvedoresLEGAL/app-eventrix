SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: brazilian_states; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."brazilian_states" ("id", "code", "name", "region", "capital", "timezone", "is_active", "created_at", "updated_at") VALUES
	('dba2a358-92eb-4009-bac7-5c99c68c4e9a', 'AC', 'Acre', 'Norte', 'Rio Branco', 'America/Rio_Branco', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('70d32ad1-87a9-4bac-b54a-0fbfa5db2e66', 'AP', 'Amapá', 'Norte', 'Macapá', 'America/Belem', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('4f8f0d9e-48f5-4f95-b4c7-11bba903c0dd', 'AM', 'Amazonas', 'Norte', 'Manaus', 'America/Manaus', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('5cc656e4-b773-4df2-b2de-b2b892a5a758', 'PA', 'Pará', 'Norte', 'Belém', 'America/Belem', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('d9dded24-4d8a-4c03-a8a2-b92fea933535', 'RO', 'Rondônia', 'Norte', 'Porto Velho', 'America/Porto_Velho', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('2271989a-76a0-4306-bf08-c06e763d2356', 'RR', 'Roraima', 'Norte', 'Boa Vista', 'America/Boa_Vista', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('2439d875-ff37-4777-aa8d-66f0cba1a15e', 'TO', 'Tocantins', 'Norte', 'Palmas', 'America/Araguaina', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('e7d12d99-6f60-487b-a16a-4e2ed93a0ee7', 'AL', 'Alagoas', 'Nordeste', 'Maceió', 'America/Maceio', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('c81b2d27-2865-43f8-ad6b-c85417b97cef', 'BA', 'Bahia', 'Nordeste', 'Salvador', 'America/Bahia', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('91f747d0-7492-4638-920c-c206f09aeafc', 'CE', 'Ceará', 'Nordeste', 'Fortaleza', 'America/Fortaleza', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('825cee56-9828-4e15-b3e8-4fafb9e27405', 'MA', 'Maranhão', 'Nordeste', 'São Luís', 'America/Fortaleza', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('a65fd71a-13fd-4052-90cb-c1dce60f0b62', 'PB', 'Paraíba', 'Nordeste', 'João Pessoa', 'America/Fortaleza', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('f793f069-01a6-4282-a745-59d701f08ceb', 'PE', 'Pernambuco', 'Nordeste', 'Recife', 'America/Recife', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('7e303a24-64dd-42a0-ab0d-bfb8312faa0c', 'PI', 'Piauí', 'Nordeste', 'Teresina', 'America/Fortaleza', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('cf361918-2200-4f48-bd49-77363ff4b02e', 'RN', 'Rio Grande do Norte', 'Nordeste', 'Natal', 'America/Fortaleza', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('f07c7687-4b9c-4832-8824-f7a900adc657', 'SE', 'Sergipe', 'Nordeste', 'Aracaju', 'America/Maceio', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('5ef86abf-6197-4ddc-b090-79acc22fb438', 'GO', 'Goiás', 'Centro-Oeste', 'Goiânia', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('c3983733-7775-4bc6-b2ec-44dbf679d490', 'MT', 'Mato Grosso', 'Centro-Oeste', 'Cuiabá', 'America/Cuiaba', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('c684d710-50c9-4f3b-ab9e-5c81d5f1b87c', 'MS', 'Mato Grosso do Sul', 'Centro-Oeste', 'Campo Grande', 'America/Campo_Grande', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('7c33cc17-1dc5-4d8a-ad02-defb4f96df25', 'DF', 'Distrito Federal', 'Centro-Oeste', 'Brasília', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('d6f90087-b476-4043-a0e8-c81ab636ef45', 'ES', 'Espírito Santo', 'Sudeste', 'Vitória', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('780858a9-da4a-453b-8b5e-bf77717999a5', 'MG', 'Minas Gerais', 'Sudeste', 'Belo Horizonte', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('479d9797-aed8-4a8f-938c-08a624d043ed', 'RJ', 'Rio de Janeiro', 'Sudeste', 'Rio de Janeiro', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('c45a414a-c4cd-4c56-bd63-c4a5b6038c08', 'SP', 'São Paulo', 'Sudeste', 'São Paulo', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('294e6ec0-f414-44a3-b31f-33f86be551a6', 'PR', 'Paraná', 'Sul', 'Curitiba', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('8aaf2f13-51a7-4f64-a0a3-2927d0b70306', 'RS', 'Rio Grande do Sul', 'Sul', 'Porto Alegre', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00'),
	('c984e04b-829d-4bc9-a33c-278cecd3f26c', 'SC', 'Santa Catarina', 'Sul', 'Florianópolis', 'America/Sao_Paulo', true, '2025-07-30 18:54:16.38651+00', '2025-07-30 18:54:16.38651+00');


--
-- Data for Name: business_segments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."business_segments" ("id", "code", "name", "description", "icon_name", "is_active", "sort_order", "created_at", "updated_at") VALUES
	('0957bda7-3354-400c-b927-f9906fea0214', 'tecnologia', 'Tecnologia & Inovação', 'Eventos de TI, startups, transformação digital', 'laptop', true, 1, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('3402a89e-e734-4c56-9bfd-c6675b4ac7ae', 'saude', 'Saúde & Medicina', 'Congressos médicos, farmacêutico, equipamentos hospitalares', 'heart-pulse', true, 2, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('0b6cd9a1-a7ea-4f28-920e-fb2aa9d6a23f', 'beleza', 'Beleza & Estética', 'Cosméticos, estética, cabelo, moda', 'sparkles', true, 3, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('713ad3c0-e703-4d18-996f-6addbf1a2c51', 'automotivo', 'Automotivo', 'Automóveis, peças, concessionárias', 'car', true, 4, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('af7ceef7-c1de-4103-b996-94ea522137d7', 'alimentacao', 'Alimentação & Bebidas', 'Food service, hortifruti, bebidas, gastronomia', 'utensils', true, 5, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('7206b22d-691c-4951-88b8-14ecc8b2416b', 'construcao', 'Construção & Arquitetura', 'Construção civil, decoração, móveis', 'building', true, 6, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('3279626b-e75f-4694-9882-3b7b25b95c87', 'educacao', 'Educação & Treinamento', 'Educacional, cursos, capacitação profissional', 'graduation-cap', true, 7, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('f2a19514-3f1e-4c77-982b-ffe9a0979388', 'moda', 'Moda & Têxtil', 'Confecção, calçados, acessórios, design', 'shirt', true, 8, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('f06df925-ac85-4a3b-bcc5-d8c7cc6ea41d', 'energia', 'Energia & Sustentabilidade', 'Energia renovável, meio ambiente, sustentabilidade', 'zap', true, 9, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('0fae559f-a7b8-400e-a9b3-de50b54b055f', 'agronegocio', 'Agronegócio', 'Agropecuária, maquinário agrícola, insumos', 'wheat', true, 10, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('14251717-6537-4bc5-b009-4e1674987c85', 'industrial', 'Industrial & Manufatura', 'Indústria, maquinário, metalurgia', 'factory', true, 11, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('0ccaa570-a7ef-410e-89b5-c3545da82ae1', 'financeiro', 'Financeiro & Seguros', 'Bancos, fintechs, seguradoras, investimentos', 'banknote', true, 12, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('bcd9d0ac-2b60-486e-b278-dbfcf0dd60d3', 'varejo', 'Varejo & E-commerce', 'Loja, franquias, marketplace', 'shopping-bag', true, 13, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('5127126d-0b75-460e-bbb0-c0d5ddd7f02d', 'turismo', 'Turismo & Hospitalidade', 'Hotéis, agências de viagem, entretenimento', 'map-pin', true, 14, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('15753dd9-d275-4d79-bce9-601994848760', 'juridico', 'Jurídico & Compliance', 'Escritórios de advocacia, compliance, auditoria', 'scale', true, 15, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('a6d4a55d-45df-4048-a28d-e1c47484609b', 'marketing', 'Marketing & Publicidade', 'Agências, marketing digital, comunicação', 'megaphone', true, 16, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('ca4198fd-0aec-4944-b3b0-ff1e2262a340', 'logistica', 'Logística & Transporte', 'Transporte, armazenagem, distribuição', 'truck', true, 17, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('5db7bec0-50f1-44d5-9cf3-0cb01844b2bd', 'esportes', 'Esportes & Fitness', 'Esportes, academias, suplementos', 'dumbbell', true, 18, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('88509481-5760-4f90-bb20-86090de80d6a', 'cultura', 'Cultura & Entretenimento', 'Arte, música, teatro, cinema', 'palette', true, 19, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00'),
	('ca66ff5e-aec8-40d5-9f65-03b870ec5b8e', 'outros', 'Outros Segmentos', 'Demais segmentos não especificados', 'more-horizontal', true, 99, '2025-07-30 18:54:16.317733+00', '2025-07-30 18:54:16.317733+00');


--
-- Data for Name: organizer_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organizer_types" ("id", "code", "name", "description", "is_active", "sort_order", "created_at", "updated_at") VALUES
	('403cdd8b-97c3-4b2d-8465-648f23457a2b', 'tradicional', 'Organizador Tradicional', 'Empresas especializadas em organização de eventos corporativos', true, 1, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00'),
	('4fbafe03-607c-4cd7-87ae-4a2c74853a4d', 'centro_convencoes', 'Centro de Convenções', 'Centros de convenções e espaços para eventos', true, 2, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00'),
	('65040698-5265-4132-8c7a-5c5ab536c5ab', 'associacao', 'Associação/Entidade', 'Associações profissionais, sindicatos e entidades de classe', true, 3, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00'),
	('117268ac-f51b-4bc1-8c7e-6e4d7ceba054', 'agencia_eventos', 'Agência de Eventos', 'Agências especializadas em marketing e eventos', true, 4, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00'),
	('ec757a38-974a-434d-9ca1-59968f0af0c1', 'corporativo', 'Empresa Corporativa', 'Departamentos internos de empresas que organizam seus próprios eventos', true, 5, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00'),
	('45affab0-24d9-4a16-a89a-66e60be2584c', 'governo', 'Órgão Público', 'Prefeituras, secretarias e órgãos governamentais', true, 6, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00'),
	('834748f7-0564-4aa6-9c6e-2e144958c239', 'startup', 'Startup/Tech', 'Startups e empresas de tecnologia', true, 7, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00'),
	('21b6aabf-dd22-4f93-a9e0-1687de8f13da', 'educacional', 'Instituição Educacional', 'Universidades, escolas e instituições de ensino', true, 8, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00'),
	('6fcd8f07-68f7-4051-ab4c-76090641c212', 'ong', 'ONG/Terceiro Setor', 'ONGs e organizações do terceiro setor', true, 9, '2025-07-30 18:54:16.269354+00', '2025-07-30 18:54:16.269354+00');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."subscription_plans" ("id", "code", "name", "description", "price_monthly", "price_yearly", "max_events_min", "max_events_max", "max_admins", "max_visitors_min", "max_visitors_max", "max_exhibitors", "support_type", "features", "is_popular", "is_enterprise", "is_active", "sort_order", "created_at", "updated_at") VALUES
	('af2b9ce3-15f1-42da-ac2d-808d23776af8', 'trial', 'EVENTRIX™ Trial', 'Sete dias de amostra para você ver que o EVENTRIX É para o seu negócio.', 0.01, 0.01, 1, 1, 1, 50, 200, 5, 'email', '{"pix_payments": false, "basic_reports": false, "basic_support": false, "event_creation": true, "basic_dashboard": true, "email_marketing": false, "basic_credentialing": false, "exhibitor_management": false, "whatsapp_integration": false}', false, false, true, 1, '2025-07-30 18:54:16.333976+00', '2025-07-30 18:54:16.333976+00'),
	('d65388bf-070d-4efb-be9c-d75451b14a66', 'start', 'EVENTRIX™ Start', 'Ideal para começar com seus primeiros eventos. Funcionalidades essenciais para pequenas empresas.', 297.00, 2970.00, 1, 3, 2, 100, 500, 20, 'email', '{"pix_payments": true, "basic_reports": true, "basic_support": true, "event_creation": true, "basic_dashboard": true, "email_marketing": true, "basic_credentialing": true, "exhibitor_management": true, "whatsapp_integration": true}', false, false, true, 1, '2025-07-30 18:54:16.333976+00', '2025-07-30 18:54:16.333976+00'),
	('46815538-a3ef-450c-b454-921ba2ee7deb', 'scale', 'EVENTRIX™ Scale', 'Para empresas em crescimento. Mais eventos, recursos avançados e integrações.', 597.00, 5970.00, 1, 10, 5, 500, 2000, 50, 'email_chat', '{"legalgpt": true, "integrations": true, "custom_reports": true, "custom_branding": true, "priority_support": true, "unlimited_events": false, "advanced_dashboard": true, "advanced_marketing": true, "linkai_matchmaking": true, "facepass_credentialing": true, "advanced_exhibitor_tools": true}', true, false, true, 2, '2025-07-30 18:54:16.333976+00', '2025-07-30 18:54:16.333976+00'),
	('b25703f9-78ca-4faa-b1c4-af8b2618d8fc', 'boom', 'EVENTRIX™ Boom', 'Para grandes organizadores. Eventos ilimitados e todos os recursos premium.', 1197.00, 11970.00, 1, -1, 15, 2000, -1, 200, '24_7_sla', '{"api_access": true, "white_label": true, "linkai_premium": true, "all_integrations": true, "legalgpt_premium": true, "unlimited_events": true, "advanced_facepass": true, "dedicated_support": true, "premium_dashboard": true, "advanced_analytics": true, "custom_integrations": true, "premium_exhibitor_suite": true, "premium_marketing_suite": true}', false, false, true, 3, '2025-07-30 18:54:16.333976+00', '2025-07-30 18:54:16.333976+00'),
	('de31fce9-9b16-4064-925c-fde01858a70c', 'enterprise', 'EVENTRIX™ Enterprise', 'Solução corporativa personalizada com recursos exclusivos e suporte dedicado.', NULL, NULL, 1, -1, 999999, 1, -1, 999999, 'dedicated', '{"sla_guarantee": true, "ai_customization": true, "custom_contracts": true, "custom_development": true, "enterprise_security": true, "enterprise_dashboard": true, "premium_integrations": true, "priority_development": true, "unlimited_everything": true, "dedicated_infrastructure": true, "dedicated_account_manager": true}', false, false, true, 4, '2025-07-30 18:54:16.333976+00', '2025-07-30 18:54:16.333976+00');


--
-- Data for Name: tenant_statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tenant_statuses" ("id", "code", "name", "description", "color_hex", "is_active", "sort_order", "created_at", "updated_at") VALUES
	('c2840784-503b-441d-ba8c-5c978e2d904f', 'trial', 'Trial Ativo', 'Período de avaliação gratuita', '#3B82F6', true, 1, '2025-07-30 18:54:16.373091+00', '2025-07-30 18:54:16.373091+00'),
	('588a7e06-6b31-4651-9f38-cf1d1f95fa97', 'aguardando_validacao', 'Aguardando Validação', 'Aguardando validação de documentos', '#F59E0B', true, 2, '2025-07-30 18:54:16.373091+00', '2025-07-30 18:54:16.373091+00'),
	('45ef80b0-57ae-4dfc-8736-8f75f8bc4df3', 'ativo', 'Ativo', 'Tenant ativo e funcional', '#10B981', true, 3, '2025-07-30 18:54:16.373091+00', '2025-07-30 18:54:16.373091+00'),
	('0cd20207-145a-40ea-b544-ee149e762f72', 'suspenso', 'Suspenso', 'Temporariamente suspenso', '#EF4444', true, 4, '2025-07-30 18:54:16.373091+00', '2025-07-30 18:54:16.373091+00'),
	('328382b0-bd28-4d51-8bed-a35e927574de', 'bloqueado', 'Bloqueado', 'Bloqueado por violação de termos', '#DC2626', true, 5, '2025-07-30 18:54:16.373091+00', '2025-07-30 18:54:16.373091+00'),
	('708f8851-3565-4f57-93fb-7dfe423c3bde', 'cancelado', 'Cancelado', 'Assinatura cancelada pelo cliente', '#6B7280', true, 6, '2025-07-30 18:54:16.373091+00', '2025-07-30 18:54:16.373091+00'),
	('3ac65fe2-555f-4f9c-8bc4-1521d2b42850', 'inadimplente', 'Inadimplente', 'Pagamento em atraso', '#F97316', true, 7, '2025-07-30 18:54:16.373091+00', '2025-07-30 18:54:16.373091+00');


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tenant_audit_log; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tenant_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tenant_plan_history; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tenant_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tenant_usage_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
