import { supabase } from '@/integrations/supabase/client';

export interface OrganizerData {
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

export interface UpdateOrganizerData {
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
      .eq('user_id', user.id)
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
        email,
        telefone,
        whatsapp,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        segmento_id,
        cor_primaria,
        cor_secundaria,
        logo_url,
        website,
        descricao,
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
      .eq('user_id', user.id)
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
        .rpc('validate_cnpj', { cnpj: updates.cnpj });

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
        .rpc('validate_cep', { cep: updates.cep });

      if (cepError) {
        throw new Error(`Erro ao validar CEP: ${cepError.message}`);
      }

      if (!isValidCep) {
        throw new Error('CEP inválido - deve ter formato XXXXX-XXX');
      }
    }

    // Validar cores se fornecidas
    if (updates.cor_primaria) {
      const { data: isValidColor, error: colorError } = await supabase
        .rpc('validate_hex_color', { color: updates.cor_primaria });

      if (colorError || !isValidColor) {
        throw new Error('Cor primária inválida - deve ser hexadecimal (#RRGGBB)');
      }
    }

    if (updates.cor_secundaria) {
      const { data: isValidColor, error: colorError } = await supabase
        .rpc('validate_hex_color', { color: updates.cor_secundaria });

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
        email,
        telefone,
        whatsapp,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        segmento_id,
        cor_primaria,
        cor_secundaria,
        logo_url,
        website,
        descricao,
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
      .select('id, code, name, descriptions')
      .eq('is_active', true)
      .order('name');

    if (error) {
      throw new Error(`Erro ao buscar segmentos: ${error.message}`);
    }

    return data;
  }
}

export const organizerService = new OrganizerService();