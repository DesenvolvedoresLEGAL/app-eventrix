import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from './usePermissions';
import { getFirstAccessibleRoute } from '@/utils/navigationUtils';
import { debugUserPermissions } from '@/utils/rbacValidator';

export interface SmartNavigationReturn {
  /** Primeira rota acessível para o usuário */
  firstAccessibleRoute: { route: string; displayName: string } | null;
  /** Função para redirecionar para a primeira rota acessível */
  redirectToFirstAccessible: () => void;
  /** Indica se ainda está verificando permissões */
  isLoading: boolean;
  /** Indica se o usuário não tem acesso a nenhuma rota */
  hasNoAccess: boolean;
}

/**
 * Hook para navegação inteligente baseada em permissões do usuário
 * Encontra automaticamente a primeira rota acessível e fornece função de redirecionamento
 */
export const useSmartNavigation = (): SmartNavigationReturn => {
  const { hasPermission, isLoading } = usePermissions();
  const navigate = useNavigate();

  // Memoizar a primeira rota acessível para evitar recálculos desnecessários
  const firstAccessibleRoute = useMemo(() => {
    if (isLoading) return null;
    
    return getFirstAccessibleRoute(hasPermission);
  }, [hasPermission, isLoading]);

  // Verificar se o usuário não tem acesso a nenhuma rota
  const hasNoAccess = useMemo(() => {
    return !isLoading && !firstAccessibleRoute;
  }, [isLoading, firstAccessibleRoute]);

  // Função memoizada para redirecionamento
  const redirectToFirstAccessible = useCallback(() => {
    if (firstAccessibleRoute) {
      // Debug no desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        debugUserPermissions(null, firstAccessibleRoute.route);
        console.log('🚀 Redirecionando para primeira rota acessível:', firstAccessibleRoute);
      }
      navigate(firstAccessibleRoute.route, { replace: true });
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Nenhuma rota acessível encontrada para o usuário');
    }
  }, [firstAccessibleRoute, navigate]);

  return {
    firstAccessibleRoute,
    redirectToFirstAccessible,
    isLoading,
    hasNoAccess,
  };
};