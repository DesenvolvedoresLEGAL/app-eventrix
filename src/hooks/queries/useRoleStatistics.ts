import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { RoleStats } from '@/types/roles.types';
import { 
  getRoleStatistics, 
  getUserRoleDistribution, 
  getPermissionUsageStats,
  getRoleGrowthStats 
} from '@/services/roleStatsService';
import { useMemo } from 'react';

export interface UseRoleStatisticsReturn {
  statistics: RoleStats | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useRoleStatistics = (): UseRoleStatisticsReturn => {
  const query: UseQueryResult<RoleStats, Error> = useQuery({
    queryKey: ['roleStatistics'],
    queryFn: getRoleStatistics,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    statistics: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

export interface UseUserDistributionReturn {
  distribution: Array<{ roleName: string; userCount: number; percentage: number }>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useUserRoleDistribution = (): UseUserDistributionReturn => {
  const query: UseQueryResult<Array<{ roleName: string; userCount: number; percentage: number }>, Error> = useQuery({
    queryKey: ['userRoleDistribution'],
    queryFn: getUserRoleDistribution,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    distribution: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

export interface UsePermissionUsageReturn {
  usage: Array<{ permission: string; roleCount: number; userCount: number }>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const usePermissionUsageStats = (): UsePermissionUsageReturn => {
  const query: UseQueryResult<Array<{ permission: string; roleCount: number; userCount: number }>, Error> = useQuery({
    queryKey: ['permissionUsageStats'],
    queryFn: getPermissionUsageStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    usage: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

export interface UseRoleGrowthReturn {
  growth: Array<{ date: string; rolesCreated: number; usersAssigned: number }>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useRoleGrowthStats = (days: number = 30): UseRoleGrowthReturn => {
  const query: UseQueryResult<Array<{ date: string; rolesCreated: number; usersAssigned: number }>, Error> = useQuery({
    queryKey: ['roleGrowthStats', days],
    queryFn: () => getRoleGrowthStats(days),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    growth: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};