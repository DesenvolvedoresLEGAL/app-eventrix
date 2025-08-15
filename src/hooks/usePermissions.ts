import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Permission, hasPermission, canAccessRoute, getAllowedRoutes } from '@/utils/permissions';

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

  const permissionCheckers = useMemo(() => ({
    hasPermission: (permission: Permission) => hasPermission(userRole, permission),
    
    canAccessRoute: (route: string) => canAccessRoute(userRole, route),
    
    hasAnyPermission: (permissions: Permission[]) => {
      if (!userRole) return false;
      return permissions.some(permission => hasPermission(userRole, permission));
    },
    
    hasAllPermissions: (permissions: Permission[]) => {
      if (!userRole) return false;
      return permissions.every(permission => hasPermission(userRole, permission));
    },
    
    getAllowedRoutes: () => getAllowedRoutes(userRole),
  }), [userRole]);

  return {
    ...permissionCheckers,
    userRole,
    isLoading: loading,
  };
};