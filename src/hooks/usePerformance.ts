import { useState, useCallback, useMemo } from 'react';
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

// Singleton para métricas e cache para evitar problemas de dependência circular
class PerformanceManager {
  private static instance: PerformanceManager;
  private metrics: PerformanceMetrics = {
    authLoadTime: 0,
    permissionCalculationTime: 0,
    routeCalculationTime: 0,
    redirectTime: 0,
    totalLoginTime: 0,
  };
  private timers: Record<string, number> = {};
  private cache = new Map<string, RouteCache>();

  static getInstance(): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager();
    }
    return PerformanceManager.instance;
  }

  getCacheKey(userRole: string, permissions: Permission[]): string {
    return `${userRole}_${permissions.sort().join(',')}`;
  }

  startTimer(key: keyof PerformanceMetrics): () => void {
    const startTime = performance.now();
    this.timers[key] = startTime;
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.metrics[key] = duration;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ Performance ${key}: ${duration.toFixed(2)}ms`);
      }
    };
  }

  clearMetrics(): void {
    this.metrics = {
      authLoadTime: 0,
      permissionCalculationTime: 0,
      routeCalculationTime: 0,
      redirectTime: 0,
      totalLoginTime: 0,
    };
    this.timers = {};
  }

  cacheRoute(userRole: string, permissions: Permission[], route: any): void {
    const cacheKey = this.getCacheKey(userRole, permissions);
    const cacheEntry: RouteCache = {
      userRole,
      permissions: [...permissions],
      firstAccessibleRoute: route,
      timestamp: Date.now(),
      expiryTime: Date.now() + CACHE_EXPIRY_TIME,
    };
    
    this.cache.set(cacheKey, cacheEntry);
    
    // Persistir no localStorage para sessões futuras
    try {
      const existingCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
      existingCache[cacheKey] = cacheEntry;
      localStorage.setItem(CACHE_KEY, JSON.stringify(existingCache));
    } catch (error) {
      console.warn('Erro ao salvar cache de rotas:', error);
    }
  }

  getCachedRoute(userRole: string, permissions: Permission[]): any | null {
    const cacheKey = this.getCacheKey(userRole, permissions);
    
    // Verificar cache em memória primeiro
    let cached = this.cache.get(cacheKey);
    
    // Se não encontrou em memória, verificar localStorage
    if (!cached) {
      try {
        const storedCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        cached = storedCache[cacheKey];
        
        if (cached) {
          // Restaurar no cache em memória
          this.cache.set(cacheKey, cached);
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
      this.cache.delete(cacheKey);
      try {
        const storedCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        delete storedCache[cacheKey];
        localStorage.setItem(CACHE_KEY, JSON.stringify(storedCache));
      } catch (error) {
        console.warn('Erro ao limpar cache expirado:', error);
      }
    }
    
    return null;
  }

  clearCache(): void {
    this.cache.clear();
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.warn('Erro ao limpar cache:', error);
    }
  }

  prefetchRoute(route: string): void {
    if (!route || typeof window === 'undefined') return;
    
    // Prefetch do chunk da rota
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
    
    // Simular carregamento da rota
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        console.log(`🚀 Prefetching route: ${route}`);
      });
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
}

export const usePerformance = (): UsePerformanceReturn => {
  const [, forceUpdate] = useState({});
  const manager = useMemo(() => PerformanceManager.getInstance(), []);

  // Força re-render quando métricas mudam
  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  const startTimer = useCallback((key: keyof PerformanceMetrics) => {
    const stopTimer = manager.startTimer(key);
    return () => {
      stopTimer();
      triggerUpdate(); // Força re-render para atualizar métricas na UI
    };
  }, [manager, triggerUpdate]);

  const clearMetrics = useCallback(() => {
    manager.clearMetrics();
    triggerUpdate();
  }, [manager, triggerUpdate]);

  const cacheRoute = useCallback((userRole: string, permissions: Permission[], route: any) => {
    manager.cacheRoute(userRole, permissions, route);
  }, [manager]);

  const getCachedRoute = useCallback((userRole: string, permissions: Permission[]) => {
    return manager.getCachedRoute(userRole, permissions);
  }, [manager]);

  const clearCache = useCallback(() => {
    manager.clearCache();
  }, [manager]);

  const prefetchRoute = useCallback((route: string) => {
    manager.prefetchRoute(route);
  }, [manager]);

  const metrics = useMemo(() => manager.getMetrics(), [manager, forceUpdate]);

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