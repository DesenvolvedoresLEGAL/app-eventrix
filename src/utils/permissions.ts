
import { UserPermissions } from '@/types/permissions'
import { checkRouteAccess, UserRole, hasHigherOrEqualRole } from '@/shared/config/permissions'

/**
 * Verifica se o usuário tem permissão para acessar determinado recurso
 * Agora usa o sistema centralizado de permissões
 */
export const hasPermission = (
  userPermissions: UserPermissions,
  requiredPermission?: string,
  allowedRoles?: string[]
): boolean => {
  const { role, permissions } = userPermissions

  // Se não há role definido, negue acesso
  if (!role) {
    return false
  }

  // Owner tem acesso total
  if (role === 'owner') {
    return true
  }

  // Se há roles específicos permitidos, verifique se o role atual está incluído
  if (allowedRoles && allowedRoles.length > 0) {
    return allowedRoles.includes(role)
  }

  // Se há permissão específica requerida, verifique se o usuário a possui
  if (requiredPermission) {
    return permissions.includes('*') || permissions.includes(requiredPermission)
  }

  // Por padrão, permita acesso se não há restrições específicas
  return true
}

/**
 * Verifica se o usuário tem acesso a uma rota específica
 * Usa a configuração centralizada de rotas
 */
export const hasRouteAccess = (route: string, userRole: string): boolean => {
  const accessCheck = checkRouteAccess(route, userRole as UserRole)
  return accessCheck.hasAccess
}

/**
 * Verifica se um cargo é superior ou igual a outro
 */
export const canAccessRoleLevel = (userRole: string, requiredRole: string): boolean => {
  return hasHigherOrEqualRole(userRole as UserRole, requiredRole as UserRole)
}

/**
 * Função de refresh para revalidar permissões (placeholder para implementação futura)
 */
export const refreshPermissions = async (): Promise<void> => {
  // TODO: Implementar lógica de refresh das permissões
  console.log('Refreshing permissions...')
}
