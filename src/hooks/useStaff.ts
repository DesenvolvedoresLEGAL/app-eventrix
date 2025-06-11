
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Staff {
  id: string;
  user_id: string;
  event_id?: string;
  name: string;
  department?: string;
  email?: string;
  phone?: string;
  status?: string;
  role_id?: string;
  created_at?: string;
  updated_at?: string;
}

export function useStaff(eventId?: string) {
  return useQuery({
    queryKey: ['staff', eventId],
    queryFn: async () => {
      let query = supabase
        .from('staff')
        .select(`
          *,
          roles:role_id(name, description, color)
        `)
        .order('created_at', { ascending: false });

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as Staff[];
    },
  });
}

export function useStaffMember(id: string) {
  return useQuery({
    queryKey: ['staff', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('staff')
        .select(`
          *,
          roles:role_id(name, description, color)
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Staff;
    },
    enabled: !!id,
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (staffData: Omit<Staff, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('staff')
        .insert([staffData])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast.success('Membro da equipe adicionado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao adicionar membro: ${error.message}`);
    },
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...staffData }: Partial<Staff> & { id: string }) => {
      const { data, error } = await supabase
        .from('staff')
        .update(staffData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast.success('Membro da equipe atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar membro: ${error.message}`);
    },
  });
}
