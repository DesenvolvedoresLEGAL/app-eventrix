
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { EventsService } from '@/services/eventsService';
import type { EventListItem, EventFilters } from '@/types/events';

/**
 * Hook customizado para gerenciar estado dos eventos
 * Integra com AuthContext para filtro multi-tenant automático
 */
export const useEvents = (filters?: EventFilters) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Query para buscar eventos do tenant do usuário
  const {
    data: events = [],
    isLoading,
    error: queryError,
    refetch
  } = useQuery({
    queryKey: ['events', user?.id, filters],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      
      console.log('🔄 Carregando eventos para usuário:', user.email);
      return await EventsService.getEventsByTenant(user.id, filters);
    },
    enabled: !!user?.id, // Só executa se usuário estiver autenticado
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  // Mutation para soft delete de eventos
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      await EventsService.softDeleteEvent(eventId, user.id);
    },
    onSuccess: () => {
      // Invalidar cache para refetch automático
      queryClient.invalidateQueries({ 
        queryKey: ['events', user?.id] 
      });
    },
  });

  // Atualizar estado de erro quando query falha
  useEffect(() => {
    if (queryError) {
      const errorMessage = queryError instanceof Error 
        ? queryError.message 
        : 'Erro desconhecido ao carregar eventos';
      setError(errorMessage);
      console.error('❌ Erro no hook useEvents:', queryError);
    } else {
      setError(null);
    }
  }, [queryError]);

  // Função para refetch manual
  const refetchEvents = useCallback(async () => {
    try {
      setError(null);
      await refetch();
    } catch (err: any) {
      const errorMessage = err?.message || 'Erro ao recarregar eventos';
      setError(errorMessage);
      console.error('❌ Erro ao refetch eventos:', err);
    }
  }, [refetch]);

  // Função para invalidar cache e refetch
  const invalidateEvents = useCallback(() => {
    queryClient.invalidateQueries({ 
      queryKey: ['events', user?.id] 
    });
  }, [queryClient, user?.id]);

  // Função para deletar evento (soft delete)
  const deleteEvent = useCallback(async (eventId: string) => {
    try {
      await deleteEventMutation.mutateAsync(eventId);
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao deletar evento');
    }
  }, [deleteEventMutation]);

  // Stats dos eventos para dashboard (memoizado para performance)
  const eventsStats = useMemo(() => ({
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    inProgress: events.filter(e => e.status === 'in_progress').length,
    completed: events.filter(e => e.status === 'completed').length,
  }), [events]);

  return {
    // Dados
    events,
    eventsStats,
    
    // Estados
    isLoading,
    error,
    isDeleting: deleteEventMutation.isPending,
    
    // Funções
    refetchEvents,
    invalidateEvents,
    deleteEvent,
    
    // Flags úteis
    hasEvents: events.length > 0,
  };
};

/**
 * Hook para buscar um evento específico por ID
 */
export const useEvent = (eventId: string | null) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['event', eventId, user?.id],
    queryFn: async () => {
      if (!eventId || !user?.id) {
        throw new Error('ID do evento ou usuário não fornecido');
      }
      
      return await EventsService.getEventById(eventId, user.id);
    },
    enabled: !!(eventId && user?.id),
    staleTime: 5 * 60 * 1000,
  });
};
