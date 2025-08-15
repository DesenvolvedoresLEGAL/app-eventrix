import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserRole } from '@/types/roles.types';
import { getAllRoles, getRoleById } from '@/services/rolesService';
import { useMemo } from 'react';

export interface UseRolesReturn {
  roles: UserRole[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useRoles = (): UseRolesReturn => {
  const query: UseQueryResult<UserRole[], Error> = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    roles: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

export interface UseRoleReturn {
  role: UserRole | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useRole = (id: string | undefined): UseRoleReturn => {
  const query: UseQueryResult<UserRole | null, Error> = useQuery({
    queryKey: ['role', id],
    queryFn: () => id ? getRoleById(id) : Promise.resolve(null),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return useMemo(() => ({
    role: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }), [query.data, query.isLoading, query.error, query.refetch]);
};

export interface UseFilteredRolesReturn extends UseRolesReturn {
  filteredRoles: UserRole[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterBy: string;
  setFilterBy: (filter: string) => void;
}

export const useFilteredRoles = () => {
  const { roles, isLoading, error, refetch } = useRoles();

  // This would be enhanced with actual filtering logic
  // For now, returning base functionality
  return useMemo(() => ({
    roles,
    filteredRoles: roles, // Will be enhanced with filtering
    isLoading,
    error,
    refetch,
    searchTerm: '',
    setSearchTerm: () => {},
    filterBy: 'all',
    setFilterBy: () => {},
  }), [roles, isLoading, error, refetch]);
};