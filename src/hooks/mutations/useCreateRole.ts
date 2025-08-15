import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRoleRequest, UserRole } from '@/types/roles.types';
import { createRole } from '@/services/rolesService';
import { useToast } from '@/hooks/use-toast';

export interface UseCreateRoleReturn {
  createRole: (roleData: CreateRoleRequest) => Promise<UserRole | null>;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

export const useCreateRole = (): UseCreateRoleReturn => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      // Invalidate and refetch roles queries
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['roleStatistics'] });
      queryClient.invalidateQueries({ queryKey: ['userRoleDistribution'] });
      
      // Show success toast
      toast({
        title: "Sucesso",
        description: `Role "${data?.code}" criado com sucesso.`,
      });
    },
    onError: (error: Error) => {
      console.error('Erro ao criar role:', error);
      
      // Show error toast
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar o role. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  return {
    createRole: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};