
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Venue {
  id: string;
  event_id: string;
  name: string;
  type?: string;
  capacity?: number;
  area?: number;
  price_per_hour?: number;
  location?: string;
  description?: string;
  amenities?: string[];
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export function useVenues(eventId?: string) {
  return useQuery({
    queryKey: ['venues', eventId],
    queryFn: async () => {
      let query = supabase
        .from('venues')
        .select('*')
        .order('name');

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as Venue[];
    },
  });
}

export function useVenue(id: string) {
  return useQuery({
    queryKey: ['venues', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Venue;
    },
    enabled: !!id,
  });
}

export function useCreateVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (venueData: Omit<Venue, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('venues')
        .insert([venueData])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
      toast.success('Local criado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar local: ${error.message}`);
    },
  });
}

export function useUpdateVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...venueData }: Partial<Venue> & { id: string }) => {
      const { data, error } = await supabase
        .from('venues')
        .update(venueData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
      toast.success('Local atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar local: ${error.message}`);
    },
  });
}

export function useDeleteVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('venues')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
      toast.success('Local excluído com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir local: ${error.message}`);
    },
  });
}
