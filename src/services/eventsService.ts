
import { supabase } from '@/integrations/supabase/client';
import type { Event, EventListItem, EventInsert, EventUpdate, EventFilters } from '@/types/events';

/**
 * Service centralizado para operações relacionadas a eventos
 * Implementa filtro multi-tenant manual usando tenant_id
 */
export class EventsService {
  
  /**
   * Busca eventos por tenant (usuário logado)
   * @param tenantId - ID do tenant (user.id do usuário autenticado)
   * @param filters - Filtros opcionais para busca
   * @returns Lista de eventos do tenant
   */
  static async getEventsByTenant(
    tenantId: string, 
    filters?: EventFilters
  ): Promise<EventListItem[]> {
    try {
      console.log('🔍 Buscando eventos para tenant:', tenantId);
      
      let query = supabase
        .from('events')
        .select(`
          id,
          name,
          start_date,
          end_date,
          start_time,
          end_time,
          location,
          city,
          state,
          venue_name,
          status,
          category,
          exhibitors_count,
          estimated_capacity,
          logo_url,
          banner_url,
          tenant_id,
          created_at
        `)
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });

      // Aplicar filtros se fornecidos
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters?.dateRange) {
        query = query
          .gte('start_date', filters.dateRange.start)
          .lte('end_date', filters.dateRange.end);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Erro ao buscar eventos:', error);
        throw new Error(`Erro ao carregar eventos: ${error.message}`);
      }

      console.log('✅ Eventos carregados:', data?.length || 0);
      return data || [];
      
    } catch (error: any) {
      console.error('❌ Erro no service de eventos:', error);
      throw new Error(error.message || 'Erro desconhecido ao carregar eventos');
    }
  }

  /**
   * Busca um evento específico por ID
   * @param eventId - ID do evento
   * @param tenantId - ID do tenant para validação
   * @returns Evento encontrado ou null
   */
  static async getEventById(eventId: string, tenantId: string): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .eq('tenant_id', tenantId)
        .maybeSingle();

      if (error) {
        console.error('❌ Erro ao buscar evento:', error);
        throw new Error(`Erro ao carregar evento: ${error.message}`);
      }

      return data;
    } catch (error: any) {
      console.error('❌ Erro ao buscar evento por ID:', error);
      throw new Error(error.message || 'Erro ao carregar evento');
    }
  }

  /**
   * Cria um novo evento
   * @param eventData - Dados do evento
   * @returns Evento criado
   */
  static async createEvent(eventData: EventInsert): Promise<Event> {
    try {
      console.log('📝 Criando novo evento:', eventData.name);
      
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) {
        console.error('❌ Erro ao criar evento:', error);
        throw new Error(`Erro ao criar evento: ${error.message}`);
      }

      console.log('✅ Evento criado com sucesso:', data.id);
      return data;
    } catch (error: any) {
      console.error('❌ Erro ao criar evento:', error);
      throw new Error(error.message || 'Erro ao criar evento');
    }
  }

  /**
   * Atualiza um evento existente
   * @param eventId - ID do evento
   * @param updates - Dados para atualização
   * @param tenantId - ID do tenant para validação
   * @returns Evento atualizado
   */
  static async updateEvent(
    eventId: string, 
    updates: EventUpdate, 
    tenantId: string
  ): Promise<Event> {
    try {
      console.log('📝 Atualizando evento:', eventId);
      
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', eventId)
        .eq('tenant_id', tenantId)
        .select()
        .single();

      if (error) {
        console.error('❌ Erro ao atualizar evento:', error);
        throw new Error(`Erro ao atualizar evento: ${error.message}`);
      }

      console.log('✅ Evento atualizado com sucesso');
      return data;
    } catch (error: any) {
      console.error('❌ Erro ao atualizar evento:', error);
      throw new Error(error.message || 'Erro ao atualizar evento');
    }
  }

  /**
   * Deleta um evento
   * @param eventId - ID do evento
   * @param tenantId - ID do tenant para validação
   */
  static async deleteEvent(eventId: string, tenantId: string): Promise<void> {
    try {
      console.log('🗑️ Deletando evento:', eventId);
      
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)
        .eq('tenant_id', tenantId);

      if (error) {
        console.error('❌ Erro ao deletar evento:', error);
        throw new Error(`Erro ao deletar evento: ${error.message}`);
      }

      console.log('✅ Evento deletado com sucesso');
    } catch (error: any) {
      console.error('❌ Erro ao deletar evento:', error);
      throw new Error(error.message || 'Erro ao deletar evento');
    }
  }
}
