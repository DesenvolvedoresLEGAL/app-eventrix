import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from './usePermissions';
import { getFirstAccessibleRoute } from '@/utils/navigationUtils';
import { debugUserPermissions } from '@/utils/rbacValidator';
import { useErrorHandler } from './useErrorHandler';

export interface OptimizedSmartNavigationReturn {
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
 * Hook otimizado para navegação inteligente baseada em permissões do usuário
 * Usa memoização para evitar recálculos desnecessários e melhorar performance
 */
export const useOptimizedSmartNavigation = (): OptimizedSmartNavigationReturn => {
  const { hasPermission, isLoading } = usePermissions();
  const navigate = useNavigate();
  const { error, handleError, clearError, retry, setRetryHandler } = useErrorHandler({
    maxRetries: 2,
    showToast: false, // Não mostrar toast para erros de navegação
  });

  // Memoizar a primeira rota acessível para evitar recálculos desnecessários
  const firstAccessibleRoute = useMemo(() => {
    if (isLoading) return null;
    
    try {
      return getFirstAccessibleRoute(hasPermission);
    } catch (err) {
      console.error('Erro ao calcular primeira rota acessível:', err);
      handleError(err as Error);
      return null;
    }
  }, [hasPermission, isLoading, handleError]);

  // Verificar se o usuário não tem acesso a nenhuma rota - memoizado
  const hasNoAccess = useMemo(() => {
    return !isLoading && !firstAccessibleRoute && !error;
  }, [isLoading, firstAccessibleRoute, error]);

  // Função memoizada para recalcular rota acessível
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

  // Configurar handler de retry - memoizado
  useMemo(() => {
    setRetryHandler(recalculateRoute);
  }, [setRetryHandler, recalculateRoute]);

  // Função memoizada para redirecionamento com tratamento de erro otimizado
  const redirectToFirstAccessible = useCallback(() => {
    try {
      if (firstAccessibleRoute) {
        // Debug no desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          debugUserPermissions(null, firstAccessibleRoute.route);
          console.log('🚀 Redirecionando para primeira rota acessível:', firstAccessibleRoute);
        }
        navigate(firstAccessibleRoute.route, { replace: true });
      } else if (!isLoading) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Nenhuma rota acessível encontrada para o usuário');
        }
        
        // Se não há rota acessível, redirecionar para unauthorized
        navigate('/unauthorized', { replace: true });
      }
    } catch (err) {
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
  }, [firstAccessibleRoute, navigate, isLoading, handleError]);

  // Retornar objeto memoizado para evitar re-renders desnecessários
  return useMemo(() => ({
    firstAccessibleRoute,
    redirectToFirstAccessible,
    isLoading,
    hasNoAccess,
    error,
    clearError,
    retry,
  }), [
    firstAccessibleRoute,
    redirectToFirstAccessible,
    isLoading,
    hasNoAccess,
    error,
    clearError,
    retry
  ]);
};