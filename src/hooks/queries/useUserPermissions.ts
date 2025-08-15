import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserPermissions, UserPermissionsResponse } from '@/services/permissionsService';
import { Permission, getRolePermissions } from '@/utils/permissions';

export interface UseUserPermissionsReturn {
  permissions: Permission[];
  roleCode: string | null;
  roleName?: string;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook para buscar permissões do usuário autenticado
 * Implementa sistema híbrido: backend como principal, frontend como fallback
 */
export const useUserPermissions = (): UseUserPermissionsReturn => {
  const { user, userRole } = useAuth();

  const query: UseQueryResult<UserPermissionsResponse | null> = useQuery({
    queryKey: ['userPermissions', user?.id, userRole?.code],
    queryFn: async () => {
      if (!user?.id) {
        return null;
      }
      return getUserPermissions(user.id);
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Memoizar as permissões efetivas para evitar recálculos desnecessários
  const effectivePermissions = useMemo((): Permission[] => {
    // Se tem dados do backend, usa eles
    if (query.data?.permissions && query.data.permissions.length > 0) {
      return query.data.permissions;
    }

    // Fallback para permissões hardcoded se:
    // 1. Ainda está carregando pela primeira vez
    // 2. Houve erro na consulta  
    // 3. Backend retornou vazio mas temos role
    if (userRole?.code) {
      const fallbackPermissions = getRolePermissions(userRole.code);
      if (fallbackPermissions.length > 0) {
        console.warn(`Usando permissões de fallback para role: ${userRole.code}`);
        return fallbackPermissions;
      }
    }

    return [];
  }, [query.data?.permissions, userRole?.code]);

  const effectiveRoleCode = useMemo((): string | null => {
    return query.data?.roleCode || userRole?.code || null;
  }, [query.data?.roleCode, userRole?.code]);

  return {
    permissions: effectivePermissions,
    roleCode: effectiveRoleCode,
    roleName: query.data?.roleName,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

/**
 * Hook para invalidar cache de permissões
 */
export const useInvalidateUserPermissions = () => {
  const { user } = useAuth();
  
  return () => {
    if (user?.id) {
      // Invalida o cache para forçar nova busca
      // Este hook pode ser usado quando o role do usuário muda
    }
  };
};