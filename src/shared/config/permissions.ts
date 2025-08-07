
/**
 * Sistema centralizado de permissões e controle de acesso
 * Define mapeamento de rotas, hierarquia de cargos e tipos TypeScript
 */

// ==================== TIPOS TYPESCRIPT ====================

export interface RoutePermission {
  path: string
  allowedRoles: UserRole[]
  requiredPermission?: string
  description?: string
}

export interface RoleHierarchy {
  level: number
  inheritsFrom?: UserRole[]
}

export interface PermissionConfig {
  routes: RoutePermission[]
  hierarchy: Record<UserRole, RoleHierarchy>
  rolePermissions: Record<UserRole, string[]>
}

// Enum de cargos disponíveis
export type UserRole = 
  | 'owner'
  | 'developer'
  | 'event_manager'
  | 'finance' 
  | 'coordinator'
  | 'content_editor'
  | 'support'
  | 'viewer'

// Interface para verificação de permissões
export interface PermissionCheck {
  hasAccess: boolean
  reason?: string
  suggestedRole?: UserRole
}

// ==================== HIERARQUIA DE CARGOS ====================

export const ROLE_HIERARCHY: Record<UserRole, RoleHierarchy> = {
  owner: { level: 1 },
  developer: { level: 2, inheritsFrom: ['viewer'] },
  event_manager: { level: 3, inheritsFrom: ['coordinator'] },
  finance: { level: 4, inheritsFrom: ['viewer'] },
  coordinator: { level: 5, inheritsFrom: ['viewer'] },
  content_editor: { level: 6, inheritsFrom: ['viewer'] },
  support: { level: 7, inheritsFrom: ['viewer'] },
  viewer: { level: 8 }
}

// ==================== MAPEAMENTO DE ROTAS ====================

export const ROUTE_PERMISSIONS: RoutePermission[] = [
  // === ROTAS PÚBLICAS (sem restrição) ===
  {
    path: '/dashboard',
    allowedRoles: ['owner', 'developer', 'event_manager', 'coordinator', 'viewer'],
    description: 'Dashboard principal'
  },

  // === EVENTOS ===
  {
    path: '/events',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Listagem de eventos'
  },
  {
    path: '/events/new',
    allowedRoles: ['owner', 'event_manager'],
    requiredPermission: 'manage_events',
    description: 'Criação de novos eventos'
  },

  // === USUÁRIOS E PARTICIPANTES ===
  {
    path: '/exhibitors',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Gestão de expositores'
  },
  {
    path: '/suppliers',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Gestão de fornecedores'
  },
  {
    path: '/staff',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Gestão de equipe'
  },
  {
    path: '/visitors',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Gestão de visitantes'
  },

  // === ADMINISTRAÇÃO E PERMISSÕES ===
  {
    path: '/permissions',
    allowedRoles: ['owner', 'developer'],
    requiredPermission: 'manage_permissions',
    description: 'Gerenciamento de permissões'
  },
  {
    path: '/settings/permissions',
    allowedRoles: ['owner', 'developer'],
    requiredPermission: 'manage_permissions',
    description: 'Configurações de permissões'
  },

  // === PROGRAMAÇÃO E AGENDA ===
  {
    path: '/activities',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Gestão de atividades'
  },
  {
    path: '/lectures',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Gestão de palestras'
  },
  {
    path: '/venues',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Gestão de locais/salas'
  },
  {
    path: '/tracks',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Gestão de trilhas'
  },

  // === TAREFAS E OPERACIONAL ===
  {
    path: '/checklist',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Checklist geral'
  },
  {
    path: '/team-tasks',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Tarefas por equipe'
  },
  {
    path: '/supplier-tasks',
    allowedRoles: ['owner'],
    description: 'Tarefas por fornecedor'
  },

  // === CREDENCIAMENTO ===
  {
    path: '/checkin',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Check-in/Check-out'
  },
  {
    path: '/registration',
    allowedRoles: ['owner', 'event_manager', 'coordinator', 'viewer'],
    description: 'Geração de credenciais'
  },
  {
    path: '/access-history',
    allowedRoles: ['owner', 'developer'],
    description: 'Histórico de acessos'
  },

  // === MARKETING ===
  {
    path: '/marketing/ads',
    allowedRoles: ['owner'],
    description: 'Gestão de anúncios'
  },
  {
    path: '/marketing/content',
    allowedRoles: ['owner', 'content_editor'],
    description: 'Gestão de conteúdo'
  },
  {
    path: '/marketing/email',
    allowedRoles: ['owner', 'content_editor'],
    description: 'Marketing por email'
  },
  {
    path: '/marketing/pages',
    allowedRoles: ['owner', 'content_editor'],
    description: 'Páginas de marketing'
  },

  // === COMUNICAÇÃO ===
  {
    path: '/communication/humangpt',
    allowedRoles: ['owner'],
    description: 'HumanGPT'
  },
  {
    path: '/communication/notifications',
    allowedRoles: ['owner'],
    description: 'Sistema de notificações'
  },

  // === ANALYTICS E RELATÓRIOS ===
  {
    path: '/analytics',
    allowedRoles: ['owner', 'developer', 'finance', 'viewer'],
    description: 'Dashboards analíticos'
  },
  {
    path: '/analytics/engagement',
    allowedRoles: ['owner', 'developer', 'finance', 'viewer'],
    description: 'Análise de engajamento'
  },
  {
    path: '/reports',
    allowedRoles: ['owner', 'developer', 'finance', 'viewer'],
    description: 'Relatórios gerais'
  },

  // === INTEGRAÇÕES E APIS ===
  {
    path: '/api-management',
    allowedRoles: ['owner', 'developer'],
    description: 'Gestão de APIs'
  },
  {
    path: '/integrations',
    allowedRoles: ['owner', 'developer'],
    description: 'Integrações externas'
  },

  // === IA E FERRAMENTAS AVANÇADAS ===
  {
    path: '/ai-validator',
    allowedRoles: ['owner', 'developer'],
    description: 'Validador de IA'
  },
  {
    path: '/heatmap',
    allowedRoles: ['owner', 'developer'],
    description: 'Heatmap e incidentes'
  },
  {
    path: '/dynamic-pricing',
    allowedRoles: ['owner', 'developer', 'finance'],
    description: 'Precificação dinâmica'
  },
  {
    path: '/legal-ai',
    allowedRoles: ['owner', 'developer'],
    description: 'IA Jurídica'
  },

  // === CONFIGURAÇÕES ===
  {
    path: '/settings/organizer',
    allowedRoles: ['owner', 'developer'],
    description: 'Dados do organizador'
  },
  {
    path: '/settings/branding',
    allowedRoles: ['owner', 'developer'],
    description: 'Identidade visual'
  },
  {
    path: '/settings/privacy',
    allowedRoles: ['owner', 'developer'],
    description: 'Configurações de LGPD'
  },

  // === AJUDA E SUPORTE ===
  {
    path: '/help/chat',
    allowedRoles: ['owner', 'support', 'viewer'],
    description: 'Chat do suporte'
  },
  {
    path: '/help/faq',
    allowedRoles: ['owner', 'support', 'viewer'],
    description: 'Perguntas frequentes'
  },
  {
    path: '/help/tutorial',
    allowedRoles: ['owner', 'support', 'viewer'],
    description: 'Tutoriais'
  }
]

