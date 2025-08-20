import { supabase } from '@/integrations/supabase/client';

export interface OrganizerData {
  id: string;
  slug: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;
  inscricao_estadual: string | null;
  cnae_principal: string | null;
  contact_email: string;
  contact_phone: string | null;
  whatsapp_number: string | null;
  website_url: string | null;
  endereco_logradouro: string;
  endereco_numero: string | null;
  endereco_complemento: string | null;
  endereco_bairro: string;
  endereco_cidade: string;
  cep: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  logo_url: string | null;
  favicon_url: string | null;
  timezone: string;
  locale: string;
  plan_id: string;
  status_id: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateOrganizerData {
  razao_social?: string;
  nome_fantasia?: string;
  cnpj?: string;
  inscricao_estadual?: string;
  cnae_principal?: string;
  contact_email?: string;
  contact_phone?: string;
  whatsapp_number?: string;
  website_url?: string;
  endereco_logradouro?: string;
  endereco_numero?: string;
  endereco_complemento?: string;
  endereco_bairro?: string;
  endereco_cidade?: string;
  cep?: string;
  state_id?: string;
  primary_segment_id?: string;
  primary_color?: string;
  secondary_color?: string;
  font_family?: string;
}

class OrganizerService {
  /**
   * Buscar dados da organização atual do usuário
   */
  async getCurrentOrganizer(): Promise<OrganizerData> {
    console.log('organizerService.getCurrentOrganizer: Iniciando busca...');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log('organizerService.getCurrentOrganizer: Auth result', { 
      hasUser: !!user, 
      userId: user?.id,
      authError: authError?.message 
    });
    
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
      .eq('id', user.id)
      .single();

    if (profileError) {
      throw new Error(`Erro ao buscar perfil: ${profileError.message}`);
    }

    if (!profile?.tenant_id) {
      throw new Error('Usuário não está associado a uma organização');
    }

    // Buscar dados do tenant
    const { data, error } = await supabase
      .from('tenants')
      .select(`
        id,
        slug,
        cnpj,
        razao_social,
        nome_fantasia,
        inscricao_estadual,
        cnae_principal,
        contact_email,
        contact_phone,
        whatsapp_number,
        website_url,
        endereco_logradouro,
        endereco_numero,
        endereco_complemento,
        endereco_bairro,
        endereco_cidade,
        cep,
        primary_color,
        secondary_color,
        font_family,
        logo_url,
        favicon_url,
        timezone,
        locale,
        plan_id,
        status_id,
        created_at,
        updated_at
      `)
      .eq('id', profile.tenant_id)
      .single();

    if (error) {
      throw new Error(`Erro ao buscar dados da organização: ${error.message}`);
    }

    if (!data) {
      throw new Error('Dados da organização não encontrados');
    }

    return data as OrganizerData;
  }

  /**
   * Atualizar dados da organização
   */
  async updateOrganizer(updates: UpdateOrganizerData): Promise<OrganizerData> {
    console.log('organizerService.updateOrganizer: Iniciando atualização...', { updates });
    
    // Verificar sessão atual primeiro
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    console.log('organizerService.updateOrganizer: Session check', {
      hasSession: !!session,
      sessionExpiry: session?.expires_at,
      currentTime: Math.floor(Date.now() / 1000),
      sessionError: sessionError?.message
    });
    
    if (sessionError) {
      throw new Error(`Erro ao verificar sessão: ${sessionError.message}`);
    }
    
    if (!session) {
      throw new Error('Sessão não encontrada - faça login novamente');
    }
    
    // Verificar se a sessão não expirou
    if (session.expires_at && session.expires_at < Math.floor(Date.now() / 1000)) {
      throw new Error('Sessão expirada - faça login novamente');
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log('organizerService.updateOrganizer: Auth result', { 
      hasUser: !!user, 
      userId: user?.id,
      authError: authError?.message 
    });
    
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
      .eq('id', user.id)
      .single();

    if (profileError) {
      throw new Error(`Erro ao buscar perfil: ${profileError.message}`);
    }

    if (!profile?.tenant_id) {
      throw new Error('Usuário não está associado a uma organização');
    }

    // Validar CNPJ se fornecido
    if (updates.cnpj) {
      const { data: isValidCnpj, error: cnpjError } = await supabase
        .rpc('validate_cnpj', { cnpj_input: updates.cnpj });

      if (cnpjError) {
        throw new Error(`Erro ao validar CNPJ: ${cnpjError.message}`);
      }

      if (!isValidCnpj) {
        throw new Error('CNPJ inválido');
      }
    }

    // Validar CEP se fornecido
    if (updates.cep) {
      const { data: isValidCep, error: cepError } = await supabase
        .rpc('validate_cep', { cep_input: updates.cep });

      if (cepError) {
        throw new Error(`Erro ao validar CEP: ${cepError.message}`);
      }

      if (!isValidCep) {
        throw new Error('CEP inválido - deve ter formato XXXXX-XXX');
      }
    }

    // Validar cores se fornecidas
    if (updates.primary_color) {
      const { data: isValidColor, error: colorError } = await supabase
        .rpc('validate_hex_color', { color_input: updates.primary_color });

      if (colorError || !isValidColor) {
        throw new Error('Cor primária inválida - deve ser hexadecimal (#RRGGBB)');
      }
    }

    if (updates.secondary_color) {
      const { data: isValidColor, error: colorError } = await supabase
        .rpc('validate_hex_color', { color_input: updates.secondary_color });

      if (colorError || !isValidColor) {
        throw new Error('Cor secundária inválida - deve ser hexadecimal (#RRGGBB)');
      }
    }

    // Atualizar tenant
    const { data, error } = await supabase
      .from('tenants')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.tenant_id)
      .select(`
        id,
        slug,
        cnpj,
        razao_social,
        nome_fantasia,
        inscricao_estadual,
        cnae_principal,
        contact_email,
        contact_phone,
        whatsapp_number,
        website_url,
        endereco_logradouro,
        endereco_numero,
        endereco_complemento,
        endereco_bairro,
        endereco_cidade,
        cep,
        primary_color,
        secondary_color,
        font_family,
        logo_url,
        favicon_url,
        timezone,
        locale,
        plan_id,
        status_id,
        created_at,
        updated_at
      `)
      .single();

    if (error) {
      throw new Error(`Erro ao atualizar dados: ${error.message}`);
    }

    if (!data) {
      throw new Error('Dados atualizados não retornados');
    }

    return data as OrganizerData;
  }

  /**
   * Buscar estados brasileiros para o select
   */
  async getBrazilianStates() {
    const { data, error } = await supabase
      .from('brazilian_states')
      .select('id, code, name, region')
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
      .select('id, code, name, description')
      .eq('is_active', true)
      .order('sort_order, name');

    if (error) {
      throw new Error(`Erro ao buscar segmentos: ${error.message}`);
    }

    return data;
  }
}

export const organizerService = new OrganizerService();