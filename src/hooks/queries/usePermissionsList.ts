import { useMemo } from 'react';
import { Permission } from '@/utils/permissions';
import { getAllPermissionsList } from '@/services/rolesService';
import { PermissionGroup } from '@/types/roles.types';

export interface UsePermissionsListReturn {
  permissions: Array<{ key: Permission; name: string; description: string; module: string }>;
  groupedPermissions: PermissionGroup[];
  getPermissionsByModule: (module: string) => Array<{ key: Permission; name: string; description: string }>;
  searchPermissions: (term: string) => Array<{ key: Permission; name: string; description: string; module: string }>;
}

export const usePermissionsList = (): UsePermissionsListReturn => {
  const permissions = useMemo(() => getAllPermissionsList(), []);

  const groupedPermissions = useMemo((): PermissionGroup[] => {
    const groups = new Map<string, Array<{ key: Permission; name: string; description: string }>>();

    permissions.forEach(permission => {
      if (!groups.has(permission.module)) {
        groups.set(permission.module, []);
      }
      groups.get(permission.module)!.push({
        key: permission.key,
        name: permission.name,
        description: permission.description
      });
    });

    return Array.from(groups.entries()).map(([module, perms]) => ({
      module,
      permissions: perms.sort((a, b) => a.name.localeCompare(b.name))
    })).sort((a, b) => a.module.localeCompare(b.module));
  }, [permissions]);

  const getPermissionsByModule = useMemo(() => {
    return (module: string) => {
      return permissions
        .filter(p => p.module === module)
        .map(p => ({ key: p.key, name: p.name, description: p.description }))
        .sort((a, b) => a.name.localeCompare(b.name));
    };
  }, [permissions]);

  const searchPermissions = useMemo(() => {
    return (term: string) => {
      if (!term.trim()) return permissions;
      
      const lowerTerm = term.toLowerCase();
      return permissions.filter(permission => 
        permission.name.toLowerCase().includes(lowerTerm) ||
        permission.description.toLowerCase().includes(lowerTerm) ||
        permission.module.toLowerCase().includes(lowerTerm) ||
        permission.key.toLowerCase().includes(lowerTerm)
      );
    };
  }, [permissions]);

  return {
    permissions,
    groupedPermissions,
    getPermissionsByModule,
    searchPermissions
  };
};