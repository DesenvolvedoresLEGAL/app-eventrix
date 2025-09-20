import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizerService, type OrganizerData, type UpdateOrganizerData } from '@/services/organizerService';
import { useAuth } from '@/context/FixedAuthContext';

const QUERY_KEYS = {
  organizer: ['organizer'] as const,
  brazilianStates: ['brazilianStates'] as const,
  businessSegments: ['businessSegments'] as const,
} as const;

/**
 * Hook para buscar dados da organização atual
 */
export const useOrganizerData = () => {
  const queryClient = useQueryClient();
  const { tenant } = useAuth();

  // Query para dados da organização - apenas executa se não tiver dados no AuthContext
  const organizerQuery = useQuery({
    queryKey: QUERY_KEYS.organizer,
    queryFn: () => organizerService.getCurrentOrganizer(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    enabled: !tenant, // Só executa se não tiver dados do AuthContext
    retry: (failureCount, error) => {
      // Não retry para erros de autenticação ou permissão
      if (error?.message?.includes('não autenticado') || 
          error?.message?.includes('não está associado')) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Mutation para atualizar dados
  const updateMutation = useMutation({
    mutationFn: (updates: UpdateOrganizerData) => organizerService.updateOrganizer(updates),
    onSuccess: (updatedData: OrganizerData) => {
      // Atualizar cache com dados otimistas
      queryClient.setQueryData(QUERY_KEYS.organizer, updatedData);
      
      // Invalidar queries relacionadas que podem ter sido afetadas
      queryClient.invalidateQueries({
        queryKey: ['tenant'],
        exact: false,
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar organização:', error);
      
      // Revalidar dados em caso de erro para garantir consistência
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.organizer,
      });
    },
  });

  // Priorizar dados do AuthContext, fallback para Query
  const data = tenant || organizerQuery.data;
  const isLoading = organizerQuery.isLoading && !tenant;

  return {
    // Dados
    data,
    
    // Estados
    isLoading,
    isError: organizerQuery.isError,
    error: organizerQuery.error,
    
    // Mutação
    updateOrganizer: updateMutation,
    isUpdating: updateMutation.isPending,
    
    // Métodos
    refetch: organizerQuery.refetch,
  };
};

/**
 * Hook para buscar estados brasileiros
 */
export const useBrazilianStates = () => {
  return useQuery({
    queryKey: QUERY_KEYS.brazilianStates,
    queryFn: () => organizerService.getBrazilianStates(),
    staleTime: 60 * 60 * 1000, // 1 hora (dados raramente mudam)
    gcTime: 24 * 60 * 60 * 1000, // 24 horas
  });
};

/**
 * Hook para buscar segmentos de negócio
 */
export const useBusinessSegments = () => {
  return useQuery({
    queryKey: QUERY_KEYS.businessSegments,
    queryFn: () => organizerService.getBusinessSegments(),
    staleTime: 60 * 60 * 1000, // 1 hora (dados raramente mudam)
    gcTime: 24 * 60 * 60 * 1000, // 24 horas
  });
};