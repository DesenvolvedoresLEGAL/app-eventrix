import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignRoleToUser } from '@/services/rolesService';
import { useToast } from '@/hooks/use-toast';

export interface UseAssignRoleToUserReturn {
  assignRole: (userId: string, roleId: string) => Promise<boolean>;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

export const useAssignRoleToUser = (): UseAssignRoleToUserReturn => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) => 
      assignRoleToUser(userId, roleId),
    onSuccess: (success) => {
      if (success) {
        // Invalidate user permissions and role statistics
        queryClient.invalidateQueries({ queryKey: ['userPermissions'] });
        queryClient.invalidateQueries({ queryKey: ['roleStatistics'] });
        queryClient.invalidateQueries({ queryKey: ['userRoleDistribution'] });
        queryClient.invalidateQueries({ queryKey: ['permissionUsageStats'] });
        
        // Show success toast
        toast({
          title: "Sucesso",
          description: "Role atribuído ao usuário com sucesso.",
        });
      }
    },
    onError: (error: Error) => {
      console.error('Erro ao atribuir role:', error);
      
      // Show error toast
      toast({
        title: "Erro",
        description: error.message || "Não foi possível atribuir o role. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    assignRole: (userId: string, roleId: string) => 
      mutation.mutateAsync({ userId, roleId }),
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};