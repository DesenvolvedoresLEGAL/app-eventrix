import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoles, useRole } from '../queries/useRoles';
import * as rolesService from '@/services/rolesService';
import { UserRole } from '@/types/roles.types';
import { Permission } from '@/utils/permissions';

// Mock the services
jest.mock('@/services/rolesService');
const mockedRolesService = rolesService as jest.Mocked<typeof rolesService>;

// Mock data
const mockRoles: UserRole[] = [
  {
    id: '1',
    code: 'admin',
    description: 'Administrator role',
    permissions: [Permission.VISITORS_VIEW, Permission.VISITORS_MANAGE],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2', 
    code: 'editor',
    description: 'Editor role',
    permissions: [Permission.ACTIVITIES_VIEW, Permission.ACTIVITIES_MANAGE],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useRoles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch roles successfully', async () => {
    mockedRolesService.getAllRoles.mockResolvedValue(mockRoles);
    
    const { result } = renderHook(() => useRoles(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.roles).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.roles).toEqual(mockRoles);
    expect(result.current.error).toBe(null);
    expect(mockedRolesService.getAllRoles).toHaveBeenCalledTimes(1);
  });

  it('should handle empty roles array', async () => {
    mockedRolesService.getAllRoles.mockResolvedValue([]);
    
    const { result } = renderHook(() => useRoles(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.roles).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('should handle error states', async () => {
    const errorMessage = 'Failed to fetch roles';
    mockedRolesService.getAllRoles.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useRoles(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.roles).toEqual([]);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(errorMessage);
  });

  it('should provide refetch function', async () => {
    mockedRolesService.getAllRoles.mockResolvedValue(mockRoles);
    
    const { result } = renderHook(() => useRoles(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
    
    // Test refetch
    mockedRolesService.getAllRoles.mockClear();
    result.current.refetch();
    
    expect(mockedRolesService.getAllRoles).toHaveBeenCalledTimes(1);
  });

  it('should memoize return values correctly', async () => {
    mockedRolesService.getAllRoles.mockResolvedValue(mockRoles);
    
    const { result, rerender } = renderHook(() => useRoles(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const firstResult = result.current;
    
    // Rerender without changing data
    rerender();
    
    const secondResult = result.current;
    
    // Objects should be the same reference due to memoization
    expect(firstResult.roles).toBe(secondResult.roles);
    expect(firstResult.refetch).toBe(secondResult.refetch);
  });
});

describe('useRole', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch single role successfully', async () => {
    const mockRole = mockRoles[0];
    mockedRolesService.getRoleById.mockResolvedValue(mockRole);
    
    const { result } = renderHook(() => useRole('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.role).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.role).toEqual(mockRole);
    expect(result.current.error).toBe(null);
    expect(mockedRolesService.getRoleById).toHaveBeenCalledWith('1');
  });

  it('should handle role not found', async () => {
    mockedRolesService.getRoleById.mockResolvedValue(null);
    
    const { result } = renderHook(() => useRole('nonexistent'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.role).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should not fetch when id is undefined', () => {
    const { result } = renderHook(() => useRole(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.role).toBe(null);
    expect(mockedRolesService.getRoleById).not.toHaveBeenCalled();
  });

  it('should handle error states', async () => {
    const errorMessage = 'Failed to fetch role';
    mockedRolesService.getRoleById.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useRole('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.role).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(errorMessage);
  });

  it('should refetch when id changes', async () => {
    mockedRolesService.getRoleById.mockResolvedValue(mockRoles[0]);
    
    const { result, rerender } = renderHook(
      ({ id }) => useRole(id),
      {
        wrapper: createWrapper(),
        initialProps: { id: '1' }
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedRolesService.getRoleById).toHaveBeenCalledWith('1');
    
    // Change id
    mockedRolesService.getRoleById.mockClear();
    mockedRolesService.getRoleById.mockResolvedValue(mockRoles[1]);
    
    rerender({ id: '2' });

    await waitFor(() => {
      expect(mockedRolesService.getRoleById).toHaveBeenCalledWith('2');
    });
  });
});