
import React, { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useRolePermissions } from '@/hooks/useRolePermissions'
import { hasPermission } from '@/utils/permissions'
import { RoleBasedRouteProps } from '@/types/permissions'

// Spinner de tela cheia para estados de carregamento
const FullPageSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-foreground mb-2">Carregando...</h2>
      <p className="text-muted-foreground">Aguarde um momento</p>
    </div>
  </div>
)

// Estendemos as props para aceitar requiredPermissions (lista) mantendo compatibilidade
// com a API anterior (requiredPermission singular)
type ExtendedRoleBasedRouteProps = RoleBasedRouteProps & {
  requiredPermissions?: string[]
}

const RoleBasedRoute: React.FC<ExtendedRoleBasedRouteProps> = ({
  children,
  allowedRoles,
  // novo array de permissões (tem precedência se fornecido)
  requiredPermissions,
  // compatibilidade com a prop anterior singular
  requiredPermission,
  // UX melhor ao redirecionar quando não autorizado
  fallbackPath = '/dashboard',
  strict = false,
}) => {
  // 1) SEMPRE verificar carregamento primeiro
  const { loading, isAuthenticated, userRole } = useAuth()
  const userPermissions = useRolePermissions()
  const location = useLocation()
  // 3) Calcular permissões e autorização ANTES de quaisquer returns (mantém ordem dos hooks)
  const permissionList = useMemo(() => {
    if (requiredPermissions && requiredPermissions.length > 0) return requiredPermissions
    if (requiredPermission) return [requiredPermission]
    return [] // nenhuma permissão específica exigida
  }, [requiredPermissions, requiredPermission])

  const isAuthorized = useMemo(() => {
    // Se nenhuma permissão foi exigida explicitamente, considerar autorizado
    if (permissionList.length === 0) return true

    // Precisa ter pelo menos uma das permissões
    return permissionList.some((perm) =>
      hasPermission(userPermissions, perm, allowedRoles, strict)
    )
  }, [permissionList, userPermissions, allowedRoles, strict])

  // Evita loop de redirecionamento quando fallbackPath === rota atual
  const safeFallbackPath = useMemo(() => {
    const target = fallbackPath || '/access-denied'
    return location.pathname === target ? '/access-denied' : target
  }, [location.pathname, fallbackPath])

  // 1) SEMPRE verificar carregamento primeiro
  if (loading) {
    // Não executa mais nenhuma lógica enquanto carrega
    return <FullPageSpinner />
  }

  // 2) Só depois do carregamento, verificar autenticação
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Condição de não autorizado: userRole ausente (mesmo após loading) OU sem permissão
  if (!userRole || !isAuthorized) {
    return <Navigate to={safeFallbackPath} replace />
  }

  // 4) Renderizar conteúdo protegido
  // Preferimos Outlet para rotas aninhadas; mantemos compatibilidade com children
  return children ?? <Outlet />
}

export default RoleBasedRoute

