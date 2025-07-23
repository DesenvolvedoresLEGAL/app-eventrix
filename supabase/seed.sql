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
	('62b9927d-f351-4ca1-b5a9-5e96e1b23522', 'AC', 'Acre', 'Norte', 'Rio Branco', 'America/Rio_Branco', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('c8730b3b-bdf1-4a8a-98f9-d36ea0d71ccc', 'AP', 'Amapá', 'Norte', 'Macapá', 'America/Belem', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('fbb55fb9-35c9-4e05-b8b9-30a111fa2663', 'AM', 'Amazonas', 'Norte', 'Manaus', 'America/Manaus', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('bdec3d54-aba8-4fef-b880-c8ba9e8284e5', 'PA', 'Pará', 'Norte', 'Belém', 'America/Belem', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('a55beba3-6f98-4fcd-b8e2-8585b2a07ea1', 'RO', 'Rondônia', 'Norte', 'Porto Velho', 'America/Porto_Velho', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('cc9350f3-ebe4-4760-980e-8f28629ea717', 'RR', 'Roraima', 'Norte', 'Boa Vista', 'America/Boa_Vista', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('1a8a8dd8-d4ef-49d5-81a2-6f194397ecc3', 'TO', 'Tocantins', 'Norte', 'Palmas', 'America/Araguaina', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('0e9fced0-2092-40d0-9ba6-b8fa56ea7e59', 'AL', 'Alagoas', 'Nordeste', 'Maceió', 'America/Maceio', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('ce9a5516-8d60-4e67-8b21-1018c2a0f1bb', 'BA', 'Bahia', 'Nordeste', 'Salvador', 'America/Bahia', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('b31fa4f5-96d4-4a9e-aa7b-e7c2b497f4df', 'CE', 'Ceará', 'Nordeste', 'Fortaleza', 'America/Fortaleza', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('b8cab3fa-b873-4708-b186-808a9b99f6d6', 'MA', 'Maranhão', 'Nordeste', 'São Luís', 'America/Fortaleza', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('427fe7da-155b-4677-bda6-a6c66f6d8ad7', 'PB', 'Paraíba', 'Nordeste', 'João Pessoa', 'America/Fortaleza', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('74fd27a3-7909-4990-a60f-073a5fd3b7d8', 'PE', 'Pernambuco', 'Nordeste', 'Recife', 'America/Recife', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('83c19b41-8c96-4446-a075-f61782835177', 'PI', 'Piauí', 'Nordeste', 'Teresina', 'America/Fortaleza', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('a6841b08-3170-437d-83b9-ac62e49cae48', 'RN', 'Rio Grande do Norte', 'Nordeste', 'Natal', 'America/Fortaleza', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('782cf368-598f-44e2-81a4-dfe630654d49', 'SE', 'Sergipe', 'Nordeste', 'Aracaju', 'America/Maceio', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('ac069102-6cd2-4975-8a66-8a43793d31c7', 'GO', 'Goiás', 'Centro-Oeste', 'Goiânia', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('795e4ac3-bfed-4396-966d-d818be8c87b9', 'MT', 'Mato Grosso', 'Centro-Oeste', 'Cuiabá', 'America/Cuiaba', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('94e6e0b3-df31-4f31-875a-e1a0b6601723', 'MS', 'Mato Grosso do Sul', 'Centro-Oeste', 'Campo Grande', 'America/Campo_Grande', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('64cbd6e8-6e00-4f1d-8b74-eef0a9ca3550', 'DF', 'Distrito Federal', 'Centro-Oeste', 'Brasília', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('6071bc34-18a5-49a9-b264-dcb90ac38dfc', 'ES', 'Espírito Santo', 'Sudeste', 'Vitória', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('fb8b3c9e-36f6-4491-a399-849498cc29a4', 'MG', 'Minas Gerais', 'Sudeste', 'Belo Horizonte', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('85194269-114c-4d44-a895-c2a4cfdd80dd', 'RJ', 'Rio de Janeiro', 'Sudeste', 'Rio de Janeiro', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('f366f817-c461-46b4-a7f1-95c2f77b5178', 'SP', 'São Paulo', 'Sudeste', 'São Paulo', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('021c84dc-f12c-473a-a7bf-23e61327b3a4', 'PR', 'Paraná', 'Sul', 'Curitiba', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('8aef10e2-d7f3-4af6-95e7-0b0e586a4d37', 'RS', 'Rio Grande do Sul', 'Sul', 'Porto Alegre', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('c4bad58b-a98d-4d80-8682-9569c671bb3e', 'SC', 'Santa Catarina', 'Sul', 'Florianópolis', 'America/Sao_Paulo', true, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00');


--
-- Data for Name: business_segments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."business_segments" ("id", "code", "name", "description", "icon_name", "is_active", "sort_order", "created_at", "updated_at") VALUES
	('18143b9b-e7ee-47be-83cc-b3f1b7df4a24', 'tecnologia', 'Tecnologia & Inovação', 'Eventos de TI, startups, transformação digital', 'laptop', true, 1, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('35d2c304-28f4-43ca-b91a-29665fa890b8', 'saude', 'Saúde & Medicina', 'Congressos médicos, farmacêutico, equipamentos hospitalares', 'heart-pulse', true, 2, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('6b30e3f8-e4ba-4b7f-b149-3a39be6d85bb', 'beleza', 'Beleza & Estética', 'Cosméticos, estética, cabelo, moda', 'sparkles', true, 3, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('1510ff01-30da-4a86-b08a-314dd8709d50', 'automotivo', 'Automotivo', 'Automóveis, peças, concessionárias', 'car', true, 4, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('792130ea-512a-4131-8a76-10227e1fa6e5', 'alimentacao', 'Alimentação & Bebidas', 'Food service, hortifruti, bebidas, gastronomia', 'utensils', true, 5, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('82a65597-00c2-49b3-8058-97117a7d527c', 'construcao', 'Construção & Arquitetura', 'Construção civil, decoração, móveis', 'building', true, 6, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('9376c475-d276-4652-a5ad-7957873191ab', 'educacao', 'Educação & Treinamento', 'Educacional, cursos, capacitação profissional', 'graduation-cap', true, 7, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('ce2adbc3-c574-4446-946b-68adc140a0c5', 'moda', 'Moda & Têxtil', 'Confecção, calçados, acessórios, design', 'shirt', true, 8, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('f39839ea-0854-4d07-8efe-aea9a5b4dd68', 'energia', 'Energia & Sustentabilidade', 'Energia renovável, meio ambiente, sustentabilidade', 'zap', true, 9, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('87e44259-b2e8-4639-ab40-5e5ae16571f6', 'agronegocio', 'Agronegócio', 'Agropecuária, maquinário agrícola, insumos', 'wheat', true, 10, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('f44cd546-c5b6-47e9-a443-9530ea7c0d28', 'industrial', 'Industrial & Manufatura', 'Indústria, maquinário, metalurgia', 'factory', true, 11, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('132f6247-fa08-4e80-8f97-468fb7d28188', 'financeiro', 'Financeiro & Seguros', 'Bancos, fintechs, seguradoras, investimentos', 'banknote', true, 12, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('35c5c89f-4676-4514-bd80-859c6ba33553', 'varejo', 'Varejo & E-commerce', 'Loja, franquias, marketplace', 'shopping-bag', true, 13, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('45a97257-c489-4895-ae4b-ddd75a4aeeab', 'turismo', 'Turismo & Hospitalidade', 'Hotéis, agências de viagem, entretenimento', 'map-pin', true, 14, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('67557ab9-7b8d-4ccf-8a71-f473c56b0969', 'juridico', 'Jurídico & Compliance', 'Escritórios de advocacia, compliance, auditoria', 'scale', true, 15, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('0313b9c6-209d-418e-94f7-db87f59ed99f', 'marketing', 'Marketing & Publicidade', 'Agências, marketing digital, comunicação', 'megaphone', true, 16, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('f8f3c810-1048-4672-805f-487a8630580a', 'logistica', 'Logística & Transporte', 'Transporte, armazenagem, distribuição', 'truck', true, 17, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('38b020f2-c26d-48ae-89d1-3675372562cd', 'esportes', 'Esportes & Fitness', 'Esportes, academias, suplementos', 'dumbbell', true, 18, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('8db1b867-afc3-483c-9251-01cef3207d23', 'cultura', 'Cultura & Entretenimento', 'Arte, música, teatro, cinema', 'palette', true, 19, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('32d51a74-769d-46ac-97ac-c3279630ae10', 'outros', 'Outros Segmentos', 'Demais segmentos não especificados', 'more-horizontal', true, 99, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00');


--
-- Data for Name: organizer_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."organizer_types" ("id", "code", "name", "description", "is_active", "sort_order", "created_at", "updated_at") VALUES
	('7cce1f2d-6994-42ae-9fd6-1464e6707f7e', 'tradicional', 'Organizador Tradicional', 'Empresas especializadas em organização de eventos corporativos', true, 1, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('c05621c3-e135-495b-aec5-47ee4a91dbbe', 'centro_convencoes', 'Centro de Convenções', 'Centros de convenções e espaços para eventos', true, 2, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('2a59652c-477e-45bf-a055-d194b185125b', 'associacao', 'Associação/Entidade', 'Associações profissionais, sindicatos e entidades de classe', true, 3, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('e34424b8-b1a2-4674-84c7-9a2a2fc0cf61', 'agencia_eventos', 'Agência de Eventos', 'Agências especializadas em marketing e eventos', true, 4, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('1ffd5daa-f364-4df6-b18a-bbc446ea54e8', 'corporativo', 'Empresa Corporativa', 'Departamentos internos de empresas que organizam seus próprios eventos', true, 5, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('4ff8ab80-1de3-42ac-ac39-418b046fd2cc', 'governo', 'Órgão Público', 'Prefeituras, secretarias e órgãos governamentais', true, 6, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('8ac585ef-062e-4038-bfa4-56c5f606c0f6', 'startup', 'Startup/Tech', 'Startups e empresas de tecnologia', true, 7, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('239053f3-c382-49b2-887f-4872dc8f6e7b', 'educacional', 'Instituição Educacional', 'Universidades, escolas e instituições de ensino', true, 8, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('6d4c664a-4406-4bf3-82d4-6cbbfc989732', 'ong', 'ONG/Terceiro Setor', 'ONGs e organizações do terceiro setor', true, 9, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00');


--
-- Data for Name: subscription_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."subscription_plans" ("id", "code", "name", "description", "price_monthly", "price_yearly", "max_events_min", "max_events_max", "max_admins", "max_visitors_min", "max_visitors_max", "max_exhibitors", "support_type", "features", "is_popular", "is_enterprise", "is_active", "sort_order", "created_at", "updated_at") VALUES
	('33573f16-5406-47ac-91ba-bee2c444e4bf', 'start', 'EVENTRIX™ Start', 'Ideal para começar com seus primeiros eventos. Funcionalidades essenciais para pequenas empresas.', 297.00, 2970.00, 1, 3, 2, 100, 500, 20, 'email', '{"pix_payments": true, "basic_reports": true, "basic_support": true, "event_creation": true, "basic_dashboard": true, "email_marketing": true, "basic_credentialing": true, "exhibitor_management": true, "whatsapp_integration": true}', false, false, true, 1, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('6f239cd1-6c68-4286-a5e2-ad087f54df34', 'scale', 'EVENTRIX™ Scale', 'Para empresas em crescimento. Mais eventos, recursos avançados e integrações.', 597.00, 5970.00, 1, 10, 5, 500, 2000, 50, 'email_chat', '{"legalgpt": true, "integrations": true, "custom_reports": true, "custom_branding": true, "priority_support": true, "unlimited_events": false, "advanced_dashboard": true, "advanced_marketing": true, "linkai_matchmaking": true, "facepass_credentialing": true, "advanced_exhibitor_tools": true}', true, false, true, 2, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('4afe54cf-9ac0-48b6-9776-86f7b618812e', 'boom', 'EVENTRIX™ Boom', 'Para grandes organizadores. Eventos ilimitados e todos os recursos premium.', 1197.00, 11970.00, 1, -1, 15, 2000, -1, 200, '24_7_sla', '{"api_access": true, "white_label": true, "linkai_premium": true, "all_integrations": true, "legalgpt_premium": true, "unlimited_events": true, "advanced_facepass": true, "dedicated_support": true, "premium_dashboard": true, "advanced_analytics": true, "custom_integrations": true, "premium_exhibitor_suite": true, "premium_marketing_suite": true}', false, false, true, 3, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('99c9424b-7de7-42bb-8756-d40fe856c987', 'enterprise', 'EVENTRIX™ Enterprise', 'Solução corporativa personalizada com recursos exclusivos e suporte dedicado.', NULL, NULL, 1, -1, 999999, 1, -1, 999999, 'dedicated', '{"sla_guarantee": true, "ai_customization": true, "custom_contracts": true, "custom_development": true, "enterprise_security": true, "enterprise_dashboard": true, "premium_integrations": true, "priority_development": true, "unlimited_everything": true, "dedicated_infrastructure": true, "dedicated_account_manager": true}', false, false, true, 4, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00');


--
-- Data for Name: tenant_statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tenant_statuses" ("id", "code", "name", "description", "color_hex", "is_active", "sort_order", "created_at", "updated_at") VALUES
	('557a2a09-f1be-45a3-a072-d9c53bdc660a', 'trial', 'Trial Ativo', 'Período de avaliação gratuita', '#3B82F6', true, 1, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('d7d9a07e-82fd-41ea-bed3-c02f5e076706', 'aguardando_validacao', 'Aguardando Validação', 'Aguardando validação de documentos', '#F59E0B', true, 2, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('5c5d028f-430f-4ebc-abcb-943e7f183d18', 'ativo', 'Ativo', 'Tenant ativo e funcional', '#10B981', true, 3, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('c373d6b6-0702-4e1c-ab2a-96d0dc2f6cce', 'suspenso', 'Suspenso', 'Temporariamente suspenso', '#EF4444', true, 4, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('63f18fd2-930b-4750-8e16-5bed5d830e77', 'bloqueado', 'Bloqueado', 'Bloqueado por violação de termos', '#DC2626', true, 5, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('171646b0-2fc9-43e9-b40c-9a41d8e11d8b', 'cancelado', 'Cancelado', 'Assinatura cancelada pelo cliente', '#6B7280', true, 6, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00'),
	('8a6db626-4076-4e63-a0d7-4a9a754cd04a', 'inadimplente', 'Inadimplente', 'Pagamento em atraso', '#F97316', true, 7, '2025-07-22 20:54:48.377162+00', '2025-07-22 20:54:48.377162+00');


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
-- Data for Name: tenant_integrations; Type: TABLE DATA; Schema: public; Owner: postgres
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