// ==================== PERMISSÕES POR CARGO ====================

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  owner: ['*'], // Acesso total
  
  developer: [
    'view_dashboard',
    'manage_integrations',
    'manage_apis',
    'view_analytics',
    'view_reports',
    'manage_settings',
    'manage_permissions',
    'view_access_history',
    'manage_ai_tools'
  ],
  
  event_manager: [
    'view_dashboard',
    'manage_events',
    'manage_users',
    'manage_activities',
    'manage_venues',
    'manage_checkin',
    'view_checklist'
  ],
  
  finance: [
    'view_analytics',
    'view_reports',
    'manage_dynamic_pricing'
  ],
  
  coordinator: [
    'view_dashboard',
    'view_events',
    'view_users',
    'view_activities',
    'manage_checkin',
    'view_checklist',
    'manage_tasks'
  ],
  
  content_editor: [
    'manage_content',
    'manage_marketing_pages',
    'manage_emails'
  ],
  
  support: [
    'manage_support',
    'view_tutorials',
    'manage_faq'
  ],
  
  viewer: [
    'view_dashboard',
    'view_events',
    'view_users',
    'view_activities',
    'view_analytics',
    'view_reports',
    'view_checklist',
    'view_tutorials'
  ]
}

// ==================== FUNÇÕES UTILITÁRIAS ====================

/**
 * Verifica se um cargo tem acesso a uma rota específica
 */
export const checkRouteAccess = (route: string, userRole: UserRole): PermissionCheck => {
  // Owner sempre tem acesso
  if (userRole === 'owner') {
    return { hasAccess: true }
  }

  // Busca configuração da rota
  const routeConfig = ROUTE_PERMISSIONS.find(r => r.path === route)
  
  if (!routeConfig) {
    return { 
      hasAccess: false, 
      reason: 'Rota não configurada',
      suggestedRole: 'owner'
    }
  }

  // Verifica se o cargo está na lista de permitidos
  const hasDirectAccess = routeConfig.allowedRoles.includes(userRole)
  
  if (hasDirectAccess) {
    return { hasAccess: true }
  }

  // Verifica herança de permissões
  const userHierarchy = ROLE_HIERARCHY[userRole]
  if (userHierarchy.inheritsFrom) {
    for (const inheritedRole of userHierarchy.inheritsFrom) {
      if (routeConfig.allowedRoles.includes(inheritedRole)) {
        return { hasAccess: true }
      }
    }
  }

  return { 
    hasAccess: false, 
    reason: `Cargo '${userRole}' não autorizado para esta rota`,
    suggestedRole: routeConfig.allowedRoles[0]
  }
}

/**
 * Obtém todas as rotas acessíveis por um cargo
 */
export const getAccessibleRoutes = (userRole: UserRole): string[] => {
  if (userRole === 'owner') {
    return ROUTE_PERMISSIONS.map(r => r.path)
  }

  return ROUTE_PERMISSIONS
    .filter(route => checkRouteAccess(route.path, userRole).hasAccess)
    .map(route => route.path)
}

/**
 * Verifica hierarquia entre cargos
 */
export const hasHigherOrEqualRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const userLevel = ROLE_HIERARCHY[userRole].level
  const requiredLevel = ROLE_HIERARCHY[requiredRole].level
  
  return userLevel <= requiredLevel // Menor número = maior hierarquia
}

/**
 * Obtém informações completas de um cargo
 */
export const getRoleInfo = (role: UserRole) => {
  return {
    role,
    level: ROLE_HIERARCHY[role].level,
    permissions: ROLE_PERMISSIONS[role],
    accessibleRoutes: getAccessibleRoutes(role),
    inheritsFrom: ROLE_HIERARCHY[role].inheritsFrom || []
  }
}

// ==================== CONFIGURAÇÃO CONSOLIDADA ====================

export const PERMISSION_CONFIG: PermissionConfig = {
  routes: ROUTE_PERMISSIONS,
  hierarchy: ROLE_HIERARCHY,
  rolePermissions: ROLE_PERMISSIONS
}

// Export default para facilitar importação
export default PERMISSION_CONFIG
