
import { useMemo, useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { UserPermissions, DEFAULT_PERMISSIONS } from '@/types/permissions'
import { setPermissionChangeCallback, refreshPermissions as utilRefreshPermissions } from '@/utils/permissions'

export const useRolePermissions = (): UserPermissions & {
  refreshPermissions: () => Promise<void>
} => {
  const { userRole, loading, refreshTenant } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Memoizar permissões baseadas no código do role
  const permissions = useMemo(() => {
    if (!userRole?.code) {
      return []
    }

    const rolePermissions = DEFAULT_PERMISSIONS[userRole.code] || []
    return rolePermissions
  }, [userRole?.code, refreshTrigger])

  // Memoizar objeto completo de permissões do usuário
  const userPermissions = useMemo(() => ({
    role: userRole?.code || '',
    permissions,
    isFetching: loading
  }), [userRole?.code, permissions, loading])

  // Função para atualizar permissões localmente
  const forceRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  // Função de refresh integrada com AuthContext
  const refreshPermissions = useCallback(async () => {
    try {
      await utilRefreshPermissions(refreshTenant)
    } catch (error) {
      console.error('Failed to refresh permissions:', error)
      throw error
    }
  }, [refreshTenant])

  // Registrar callback para mudanças nas permissões
  useEffect(() => {
    setPermissionChangeCallback(forceRefresh)
    
    return () => {
      setPermissionChangeCallback(null)
    }
  }, [forceRefresh])

  return {
    ...userPermissions,
    refreshPermissions
  }
}
