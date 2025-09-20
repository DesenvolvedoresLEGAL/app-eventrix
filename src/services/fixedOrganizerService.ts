import { supabase } from '@/integrations/supabase/client';

// Interface que corresponde exatamente às colunas do banco
export interface FixedOrganizerData {
  id: string;
  slug: string;
  cnpj: string | null;
  razao_social: string | null;
  nome_fantasia: string | null;
  email: string | null;
  telefone: string | null;
  whatsapp: string | null;
  cep: string | null;
  endereco: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string | null;
  segmento_id: string | null;
  cor_primaria: string | null;
  cor_secundaria: string | null;
  logo_url: string | null;
  website: string | null;
  descricao: string | null;
  created_at: string;
  updated_at: string;
}

export interface FixedUpdateOrganizerData {
  razao_social?: string;
  nome_fantasia?: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  whatsapp?: string;
  website?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  segmento_id?: string;
  cep?: string;
  cor_primaria?: string;
  cor_secundaria?: string;
  logo_url?: string;
  descricao?: string;
}

class FixedOrganizerService {
  /**
   * Buscar dados da organização atual do usuário
   */
  async getCurrentOrganizer(): Promise<FixedOrganizerData> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      throw new Error(`Erro de autenticação: ${authError.message}`);
    }
    
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    // Primeiro buscar o profile para obter o tenant_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(`Erro ao buscar perfil: ${profileError.message}`);
    }

    if (!profile?.tenant_id) {
      throw new Error('Usuário não está associado a uma organização');
    }

    // Buscar dados do tenant usando apenas as colunas que existem
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', profile.tenant_id)
      .maybeSingle();

    if (error) {
      throw new Error(`Erro ao buscar dados da organização: ${error.message}`);
    }

    if (!data) {
      throw new Error('Dados da organização não encontrados');
    }

    return data as FixedOrganizerData;
  }

  /**
   * Atualizar dados da organização
   */
  async updateOrganizer(updates: FixedUpdateOrganizerData): Promise<FixedOrganizerData> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      throw new Error(`Erro de autenticação: ${authError.message}`);
    }
    
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    // Primeiro buscar o profile para obter o tenant_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(`Erro ao buscar perfil: ${profileError.message}`);
    }

    if (!profile?.tenant_id) {
      throw new Error('Usuário não está associado a uma organização');
    }

    // Atualizar tenant
    const { data, error } = await supabase
      .from('tenants')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.tenant_id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw new Error(`Erro ao atualizar dados: ${error.message}`);
    }

    if (!data) {
      throw new Error('Dados atualizados não retornados');
    }

    return data as FixedOrganizerData;
  }

  /**
   * Buscar estados brasileiros para o select
   */
  async getBrazilianStates() {
    const { data, error } = await supabase
      .from('brazilian_states')
      .select('id, code, name, region, capital')
      .eq('is_active', true)
      .order('name');

    if (error) {
      throw new Error(`Erro ao buscar estados: ${error.message}`);
    }

    return data;
  }

  /**
   * Buscar segmentos de negócio
   */
  async getBusinessSegments() {
    const { data, error } = await supabase
      .from('business_segments')
      .select('id, code, name, descriptions')
      .eq('is_active', true)
      .order('name');

    if (error) {
      throw new Error(`Erro ao buscar segmentos: ${error.message}`);
    }

    return data;
  }
}

export const fixedOrganizerService = new FixedOrganizerService();