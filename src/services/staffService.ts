
import { supabase } from '@/integrations/supabase/client';
import { Staff, StaffInsert, StaffUpdate, StaffListItem, StaffFilters } from '@/types/staff';

/**
 * Service centralizado para operações relacionadas ao staff (event_team)
 * Implementa filtro por event_id e validação de acesso via tenant
 */
export class StaffService {
  /**
   * Busca staff por evento
   * @param eventId - ID do evento
   * @param tenantId - ID do tenant (user.id do usuário autenticado)
   * @param filters - Filtros opcionais para busca
   */
  static async getStaff(eventId: string, tenantId: string, filters?: StaffFilters): Promise<StaffListItem[]> {
    console.log('🔍 Buscando staff para evento:', eventId, 'tenant:', tenantId);
    
    // Primeiro verificar se o evento pertence ao tenant
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('id')
      .eq('id', eventId)
      .eq('tenant_id', tenantId)
      .single();

    if (eventError || !event) {
      console.error('❌ Evento não encontrado ou sem acesso:', eventError);
      throw new Error('Evento não encontrado ou acesso negado');
    }

    let query = supabase
      .from('event_team')
      .select('*')
      .eq('event_id', eventId);

    // Aplicar filtros se fornecidos
    if (filters?.role) {
      query = query.ilike('role', `%${filters.role}%`);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('name');

    if (error) {
      console.error('❌ Erro ao buscar staff:', error);
      throw error;
    }

    console.log('✅ Staff encontrado:', data?.length || 0, 'membros');
    return data || [];
  }

  /**
   * Busca membro específico do staff
   * @param staffId - ID do membro do staff
   * @param tenantId - ID do tenant
   */
  static async getStaffById(staffId: string, tenantId: string): Promise<Staff | null> {
    console.log('🔍 Buscando staff por ID:', staffId);

    const { data, error } = await supabase
      .from('event_team')
      .select(`
        *,
        events!inner(tenant_id)
      `)
      .eq('id', staffId)
      .eq('events.tenant_id', tenantId)
      .single();

    if (error) {
      console.error('❌ Erro ao buscar staff por ID:', error);
      throw error;
    }

    return data;
  }

  /**
   * Cria novo membro do staff
   * @param staffData - Dados do staff
   * @param tenantId - ID do tenant
   */
  static async createStaff(staffData: StaffInsert, tenantId: string): Promise<Staff> {
    console.log('➕ Criando novo staff:', staffData);

    // Verificar se o evento pertence ao tenant
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('id')
      .eq('id', staffData.event_id)
      .eq('tenant_id', tenantId)
      .single();

    if (eventError || !event) {
      console.error('❌ Evento não encontrado para criação de staff:', eventError);
      throw new Error('Evento não encontrado ou acesso negado');
    }

    const { data, error } = await supabase
      .from('event_team')
      .insert(staffData)
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao criar staff:', error);
      throw error;
    }

    console.log('✅ Staff criado com sucesso:', data.id);
    return data;
  }

  /**
   * Atualiza membro do staff
   * @param staffId - ID do staff
   * @param updates - Dados para atualizar
   * @param tenantId - ID do tenant
   */
  static async updateStaff(staffId: string, updates: StaffUpdate, tenantId: string): Promise<Staff> {
    console.log('✏️ Atualizando staff:', staffId, updates);

    const { data, error } = await supabase
      .from('event_team')
      .update(updates)
      .eq('id', staffId)
      .select(`
        *,
        events!inner(tenant_id)
      `)
      .eq('events.tenant_id', tenantId)
      .single();

    if (error) {
      console.error('❌ Erro ao atualizar staff:', error);
      throw error;
    }

    console.log('✅ Staff atualizado com sucesso:', data.id);
    return data;
  }

  /**
   * Remove membro do staff (soft delete não implementado na tabela)
   * @param staffId - ID do staff
   * @param tenantId - ID do tenant
   */
  static async deleteStaff(staffId: string, tenantId: string): Promise<void> {
    console.log('🗑️ Removendo staff:', staffId);

    const { error } = await supabase
      .from('event_team')
      .delete()
      .eq('id', staffId)
      .eq('events.tenant_id', tenantId);

    if (error) {
      console.error('❌ Erro ao remover staff:', error);
      throw error;
    }

    console.log('✅ Staff removido com sucesso:', staffId);
  }
}
