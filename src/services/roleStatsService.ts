import { supabase } from '@/integrations/supabase/client';
import { RoleStats } from '@/types/roles.types';
import capitalize from '@/utils/stringUtils';

/**
 * Service for role statistics and analytics
 */

export const getRoleStatistics = async (tenantId?: string | null): Promise<RoleStats> => {
  try {
    // Optimized parallel queries - filtered by tenant
    const [rolesResult, usersResult, rolesWithPermissions] = await Promise.all([
      // Get total roles count
      supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true }),
      
      // Get total users count - filtered by tenant
      tenantId
        ? supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('tenant_id', tenantId)
        : supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true }),
      
      // Get roles with permissions for unique permissions calculation
      supabase
        .from('user_roles')
        .select('id, code, description, permissions')
    ]);

    const { count: totalRoles, error: rolesError } = rolesResult;
    const { count: totalUsers, error: usersError } = usersResult;
    const { data: allRoles, error: allRolesError } = rolesWithPermissions;

    if (rolesError) {
      console.error('Erro ao contar roles:', rolesError);
    }
    if (usersError) {
      console.error('Erro ao contar usuários:', usersError);
    }
    if (allRolesError) {
      console.error('Erro ao buscar roles:', allRolesError);
    }

    // Calculate unique permissions efficiently
    let totalPermissions = 0;
    const allPermissionsSet = new Set<string>();
    
    if (allRoles) {
      allRoles.forEach(role => {
        if (Array.isArray(role.permissions)) {
          role.permissions.forEach((permission: string) => {
            allPermissionsSet.add(permission);
          });
        }
      });
      totalPermissions = allPermissionsSet.size;
    }

    // Get user distribution by role (optimized query) - filtered by tenant
    const userDistributionQuery = supabase
      .from('profiles')
      .select(`
        role,
        user_roles!inner(
          id,
          code,
          description
        )
      `)
      .not('role', 'is', null);

    if (tenantId) {
      userDistributionQuery.eq('tenant_id', tenantId);
    }

    const { data: userDistribution, error: distributionError } = await userDistributionQuery;

    if (distributionError) {
      console.error('Erro ao buscar distribuição de roles:', distributionError);
    }

    // Process distribution data efficiently
    const distributionMap = new Map<string, { code: string; description: string; count: number }>();
    
    if (userDistribution) {
      userDistribution.forEach(profile => {
        if (profile.user_roles) {
          const role = profile.user_roles as any;
          const key = role.code;
          const existing = distributionMap.get(key);
          
          if (existing) {
            existing.count++;
          } else {
            distributionMap.set(key, {
              code: role.code,
              description: role.description || capitalize(role.code.replace('_', ' ')),
              count: 1
            });
          }
        }
      });
    }

    const distributionByRole = Array.from(distributionMap.values())
      .map(item => ({
        code: item.code,
        description: item.description,
        userCount: item.count,
        percentage: totalUsers && totalUsers > 0 ? Math.round((item.count / totalUsers) * 100) : 0
      }))
      .sort((a, b) => b.userCount - a.userCount);

    // Find most used role with better fallback
    const mostUsedRole = distributionByRole.length > 0 ? {
      code: distributionByRole[0].code,
      description: distributionByRole[0].description,
      userCount: distributionByRole[0].userCount
    } : null;

    // Count active roles (roles that have users assigned)
    const activeRoles = distributionByRole.length;

    return {
      totalRoles: totalRoles || 0,
      totalUsers: totalUsers || 0,
      totalPermissions,
      activeRoles,
      mostUsedRole,
      distributionByRole
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas de roles:', error);
    // Return safe fallback values
    return {
      totalRoles: 0,
      totalUsers: 0,
      totalPermissions: 0,
      activeRoles: 0,
      mostUsedRole: null,
      distributionByRole: []
    };
  }
};

