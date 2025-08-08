
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useRolePermissions } from '@/hooks/useRolePermissions'
import { hasPermission } from '@/utils/permissions'
import { RoleBasedRouteProps } from '@/types/permissions'

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-foreground mb-2">Verificando permissões...</h2>
      <p className="text-muted-foreground">Aguarde um momento</p>
    </div>
  </div>
)

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  allowedRoles,
  requiredPermission,
  fallbackPath = '/access-denied',
  strict = false
}) => {
  const { user, session, loading, isAuthenticated } = useAuth()
  const userPermissions = useRolePermissions()
  const { pathname } = useLocation()

  // Primeiro, verificar autenticação
  if (loading || userPermissions.isFetching) {
    return <LoadingScreen />
  }

  // Se não está autenticado, redirecionar para login com redirectTo
  if (!isAuthenticated || !user || !session) {
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(pathname)}`} replace />
  }

  // Verificar permissões usando a nova função melhorada
  const hasAccess = hasPermission(userPermissions, requiredPermission, allowedRoles, strict)

  // Se não tem permissão, redirecionar para página de acesso negado
  if (!hasAccess) {
    return <Navigate to={fallbackPath} replace />
  }

  // Se chegou até aqui, tem acesso - renderizar o componente
  return children
}

export default RoleBasedRoute
