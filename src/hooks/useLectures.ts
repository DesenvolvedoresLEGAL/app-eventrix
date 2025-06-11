
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Lecture {
  id: string;
  event_id: string;
  track_id?: string;
  venue_id?: string;
  title: string;
  speaker?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  attendees?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export function useLectures(eventId?: string) {
  return useQuery({
    queryKey: ['lectures', eventId],
    queryFn: async () => {
      let query = supabase
        .from('lectures')
        .select(`
          *,
          tracks:track_id(name, color),
          venues:venue_id(name, location)
        `)
        .order('start_time', { ascending: true });

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      return data as Lecture[];
    },
  });
}

export function useLecture(id: string) {
  return useQuery({
    queryKey: ['lectures', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lectures')
        .select(`
          *,
          tracks:track_id(name, color),
          venues:venue_id(name, location)
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Lecture;
    },
    enabled: !!id,
  });
}

export function useCreateLecture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lectureData: Omit<Lecture, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('lectures')
        .insert([lectureData])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      toast.success('Palestra criada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar palestra: ${error.message}`);
    },
  });
}

export function useUpdateLecture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...lectureData }: Partial<Lecture> & { id: string }) => {
      const { data, error } = await supabase
        .from('lectures')
        .update(lectureData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      toast.success('Palestra atualizada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar palestra: ${error.message}`);
    },
  });
}

export function useDeleteLecture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('lectures')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      toast.success('Palestra excluída com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir palestra: ${error.message}`);
    },
  });
}
