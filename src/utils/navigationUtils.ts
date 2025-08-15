import { Permission } from './permissions';

/**
 * Mapeamento de rotas para nomes amigáveis e permissões necessárias
 */
export const routeDisplayNames: Record<string, { displayName: string; permission: Permission; priority: number }> = {
  '/dashboard': { displayName: 'Painel do Organizador', permission: Permission.DASHBOARD_VIEW, priority: 1 },
  
  // Eventos (alta prioridade)
  '/events': { displayName: 'Lista de Eventos', permission: Permission.EVENTS_VIEW, priority: 2 },
  '/events/new': { displayName: 'Novo Evento', permission: Permission.EVENTS_CREATE, priority: 3 },
  
  // Usuários
  '/exhibitors': { displayName: 'Expositores', permission: Permission.EXHIBITORS_VIEW, priority: 10 },
  '/suppliers': { displayName: 'Fornecedores', permission: Permission.SUPPLIERS_VIEW, priority: 11 },
  '/permissions': { displayName: 'Permissões e Perfis', permission: Permission.PERMISSIONS_MANAGE, priority: 12 },
  '/staff': { displayName: 'Staff', permission: Permission.STAFF_VIEW, priority: 13 },
  '/visitors': { displayName: 'Visitantes', permission: Permission.VISITORS_VIEW, priority: 14 },
  
  // Agenda
  '/activities': { displayName: 'Atividades', permission: Permission.ACTIVITIES_VIEW, priority: 20 },
  '/lectures': { displayName: 'Palestras', permission: Permission.LECTURES_VIEW, priority: 21 },
  '/venues': { displayName: 'Salas/Locais', permission: Permission.VENUES_VIEW, priority: 22 },
  '/tracks': { displayName: 'Trilhas', permission: Permission.TRACKS_VIEW, priority: 23 },
  
  // Tarefas
  '/checklist': { displayName: 'Checklist', permission: Permission.CHECKLIST_VIEW, priority: 30 },
  '/team-tasks': { displayName: 'Tarefas por Equipe', permission: Permission.TEAM_TASKS_VIEW, priority: 31 },
  '/supplier-tasks': { displayName: 'Tarefas por Fornecedor', permission: Permission.SUPPLIERS_VIEW, priority: 32 },
  
  // Credenciamento
  '/checkin': { displayName: 'Check-in/Check-out', permission: Permission.CHECKIN_MANAGE, priority: 40 },
  '/registration': { displayName: 'Geração QR Code/Badge', permission: Permission.REGISTRATION_MANAGE, priority: 41 },
  '/access-history': { displayName: 'Histórico de Acessos', permission: Permission.ANALYTICS_VIEW, priority: 42 },
  
  // Marketing
  '/marketing/ads': { displayName: 'Marketing Ads', permission: Permission.MARKETING_ADS_VIEW, priority: 50 },
  '/marketing/content': { displayName: 'Conteúdo Marketing', permission: Permission.MARKETING_CONTENT_VIEW, priority: 51 },
  '/marketing/email': { displayName: 'E-mails Marketing', permission: Permission.MARKETING_EMAIL_VIEW, priority: 52 },
  '/marketing/pages': { displayName: 'Pages Marketing', permission: Permission.MARKETING_PAGES_VIEW, priority: 53 },
  
  // Comunicação
  '/communication/humangpt': { displayName: 'HumanGPT', permission: Permission.COMMUNICATION_HUMANGPT_VIEW, priority: 60 },
  '/communication/notifications': { displayName: 'Notificações', permission: Permission.COMMUNICATION_NOTIFICATIONS_VIEW, priority: 61 },
  
  // Analytics
  '/analytics': { displayName: 'Dashboards Analytics', permission: Permission.ANALYTICS_VIEW, priority: 70 },
  '/analytics/engagement': { displayName: 'Inteligência de Negócios', permission: Permission.ANALYTICS_VIEW, priority: 71 },
  '/reports': { displayName: 'Relatórios', permission: Permission.ANALYTICS_VIEW, priority: 72 },
  
  // Integrações
  '/api-management': { displayName: 'APIs', permission: Permission.API_MANAGEMENT_VIEW, priority: 80 },
  '/integrations': { displayName: 'Plugins', permission: Permission.INTEGRATIONS_VIEW, priority: 81 },
  
  // Legal IA
  '/ai-validator': { displayName: 'Integrações IA', permission: Permission.AI_VALIDATOR_VIEW, priority: 90 },
  '/heatmap': { displayName: 'Heatmap & Incident', permission: Permission.HEATMAP_VIEW, priority: 91 },
  '/dynamic-pricing': { displayName: 'Pricing Dinâmico', permission: Permission.DYNAMIC_PRICING_VIEW, priority: 92 },
  '/legal-ai': { displayName: 'Validador IA', permission: Permission.LEGAL_AI_VIEW, priority: 93 },
  
  // Configurações
  '/settings/organizer': { displayName: 'Dados do Organizador', permission: Permission.SETTINGS_ORGANIZER_VIEW, priority: 100 },
  '/settings/branding': { displayName: 'Identidade Visual', permission: Permission.SETTINGS_BRANDING_VIEW, priority: 101 },
  '/settings/privacy': { displayName: 'LGPD', permission: Permission.SETTINGS_PRIVACY_VIEW, priority: 102 },
  '/settings/permissions': { displayName: 'Permissões/Acesso', permission: Permission.SETTINGS_PERMISSIONS_VIEW, priority: 103 },
  
  // Suporte
  '/help/chat': { displayName: 'Chat do Suporte', permission: Permission.HELP_CHAT_VIEW, priority: 110 },
  '/help/faq': { displayName: 'FAQ', permission: Permission.HELP_FAQ_VIEW, priority: 111 },
  '/help/tutorial': { displayName: 'Tutorial', permission: Permission.HELP_TUTORIAL_VIEW, priority: 112 },
};

/**
 * Encontra a primeira rota acessível para o usuário baseado em suas permissões
 */
export const getFirstAccessibleRoute = (
  hasPermissionFn: (permission: Permission) => boolean
): { route: string; displayName: string } | null => {
  // Ordenar rotas por prioridade
  const sortedRoutes = Object.entries(routeDisplayNames)
    .sort(([, a], [, b]) => a.priority - b.priority);
  
  // Encontrar a primeira rota com permissão
  for (const [route, config] of sortedRoutes) {
    if (hasPermissionFn(config.permission)) {
      return {
        route,
        displayName: config.displayName
      };
    }
  }
  
  return null;
};

/**
 * Obtém ícone contextual baseado na rota
 */
export const getRouteIcon = (route: string): string => {
  if (route.includes('/dashboard')) return 'Home';
  if (route.includes('/events')) return 'Calendar';
  if (route.includes('/users') || route.includes('/staff') || route.includes('/visitors')) return 'Users';
  if (route.includes('/activities') || route.includes('/lectures')) return 'Activity';
  if (route.includes('/checklist') || route.includes('/tasks')) return 'CheckSquare';
  if (route.includes('/checkin') || route.includes('/registration')) return 'QrCode';
  if (route.includes('/marketing')) return 'Megaphone';
  if (route.includes('/communication')) return 'MessageSquare';
  if (route.includes('/analytics') || route.includes('/reports')) return 'BarChart3';
  if (route.includes('/integrations') || route.includes('/api')) return 'Puzzle';
  if (route.includes('/ai') || route.includes('/legal')) return 'Zap';
  if (route.includes('/settings')) return 'Settings';
  if (route.includes('/help')) return 'HelpCircle';
  
  return 'ArrowRight';
};