import { Permission } from '@/utils/permissions';
import capitalize from '@/utils/stringUtils';

/**
 * Utilitário para formatação amigável de roles e permissões
 */

export interface FormattedPermission {
  key: Permission;
  name: string;
  description: string;
  module: string;
  icon: string;
  level: 'basic' | 'intermediate' | 'advanced';
  color: string;
}

export interface FormattedRole {
  code: string;
  name: string;
  description: string;
  level: 'basic' | 'intermediate' | 'advanced';
  color: string;
  icon: string;
}

/**
 * Mapas de tradução e formatação para permissões
 */
const PERMISSION_TRANSLATIONS: Partial<Record<Permission, Omit<FormattedPermission, 'key'>>> = {
  // Dashboard
  [Permission.DASHBOARD_VIEW]: {
    name: 'Visualizar Dashboard',
    description: 'Acesso à página principal do dashboard',
    module: 'Dashboard',
    icon: '📊',
    level: 'basic',
    color: 'hsl(var(--blue-500))'
  },
  
  // Events
  [Permission.EVENTS_VIEW]: {
    name: 'Visualizar Eventos',
    description: 'Ver lista e detalhes dos eventos',
    module: 'Eventos',
    icon: '📅',
    level: 'basic',
    color: 'hsl(var(--green-500))'
  },
  [Permission.EVENTS_CREATE]: {
    name: 'Criar Eventos',
    description: 'Criar novos eventos na plataforma',
    module: 'Eventos',
    icon: '➕',
    level: 'intermediate',
    color: 'hsl(var(--green-600))'
  },
  [Permission.EVENTS_EDIT]: {
    name: 'Editar Eventos',
    description: 'Modificar eventos existentes',
    module: 'Eventos',
    icon: '✏️',
    level: 'intermediate',
    color: 'hsl(var(--green-600))'
  },
  [Permission.EVENTS_DELETE]: {
    name: 'Excluir Eventos',
    description: 'Remover eventos da plataforma',
    module: 'Eventos',
    icon: '🗑️',
    level: 'advanced',
    color: 'hsl(var(--red-600))'
  },

  // Visitors
  [Permission.VISITORS_VIEW]: {
    name: 'Visualizar Visitantes',
    description: 'Ver lista e detalhes dos visitantes',
    module: 'Visitantes',
    icon: '👥',
    level: 'basic',
    color: 'hsl(var(--purple-500))'
  },
  [Permission.VISITORS_MANAGE]: {
    name: 'Gerenciar Visitantes',
    description: 'Adicionar, editar e remover visitantes',
    module: 'Visitantes',
    icon: '👤',
    level: 'intermediate',
    color: 'hsl(var(--purple-600))'
  },

  // Staff
  [Permission.STAFF_VIEW]: {
    name: 'Visualizar Equipe',
    description: 'Ver membros da equipe',
    module: 'Equipe',
    icon: '👨‍💼',
    level: 'basic',
    color: 'hsl(var(--indigo-500))'
  },
  [Permission.STAFF_MANAGE]: {
    name: 'Gerenciar Equipe',
    description: 'Adicionar e gerenciar membros da equipe',
    module: 'Equipe',
    icon: '👩‍💼',
    level: 'advanced',
    color: 'hsl(var(--indigo-600))'
  },

  // Analytics
  [Permission.ANALYTICS_VIEW]: {
    name: 'Visualizar Relatórios',
    description: 'Acesso aos relatórios e analytics',
    module: 'Analytics',
    icon: '📈',
    level: 'intermediate',
    color: 'hsl(var(--orange-500))'
  }
};

/**
 * Traduz códigos de roles para nomes amigáveis
 */
