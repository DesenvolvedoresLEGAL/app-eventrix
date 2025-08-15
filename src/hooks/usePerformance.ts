import { useMemo, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Permission } from '@/utils/permissions';

interface PerformanceMetrics {
  authLoadTime: number;
  permissionCalculationTime: number;
  routeCalculationTime: number;
  redirectTime: number;
  totalLoginTime: number;
}

interface RouteCache {
  userRole: string;
  permissions: Permission[];
  firstAccessibleRoute: { route: string; displayName: string } | null;
  timestamp: number;
  expiryTime: number;
}

interface UsePerformanceReturn {
  metrics: PerformanceMetrics;
  clearMetrics: () => void;
  startTimer: (key: keyof PerformanceMetrics) => () => void;
  cacheRoute: (userRole: string, permissions: Permission[], route: any) => void;
  getCachedRoute: (userRole: string, permissions: Permission[]) => any | null;
  clearCache: () => void;
  prefetchRoute: (route: string) => void;
}

const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutos
const CACHE_KEY = 'eventrix_route_cache';

export const usePerformance = (): UsePerformanceReturn => {
  const { userRole } = useAuth();
  const metricsRef = useRef<PerformanceMetrics>({
    authLoadTime: 0,
    permissionCalculationTime: 0,
    routeCalculationTime: 0,
    redirectTime: 0,
    totalLoginTime: 0,
  });
  const timersRef = useRef<Record<string, number>>({});

  // Cache em memória para performance
  const cacheRef = useRef<Map<string, RouteCache>>(new Map());

  // Memoização agressiva do cache key
  const getCacheKey = useCallback((userRole: string, permissions: Permission[]) => {
    return `${userRole}_${permissions.sort().join(',')}`;
  }, []);

  const startTimer = useCallback((key: keyof PerformanceMetrics) => {
    const startTime = performance.now();
    timersRef.current[key] = startTime;
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      metricsRef.current[key] = duration;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ Performance ${key}: ${duration.toFixed(2)}ms`);
      }
    };
  }, []);

  const clearMetrics = useCallback(() => {
    metricsRef.current = {
      authLoadTime: 0,
      permissionCalculationTime: 0,
      routeCalculationTime: 0,
      redirectTime: 0,
      totalLoginTime: 0,
    };
    timersRef.current = {};
  }, []);

  // Cache de rotas com expiração
  const cacheRoute = useCallback((userRole: string, permissions: Permission[], route: any) => {
    const cacheKey = getCacheKey(userRole, permissions);
    const cacheEntry: RouteCache = {
      userRole,
      permissions: [...permissions],
      firstAccessibleRoute: route,
      timestamp: Date.now(),
      expiryTime: Date.now() + CACHE_EXPIRY_TIME,
    };
    
    cacheRef.current.set(cacheKey, cacheEntry);
    
    // Persistir no localStorage para sessões futuras
    try {
      const existingCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
      existingCache[cacheKey] = cacheEntry;
      localStorage.setItem(CACHE_KEY, JSON.stringify(existingCache));
    } catch (error) {
      console.warn('Erro ao salvar cache de rotas:', error);
    }
  }, [getCacheKey]);

  const getCachedRoute = useCallback((userRole: string, permissions: Permission[]): any | null => {
    const cacheKey = getCacheKey(userRole, permissions);
    
    // Verificar cache em memória primeiro
    let cached = cacheRef.current.get(cacheKey);
    
    // Se não encontrou em memória, verificar localStorage
    if (!cached) {
      try {
        const storedCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        cached = storedCache[cacheKey];
        
        if (cached) {
          // Restaurar no cache em memória
          cacheRef.current.set(cacheKey, cached);
        }
      } catch (error) {
        console.warn('Erro ao carregar cache de rotas:', error);
      }
    }
    
    // Verificar se o cache não expirou
    if (cached && Date.now() < cached.expiryTime) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🎯 Cache hit para rota:', cached.firstAccessibleRoute);
      }
      return cached.firstAccessibleRoute;
    }
    
    // Remover cache expirado
    if (cached) {
      cacheRef.current.delete(cacheKey);
      try {
        const storedCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        delete storedCache[cacheKey];
        localStorage.setItem(CACHE_KEY, JSON.stringify(storedCache));
      } catch (error) {
        console.warn('Erro ao limpar cache expirado:', error);
      }
    }
    
    return null;
  }, [getCacheKey]);

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.warn('Erro ao limpar cache:', error);
    }
  }, []);

  // Prefetch da rota para melhor performance
  const prefetchRoute = useCallback((route: string) => {
    if (!route || typeof window === 'undefined') return;
    
    // Prefetch do chunk da rota
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
    
    // Simular carregamento da rota
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Fazer fetch dos dados críticos da página se necessário
        console.log(`🚀 Prefetching route: ${route}`);
      });
    }
  }, []);

  const metrics = useMemo(() => metricsRef.current, []);

  return {
    metrics,
    clearMetrics,
    startTimer,
    cacheRoute,
    getCachedRoute,
    clearCache,
    prefetchRoute,
  };
};