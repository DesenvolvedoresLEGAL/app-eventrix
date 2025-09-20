-- Fix security warnings by setting search_path for validation functions
CREATE OR REPLACE FUNCTION public.validate_cnpj(cnpj TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
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
STABLE
SECURITY DEFINER
SET search_path = public
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
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Basic hex color validation
  IF color IS NULL OR NOT color ~ '^#[0-9A-Fa-f]{6}$' THEN
    RETURN false;
  END IF;
  RETURN true;
END;
$$;

-- Add missing RLS policies for Eventos table
CREATE POLICY "Allow all access to Eventos" 
  ON public."Eventos" 
  FOR ALL 
  USING (true);