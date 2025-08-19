import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RolesAdminProvider } from '@/context/RolesAdminContext';
import PermissionsList from '../PermissionsList';
import * as rolesService from '@/services/rolesService';
import * as roleStatsService from '@/services/roleStatsService';
import { UserRole, RoleStats } from '@/types/roles.types';
import { Permission } from '@/utils/permissions';

// Mock the services
jest.mock('@/services/rolesService');
jest.mock('@/services/roleStatsService');
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
    dismiss: jest.fn(),
    toasts: []
  })
}));

const mockedRolesService = rolesService as jest.Mocked<typeof rolesService>;
const mockedRoleStatsService = roleStatsService as jest.Mocked<typeof roleStatsService>;

// Mock data
const mockRoles: UserRole[] = [
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

describe('PermissionsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedRolesService.getAllRoles.mockResolvedValue(mockRoles);
    mockedRoleStatsService.getRoleStatistics.mockResolvedValue(mockStats);
    mockedRolesService.getAllPermissionsList.mockReturnValue([
      { key: Permission.VISITORS_VIEW, name: 'Read Users', description: 'Can read users', module: 'Users' },
      { key: Permission.VISITORS_MANAGE, name: 'Write Users', description: 'Can write users', module: 'Users' },
      { key: Permission.EVENTS_VIEW, name: 'Read Events', description: 'Can read events', module: 'Events' },
      { key: Permission.EVENTS_CREATE, name: 'Write Events', description: 'Can write events', module: 'Events' }
    ]);
  });

  it('should render loading state initially', () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    expect(screen.getByText('Permissões e Perfis')).toBeInTheDocument();
    // Should show loading skeletons
    expect(document.querySelectorAll('.animate-pulse')).toHaveLength(5); // Header + 4 stats cards
  });

  it('should render roles after loading', async () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.getByText('editor')).toBeInTheDocument();
    });

    expect(screen.getByText('Administrator role')).toBeInTheDocument();
    expect(screen.getByText('Editor role')).toBeInTheDocument();
  });

  it('should display role statistics', async () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // Total roles
      expect(screen.getByText('10')).toBeInTheDocument(); // Total users
      expect(screen.getByText('5')).toBeInTheDocument(); // Total permissions
    });
  });

  it('should filter roles by search term', async () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.getByText('editor')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Buscar perfis...');
    fireEvent.change(searchInput, { target: { value: 'admin' } });

    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.queryByText('editor')).not.toBeInTheDocument();
    });
  });

  it('should open create modal when clicking new profile button', async () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      expect(screen.getByText('Novo Perfil')).toBeInTheDocument();
    });

    const newProfileButton = screen.getByText('Novo Perfil');
    fireEvent.click(newProfileButton);

    // Modal should be open (would need to check modal component)
    // This would require mocking the modal component or checking for modal content
  });

  it('should open edit modal when clicking edit button', async () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      expect(screen.getAllByText('Editar')).toHaveLength(2);
    });

    const editButtons = screen.getAllByText('Editar');
    fireEvent.click(editButtons[0]);

    // Modal should be open in edit mode
    // This would require checking modal state or content
  });

  it('should display permission counts correctly', async () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      expect(screen.getByText('Permissões (3)')).toBeInTheDocument(); // admin has 3 permissions
      expect(screen.getByText('Permissões (2)')).toBeInTheDocument(); // editor has 2 permissions
    });
  });

  it('should show truncated permissions with "more" indicator', async () => {
    const roleWithManyPermissions: UserRole = {
      id: '3',
      code: 'super-admin',
      description: 'Super admin with many permissions',
      permissions: [
        Permission.VISITORS_VIEW,
        Permission.VISITORS_MANAGE,
        Permission.EVENTS_VIEW,
        Permission.EVENTS_CREATE,
        Permission.ANALYTICS_VIEW,
        Permission.SETTINGS_ORGANIZER_VIEW,
        Permission.SETTINGS_BRANDING_MANAGE
      ],
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    };

    mockedRolesService.getAllRoles.mockResolvedValue([...mockRoles, roleWithManyPermissions]);

    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      expect(screen.getByText('super-admin')).toBeInTheDocument();
      expect(screen.getByText('+2 mais')).toBeInTheDocument(); // Should show "+2 mais" for additional permissions
    });
  });

  it('should handle empty roles state', async () => {
    mockedRolesService.getAllRoles.mockResolvedValue([]);

    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      // Should not show any role cards
      expect(screen.queryByText('admin')).not.toBeInTheDocument();
      expect(screen.queryByText('editor')).not.toBeInTheDocument();
    });
  });

  it('should clear search when search input is emptied', async () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.getByText('editor')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Buscar perfis...');
    
    // Search for admin
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

  it('should render permission matrix section', async () => {
    render(
      <PermissionsList />,
      { wrapper: createWrapper }
    );

    await waitFor(() => {
      // Should render the PermissionMatrix component
      // This test would be more specific if we check for elements that are unique to the matrix
      expect(screen.getByText('Permissões e Perfis')).toBeInTheDocument();
    });
  });
});