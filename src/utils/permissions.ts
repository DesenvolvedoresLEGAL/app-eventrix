import { UserPermissions } from '@/types/permissions'
import { checkRouteAccess, UserRole, hasHigherOrEqualRole, ROLE_HIERARCHY, ROLE_PERMISSIONS } from '@/shared/config/permissions'

/**
 * Verifica se o usuário tem permissão para acessar determinado recurso
 * Agora usa o sistema centralizado de permissões com verificação combinada e hierarquia
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

  // Verificar se pelo menos uma restrição foi definida
  if (!requiredPermission && (!allowedRoles || allowedRoles.length === 0)) {
    // Em desenvolvimento, exibir warning
    if (process.env.NODE_ENV === 'development') {
      console.warn('hasPermission called without restrictions - denying access by default. Please specify allowedRoles or requiredPermission for security.')
    }
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
    const hasRole = checkRoleWithHierarchy(role, allowedRoles)
    const hasRequiredPermission = checkPermissionWithInheritance(role, requiredPermission, permissions)
    return hasRole && hasRequiredPermission
  }

  // Se há roles específicos permitidos, verifique com hierarquia
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = checkRoleWithHierarchy(role, allowedRoles)
    
    // Se também há permissão requerida (modo padrão - OR), verifica ambos
    if (requiredPermission && !strict) {
      const hasRequiredPermission = checkPermissionWithInheritance(role, requiredPermission, permissions)
      return hasRole || hasRequiredPermission
    }
    
    return hasRole
  }

  // Se há permissão específica requerida, verifique com herança
  if (requiredPermission) {
    return checkPermissionWithInheritance(role, requiredPermission, permissions)
  }

  // Se chegou até aqui sem especificar restrições, negue acesso por segurança
  console.warn('hasPermission called without restrictions - denying access by default')
  return false
}

/**
 * Verifica se o role atual ou algum role superior tem acesso
 * Usa a hierarquia definida em ROLE_HIERARCHY
 */
const checkRoleWithHierarchy = (userRole: string, allowedRoles: string[]): boolean => {
  // Verifica diretamente se o role está permitido
  if (allowedRoles.includes(userRole)) {
    return true
  }

  // Verifica se algum dos roles permitidos é inferior na hierarquia
  // (role com nível menor = maior hierarquia)
  for (const allowedRole of allowedRoles) {
    if (hasHigherOrEqualRole(userRole as UserRole, allowedRole as UserRole)) {
      return true
    }
  }

  return false
}

/**
 * Verifica permissão específica considerando herança via ROLE_HIERARCHY.inheritsFrom
 */
const checkPermissionWithInheritance = (
  userRole: string, 
  requiredPermission: string, 
  userPermissions: string[]
): boolean => {
  // Primeiro verifica se o usuário tem a permissão diretamente
  if (userPermissions.includes('*') || userPermissions.includes(requiredPermission)) {
    return true
  }

  // Verifica se algum role herdado tem a permissão
  const roleHierarchy = ROLE_HIERARCHY[userRole as UserRole]
  if (roleHierarchy?.inheritsFrom) {
    for (const inheritedRole of roleHierarchy.inheritsFrom) {
      const inheritedPermissions = ROLE_PERMISSIONS[inheritedRole] || []
      if (inheritedPermissions.includes('*') || inheritedPermissions.includes(requiredPermission)) {
        return true
      }
    }
  }

  return false
}

/**
 * Função auxiliar para verificação strict de permissões
 * Agora também usa hierarquia
 */
const hasPermissionStrict = (
  role: string,
  permissions: string[],
  requiredPermission?: string,
  allowedRoles?: string[]
): boolean => {
  const hasRole = !allowedRoles || checkRoleWithHierarchy(role, allowedRoles)
  const hasRequiredPermission = !requiredPermission || 
    checkPermissionWithInheritance(role, requiredPermission, permissions)
  
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
