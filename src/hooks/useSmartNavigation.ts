import { useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from './usePermissions';
import { useAuth } from '@/context/AuthContext';
import { getFirstAccessibleRoute } from '@/utils/navigationUtils';
import { debugUserPermissions } from '@/utils/rbacValidator';
import { useErrorHandler } from './useErrorHandler';
import { usePerformance } from './usePerformance';

export interface SmartNavigationReturn {
  /** Primeira rota acessível para o usuário */
  firstAccessibleRoute: { route: string; displayName: string } | null;
  /** Função para redirecionar para a primeira rota acessível */
  redirectToFirstAccessible: () => void;
  /** Indica se ainda está verificando permissões */
  isLoading: boolean;
  /** Indica se o usuário não tem acesso a nenhuma rota */
  hasNoAccess: boolean;
  /** Erro durante cálculo de navegação */
  error: any;
  /** Limpar erro de navegação */
  clearError: () => void;
  /** Tentar recalcular navegação */
  retry: () => Promise<void>;
}

/**
 * Hook para navegação inteligente baseada em permissões do usuário
 * Encontra automaticamente a primeira rota acessível e fornece função de redirecionamento
 */
export const useSmartNavigation = (): SmartNavigationReturn => {
  const { hasPermission, isLoading, userRole } = usePermissions();
  const { userPermissions } = useAuth();
  const navigate = useNavigate();
  const { error, handleError, clearError, retry, setRetryHandler } = useErrorHandler({
    maxRetries: 2,
    showToast: false, // Não mostrar toast para erros de navegação
  });
  const { startTimer, cacheRoute, getCachedRoute, prefetchRoute } = usePerformance();

  // Memoizar a primeira rota acessível com cache e performance
  const firstAccessibleRoute = useMemo(() => {
    if (isLoading) return null;
    
    const stopTimer = startTimer('routeCalculationTime');
    
    try {
      // Verificar cache primeiro se temos dados de usuário
      if (userRole?.code && userPermissions.length > 0) {
        const cached = getCachedRoute(userRole.code, userPermissions);
        if (cached) {
          stopTimer();
          return cached;
        }
      }
      
      // Calcular rota se não está em cache
      const route = getFirstAccessibleRoute(hasPermission);
      
      // Cachear resultado se temos dados válidos
      if (route && userRole?.code && userPermissions.length > 0) {
        cacheRoute(userRole.code, userPermissions, route);
      }
      
      stopTimer();
      return route;
    } catch (err) {
      stopTimer();
      console.error('Erro ao calcular primeira rota acessível:', err);
      handleError(err as Error);
      return null;
    }
  }, [hasPermission, isLoading, userRole, userPermissions, startTimer, getCachedRoute, cacheRoute, handleError]);

  // Verificar se o usuário não tem acesso a nenhuma rota
  const hasNoAccess = useMemo(() => {
    return !isLoading && !firstAccessibleRoute && !error;
  }, [isLoading, firstAccessibleRoute, error]);

  // Função para recalcular rota acessível
  const recalculateRoute = useCallback(async () => {
    try {
      const route = getFirstAccessibleRoute(hasPermission);
      if (!route) {
        throw new Error('Nenhuma rota acessível encontrada após recálculo');
      }
      // Não retornar nada para corresponder ao tipo Promise<void>
    } catch (err) {
      throw new Error('Falha ao recalcular rotas acessíveis');
    }
  }, [hasPermission]);

  // Configurar handler de retry
  useMemo(() => {
    setRetryHandler(recalculateRoute);
  }, [setRetryHandler, recalculateRoute]);

  // Prefetch da primeira rota identificada
  useEffect(() => {
    if (firstAccessibleRoute?.route && !isLoading) {
      prefetchRoute(firstAccessibleRoute.route);
    }
  }, [firstAccessibleRoute, isLoading, prefetchRoute]);

  // Função memoizada para redirecionamento com tratamento de erro e performance
  const redirectToFirstAccessible = useCallback(() => {
    const stopTimer = startTimer('redirectTime');
    
    try {
      if (firstAccessibleRoute) {
        // Debug no desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          debugUserPermissions(null, firstAccessibleRoute.route);
          console.log('🚀 Redirecionando para primeira rota acessível:', firstAccessibleRoute);
        }
        
        navigate(firstAccessibleRoute.route, { replace: true });
        stopTimer();
      } else if (!isLoading) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Nenhuma rota acessível encontrada para o usuário');
        }
        
        // Se não há rota acessível, redirecionar para unauthorized
        navigate('/unauthorized', { replace: true });
        stopTimer();
      }
    } catch (err) {
      stopTimer();
      console.error('Erro durante redirecionamento:', err);
      handleError('Falha ao redirecionar para página permitida');
      
      // Fallback: tentar ir para unauthorized
      try {
        navigate('/unauthorized', { replace: true });
      } catch (fallbackErr) {
        console.error('Falha no redirecionamento de fallback:', fallbackErr);
        // Último recurso: recarregar página
        window.location.href = '/unauthorized';
      }
    }
  }, [firstAccessibleRoute, navigate, isLoading, handleError, startTimer]);

  return {
    firstAccessibleRoute,
    redirectToFirstAccessible,
    isLoading,
    hasNoAccess,
    error,
    clearError,
    retry,
  };
};