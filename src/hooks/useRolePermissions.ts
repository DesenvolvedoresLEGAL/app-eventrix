
import { useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { UserPermissions, DEFAULT_PERMISSIONS } from '@/types/permissions'

export const useRolePermissions = (): UserPermissions => {
  const { userRole, loading } = useAuth()

  const permissions = useMemo(() => {
    if (!userRole?.code) {
      return []
    }

    const rolePermissions = DEFAULT_PERMISSIONS[userRole.code] || []
    return rolePermissions
  }, [userRole?.code])

  const userPermissions = useMemo(() => ({
    role: userRole?.code || '',
    permissions,
    isFetching: loading
  }), [userRole?.code, permissions, loading])

  return userPermissions
}
