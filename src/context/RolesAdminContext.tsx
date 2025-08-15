import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { UserRole } from '@/types/roles.types';
import { useRoles } from '@/hooks/queries/useRoles';
import { useRoleStatistics } from '@/hooks/queries/useRoleStatistics';

interface RolesAdminContextValue {
  // UI States
  selectedRole: UserRole | null;
  filterBy: string;
  searchTerm: string;
  isModalOpen: boolean;
  modalMode: 'create' | 'edit' | 'view';
  sortBy: 'name' | 'users' | 'created';
  sortOrder: 'asc' | 'desc';
  
  // Actions
  setSelectedRole: (role: UserRole | null) => void;
  openModal: (mode: 'create' | 'edit' | 'view', role?: UserRole) => void;
  closeModal: () => void;
  setFilter: (filter: string) => void;
  setSearch: (term: string) => void;
  setSorting: (sortBy: 'name' | 'users' | 'created', order?: 'asc' | 'desc') => void;
  
  // Data
  roles: UserRole[];
  filteredRoles: UserRole[];
  statistics: any;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  refetchRoles: () => void;
  refetchStatistics: () => void;
}

const RolesAdminContext = createContext<RolesAdminContextValue | undefined>(undefined);

interface RolesAdminProviderProps {
  children: ReactNode;
}

export const RolesAdminProvider: React.FC<RolesAdminProviderProps> = ({ children }) => {
  // UI States
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [filterBy, setFilterBy] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('view');
  const [sortBy, setSortBy] = useState<'name' | 'users' | 'created'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Data hooks
  const { roles, isLoading: rolesLoading, error: rolesError, refetch: refetchRoles } = useRoles();
  const { statistics, isLoading: statsLoading, error: statsError, refetch: refetchStatistics } = useRoleStatistics();

  // Combined loading and error states
  const isLoading = rolesLoading || statsLoading;
  const error = rolesError || statsError;

  // Actions
  const openModal = useCallback((mode: 'create' | 'edit' | 'view', role?: UserRole) => {
    setModalMode(mode);
    setSelectedRole(role || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRole(null);
    setModalMode('view');
  }, []);

  const setFilter = useCallback((filter: string) => {
    setFilterBy(filter);
  }, []);

  const setSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const setSorting = useCallback((newSortBy: 'name' | 'users' | 'created', order?: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    if (order) {
      setSortOrder(order);
    } else {
      // Toggle order if same field
      setSortOrder(current => newSortBy === sortBy ? (current === 'asc' ? 'desc' : 'asc') : 'asc');
    }
  }, [sortBy]);

  // Filtered and sorted roles
  const filteredRoles = useMemo(() => {
    let filtered = [...roles];

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(role => 
        role.code.toLowerCase().includes(term) ||
        (role.description && role.description.toLowerCase().includes(term)) ||
        role.permissions.some(permission => 
          permission.toLowerCase().includes(term)
        )
      );
    }

    // Apply category filter
    if (filterBy !== 'all') {
      // This could be enhanced with specific filtering logic
      // For now, keeping all roles when filter is not 'all'
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.code.localeCompare(b.code);
          break;
        case 'users':
          // Would need user count data - for now sort by permissions count
          comparison = a.permissions.length - b.permissions.length;
          break;
        case 'created':
          // Would need creation date - for now sort by code
          comparison = a.code.localeCompare(b.code);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [roles, searchTerm, filterBy, sortBy, sortOrder]);

  const contextValue = useMemo(() => ({
    // UI States
    selectedRole,
    filterBy,
    searchTerm,
    isModalOpen,
    modalMode,
    sortBy,
    sortOrder,
    
    // Actions
    setSelectedRole,
    openModal,
    closeModal,
    setFilter,
    setSearch,
    setSorting,
    
    // Data
    roles,
    filteredRoles,
    statistics,
    isLoading,
    error,
    
    // Refetch functions
    refetchRoles,
    refetchStatistics,
  }), [
    selectedRole, filterBy, searchTerm, isModalOpen, modalMode, sortBy, sortOrder,
    openModal, closeModal, setFilter, setSearch, setSorting,
    roles, filteredRoles, statistics, isLoading, error,
    refetchRoles, refetchStatistics
  ]);

  return (
    <RolesAdminContext.Provider value={contextValue}>
      {children}
    </RolesAdminContext.Provider>
  );
};

export const useRolesAdmin = (): RolesAdminContextValue => {
  const context = useContext(RolesAdminContext);
  if (context === undefined) {
    throw new Error('useRolesAdmin must be used within a RolesAdminProvider');
  }
  return context;
};
