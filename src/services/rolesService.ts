import supabase from '@/utils/supabase/client';
import { Permission } from '@/utils/permissions';
import { UserRole, CreateRoleRequest, UpdateRoleRequest } from '@/types/roles.types';

/**
 * Enhanced roles service with full CRUD operations
 */

export const getAllRoles = async (): Promise<UserRole[]> => {
  try {
    const { data: roles, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('code');

    if (error) {
      console.error('Erro ao buscar roles:', error);
      return [];
    }

    return (roles || []).map(role => ({
      id: role.id,
      code: role.code,
      description: role.description,
      permissions: Array.isArray((role as any).permissions) ? (role as any).permissions : [],
    }));
  } catch (error) {
    console.error('Erro ao buscar roles:', error);
    return [];
  }
};

export const getRoleById = async (id: string): Promise<UserRole | null> => {
  try {
    const { data: role, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar role:', error);
      return null;
    }

    return {
      id: role.id,
      code: role.code,
      description: role.description,
      permissions: Array.isArray((role as any).permissions) ? (role as any).permissions : [],
    };
  } catch (error) {
    console.error('Erro ao buscar role:', error);
    return null;
  }
};

export const getRoleByCode = async (code: string): Promise<UserRole | null> => {
  try {
    const { data: role, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('code', code)
      .single();

    if (error) {
      console.error('Erro ao buscar role:', error);
      return null;
    }

    return {
      id: role.id,
      code: role.code,
      description: role.description,
      permissions: Array.isArray((role as any).permissions) ? (role as any).permissions : [],
    };
  } catch (error) {
    console.error('Erro ao buscar role:', error);
    return null;
  }
};

export const createRole = async (roleData: CreateRoleRequest): Promise<UserRole | null> => {
  try {
    const { data: role, error } = await supabase
      .from('user_roles')
      .insert({
        code: roleData.code,
        description: roleData.description || null,
        permissions: roleData.permissions
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar role:', error);
      throw new Error(error.message);
    }

    return {
      id: role.id,
      code: role.code,
      description: role.description,
      permissions: Array.isArray((role as any).permissions) ? (role as any).permissions : [],
    };
  } catch (error) {
    console.error('Erro ao criar role:', error);
    throw error;
  }
};

export const updateRole = async (id: string, roleData: UpdateRoleRequest): Promise<UserRole | null> => {
  try {
    const updateData: any = {};
    
    if (roleData.code !== undefined) updateData.code = roleData.code;
    if (roleData.description !== undefined) updateData.description = roleData.description;
    if (roleData.permissions !== undefined) updateData.permissions = roleData.permissions;

    const { data: role, error } = await supabase
      .from('user_roles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar role:', error);
      throw new Error(error.message);
    }

    return {
      id: role.id,
      code: role.code,
      description: role.description,
      permissions: Array.isArray((role as any).permissions) ? (role as any).permissions : [],
    };
  } catch (error) {
    console.error('Erro ao atualizar role:', error);
    throw error;
  }
};

export const deleteRole = async (id: string): Promise<boolean> => {
  try {
    // Verificar se existem usuários com este role
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', id)
      .limit(1);

    if (usersError) {
      console.error('Erro ao verificar usuários:', usersError);
      throw new Error('Erro ao verificar usuários vinculados ao role');
    }

    if (users && users.length > 0) {
      throw new Error('Não é possível excluir um role que possui usuários vinculados');
    }

    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar role:', error);
      throw new Error(error.message);
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar role:', error);
    throw error;
  }
};

export const getUsersByRole = async (roleId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', roleId);

    if (error) {
      console.error('Erro ao contar usuários:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Erro ao contar usuários:', error);
    return 0;
  }
};

export const getAllPermissionsList = (): Array<{ key: Permission; name: string; description: string; module: string }> => {
  return [
    // Dashboard & Core
    { key: Permission.DASHBOARD_VIEW, name: 'Ver Dashboard', description: 'Visualizar painel principal', module: 'Dashboard' },
    
    // Events
    { key: Permission.EVENTS_VIEW, name: 'Ver Eventos', description: 'Visualizar lista de eventos', module: 'Eventos' },
    { key: Permission.EVENTS_CREATE, name: 'Criar Eventos', description: 'Criar novos eventos', module: 'Eventos' },
    { key: Permission.EVENTS_EDIT, name: 'Editar Eventos', description: 'Editar eventos existentes', module: 'Eventos' },
    { key: Permission.EVENTS_DELETE, name: 'Excluir Eventos', description: 'Excluir eventos', module: 'Eventos' },
    
    // Users
    { key: Permission.EXHIBITORS_VIEW, name: 'Ver Expositores', description: 'Visualizar lista de expositores', module: 'Usuários' },
    { key: Permission.EXHIBITORS_MANAGE, name: 'Gerenciar Expositores', description: 'Criar, editar e excluir expositores', module: 'Usuários' },
    { key: Permission.SUPPLIERS_VIEW, name: 'Ver Fornecedores', description: 'Visualizar lista de fornecedores', module: 'Usuários' },
    { key: Permission.SUPPLIERS_MANAGE, name: 'Gerenciar Fornecedores', description: 'Criar, editar e excluir fornecedores', module: 'Usuários' },
    { key: Permission.STAFF_VIEW, name: 'Ver Equipe', description: 'Visualizar lista da equipe', module: 'Usuários' },
    { key: Permission.STAFF_MANAGE, name: 'Gerenciar Equipe', description: 'Criar, editar e excluir membros da equipe', module: 'Usuários' },
    { key: Permission.VISITORS_VIEW, name: 'Ver Visitantes', description: 'Visualizar lista de visitantes', module: 'Usuários' },
    { key: Permission.VISITORS_MANAGE, name: 'Gerenciar Visitantes', description: 'Criar, editar e excluir visitantes', module: 'Usuários' },
    { key: Permission.PERMISSIONS_VIEW, name: 'Ver Permissões', description: 'Visualizar permissões e perfis', module: 'Usuários' },
    { key: Permission.PERMISSIONS_MANAGE, name: 'Gerenciar Permissões', description: 'Gerenciar permissões e perfis de usuário', module: 'Usuários' },
    
    // Agenda
    { key: Permission.ACTIVITIES_VIEW, name: 'Ver Atividades', description: 'Visualizar lista de atividades', module: 'Agenda' },
    { key: Permission.ACTIVITIES_MANAGE, name: 'Gerenciar Atividades', description: 'Criar, editar e excluir atividades', module: 'Agenda' },
    { key: Permission.LECTURES_VIEW, name: 'Ver Palestras', description: 'Visualizar lista de palestras', module: 'Agenda' },
    { key: Permission.LECTURES_MANAGE, name: 'Gerenciar Palestras', description: 'Criar, editar e excluir palestras', module: 'Agenda' },
    { key: Permission.VENUES_VIEW, name: 'Ver Locais', description: 'Visualizar lista de locais', module: 'Agenda' },
    { key: Permission.VENUES_MANAGE, name: 'Gerenciar Locais', description: 'Criar, editar e excluir locais', module: 'Agenda' },
    { key: Permission.TRACKS_VIEW, name: 'Ver Trilhas', description: 'Visualizar lista de trilhas', module: 'Agenda' },
    { key: Permission.TRACKS_MANAGE, name: 'Gerenciar Trilhas', description: 'Criar, editar e excluir trilhas', module: 'Agenda' },
    
    // Tasks
    { key: Permission.CHECKLIST_VIEW, name: 'Ver Checklist', description: 'Visualizar checklists', module: 'Tarefas' },
    { key: Permission.CHECKLIST_MANAGE, name: 'Gerenciar Checklist', description: 'Criar e gerenciar checklists', module: 'Tarefas' },
    { key: Permission.TEAM_TASKS_VIEW, name: 'Ver Tarefas da Equipe', description: 'Visualizar tarefas da equipe', module: 'Tarefas' },
    { key: Permission.TEAM_TASKS_MANAGE, name: 'Gerenciar Tarefas da Equipe', description: 'Criar e gerenciar tarefas da equipe', module: 'Tarefas' },
    
    // Credentialing
    { key: Permission.CHECKIN_VIEW, name: 'Ver Check-in', description: 'Visualizar sistema de check-in', module: 'Credenciamento' },
    { key: Permission.CHECKIN_MANAGE, name: 'Gerenciar Check-in', description: 'Gerenciar sistema de check-in', module: 'Credenciamento' },
    { key: Permission.REGISTRATION_VIEW, name: 'Ver Registros', description: 'Visualizar registros de participantes', module: 'Credenciamento' },
    { key: Permission.REGISTRATION_MANAGE, name: 'Gerenciar Registros', description: 'Gerenciar registros de participantes', module: 'Credenciamento' },
    { key: Permission.ACCESS_HISTORY_VIEW, name: 'Ver Histórico de Acesso', description: 'Visualizar histórico de acessos', module: 'Credenciamento' },
    
    // Marketing
    { key: Permission.MARKETING_ADS_VIEW, name: 'Ver Anúncios', description: 'Visualizar campanhas de anúncios', module: 'Marketing' },
    { key: Permission.MARKETING_ADS_MANAGE, name: 'Gerenciar Anúncios', description: 'Criar e gerenciar campanhas de anúncios', module: 'Marketing' },
    { key: Permission.MARKETING_CONTENT_VIEW, name: 'Ver Conteúdo', description: 'Visualizar conteúdo de marketing', module: 'Marketing' },
    { key: Permission.MARKETING_CONTENT_MANAGE, name: 'Gerenciar Conteúdo', description: 'Criar e gerenciar conteúdo de marketing', module: 'Marketing' },
    { key: Permission.MARKETING_EMAIL_VIEW, name: 'Ver E-mails', description: 'Visualizar campanhas de e-mail', module: 'Marketing' },
    { key: Permission.MARKETING_EMAIL_MANAGE, name: 'Gerenciar E-mails', description: 'Criar e gerenciar campanhas de e-mail', module: 'Marketing' },
    { key: Permission.MARKETING_PAGES_VIEW, name: 'Ver Páginas', description: 'Visualizar páginas de marketing', module: 'Marketing' },
    { key: Permission.MARKETING_PAGES_MANAGE, name: 'Gerenciar Páginas', description: 'Criar e gerenciar páginas de marketing', module: 'Marketing' },
    
    // Communication
    { key: Permission.COMMUNICATION_HUMANGPT_VIEW, name: 'Ver HumanGPT', description: 'Acessar sistema HumanGPT', module: 'Comunicação' },
    { key: Permission.COMMUNICATION_NOTIFICATIONS_VIEW, name: 'Ver Notificações', description: 'Visualizar notificações', module: 'Comunicação' },
    { key: Permission.COMMUNICATION_NOTIFICATIONS_MANAGE, name: 'Gerenciar Notificações', description: 'Criar e gerenciar notificações', module: 'Comunicação' },
    
    // Analytics
    { key: Permission.ANALYTICS_VIEW, name: 'Ver Analytics', description: 'Visualizar relatórios analíticos', module: 'Analytics' },
    { key: Permission.ANALYTICS_ENGAGEMENT_VIEW, name: 'Ver Engajamento', description: 'Visualizar dados de engajamento', module: 'Analytics' },
    { key: Permission.REPORTS_VIEW, name: 'Ver Relatórios', description: 'Visualizar relatórios do sistema', module: 'Analytics' },
    
    // Integrations
    { key: Permission.API_MANAGEMENT_VIEW, name: 'Ver API Management', description: 'Visualizar gerenciamento de APIs', module: 'Integrações' },
    { key: Permission.API_MANAGEMENT_MANAGE, name: 'Gerenciar APIs', description: 'Gerenciar APIs e integrações', module: 'Integrações' },
    { key: Permission.INTEGRATIONS_VIEW, name: 'Ver Integrações', description: 'Visualizar integrações disponíveis', module: 'Integrações' },
    { key: Permission.INTEGRATIONS_MANAGE, name: 'Gerenciar Integrações', description: 'Configurar e gerenciar integrações', module: 'Integrações' },
    
    // AI Tools
    { key: Permission.AI_VALIDATOR_VIEW, name: 'Ver AI Validator', description: 'Acessar validador de IA', module: 'IA' },
    { key: Permission.HEATMAP_VIEW, name: 'Ver Heatmap', description: 'Visualizar mapa de calor', module: 'IA' },
    { key: Permission.DYNAMIC_PRICING_VIEW, name: 'Ver Preços Dinâmicos', description: 'Visualizar sistema de preços dinâmicos', module: 'IA' },
    { key: Permission.LEGAL_AI_VIEW, name: 'Ver Legal AI', description: 'Acessar sistema legal de IA', module: 'IA' },
    
    // Settings
    { key: Permission.SETTINGS_ORGANIZER_VIEW, name: 'Ver Config. Organizador', description: 'Visualizar configurações do organizador', module: 'Configurações' },
    { key: Permission.SETTINGS_ORGANIZER_MANAGE, name: 'Gerenciar Config. Organizador', description: 'Gerenciar configurações do organizador', module: 'Configurações' },
    { key: Permission.SETTINGS_BRANDING_VIEW, name: 'Ver Branding', description: 'Visualizar configurações de marca', module: 'Configurações' },
    { key: Permission.SETTINGS_BRANDING_MANAGE, name: 'Gerenciar Branding', description: 'Gerenciar configurações de marca', module: 'Configurações' },
    { key: Permission.SETTINGS_PRIVACY_VIEW, name: 'Ver Privacidade', description: 'Visualizar configurações de privacidade', module: 'Configurações' },
    { key: Permission.SETTINGS_PRIVACY_MANAGE, name: 'Gerenciar Privacidade', description: 'Gerenciar configurações de privacidade', module: 'Configurações' },
    { key: Permission.SETTINGS_PERMISSIONS_VIEW, name: 'Ver Config. Permissões', description: 'Visualizar configurações de permissões', module: 'Configurações' },
    { key: Permission.SETTINGS_PERMISSIONS_MANAGE, name: 'Gerenciar Config. Permissões', description: 'Gerenciar configurações de permissões', module: 'Configurações' },
    
    // Support
    { key: Permission.HELP_CHAT_VIEW, name: 'Ver Chat de Ajuda', description: 'Acessar chat de suporte', module: 'Suporte' },
    { key: Permission.HELP_FAQ_VIEW, name: 'Ver FAQ', description: 'Visualizar perguntas frequentes', module: 'Suporte' },
    { key: Permission.HELP_TUTORIAL_VIEW, name: 'Ver Tutoriais', description: 'Acessar tutoriais do sistema', module: 'Suporte' },
  ];
};

export const bulkUpdatePermissions = async (rolePermissionUpdates: Array<{ roleId: string; permissions: Permission[] }>): Promise<boolean> => {
  try {
    const updates = rolePermissionUpdates.map(({ roleId, permissions }) => 
      supabase
        .from('user_roles')
        .update({ permissions } as any)
        .eq('id', roleId)
    );

    const results = await Promise.all(updates);
    
    const hasError = results.some(result => result.error);
    if (hasError) {
      console.error('Erro em algumas atualizações em lote');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar permissões em lote:', error);
    return false;
  }
};

export const assignRoleToUser = async (userId: string, roleId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: roleId })
      .eq('id', userId);

    if (error) {
      console.error('Erro ao atribuir role ao usuário:', error);
      throw new Error(error.message);
    }

    return true;
  } catch (error) {
    console.error('Erro ao atribuir role ao usuário:', error);
    throw error;
  }
};