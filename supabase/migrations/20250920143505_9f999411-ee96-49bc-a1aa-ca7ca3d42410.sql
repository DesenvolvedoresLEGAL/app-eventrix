-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  email TEXT,
  whatsapp_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create tenants table for organizer data
CREATE TABLE public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  cnpj TEXT,
  razao_social TEXT,
  nome_fantasia TEXT,
  email TEXT,
  telefone TEXT,
  whatsapp TEXT,
  cep TEXT,
  endereco TEXT,
  numero TEXT,
  complemento TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  segmento_id UUID,
  cor_primaria TEXT,
  cor_secundaria TEXT,
  logo_url TEXT,
  website TEXT,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create brazilian_states table
CREATE TABLE public.brazilian_states (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create business_segments table
CREATE TABLE public.business_segments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user', 'organizer');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role, tenant_id)
);

-- Insert initial data for Brazilian states
INSERT INTO public.brazilian_states (code, name) VALUES
('AC', 'Acre'),
('AL', 'Alagoas'),
('AP', 'Amapá'),
('AM', 'Amazonas'),
('BA', 'Bahia'),
('CE', 'Ceará'),
('DF', 'Distrito Federal'),
('ES', 'Espírito Santo'),
('GO', 'Goiás'),
('MA', 'Maranhão'),
('MT', 'Mato Grosso'),
('MS', 'Mato Grosso do Sul'),
('MG', 'Minas Gerais'),
('PA', 'Pará'),
('PB', 'Paraíba'),
('PR', 'Paraná'),
('PE', 'Pernambuco'),
('PI', 'Piauí'),
('RJ', 'Rio de Janeiro'),
('RN', 'Rio Grande do Norte'),
('RS', 'Rio Grande do Sul'),
('RO', 'Rondônia'),
('RR', 'Roraima'),
('SC', 'Santa Catarina'),
('SP', 'São Paulo'),
('SE', 'Sergipe'),
('TO', 'Tocantins');

-- Insert initial business segments
INSERT INTO public.business_segments (name) VALUES
('Tecnologia'),
('Educação'),
('Saúde'),
('Varejo'),
('Serviços'),
('Indústria'),
('Agronegócio'),
('Consultoria'),
('Marketing'),
('Eventos'),
('Turismo'),
('Alimentação');

-- Create validation functions
CREATE OR REPLACE FUNCTION public.validate_cnpj(cnpj TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  -- Basic CNPJ validation (simplified)
  IF cnpj IS NULL OR LENGTH(REGEXP_REPLACE(cnpj, '[^0-9]', '', 'g')) != 14 THEN
    RETURN false;
  END IF;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_cep(cep TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  -- Basic CEP validation
  IF cep IS NULL OR LENGTH(REGEXP_REPLACE(cep, '[^0-9]', '', 'g')) != 8 THEN
    RETURN false;
  END IF;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_hex_color(color TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  -- Basic hex color validation
  IF color IS NULL OR NOT color ~ '^#[0-9A-Fa-f]{6}$' THEN
    RETURN false;
  END IF;
  RETURN true;
END;
$$;

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brazilian_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for tenants
CREATE POLICY "Users can view their tenant data"
  ON public.tenants FOR SELECT
  USING (
    id IN (
      SELECT tenant_id FROM public.profiles 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their tenant data"
  ON public.tenants FOR UPDATE
  USING (
    id IN (
      SELECT tenant_id FROM public.profiles 
      WHERE user_id = auth.uid()
    )
  );

-- Create RLS policies for brazilian_states (public read)
CREATE POLICY "Anyone can view brazilian states"
  ON public.brazilian_states FOR SELECT
  USING (true);

-- Create RLS policies for business_segments (public read)
CREATE POLICY "Anyone can view business segments"
  ON public.business_segments FOR SELECT
  USING (true);

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add foreign key constraint for tenant_id in profiles
ALTER TABLE public.profiles
ADD CONSTRAINT fk_profiles_tenant_id
FOREIGN KEY (tenant_id) REFERENCES public.tenants(id);

-- Add foreign key constraint for segmento_id in tenants
ALTER TABLE public.tenants
ADD CONSTRAINT fk_tenants_segmento_id
FOREIGN KEY (segmento_id) REFERENCES public.business_segments(id);