import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RoleFormModal } from '../RoleFormModal';
import * as rolesService from '@/services/rolesService';
import { UserRole } from '@/types/roles.types';
import { Permission } from '@/utils/permissions';

// Mock the services
jest.mock('@/services/rolesService');
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
    dismiss: jest.fn(),
    toasts: []
  })
}));

const mockedRolesService = rolesService as jest.Mocked<typeof rolesService>;

// Mock data
const mockRole: UserRole = {
  id: '1',
  code: 'admin',
  description: 'Administrator role',
  permissions: [Permission.USERS_READ, Permission.USERS_WRITE],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
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
      {children}
    </QueryClientProvider>
  );
};

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  mode: 'create' as const,
  role: null
};

describe('RoleFormModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedRolesService.getAllPermissionsList.mockReturnValue([
      { key: Permission.USERS_READ, name: 'Read Users', description: 'Can read users', module: 'Users' },
      { key: Permission.USERS_WRITE, name: 'Write Users', description: 'Can write users', module: 'Users' },
      { key: Permission.EVENTS_READ, name: 'Read Events', description: 'Can read events', module: 'Events' },
      { key: Permission.EVENTS_WRITE, name: 'Write Events', description: 'Can write events', module: 'Events' }
    ]);
  });

  it('should not render when closed', () => {
    render(
      <RoleFormModal {...defaultProps} isOpen={false} />,
      { wrapper: createWrapper }
    );

    expect(screen.queryByText('Novo Perfil')).not.toBeInTheDocument();
  });

  it('should render create mode correctly', () => {
    render(
      <RoleFormModal {...defaultProps} mode="create" />,
      { wrapper: createWrapper }
    );

    expect(screen.getByText('Novo Perfil')).toBeInTheDocument();
    expect(screen.getByText('Criar perfil de acesso')).toBeInTheDocument();
    expect(screen.getByText('Criar Perfil')).toBeInTheDocument();
  });

  it('should render edit mode correctly', () => {
    render(
      <RoleFormModal {...defaultProps} mode="edit" role={mockRole} />,
      { wrapper: createWrapper }
    );

    expect(screen.getByText('Editar Perfil')).toBeInTheDocument();
    expect(screen.getByText('Atualizar perfil de acesso')).toBeInTheDocument();
    expect(screen.getByText('Salvar Alterações')).toBeInTheDocument();
  });

  it('should render view mode correctly', () => {
    render(
      <RoleFormModal {...defaultProps} mode="view" role={mockRole} />,
      { wrapper: createWrapper }
    );

    expect(screen.getByText('Visualizar Perfil')).toBeInTheDocument();
    expect(screen.getByText('Detalhes do perfil de acesso')).toBeInTheDocument();
    expect(screen.queryByText('Criar Perfil')).not.toBeInTheDocument();
    expect(screen.queryByText('Salvar Alterações')).not.toBeInTheDocument();
  });

  it('should populate form with role data in edit mode', () => {
    render(
      <RoleFormModal {...defaultProps} mode="edit" role={mockRole} />,
      { wrapper: createWrapper }
    );

    const codeInput = screen.getByDisplayValue('admin');
    const descriptionInput = screen.getByDisplayValue('Administrator role');
    
    expect(codeInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(
      <RoleFormModal {...defaultProps} mode="create" />,
      { wrapper: createWrapper }
    );

    const submitButton = screen.getByText('Criar Perfil');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Código deve ter pelo menos 3 caracteres')).toBeInTheDocument();
      expect(screen.getByText('Descrição deve ter pelo menos 10 caracteres')).toBeInTheDocument();
    });
  });

  it('should validate code format', async () => {
    render(
      <RoleFormModal {...defaultProps} mode="create" />,
      { wrapper: createWrapper }
    );

    const codeInput = screen.getByLabelText(/código/i);
    fireEvent.change(codeInput, { target: { value: 'Invalid Code!' } });
    fireEvent.blur(codeInput);

    await waitFor(() => {
      expect(screen.getByText('Apenas letras minúsculas, números, underscore e hífen são permitidos')).toBeInTheDocument();
    });
  });

  it('should require at least one permission', async () => {
    render(
      <RoleFormModal {...defaultProps} mode="create" />,
      { wrapper: createWrapper }
    );

    const codeInput = screen.getByLabelText(/código/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);

    fireEvent.change(codeInput, { target: { value: 'test-role' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test role description' } });

    const submitButton = screen.getByText('Criar Perfil');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Pelo menos uma permissão deve ser selecionada')).toBeInTheDocument();
    });
  });

  it('should submit create form successfully', async () => {
    mockedRolesService.createRole.mockResolvedValue(mockRole);
    
    render(
      <RoleFormModal {...defaultProps} mode="create" />,
      { wrapper: createWrapper }
    );

    const codeInput = screen.getByLabelText(/código/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);

    fireEvent.change(codeInput, { target: { value: 'admin' } });
    fireEvent.change(descriptionInput, { target: { value: 'Administrator role' } });

    // Select permissions
    const usersReadCheckbox = screen.getByLabelText('Read Users');
    fireEvent.click(usersReadCheckbox);

    const submitButton = screen.getByText('Criar Perfil');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedRolesService.createRole).toHaveBeenCalledWith({
        code: 'admin',
        description: 'Administrator role',
        permissions: [Permission.USERS_READ]
      });
    });
  });

  it('should submit update form successfully', async () => {
    mockedRolesService.updateRole.mockResolvedValue({
      ...mockRole,
      description: 'Updated description'
    });
    
    render(
      <RoleFormModal {...defaultProps} mode="edit" role={mockRole} />,
      { wrapper: createWrapper }
    );

    const descriptionInput = screen.getByDisplayValue('Administrator role');
    fireEvent.change(descriptionInput, { target: { value: 'Updated description' } });

    const submitButton = screen.getByText('Salvar Alterações');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedRolesService.updateRole).toHaveBeenCalledWith(mockRole.id, {
        code: 'admin',
        description: 'Updated description',
        permissions: mockRole.permissions
      });
    });
  });

  it('should handle form submission errors', async () => {
    mockedRolesService.createRole.mockRejectedValue(new Error('Code already exists'));
    
    render(
      <RoleFormModal {...defaultProps} mode="create" />,
      { wrapper: createWrapper }
    );

    const codeInput = screen.getByLabelText(/código/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);

    fireEvent.change(codeInput, { target: { value: 'admin' } });
    fireEvent.change(descriptionInput, { target: { value: 'Administrator role' } });

    // Select a permission
    const usersReadCheckbox = screen.getByLabelText('Read Users');
    fireEvent.click(usersReadCheckbox);

    const submitButton = screen.getByText('Criar Perfil');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedRolesService.createRole).toHaveBeenCalled();
    });
  });

  it('should close modal when cancel is clicked', () => {
    const onClose = jest.fn();
    
    render(
      <RoleFormModal {...defaultProps} onClose={onClose} />,
      { wrapper: createWrapper }
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('should close modal when close button is clicked', () => {
    const onClose = jest.fn();
    
    render(
      <RoleFormModal {...defaultProps} onClose={onClose} />,
      { wrapper: createWrapper }
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('should disable form inputs in view mode', () => {
    render(
      <RoleFormModal {...defaultProps} mode="view" role={mockRole} />,
      { wrapper: createWrapper }
    );

    const codeInput = screen.getByDisplayValue('admin');
    const descriptionInput = screen.getByDisplayValue('Administrator role');
    
    expect(codeInput).toBeDisabled();
    expect(descriptionInput).toBeDisabled();
  });

  it('should group permissions by module', () => {
    render(
      <RoleFormModal {...defaultProps} mode="create" />,
      { wrapper: createWrapper }
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Read Users')).toBeInTheDocument();
    expect(screen.getByText('Write Users')).toBeInTheDocument();
    expect(screen.getByText('Read Events')).toBeInTheDocument();
    expect(screen.getByText('Write Events')).toBeInTheDocument();
  });
});