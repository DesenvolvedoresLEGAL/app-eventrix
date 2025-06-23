
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { StaffService } from '@/services/staffService';
import { StaffInsert, StaffUpdate, StaffFilters } from '@/types/staff';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook para gerenciar operações de staff usando React Query
 * @param eventId - ID do evento para filtrar o staff
 * @param filters - Filtros opcionais para busca
 */
export const useStaff = (eventId: string, filters?: StaffFilters) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query para buscar staff
  const staffQuery = useQuery({
    queryKey: ['staff', eventId, filters],
    queryFn: () => {
      if (!user?.id || !eventId) {
        throw new Error('Usuário não autenticado ou evento não especificado');
      }
      return StaffService.getStaff(eventId, user.id, filters);
    },
    enabled: !!user?.id && !!eventId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Mutation para criar staff
  const createStaffMutation = useMutation({
    mutationFn: (staffData: StaffInsert) => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      return StaffService.createStaff(staffData, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['staff', eventId] });
      toast({
        title: "Staff criado com sucesso",
        description: `${data.name} foi adicionado à equipe.`,
      });
    },
    onError: (error) => {
      console.error('Erro ao criar staff:', error);
      toast({
        title: "Erro ao criar staff",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    },
  });

  // Mutation para atualizar staff
  const updateStaffMutation = useMutation({
    mutationFn: ({ staffId, updates }: { staffId: string; updates: StaffUpdate }) => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      return StaffService.updateStaff(staffId, updates, user.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['staff', eventId] });
      toast({
        title: "Staff atualizado com sucesso",
        description: `${data.name} foi atualizado.`,
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar staff:', error);
      toast({
        title: "Erro ao atualizar staff",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    },
  });

  // Mutation para deletar staff
  const deleteStaffMutation = useMutation({
    mutationFn: (staffId: string) => {
      if (!user?.id) {
        throw new Error('Usuário não autenticado');
      }
      return StaffService.deleteStaff(staffId, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', eventId] });
      toast({
        title: "Staff removido com sucesso",
        description: "O membro foi removido da equipe.",
      });
    },
    onError: (error) => {
      console.error('Erro ao deletar staff:', error);
      toast({
        title: "Erro ao remover staff",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    },
  });

  return {
    // Dados do staff
    staff: staffQuery.data || [],
    
    // Estados de loading
    isLoading: staffQuery.isLoading,
    isError: staffQuery.isError,
    error: staffQuery.error,
    
    // Mutations
    createStaff: createStaffMutation.mutate,
    updateStaff: updateStaffMutation.mutate,
    deleteStaff: deleteStaffMutation.mutate,
    
    // Estados das mutations
    isCreating: createStaffMutation.isPending,
    isUpdating: updateStaffMutation.isPending,
    isDeleting: deleteStaffMutation.isPending,
    
    // Refetch manual
    refetch: staffQuery.refetch,
  };
};