export const getUserRoleDistribution = async (tenantId?: string | null): Promise<Array<{ roleName: string; userCount: number; percentage: number }>> => {
  try {
    const distributionQuery = supabase
      .from('profiles')
      .select(`
        role,
        user_roles!inner(
          code,
          description
        )
      `);

    if (tenantId) {
      distributionQuery.eq('tenant_id', tenantId);
    }

    const { data: distribution, error } = await distributionQuery;

    if (error) {
      console.error('Erro ao buscar distribuição de usuários:', error);
      return [];
    }

    if (!distribution) return [];

    // Count users by role
    const roleCount = new Map<string, { name: string; count: number }>();
    let totalUsers = 0;

    distribution.forEach(profile => {
      if (profile.user_roles) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const role = profile.user_roles as any;
        const roleName = role.code || role.description;
        
        if (roleCount.has(roleName)) {
          roleCount.get(roleName)!.count++;
        } else {
          roleCount.set(roleName, { name: roleName, count: 1 });
        }
        totalUsers++;
      }
    });

    // Convert to array with percentages
    return Array.from(roleCount.values())
      .map(role => ({
        roleName: capitalize(role.name.replace('_', ' ')),
        userCount: role.count,
        percentage: totalUsers > 0 ? Math.round((role.count / totalUsers) * 100) : 0
      }))
      .sort((a, b) => b.userCount - a.userCount);
  } catch (error) {
    console.error('Erro ao buscar distribuição de usuários por role:', error);
    return [];
  }
};

export const getPermissionUsageStats = async (tenantId?: string | null): Promise<Array<{ permission: string; roleCount: number; userCount: number }>> => {
  try {
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('id, permissions');

    if (rolesError) {
      console.error('Erro ao buscar roles:', rolesError);
      return [];
    }

    if (!roles) return [];

    // Count permission usage across roles
    const permissionStats = new Map<string, { roleCount: number; roleIds: Set<string> }>();

    roles.forEach(role => {
      if (Array.isArray((role as any).permissions)) {
        (role as any).permissions.forEach((permission: string) => {
          if (permissionStats.has(permission)) {
            permissionStats.get(permission)!.roleCount++;
            permissionStats.get(permission)!.roleIds.add((role as any).id);
          } else {
            permissionStats.set(permission, {
              roleCount: 1,
              roleIds: new Set([(role as any).id])
            });
          }
        });
      }
    });

    // Get user counts for each role - filtered by tenant
    const userCountsQuery = supabase
      .from('profiles')
      .select('role');

    if (tenantId) {
      userCountsQuery.eq('tenant_id', tenantId);
    }

    const { data: userCounts, error: userCountsError } = await userCountsQuery;

    if (userCountsError) {
      console.error('Erro ao buscar contagem de usuários:', userCountsError);
    }

    const roleUserCounts = new Map<string, number>();
    if (userCounts) {
      userCounts.forEach(profile => {
        if (profile.role) {
          roleUserCounts.set(profile.role, (roleUserCounts.get(profile.role) || 0) + 1);
        }
      });
    }

    // Calculate user count for each permission
    return Array.from(permissionStats.entries()).map(([permission, stats]) => {
      let userCount = 0;
      stats.roleIds.forEach(roleId => {
        userCount += roleUserCounts.get(roleId) || 0;
      });

      return {
        permission,
        roleCount: stats.roleCount,
        userCount
      };
    }).sort((a, b) => b.userCount - a.userCount);
  } catch (error) {
    console.error('Erro ao buscar estatísticas de uso de permissões:', error);
    return [];
  }
};

export const getRoleGrowthStats = async (days: number = 30): Promise<Array<{ date: string; rolesCreated: number; usersAssigned: number }>> => {
  try {
    // For now, return mock data since we don't have created_at tracking in the current schema
    // In a real implementation, you would query actual creation dates
    const growthData = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      growthData.push({
        date: date.toISOString().split('T')[0],
        rolesCreated: Math.floor(Math.random() * 3), // Mock data
        usersAssigned: Math.floor(Math.random() * 10) // Mock data
      });
    }

    return growthData;
  } catch (error) {
    console.error('Erro ao buscar estatísticas de crescimento:', error);
    return [];
  }
};