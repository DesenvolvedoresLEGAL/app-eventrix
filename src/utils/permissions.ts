
import { UserPermissions } from '@/types/permissions'
import { checkRouteAccess, UserRole, hasHigherOrEqualRole } from '@/shared/config/permissions'

/**
 * Verifica se o usuário tem permissão para acessar determinado recurso
 * Agora usa o sistema centralizado de permissões com verificação combinada
 * 
 * @param userPermissions - Objeto contendo role e permissions do usuário
 * @param requiredPermission - Permissão específica necessária (opcional)
 * @param allowedRoles - Lista de roles permitidos (opcional)
 * @param strict - Se true, ambos allowedRoles E requiredPermission devem ser atendidos quando ambos são fornecidos
 * @returns boolean indicando se o usuário tem acesso
 */
export const hasPermission = (
  userPermissions: UserPermissions,
  requiredPermission?: string,
  allowedRoles?: string[],
  strict: boolean = false
): boolean => {
  const { role, permissions } = userPermissions

  // Se não há role definido, negue acesso
  if (!role) {
    return false
  }

  // Owner tem acesso total (exceto se strict mode e há restrições específicas)
  if (role === 'owner') {
    // Em modo strict, owner ainda precisa atender critérios específicos se definidos
    if (strict && (requiredPermission || allowedRoles)) {
      return hasPermissionStrict(role, permissions, requiredPermission, allowedRoles)
    }
    return true
  }

  // Modo strict: ambos allowedRoles E requiredPermission devem ser atendidos
  if (strict && allowedRoles && requiredPermission) {
    const hasRole = allowedRoles.includes(role)
    const hasRequiredPermission = permissions.includes('*') || permissions.includes(requiredPermission)
    return hasRole && hasRequiredPermission
  }

  // Se há roles específicos permitidos, verifique se o role atual está incluído
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = allowedRoles.includes(role)
    
    // Se também há permissão requerida (modo padrão - OR), verifica ambos
    if (requiredPermission && !strict) {
      const hasRequiredPermission = permissions.includes('*') || permissions.includes(requiredPermission)
      return hasRole || hasRequiredPermission
    }
    
    return hasRole
  }

  // Se há permissão específica requerida, verifique se o usuário a possui
  if (requiredPermission) {
    return permissions.includes('*') || permissions.includes(requiredPermission)
  }

  // Se chegou até aqui sem especificar restrições, negue acesso por segurança
  console.warn('hasPermission called without restrictions - denying access by default')
  return false
}

/**
 * Função auxiliar para verificação strict de permissões
 */
const hasPermissionStrict = (
  role: string,
  permissions: string[],
  requiredPermission?: string,
  allowedRoles?: string[]
): boolean => {
  const hasRole = !allowedRoles || allowedRoles.includes(role)
  const hasRequiredPermission = !requiredPermission || 
    permissions.includes('*') || 
    permissions.includes(requiredPermission)
  
  return hasRole && hasRequiredPermission
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