export const formatRoleName = (roleCode: string): string => {
  if (!roleCode) return '';
  
  // Mapas específicos para roles comuns
  const roleTranslations: Record<string, string> = {
    'admin': 'Administrador',
    'super_admin': 'Super Administrador',
    'event_manager': 'Gerente de Eventos',
    'staff_member': 'Membro da Equipe',
    'visitor': 'Visitante',
    'organizer': 'Organizador',
    'moderator': 'Moderador',
    'viewer': 'Visualizador',
    'editor': 'Editor',
    'coordinator': 'Coordenador',
    'analyst': 'Analista',
    'finance_manager': 'Gerente Financeiro',
    'marketing_manager': 'Gerente de Marketing',
    'operations_manager': 'Gerente de Operações',
  };

  // Se existe tradução específica, usa ela
  if (roleTranslations[roleCode.toLowerCase()]) {
    return roleTranslations[roleCode.toLowerCase()];
  }

  // Senão, formata automaticamente
  return roleCode
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Formata uma permissão para exibição amigável
 */
export const formatPermission = (permission: Permission): FormattedPermission => {
  const translation = PERMISSION_TRANSLATIONS[permission];
  
  if (!translation) {
    // Fallback para permissões não mapeadas
    const parts = permission.split('.');
    const module = parts[0] ? capitalize(parts[0]) : 'Sistema';
    const action = parts[1] ? capitalize(parts[1]) : 'Ação';
    
    return {
      key: permission,
      name: `${action} ${module}`,
      description: `Permissão para ${action.toLowerCase()} em ${module.toLowerCase()}`,
      module,
      icon: '🔒',
      level: 'basic',
      color: 'hsl(var(--muted))'
    };
  }

  return {
    key: permission,
    ...translation
  };
};

/**
 * Agrupa permissões formatadas por módulo
 */
export const groupFormattedPermissions = (permissions: Permission[]) => {
  const formatted = permissions.map(formatPermission);
  
  const grouped = formatted.reduce((acc, permission) => {
    const module = permission.module;
    if (!acc[module]) {
      acc[module] = [];
    }
    acc[module].push(permission);
    return acc;
  }, {} as Record<string, FormattedPermission[]>);

  // Ordena módulos e permissões dentro de cada módulo
  return Object.keys(grouped)
    .sort()
    .map(module => ({
      module,
      permissions: grouped[module].sort((a, b) => {
        // Ordena por nível (básico -> avançado) e depois por nome
        const levelOrder = { basic: 0, intermediate: 1, advanced: 2 };
        if (levelOrder[a.level] !== levelOrder[b.level]) {
          return levelOrder[a.level] - levelOrder[b.level];
        }
        return a.name.localeCompare(b.name);
      })
    }));
};

/**
 * Determina o nível de um role baseado em suas permissões
 */
export const getRoleLevel = (permissions: Permission[]): FormattedRole['level'] => {
  const formattedPermissions = permissions.map(formatPermission);
  
  const hasAdvanced = formattedPermissions.some(p => p.level === 'advanced');
  const hasIntermediate = formattedPermissions.some(p => p.level === 'intermediate');
  
  if (hasAdvanced) return 'advanced';
  if (hasIntermediate) return 'intermediate';
  return 'basic';
};

/**
 * Formata um role completo para exibição
 */
export const formatRole = (
  code: string, 
  description?: string, 
  permissions: Permission[] = []
): FormattedRole => {
  const level = getRoleLevel(permissions);
  
  const levelColors = {
    basic: 'hsl(var(--blue-500))',
    intermediate: 'hsl(var(--amber-500))', 
    advanced: 'hsl(var(--red-500))'
  };

  const levelIcons = {
    basic: '🟢',
    intermediate: '🟡',
    advanced: '🔴'
  };

  return {
    code,
    name: formatRoleName(code),
    description: description || `Role ${formatRoleName(code)}`,
    level,
    color: levelColors[level],
    icon: levelIcons[level]
  };
};

/**
 * Busca inteligente em permissões formatadas
 */
export const searchFormattedPermissions = (
  permissions: FormattedPermission[],
  searchTerm: string
): FormattedPermission[] => {
  if (!searchTerm.trim()) return permissions;
  
  const term = searchTerm.toLowerCase();
  
  return permissions.filter(permission => 
    permission.name.toLowerCase().includes(term) ||
    permission.description.toLowerCase().includes(term) ||
    permission.module.toLowerCase().includes(term) ||
    permission.key.toLowerCase().includes(term)
  );
};

/**
 * Filtros pré-definidos para permissões
 */
export const PERMISSION_FILTERS = {
  basic: (permissions: FormattedPermission[]) => 
    permissions.filter(p => p.level === 'basic'),
  intermediate: (permissions: FormattedPermission[]) => 
    permissions.filter(p => p.level === 'intermediate'),
  advanced: (permissions: FormattedPermission[]) => 
    permissions.filter(p => p.level === 'advanced'),
  byModule: (permissions: FormattedPermission[], module: string) =>
    permissions.filter(p => p.module === module)
};

export const ROLE_TEMPLATES = {
  basic_viewer: {
    name: 'Visualizador Básico',
    description: 'Acesso apenas para visualização de informações básicas',
    permissions: [Permission.DASHBOARD_VIEW, Permission.EVENTS_VIEW, Permission.VISITORS_VIEW]
  },
  event_coordinator: {
    name: 'Coordenador de Eventos',
    description: 'Gerenciamento completo de eventos e visitantes',
    permissions: [
      Permission.DASHBOARD_VIEW,
      Permission.EVENTS_VIEW,
      Permission.EVENTS_CREATE,
      Permission.VISITORS_VIEW,
      Permission.VISITORS_MANAGE,
      Permission.ANALYTICS_VIEW
    ]
  },
  admin: {
    name: 'Administrador',
    description: 'Acesso completo ao sistema',
    permissions: Object.values(Permission)
  }
};