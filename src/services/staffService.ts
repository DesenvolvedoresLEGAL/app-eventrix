
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type StaffMember = Database['public']['Tables']['event_team']['Row'];
type StaffInsert = Database['public']['Tables']['event_team']['Insert'];
type StaffUpdate = Database['public']['Tables']['event_team']['Update'];
type StaffStatus = Database['public']['Enums']['staff_status_enum'];

export class StaffService {
  /**
   * Busca todos os membros da equipe de um evento específico
   */
  static async getEventStaff(eventId: string): Promise<StaffMember[]> {
    const { data, error } = await supabase
      .from('event_team')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar staff:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Busca um membro da equipe por ID
   */
  static async getStaffById(id: string): Promise<StaffMember | null> {
    const { data, error } = await supabase
      .from('event_team')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Erro ao buscar membro da equipe:', error);
      throw error;
    }

    return data;
  }

  /**
   * Cria um novo membro da equipe
   */
  static async createStaff(staffData: StaffInsert): Promise<StaffMember> {
    const { data, error } = await supabase
      .from('event_team')
      .insert(staffData)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar membro da equipe:', error);
      throw error;
    }

    return data;
  }

  /**
   * Atualiza um membro da equipe
   */
  static async updateStaff(id: string, updates: StaffUpdate): Promise<StaffMember> {
    const { data, error } = await supabase
      .from('event_team')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar membro da equipe:', error);
      throw error;
    }

    return data;
  }

  /**
   * Remove um membro da equipe
   */
  static async deleteStaff(id: string): Promise<void> {
    const { error } = await supabase
      .from('event_team')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao remover membro da equipe:', error);
      throw error;
    }
  }

  /**
   * Busca staffs por departamento
   */
  static async getStaffByDepartment(eventId: string, department: string): Promise<StaffMember[]> {
    const { data, error } = await supabase
      .from('event_team')
      .select('*')
      .eq('event_id', eventId)
      .eq('department', department)
      .order('name');

    if (error) {
      console.error('Erro ao buscar staff por departamento:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Busca staffs por status
   */
  static async getStaffByStatus(eventId: string, status: StaffStatus): Promise<StaffMember[]> {
    const { data, error } = await supabase
      .from('event_team')
      .select('*')
      .eq('event_id', eventId)
      .eq('status', status)
      .order('name');

    if (error) {
      console.error('Erro ao buscar staff por status:', error);
      throw error;
    }

    return data || [];
  }
}
