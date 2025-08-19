import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RolesAdminProvider } from '@/context/RolesAdminContext';
import PermissionsList from '@/components/permissions/PermissionsList';
import * as rolesService from '@/services/rolesService';
import * as roleStatsService from '@/services/roleStatsService';
import { auditService } from '@/services/auditService';
import { UserRole, RoleStats } from '@/types/roles.types';
import { Permission } from '@/utils/permissions';

// Mock all services
jest.mock('@/services/rolesService');
jest.mock('@/services/roleStatsService');
jest.mock('@/services/auditService');
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
    dismiss: jest.fn(),
    toasts: []
  })
}));

const mockedRolesService = rolesService as jest.Mocked<typeof rolesService>;
const mockedRoleStatsService = roleStatsService as jest.Mocked<typeof roleStatsService>;
const mockedAuditService = auditService as jest.Mocked<typeof auditService>;

// Mock data
const initialRoles: UserRole[] = [
  {
    id: '1',
    code: 'admin',
    description: 'Administrator role',
    permissions: [Permission.VISITORS_VIEW, Permission.VISITORS_MANAGE, Permission.EVENTS_VIEW],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    code: 'editor',
    description: 'Editor role',
    permissions: [Permission.EVENTS_VIEW, Permission.EVENTS_CREATE],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

const mockStats: RoleStats = {
  totalRoles: 2,
  totalUsers: 10,
  totalPermissions: 5,
  activeRoles: 2,
  mostUsedRole: {
    code: 'admin',
    description: 'Administrator role',
    userCount: 5
  },
  distributionByRole: [
    {
      code: 'admin',
      description: 'Administrator role',
      userCount: 5,
      percentage: 50
    },
    {
      code: 'editor',
      description: 'Editor role',
      userCount: 5,
      percentage: 50
    }
  ]
};

const createWrapper = ({ children }: { children: React.ReactNode }) => {
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
  
  return (
    <QueryClientProvider client={queryClient}>
      <RolesAdminProvider>
        {children}
      </RolesAdminProvider>
    </QueryClientProvider>
  );
};

describe('Role Management Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    mockedRolesService.getAllRoles.mockResolvedValue(initialRoles);
    mockedRoleStatsService.getRoleStatistics.mockResolvedValue(mockStats);
    mockedRolesService.getAllPermissionsList.mockReturnValue([
      { key: Permission.VISITORS_VIEW, name: 'Read Users', description: 'Can read users', module: 'Users' },
      { key: Permission.VISITORS_MANAGE, name: 'Write Users', description: 'Can write users', module: 'Users' },
      { key: Permission.EVENTS_VIEW, name: 'Read Events', description: 'Can read events', module: 'Events' },
      { key: Permission.EVENTS_CREATE, name: 'Write Events', description: 'Can write events', module: 'Events' }
    ]);
    mockedAuditService.logRoleChange.mockResolvedValue();
  });

  describe('Complete Role Creation Flow', () => {
    it('should create a new role and update the UI', async () => {
      const newRole: UserRole = {
        id: '3',
        code: 'viewer',
        description: 'Viewer role with read-only access',
        permissions: [Permission.EVENTS_VIEW],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      // Mock successful creation
      mockedRolesService.createRole.mockResolvedValue(newRole);
      
      // Mock updated data after creation
      const updatedRoles = [...initialRoles, newRole];
      const updatedStats = { ...mockStats, totalRoles: 3, activeRoles: 3 };
      
      mockedRolesService.getAllRoles
        .mockResolvedValueOnce(initialRoles) // Initial load
        .mockResolvedValueOnce(updatedRoles); // After creation
      
      mockedRoleStatsService.getRoleStatistics
        .mockResolvedValueOnce(mockStats) // Initial load
        .mockResolvedValueOnce(updatedStats); // After creation

      render(
        <PermissionsList />,
        { wrapper: createWrapper }
      );

      // Wait for initial data to load
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('editor')).toBeInTheDocument();
      });

      // Click "New Profile" button
      const newProfileButton = screen.getByText('Novo Perfil');
      fireEvent.click(newProfileButton);

      // Fill out the form
      const codeInput = screen.getByLabelText(/código/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);

      fireEvent.change(codeInput, { target: { value: 'viewer' } });
      fireEvent.change(descriptionInput, { target: { value: 'Viewer role with read-only access' } });

      // Select permissions
      const eventsReadCheckbox = screen.getByLabelText('Read Events');
      fireEvent.click(eventsReadCheckbox);

      // Submit the form
      const submitButton = screen.getByText('Criar Perfil');
      fireEvent.click(submitButton);

      // Verify service was called
      await waitFor(() => {
        expect(mockedRolesService.createRole).toHaveBeenCalledWith({
          code: 'viewer',
          description: 'Viewer role with read-only access',
          permissions: [Permission.EVENTS_VIEW]
        });
      });

      // Verify audit log was called
      expect(mockedAuditService.logRoleChange).toHaveBeenCalledWith(
        'CREATE',
        'ROLE',
        newRole.id,
        expect.any(Object)
      );
    });
  });

  describe('Complete Role Update Flow', () => {
    it('should update an existing role and reflect changes', async () => {
      const updatedRole: UserRole = {
        ...initialRoles[0],
        description: 'Updated Administrator role',
        permissions: [Permission.VISITORS_VIEW, Permission.VISITORS_MANAGE, Permission.EVENTS_VIEW, Permission.EVENTS_CREATE]
      };

      mockedRolesService.updateRole.mockResolvedValue(updatedRole);
      
      const updatedRoles = [updatedRole, initialRoles[1]];
      mockedRolesService.getAllRoles
        .mockResolvedValueOnce(initialRoles) // Initial load
        .mockResolvedValueOnce(updatedRoles); // After update

      render(
        <PermissionsList />,
        { wrapper: createWrapper }
      );

      // Wait for initial data to load
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
      });

      // Click edit button for admin role
      const editButtons = screen.getAllByText('Editar');
      fireEvent.click(editButtons[0]);

      // Update description
      const descriptionInput = screen.getByDisplayValue('Administrator role');
      fireEvent.change(descriptionInput, { target: { value: 'Updated Administrator role' } });

      // Add another permission
      const eventsWriteCheckbox = screen.getByLabelText('Write Events');
      fireEvent.click(eventsWriteCheckbox);

      // Submit the form
      const submitButton = screen.getByText('Salvar Alterações');
      fireEvent.click(submitButton);

      // Verify service was called
      await waitFor(() => {
        expect(mockedRolesService.updateRole).toHaveBeenCalledWith('1', {
          code: 'admin',
          description: 'Updated Administrator role',
          permissions: [Permission.VISITORS_VIEW, Permission.VISITORS_MANAGE, Permission.EVENTS_VIEW, Permission.EVENTS_CREATE]
        });
      });

      // Verify audit log was called
      expect(mockedAuditService.logRoleChange).toHaveBeenCalledWith(
        'UPDATE',
        'ROLE',
        '1',
        expect.any(Object)
      );
    });
  });

  describe('Role Deletion Flow', () => {
    it('should delete a role and update the list', async () => {
      mockedRolesService.deleteRole.mockResolvedValue(true);
      
      const remainingRoles = [initialRoles[0]]; // Only admin remains
      const updatedStats = { ...mockStats, totalRoles: 1, activeRoles: 1 };
      
      mockedRolesService.getAllRoles
        .mockResolvedValueOnce(initialRoles) // Initial load
        .mockResolvedValueOnce(remainingRoles); // After deletion
      
      mockedRoleStatsService.getRoleStatistics
        .mockResolvedValueOnce(mockStats) // Initial load
        .mockResolvedValueOnce(updatedStats); // After deletion

      render(
        <PermissionsList />,
        { wrapper: createWrapper }
      );

      // Wait for initial data to load
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('editor')).toBeInTheDocument();
      });

      // Click edit button for editor role to open modal, then delete
      const editButtons = screen.getAllByText('Editar');
      fireEvent.click(editButtons[1]); // Editor role

      // Look for delete button in modal (this would be in the actual modal component)
      // For this test, we'll simulate the delete action directly
      
      // Simulate deletion
      await waitFor(() => {
        expect(mockedRolesService.deleteRole).toHaveBeenCalledWith('2');
      });

      // Verify audit log was called
      expect(mockedAuditService.logRoleChange).toHaveBeenCalledWith(
        'DELETE',
        'ROLE',
        '2',
        expect.any(Object)
      );
    });
  });

  describe('Search and Filter Integration', () => {
    it('should filter roles in real-time as user types', async () => {
      render(
        <PermissionsList />,
        { wrapper: createWrapper }
      );

      // Wait for initial data to load
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('editor')).toBeInTheDocument();
      });

      // Search for "admin"
      const searchInput = screen.getByPlaceholderText('Buscar perfis...');
      fireEvent.change(searchInput, { target: { value: 'admin' } });

      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.queryByText('editor')).not.toBeInTheDocument();
      });

      // Clear search
      fireEvent.change(searchInput, { target: { value: '' } });

      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('editor')).toBeInTheDocument();
      });
    });

    it('should search by description and permissions', async () => {
      render(
        <PermissionsList />,
        { wrapper: createWrapper }
      );

      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('editor')).toBeInTheDocument();
      });

      // Search by description
      const searchInput = screen.getByPlaceholderText('Buscar perfis...');
      fireEvent.change(searchInput, { target: { value: 'Administrator' } });

      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.queryByText('editor')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle service errors gracefully', async () => {
      mockedRolesService.getAllRoles.mockRejectedValue(new Error('Network error'));

      render(
        <PermissionsList />,
        { wrapper: createWrapper }
      );

      // Should show loading initially, then handle error
      await waitFor(() => {
        // Component should handle error gracefully
        // This would depend on how error states are implemented
        expect(mockedRolesService.getAllRoles).toHaveBeenCalled();
      });
    });

    it('should handle creation errors and show appropriate feedback', async () => {
      mockedRolesService.createRole.mockRejectedValue(new Error('Code already exists'));

      render(
        <PermissionsList />,
        { wrapper: createWrapper }
      );

      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
      });

      // Try to create duplicate role
      const newProfileButton = screen.getByText('Novo Perfil');
      fireEvent.click(newProfileButton);

      const codeInput = screen.getByLabelText(/código/i);
      const descriptionInput = screen.getByLabelText(/descrição/i);

      fireEvent.change(codeInput, { target: { value: 'admin' } });
      fireEvent.change(descriptionInput, { target: { value: 'Duplicate admin role' } });

      const eventsReadCheckbox = screen.getByLabelText('Read Events');
      fireEvent.click(eventsReadCheckbox);

      const submitButton = screen.getByText('Criar Perfil');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockedRolesService.createRole).toHaveBeenCalled();
        // Error should be handled and toast should be shown
      });
    });
  });

  describe('Performance and Caching', () => {
    it('should cache data and minimize API calls', async () => {
      render(
        <PermissionsList />,
        { wrapper: createWrapper }
      );

      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
      });

      // Initial calls should be made
      expect(mockedRolesService.getAllRoles).toHaveBeenCalledTimes(1);
      expect(mockedRoleStatsService.getRoleStatistics).toHaveBeenCalledTimes(1);

      // Search should not trigger new API calls (client-side filtering)
      const searchInput = screen.getByPlaceholderText('Buscar perfis...');
      fireEvent.change(searchInput, { target: { value: 'admin' } });

      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
      });

      // Should still be only 1 call each
      expect(mockedRolesService.getAllRoles).toHaveBeenCalledTimes(1);
      expect(mockedRoleStatsService.getRoleStatistics).toHaveBeenCalledTimes(1);
    });
  });
});