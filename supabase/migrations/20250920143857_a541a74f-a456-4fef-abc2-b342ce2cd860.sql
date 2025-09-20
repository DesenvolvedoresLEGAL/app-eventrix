-- Corrigir estrutura do banco de dados para compatibilidade com o código

-- Adicionar coluna role na tabela profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role app_role DEFAULT 'user';

-- Atualizar trigger para incluir role na criação de perfil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, full_name, email, whatsapp_number, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name', 
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email,
    NEW.raw_user_meta_data ->> 'whatsapp_number',
    'user'::app_role
  );
  RETURN NEW;
END;
$$;

-- Criar trigger se não existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Adicionar campos faltantes na tabela brazilian_states
ALTER TABLE public.brazilian_states 
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS capital TEXT;

-- Atualizar dados dos estados brasileiros
UPDATE public.brazilian_states SET region = 'Norte', capital = 'Rio Branco' WHERE code = 'AC';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'Maceió' WHERE code = 'AL';
UPDATE public.brazilian_states SET region = 'Norte', capital = 'Macapá' WHERE code = 'AP';
UPDATE public.brazilian_states SET region = 'Norte', capital = 'Manaus' WHERE code = 'AM';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'Salvador' WHERE code = 'BA';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'Fortaleza' WHERE code = 'CE';
UPDATE public.brazilian_states SET region = 'Centro-Oeste', capital = 'Brasília' WHERE code = 'DF';
UPDATE public.brazilian_states SET region = 'Sudeste', capital = 'Vitória' WHERE code = 'ES';
UPDATE public.brazilian_states SET region = 'Centro-Oeste', capital = 'Goiânia' WHERE code = 'GO';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'São Luís' WHERE code = 'MA';
UPDATE public.brazilian_states SET region = 'Centro-Oeste', capital = 'Cuiabá' WHERE code = 'MT';
UPDATE public.brazilian_states SET region = 'Centro-Oeste', capital = 'Campo Grande' WHERE code = 'MS';
UPDATE public.brazilian_states SET region = 'Sudeste', capital = 'Belo Horizonte' WHERE code = 'MG';
UPDATE public.brazilian_states SET region = 'Norte', capital = 'Belém' WHERE code = 'PA';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'João Pessoa' WHERE code = 'PB';
UPDATE public.brazilian_states SET region = 'Sul', capital = 'Curitiba' WHERE code = 'PR';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'Recife' WHERE code = 'PE';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'Teresina' WHERE code = 'PI';
UPDATE public.brazilian_states SET region = 'Sudeste', capital = 'Rio de Janeiro' WHERE code = 'RJ';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'Natal' WHERE code = 'RN';
UPDATE public.brazilian_states SET region = 'Sul', capital = 'Porto Alegre' WHERE code = 'RS';
UPDATE public.brazilian_states SET region = 'Norte', capital = 'Porto Velho' WHERE code = 'RO';
UPDATE public.brazilian_states SET region = 'Norte', capital = 'Boa Vista' WHERE code = 'RR';
UPDATE public.brazilian_states SET region = 'Sul', capital = 'Florianópolis' WHERE code = 'SC';
UPDATE public.brazilian_states SET region = 'Sudeste', capital = 'São Paulo' WHERE code = 'SP';
UPDATE public.brazilian_states SET region = 'Nordeste', capital = 'Aracaju' WHERE code = 'SE';
UPDATE public.brazilian_states SET region = 'Norte', capital = 'Palmas' WHERE code = 'TO';

-- Adicionar campo descriptions na tabela business_segments
ALTER TABLE public.business_segments 
ADD COLUMN IF NOT EXISTS descriptions TEXT;

-- Atualizar descrições dos segmentos
UPDATE public.business_segments SET descriptions = 'Empresas de desenvolvimento de software, hardware e inovação tecnológica' WHERE name = 'Tecnologia';
UPDATE public.business_segments SET descriptions = 'Instituições de ensino, treinamento e capacitação profissional' WHERE name = 'Educação';
UPDATE public.business_segments SET descriptions = 'Hospitais, clínicas, laboratórios e serviços médicos' WHERE name = 'Saúde';
UPDATE public.business_segments SET descriptions = 'Comércio de produtos e serviços ao consumidor final' WHERE name = 'Varejo';
UPDATE public.business_segments SET descriptions = 'Prestação de serviços diversos para empresas e pessoas físicas' WHERE name = 'Serviços';
UPDATE public.business_segments SET descriptions = 'Produção e manufatura de bens e produtos' WHERE name = 'Indústria';
UPDATE public.business_segments SET descriptions = 'Agricultura, pecuária e atividades do campo' WHERE name = 'Agronegócio';
UPDATE public.business_segments SET descriptions = 'Consultoria empresarial e assessoria especializada' WHERE name = 'Consultoria';
UPDATE public.business_segments SET descriptions = 'Publicidade, propaganda e comunicação' WHERE name = 'Marketing';
UPDATE public.business_segments SET descriptions = 'Organização e produção de eventos' WHERE name = 'Eventos';
UPDATE public.business_segments SET descriptions = 'Turismo, hotelaria e entretenimento' WHERE name = 'Turismo';
UPDATE public.business_segments SET descriptions = 'Restaurantes, bares e food service' WHERE name = 'Alimentação';

-- Adicionar código nos segmentos de negócio
ALTER TABLE public.business_segments 
ADD COLUMN IF NOT EXISTS code TEXT;

UPDATE public.business_segments SET code = 'TECH' WHERE name = 'Tecnologia';
UPDATE public.business_segments SET code = 'EDU' WHERE name = 'Educação';
UPDATE public.business_segments SET code = 'HEALTH' WHERE name = 'Saúde';
UPDATE public.business_segments SET code = 'RETAIL' WHERE name = 'Varejo';
UPDATE public.business_segments SET code = 'SERVICES' WHERE name = 'Serviços';
UPDATE public.business_segments SET code = 'INDUSTRY' WHERE name = 'Indústria';
UPDATE public.business_segments SET code = 'AGRO' WHERE name = 'Agronegócio';
UPDATE public.business_segments SET code = 'CONSULTING' WHERE name = 'Consultoria';
UPDATE public.business_segments SET code = 'MARKETING' WHERE name = 'Marketing';
UPDATE public.business_segments SET code = 'EVENTS' WHERE name = 'Eventos';
UPDATE public.business_segments SET code = 'TOURISM' WHERE name = 'Turismo';
UPDATE public.business_segments SET code = 'FOOD' WHERE name = 'Alimentação';