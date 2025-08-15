import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateRoleRequest, UserRole } from '@/types/roles.types';
import { updateRole } from '@/services/rolesService';
import { useToast } from '@/hooks/use-toast';

export interface UseUpdateRoleReturn {
  updateRole: (id: string, roleData: UpdateRoleRequest) => Promise<UserRole | null>;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

export const useUpdateRole = (): UseUpdateRoleReturn => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ id, roleData }: { id: string; roleData: UpdateRoleRequest }) => 
      updateRole(id, roleData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch roles queries
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['roleStatistics'] });
      queryClient.invalidateQueries({ queryKey: ['userRoleDistribution'] });
      queryClient.invalidateQueries({ queryKey: ['permissionUsageStats'] });
      
      // Show success toast
      toast({
        title: "Sucesso",
        description: `Role "${data?.code}" atualizado com sucesso.`,
      });
    },
    onError: (error: Error) => {
      console.error('Erro ao atualizar role:', error);
      
      // Show error toast
      toast({
        title: "Erro",
        description: error.message || "Não foi possível atualizar o role. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    updateRole: (id: string, roleData: UpdateRoleRequest) => 
      mutation.mutateAsync({ id, roleData }),
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};