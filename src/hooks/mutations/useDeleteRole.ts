import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRole } from '@/services/rolesService';
import { useToast } from '@/hooks/use-toast';

export interface UseDeleteRoleReturn {
  deleteRole: (id: string) => Promise<boolean>;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

export const useDeleteRole = (): UseDeleteRoleReturn => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: (success, roleId) => {
      if (success) {
        // Invalidate and refetch roles queries
        queryClient.invalidateQueries({ queryKey: ['roles'] });
        queryClient.invalidateQueries({ queryKey: ['role', roleId] });
        queryClient.invalidateQueries({ queryKey: ['roleStatistics'] });
        queryClient.invalidateQueries({ queryKey: ['userRoleDistribution'] });
        queryClient.invalidateQueries({ queryKey: ['permissionUsageStats'] });
        
        // Show success toast
        toast({
          title: "Sucesso",
          description: "Role excluído com sucesso.",
        });
      }
    },
    onError: (error: Error) => {
      console.error('Erro ao excluir role:', error);
      
      // Show error toast
      toast({
        title: "Erro",
        description: error.message || "Não foi possível excluir o role. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    deleteRole: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};