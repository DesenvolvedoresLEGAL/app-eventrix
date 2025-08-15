import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Permission, hasPermission, canAccessRoute, getAllowedRoutes } from '@/utils/permissions';
import { useUserPermissions } from '@/hooks/queries/useUserPermissions';

export interface UsePermissionsReturn {
  hasPermission: (permission: Permission) => boolean;
  canAccessRoute: (route: string) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  getAllowedRoutes: () => string[];
  userRole: any | null;
  isLoading: boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  const { userRole, loading } = useAuth();
  const { permissions: dynamicPermissions, isLoading: permissionsLoading } = useUserPermissions();

  const permissionCheckers = useMemo(() => {
    // Cria um userRole simulado com as permissões dinâmicas para manter compatibilidade
    const effectiveUserRole = userRole ? {
      ...userRole,
      permissions: dynamicPermissions
    } : null;

    return {
      hasPermission: (permission: Permission) => {
        // Usa permissões dinâmicas quando disponíveis
        if (dynamicPermissions.length > 0) {
          return dynamicPermissions.includes(permission);
        }
        // Fallback para função original
        return hasPermission(userRole, permission);
      },
      
      canAccessRoute: (route: string) => canAccessRoute(effectiveUserRole, route),
      
      hasAnyPermission: (permissions: Permission[]) => {
        if (!effectiveUserRole && dynamicPermissions.length === 0) return false;
        
        if (dynamicPermissions.length > 0) {
          return permissions.some(permission => dynamicPermissions.includes(permission));
        }
        
        return permissions.some(permission => hasPermission(userRole, permission));
      },
      
      hasAllPermissions: (permissions: Permission[]) => {
        if (!effectiveUserRole && dynamicPermissions.length === 0) return false;
        
        if (dynamicPermissions.length > 0) {
          return permissions.every(permission => dynamicPermissions.includes(permission));
        }
        
        return permissions.every(permission => hasPermission(userRole, permission));
      },
      
      getAllowedRoutes: () => getAllowedRoutes(effectiveUserRole),
    };
  }, [userRole, dynamicPermissions]);

  return {
    ...permissionCheckers,
    userRole,
    isLoading: loading || permissionsLoading,
  };
};