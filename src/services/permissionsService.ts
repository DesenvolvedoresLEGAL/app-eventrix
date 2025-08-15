import supabase from '@/utils/supabase/client';
import { Permission } from '@/utils/permissions';

export interface UserRole {
  id: string;
  code: string;
  permissions: Permission[];
  description?: string;
}

export interface UserPermissionsResponse {
  permissions: Permission[];
  roleCode: string;
  roleName?: string;
}

/**
 * Busca permissões do usuário baseado no seu profile
 */
export const getUserPermissions = async (userId: string): Promise<UserPermissionsResponse | null> => {
  try {
    // Busca o profile do usuário com role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        role,
        user_roles!inner(
          id,
          code,
          permissions,
          description
        )
      `)
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Erro ao buscar profile do usuário:', profileError);
      return null;
    }

    if (!profile?.user_roles) {
      console.warn('Usuário sem role definido:', userId);
      return null;
    }

    const userRole = profile.user_roles as any;
    
    // Valida se o role tem a estrutura esperada
    if (!userRole || !userRole.code) {
      console.warn('Role inválido para usuário:', userId);
      return null;
    }
    
    return {
      permissions: Array.isArray(userRole.permissions) ? userRole.permissions : [],
      roleCode: userRole.code,
      roleName: userRole.description
    };
  } catch (error) {
    console.error('Erro ao buscar permissões do usuário:', error);
    return null;
  }
};

/**
 * Busca permissões de um role específico
 */
export const getRolePermissions = async (roleCode: string): Promise<Permission[]> => {
  try {
    const { data: role, error } = await supabase
      .from('user_roles')
      .select('permissions')
      .eq('code', roleCode)
      .single();

    if (error) {
      console.error('Erro ao buscar role:', error);
      return [];
    }

    return Array.isArray((role as any)?.permissions) ? (role as any).permissions : [];
  } catch (error) {
    console.error('Erro ao buscar permissões do role:', error);
    return [];
  }
};

/**
 * Busca todos os roles disponíveis
 */
export const getAllRoles = async (): Promise<UserRole[]> => {
  try {
    const { data: roles, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('code');

    if (error) {
      console.error('Erro ao buscar roles:', error);
      return [];
    }

    return (roles || []).map(role => ({
      id: role.id,
      code: role.code,
      permissions: Array.isArray((role as any).permissions) ? (role as any).permissions : [],
      description: role.description
    }));
  } catch (error) {
    console.error('Erro ao buscar roles:', error);
    return [];
  }
};

/**
 * Verifica se um usuário tem uma permissão específica
 */
export const userHasPermission = async (userId: string, permission: Permission): Promise<boolean> => {
  const userPermissions = await getUserPermissions(userId);
  return userPermissions ? userPermissions.permissions.includes(permission) : false;
};