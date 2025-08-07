
import { UserPermissions } from '@/types/permissions'

/**
 * Verifica se o usuário tem permissão para acessar determinado recurso
 * @param userPermissions - Objeto com role e permissions do usuário
 * @param requiredPermission - Permissão necessária para acessar o recurso
 * @param allowedRoles - Array de roles permitidos (opcional)
 * @returns boolean indicando se tem permissão
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
 * Função de refresh para revalidar permissões (placeholder para implementação futura)
 */
export const refreshPermissions = async (): Promise<void> => {
  // TODO: Implementar lógica de refresh das permissões
  console.log('Refreshing permissions...')
}
