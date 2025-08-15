import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { auditService, AuditFilters, AuditStats } from '@/services/auditService';
import { AuditLogEntry } from '@/types/roles.types';

export interface UseAuditHistoryReturn {
  entries: AuditLogEntry[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useAuditHistory = (filters: AuditFilters = {}): UseAuditHistoryReturn => {
  const query: UseQueryResult<{
    entries: AuditLogEntry[];
    total: number;
    page: number;
    totalPages: number;
  }, Error> = useQuery({
    queryKey: ['auditHistory', filters],
    queryFn: () => auditService.getAuditHistory(filters),
    staleTime: 30 * 1000, // 30 seconds - audit data changes frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    entries: query.data?.entries || [],
    total: query.data?.total || 0,
    page: query.data?.page || 1,
    totalPages: query.data?.totalPages || 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

export interface UseAuditStatsReturn {
  stats: AuditStats | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useAuditStats = (): UseAuditStatsReturn => {
  const query: UseQueryResult<AuditStats, Error> = useQuery({
    queryKey: ['auditStats'],
    queryFn: () => auditService.getAuditStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return useMemo(() => ({
    stats: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

export interface UseEntityAuditReturn {
  entries: AuditLogEntry[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useEntityAudit = (
  entityType: 'ROLE' | 'PERMISSION' | 'USER_ROLE',
  entityId: string
): UseEntityAuditReturn => {
  const query: UseQueryResult<{
    entries: AuditLogEntry[];
    total: number;
    page: number;
    totalPages: number;
  }, Error> = useQuery({
    queryKey: ['entityAudit', entityType, entityId],
    queryFn: () => auditService.getAuditHistory({
      entityType,
      entityId,
      limit: 50 // Get recent entries for specific entity
    }),
    enabled: !!entityId,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    entries: query.data?.entries || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

export interface UseUserAuditReturn {
  entries: AuditLogEntry[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useUserAudit = (userId: string): UseUserAuditReturn => {
  const query: UseQueryResult<{
    entries: AuditLogEntry[];
    total: number;
    page: number;
    totalPages: number;
  }, Error> = useQuery({
    queryKey: ['userAudit', userId],
    queryFn: () => auditService.getAuditHistory({
      userId,
      limit: 100 // Get recent entries for specific user
    }),
    enabled: !!userId,
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    entries: query.data?.entries || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

// Hook for recent activity across all entities
export interface UseRecentActivityReturn {
  entries: AuditLogEntry[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useRecentActivity = (limit: number = 20): UseRecentActivityReturn => {
  const query: UseQueryResult<{
    entries: AuditLogEntry[];
    total: number;
    page: number;
    totalPages: number;
  }, Error> = useQuery({
    queryKey: ['recentActivity', limit],
    queryFn: () => auditService.getAuditHistory({
      limit,
      page: 1
    }),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
    retry: 2,
  });

  return useMemo(() => ({
    entries: query.data?.entries || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};