
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Event {
  id: string;
  name: string;
  description?: string;
  category?: string;
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  website?: string;
  capacity?: number;
  venue_name?: string;
  total_area?: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  accessibility?: boolean;
  accessibility_info?: string;
  color_scheme?: string;
  primary_color?: string;
  secondary_color?: string;
  font_style?: string;
  logo_url?: string;
  banner_url?: string;
  public_registration?: boolean;
  organizer_name?: string;
  organizer_email?: string;
  phone?: string;
  company?: string;
  is_hybrid?: boolean;
  streaming_platform?: string;
  special_requirements?: string;
  created_at?: string;
  updated_at?: string;
}

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log('Fetching events...');
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        throw new Error(error.message);
      }

      console.log('Events fetched:', data);
      return data as Event[];
    },
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Event;
    },
    enabled: !!id,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating event with data:', eventData);
      
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) {
        console.error('Error creating event:', error);
        throw new Error(error.message);
      }

      console.log('Event created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Evento criado com sucesso!');
    },
    onError: (error: Error) => {
      console.error('Error in useCreateEvent:', error);
      toast.error(`Erro ao criar evento: ${error.message}`);
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...eventData }: Partial<Event> & { id: string }) => {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Evento atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar evento: ${error.message}`);
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Evento excluído com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir evento: ${error.message}`);
    },
  });
}
