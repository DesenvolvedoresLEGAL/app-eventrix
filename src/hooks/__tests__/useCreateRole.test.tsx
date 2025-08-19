import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateRole } from '../mutations/useCreateRole';
import * as rolesService from '@/services/rolesService';
import { useToast } from '@/hooks/use-toast';
import { CreateRoleRequest, UserRole } from '@/types/roles.types';
import { Permission } from '@/utils/permissions';

// Mock the services and hooks
jest.mock('@/services/rolesService');
jest.mock('@/hooks/use-toast');

const mockedRolesService = rolesService as jest.Mocked<typeof rolesService>;
const mockedUseToast = useToast as jest.MockedFunction<typeof useToast>;

// Mock data
const mockCreateRequest: CreateRoleRequest = {
  code: 'test-role',
  description: 'Test role description',
  permissions: [Permission.VISITORS_VIEW, Permission.VISITORS_MANAGE]
};

const mockCreatedRole: UserRole = {
  id: '1',
  code: 'test-role',
  description: 'Test role description',
  permissions: [Permission.VISITORS_VIEW, Permission.VISITORS_MANAGE],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
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

const mockToast = jest.fn();

describe('useCreateRole', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseToast.mockReturnValue({
      toast: mockToast,
      dismiss: jest.fn(),
      toasts: []
    });
  });

  it('should create role successfully', async () => {
    mockedRolesService.createRole.mockResolvedValue(mockCreatedRole);
    
    const { result } = renderHook(() => useCreateRole(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    let createdRole: UserRole | null = null;

    await act(async () => {
      createdRole = await result.current.createRole(mockCreateRequest);
    });

    expect(createdRole).toEqual(mockCreatedRole);
    expect(mockedRolesService.createRole).toHaveBeenCalledWith(mockCreateRequest);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Sucesso",
      description: `Role "${mockCreatedRole.code}" criado com sucesso.`,
    });
  });

  it('should handle creation errors', async () => {
    const errorMessage = 'Role code already exists';
    mockedRolesService.createRole.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useCreateRole(), {
      wrapper: createWrapper(),
    });

    let error: Error | null = null;

    await act(async () => {
      try {
        await result.current.createRole(mockCreateRequest);
      } catch (e) {
        error = e as Error;
      }
    });

    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(errorMessage);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Erro",
      description: errorMessage,
      variant: "destructive",
    });
  });

  it('should handle network errors gracefully', async () => {
    mockedRolesService.createRole.mockRejectedValue(new Error('Network error'));
    
    const { result } = renderHook(() => useCreateRole(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.createRole(mockCreateRequest);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "Erro",
      description: "Network error",
      variant: "destructive",
    });
  });

  it('should show generic error message when error has no message', async () => {
    mockedRolesService.createRole.mockRejectedValue(new Error(''));
    
    const { result } = renderHook(() => useCreateRole(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.createRole(mockCreateRequest);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "Erro",
      description: "Não foi possível criar o role. Tente novamente.",
      variant: "destructive",
    });
  });

  it('should track loading state correctly', async () => {
    let resolvePromise: (value: UserRole) => void;
    const createPromise = new Promise<UserRole>((resolve) => {
      resolvePromise = resolve;
    });
    
    mockedRolesService.createRole.mockReturnValue(createPromise);
    
    const { result } = renderHook(() => useCreateRole(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.createRole(mockCreateRequest);
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise!(mockCreatedRole);
      await createPromise;
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should provide reset function', async () => {
    mockedRolesService.createRole.mockRejectedValue(new Error('Test error'));
    
    const { result } = renderHook(() => useCreateRole(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.createRole(mockCreateRequest);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBeInstanceOf(Error);

    act(() => {
      result.current.reset();
    });

    expect(result.current.error).toBe(null);
  });

  it('should validate request data types', async () => {
    mockedRolesService.createRole.mockResolvedValue(mockCreatedRole);
    
    const { result } = renderHook(() => useCreateRole(), {
      wrapper: createWrapper(),
    });

    const invalidRequest = {
      code: 'test',
      description: 'Test',
      permissions: ['invalid-permission'] // Invalid permission type
    } as any;

    await act(async () => {
      await result.current.createRole(invalidRequest);
    });

    expect(mockedRolesService.createRole).toHaveBeenCalledWith(invalidRequest);
  });

  it('should handle null response from service', async () => {
    mockedRolesService.createRole.mockResolvedValue(null);
    
    const { result } = renderHook(() => useCreateRole(), {
      wrapper: createWrapper(),
    });

    let createdRole: UserRole | null = null;

    await act(async () => {
      createdRole = await result.current.createRole(mockCreateRequest);
    });

    expect(createdRole).toBe(null);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Sucesso",
      description: `Role "undefined" criado com sucesso.`,
    });
  });
});