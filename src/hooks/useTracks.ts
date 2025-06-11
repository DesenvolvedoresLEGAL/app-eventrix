
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Track {
  id: string;
  event_id: string;
  name: string;
  description?: string;
  color?: string;
  coordinator_id?: string;
  sessions?: number;
  duration?: string;
  location?: string;
  speakers?: number;
  attendees?: number;
  status?: string;
  start_time?: string;
  end_time?: string;
  created_at?: string;
  updated_at?: string;
}

export function useTracks(eventId?: string) {
  return useQuery({
    queryKey: ['tracks', eventId],
    queryFn: async () => {
      let query = supabase
        .from('tracks')
        .select(`
          *,
          coordinator:coordinator_id(name, email)
        `)
        .order('name');

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as Track[];
    },
  });
}

export function useTrack(id: string) {
  return useQuery({
    queryKey: ['tracks', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tracks')
        .select(`
          *,
          coordinator:coordinator_id(name, email)
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Track;
    },
    enabled: !!id,
  });
}

export function useCreateTrack() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trackData: Omit<Track, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('tracks')
        .insert([trackData])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      toast.success('Trilha criada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar trilha: ${error.message}`);
    },
  });
}

export function useUpdateTrack() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...trackData }: Partial<Track> & { id: string }) => {
      const { data, error } = await supabase
        .from('tracks')
        .update(trackData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      toast.success('Trilha atualizada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar trilha: ${error.message}`);
    },
  });
}

export function useDeleteTrack() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tracks')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      toast.success('Trilha excluída com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir trilha: ${error.message}`);
    },
  });
}
