
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Visitor {
  id: string;
  event_id: string;
  user_id?: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  registration_date?: string;
  status?: string;
  check_in?: boolean;
  qr_code?: string;
  updated_at?: string;
}

export function useVisitors(eventId?: string) {
  return useQuery({
    queryKey: ['visitors', eventId],
    queryFn: async () => {
      let query = supabase
        .from('visitors')
        .select('*')
        .order('registration_date', { ascending: false });

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as Visitor[];
    },
  });
}

export function useVisitor(id: string) {
  return useQuery({
    queryKey: ['visitors', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('visitors')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Visitor;
    },
    enabled: !!id,
  });
}

export function useCreateVisitor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (visitorData: Omit<Visitor, 'id' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('visitors')
        .insert([visitorData])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
      toast.success('Visitante cadastrado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao cadastrar visitante: ${error.message}`);
    },
  });
}

export function useUpdateVisitor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...visitorData }: Partial<Visitor> & { id: string }) => {
      const { data, error } = await supabase
        .from('visitors')
        .update(visitorData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
      toast.success('Visitante atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar visitante: ${error.message}`);
    },
  });
}

export function useCheckInVisitor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ visitorId, eventId }: { visitorId: string; eventId: string }) => {
      // Update visitor check-in status
      const { error: visitorError } = await supabase
        .from('visitors')
        .update({ check_in: true })
        .eq('id', visitorId);

      if (visitorError) {
        throw new Error(visitorError.message);
      }

      // Create check-in record
      const { data, error: checkinError } = await supabase
        .from('checkins')
        .insert([{
          event_id: eventId,
          visitor_id: visitorId,
          method: 'manual',
          status: 'active'
        }])
        .select()
        .single();

      if (checkinError) {
        throw new Error(checkinError.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] });
      queryClient.invalidateQueries({ queryKey: ['checkins'] });
      toast.success('Check-in realizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao realizar check-in: ${error.message}`);
    },
  });
}
