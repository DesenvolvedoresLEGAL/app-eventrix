import React from 'react';

export enum Permission {
  // Dashboard & Core
  DASHBOARD_VIEW = 'dashboard.view',

  // Events
  EVENTS_VIEW = 'events.view',
  EVENTS_CREATE = 'events.create',
  EVENTS_EDIT = 'events.edit',
  EVENTS_DELETE = 'events.delete',

  // Users
  EXHIBITORS_VIEW = 'exhibitors.view',
  EXHIBITORS_MANAGE = 'exhibitors.manage',
  SUPPLIERS_VIEW = 'suppliers.view',
  SUPPLIERS_MANAGE = 'suppliers.manage',
  STAFF_VIEW = 'staff.view',
  STAFF_MANAGE = 'staff.manage',
  VISITORS_VIEW = 'visitors.view',
  VISITORS_MANAGE = 'visitors.manage',
  PERMISSIONS_VIEW = 'permissions.view',
  PERMISSIONS_MANAGE = 'permissions.manage',

  // Agenda
  ACTIVITIES_VIEW = 'activities.view',
  ACTIVITIES_MANAGE = 'activities.manage',
  LECTURES_VIEW = 'lectures.view',
  LECTURES_MANAGE = 'lectures.manage',
  VENUES_VIEW = 'venues.view',
  VENUES_MANAGE = 'venues.manage',
  TRACKS_VIEW = 'tracks.view',
  TRACKS_MANAGE = 'tracks.manage',

  // Tasks
  CHECKLIST_VIEW = 'checklist.view',
  CHECKLIST_MANAGE = 'checklist.manage',
  TEAM_TASKS_VIEW = 'team-tasks.view',
  TEAM_TASKS_MANAGE = 'team-tasks.manage',
  SUPPLIER_TASKS_VIEW = 'supplier-tasks.view',
  SUPPLIER_TASKS_MANAGE = 'supplier-tasks.manage',

  // Credentialing
  CHECKIN_VIEW = 'checkin.view',
  CHECKIN_MANAGE = 'checkin.manage',
  REGISTRATION_VIEW = 'registration.view',
  REGISTRATION_MANAGE = 'registration.manage',
  ACCESS_HISTORY_VIEW = 'access-history.view',

  // Marketing
  MARKETING_ADS_VIEW = 'marketing.ads.view',
  MARKETING_ADS_MANAGE = 'marketing.ads.manage',
  MARKETING_CONTENT_VIEW = 'marketing.content.view',
  MARKETING_CONTENT_MANAGE = 'marketing.content.manage',
  MARKETING_EMAIL_VIEW = 'marketing.email.view',
  MARKETING_EMAIL_MANAGE = 'marketing.email.manage',
  MARKETING_PAGES_VIEW = 'marketing.pages.view',
  MARKETING_PAGES_MANAGE = 'marketing.pages.manage',

  // Communication
  COMMUNICATION_HUMANGPT_VIEW = 'communication.humangpt.view',
  COMMUNICATION_NOTIFICATIONS_VIEW = 'communication.notifications.view',
  COMMUNICATION_NOTIFICATIONS_MANAGE = 'communication.notifications.manage',

  // Analytics
  ANALYTICS_VIEW = 'analytics.view',
  ANALYTICS_ENGAGEMENT_VIEW = 'analytics.engagement.view',
  REPORTS_VIEW = 'reports.view',

  // Integrations
  API_MANAGEMENT_VIEW = 'api-management.view',
  API_MANAGEMENT_MANAGE = 'api-management.manage',
  INTEGRATIONS_VIEW = 'integrations.view',
  INTEGRATIONS_MANAGE = 'integrations.manage',

  // Legal AI
  AI_VALIDATOR_VIEW = 'ai-validator.view',
  HEATMAP_VIEW = 'heatmap.view',
  DYNAMIC_PRICING_VIEW = 'dynamic-pricing.view',
  LEGAL_AI_VIEW = 'legal-ai.view',

  // Settings
  SETTINGS_ORGANIZER_VIEW = 'settings.organizer.view',
  SETTINGS_ORGANIZER_MANAGE = 'settings.organizer.manage',
  SETTINGS_BRANDING_VIEW = 'settings.branding.view',
  SETTINGS_BRANDING_MANAGE = 'settings.branding.manage',
  SETTINGS_PRIVACY_VIEW = 'settings.privacy.view',
  SETTINGS_PRIVACY_MANAGE = 'settings.privacy.manage',
  SETTINGS_PERMISSIONS_VIEW = 'settings.permissions.view',
  SETTINGS_PERMISSIONS_MANAGE = 'settings.permissions.manage',

  // Support
  HELP_CHAT_VIEW = 'help.chat.view',
  HELP_FAQ_VIEW = 'help.faq.view',
  HELP_TUTORIAL_VIEW = 'help.tutorial.view',
}

// Mapear roles para permissões
export const getRolePermissions = (roleCode: string): Permission[] => {
  switch (roleCode) {
    case 'owner':
      // Owner tem acesso irrestrito a todas as permissões
      return Object.values(Permission);

    case 'developer':
    case 'integrator':
      return [
        // Configurações e integrações
        Permission.API_MANAGEMENT_VIEW,
        Permission.API_MANAGEMENT_MANAGE,
        Permission.INTEGRATIONS_VIEW,
        Permission.INTEGRATIONS_MANAGE,
        Permission.AI_VALIDATOR_VIEW,
        Permission.DYNAMIC_PRICING_VIEW,
        Permission.HEATMAP_VIEW,
        Permission.LEGAL_AI_VIEW,
        // Analytics e relatórios
        Permission.ANALYTICS_VIEW,
        Permission.ANALYTICS_ENGAGEMENT_VIEW,
        Permission.REPORTS_VIEW,
        // Administração de sistema
        Permission.ACCESS_HISTORY_VIEW,
        Permission.SETTINGS_PERMISSIONS_VIEW,
        Permission.SETTINGS_PERMISSIONS_MANAGE,
        Permission.SETTINGS_ORGANIZER_VIEW,
        Permission.SETTINGS_ORGANIZER_MANAGE,
        Permission.SETTINGS_BRANDING_VIEW,
        Permission.SETTINGS_BRANDING_MANAGE,
        Permission.SETTINGS_PRIVACY_VIEW,
        Permission.SETTINGS_PRIVACY_MANAGE,
      ];

    case 'event_manager':
      return [
        // Visão geral
        Permission.DASHBOARD_VIEW,
        // Eventos e cadastros
        Permission.EVENTS_VIEW,
        Permission.EVENTS_CREATE,
        Permission.EVENTS_EDIT,
        Permission.EVENTS_DELETE,
        Permission.EXHIBITORS_VIEW,
        Permission.EXHIBITORS_MANAGE,
        Permission.SUPPLIERS_VIEW,
        Permission.SUPPLIERS_MANAGE,
        Permission.STAFF_VIEW,
        Permission.STAFF_MANAGE,
        Permission.VISITORS_VIEW,
        Permission.VISITORS_MANAGE,
        // Programação
        Permission.ACTIVITIES_VIEW,
        Permission.ACTIVITIES_MANAGE,
        Permission.LECTURES_VIEW,
        Permission.LECTURES_MANAGE,
        Permission.VENUES_VIEW,
        Permission.VENUES_MANAGE,
        Permission.TRACKS_VIEW,
        Permission.TRACKS_MANAGE,
        // Operacional
        Permission.CHECKLIST_VIEW,
        Permission.CHECKLIST_MANAGE,
        Permission.TEAM_TASKS_VIEW,
        Permission.TEAM_TASKS_MANAGE,
        Permission.CHECKIN_VIEW,
        Permission.CHECKIN_MANAGE,
        Permission.REGISTRATION_VIEW,
        Permission.REGISTRATION_MANAGE,
      ];

    case 'finance':
      return [
        Permission.ANALYTICS_VIEW,
        Permission.ANALYTICS_ENGAGEMENT_VIEW,
        Permission.REPORTS_VIEW,
        Permission.DYNAMIC_PRICING_VIEW,
      ];

    case 'coordinator':
      return [
        // Visão geral
        Permission.DASHBOARD_VIEW,
        // Operacional
        Permission.EVENTS_VIEW,
        Permission.EXHIBITORS_VIEW,
        Permission.STAFF_VIEW,
        Permission.VISITORS_VIEW,
        Permission.ACTIVITIES_VIEW,
        Permission.LECTURES_VIEW,
        Permission.VENUES_VIEW,
        Permission.TRACKS_VIEW,
        Permission.CHECKLIST_VIEW,
        Permission.CHECKLIST_MANAGE,
        Permission.TEAM_TASKS_VIEW,
        Permission.TEAM_TASKS_MANAGE,
        Permission.CHECKIN_VIEW,
        Permission.CHECKIN_MANAGE,
        Permission.REGISTRATION_VIEW,
        Permission.REGISTRATION_MANAGE,
      ];

    case 'content_editor':
      return [
        Permission.MARKETING_CONTENT_VIEW,
        Permission.MARKETING_CONTENT_MANAGE,
        Permission.MARKETING_PAGES_VIEW,
        Permission.MARKETING_PAGES_MANAGE,
        Permission.MARKETING_EMAIL_VIEW,
        Permission.MARKETING_EMAIL_MANAGE,
      ];

    case 'support':
      return [
        Permission.HELP_CHAT_VIEW,
        Permission.HELP_FAQ_VIEW,
        Permission.HELP_TUTORIAL_VIEW,
      ];

    case 'viewer':
      return [
        // Visão geral e eventos
        Permission.DASHBOARD_VIEW,
        Permission.EVENTS_VIEW,
        Permission.EXHIBITORS_VIEW,
        Permission.SUPPLIERS_VIEW,
        Permission.STAFF_VIEW,
        Permission.VISITORS_VIEW,
        Permission.ACTIVITIES_VIEW,
        Permission.LECTURES_VIEW,
        Permission.VENUES_VIEW,
        Permission.TRACKS_VIEW,
        // Operacional (apenas visualização)
        Permission.CHECKLIST_VIEW,
        Permission.TEAM_TASKS_VIEW,
        Permission.CHECKIN_VIEW,
        Permission.REGISTRATION_VIEW,
        // Análises e relatórios
        Permission.ANALYTICS_VIEW,
        Permission.ANALYTICS_ENGAGEMENT_VIEW,
        Permission.REPORTS_VIEW,
        // Ajuda
        Permission.HELP_CHAT_VIEW,
        Permission.HELP_FAQ_VIEW,
        Permission.HELP_TUTORIAL_VIEW,
      ];

    case 'admin':
      return [
        Permission.DASHBOARD_VIEW,
        Permission.EVENTS_VIEW,
        Permission.PERMISSIONS_VIEW,
        Permission.PERMISSIONS_MANAGE,
        Permission.STAFF_VIEW,
        Permission.STAFF_MANAGE,
        Permission.ACCESS_HISTORY_VIEW,
        Permission.SETTINGS_ORGANIZER_VIEW,
        Permission.SETTINGS_ORGANIZER_MANAGE,
        Permission.SETTINGS_PERMISSIONS_VIEW,
        Permission.SETTINGS_PERMISSIONS_MANAGE,
      ];

    case 'member':
      return [
        Permission.DASHBOARD_VIEW,
        Permission.EVENTS_VIEW,
        Permission.HELP_CHAT_VIEW,
        Permission.HELP_FAQ_VIEW,
        Permission.HELP_TUTORIAL_VIEW,
      ];

    default:
      return [];
  }
};

// Mapear rotas para permissões
const routePermissionMap: Record<string, Permission> = {
  '/dashboard': Permission.DASHBOARD_VIEW,
  '/events': Permission.EVENTS_VIEW,
  '/events/new': Permission.EVENTS_CREATE,
  '/exhibitors': Permission.EXHIBITORS_VIEW,
  '/suppliers': Permission.SUPPLIERS_VIEW,
  '/permissions': Permission.PERMISSIONS_VIEW,
  '/staff': Permission.STAFF_VIEW,
  '/visitors': Permission.VISITORS_VIEW,
  '/activities': Permission.ACTIVITIES_VIEW,
  '/lectures': Permission.LECTURES_VIEW,
  '/venues': Permission.VENUES_VIEW,
  '/tracks': Permission.TRACKS_VIEW,
  '/checklist': Permission.CHECKLIST_VIEW,
  '/team-tasks': Permission.TEAM_TASKS_VIEW,
  '/supplier-tasks': Permission.SUPPLIER_TASKS_VIEW,
  '/checkin': Permission.CHECKIN_VIEW,
  '/registration': Permission.REGISTRATION_VIEW,
  '/access-history': Permission.ACCESS_HISTORY_VIEW,
  '/marketing/ads': Permission.MARKETING_ADS_VIEW,
  '/marketing/content': Permission.MARKETING_CONTENT_VIEW,
  '/marketing/email': Permission.MARKETING_EMAIL_VIEW,
  '/marketing/pages': Permission.MARKETING_PAGES_VIEW,
  '/communication/humangpt': Permission.COMMUNICATION_HUMANGPT_VIEW,
  '/communication/notifications': Permission.COMMUNICATION_NOTIFICATIONS_VIEW,
  '/analytics': Permission.ANALYTICS_VIEW,
  '/analytics/engagement': Permission.ANALYTICS_ENGAGEMENT_VIEW,
  '/reports': Permission.REPORTS_VIEW,
  '/api-management': Permission.API_MANAGEMENT_VIEW,
  '/integrations': Permission.INTEGRATIONS_VIEW,
  '/ai-validator': Permission.AI_VALIDATOR_VIEW,
  '/heatmap': Permission.HEATMAP_VIEW,
  '/dynamic-pricing': Permission.DYNAMIC_PRICING_VIEW,
  '/legal-ai': Permission.LEGAL_AI_VIEW,
  '/settings/organizer': Permission.SETTINGS_ORGANIZER_VIEW,
  '/settings/branding': Permission.SETTINGS_BRANDING_VIEW,
  '/settings/privacy': Permission.SETTINGS_PRIVACY_VIEW,
  '/settings/permissions': Permission.SETTINGS_PERMISSIONS_VIEW,
  '/help/chat': Permission.HELP_CHAT_VIEW,
  '/help/faq': Permission.HELP_FAQ_VIEW,
  '/help/tutorial': Permission.HELP_TUTORIAL_VIEW,
};

export const hasPermission = (userRole: { code: string } | null, permission: Permission): boolean => {
  if (!userRole) return false;
  
  const userPermissions = getRolePermissions(userRole.code);
  return userPermissions.includes(permission);
};

export const canAccessRoute = (userRole: { code: string } | null, route: string): boolean => {
  if (!userRole) return false;
  
  const requiredPermission = routePermissionMap[route];
  if (!requiredPermission) return true; // Se não há permissão mapeada, assume acesso liberado
  
  return hasPermission(userRole, requiredPermission);
};

export const getAllowedRoutes = (userRole: { code: string } | null): string[] => {
  if (!userRole) return [];
  
  const userPermissions = getRolePermissions(userRole.code);
  
  return Object.entries(routePermissionMap)
    .filter(([, permission]) => userPermissions.includes(permission))
    .map(([route]) => route);
};

// Menu filtering utilities for RBAC integration
export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: string;
  highlighted?: boolean;
}

export interface MenuGroup {
  id: string;
  icon: React.ReactNode;
  label: string;
  priority: 'high' | 'medium' | 'low';
  items: MenuItem[];
}

// Route to permission mapping for sidebar filtering
const sidebarRoutePermissionMap: Record<string, Permission> = {
  // Dashboard
  '/dashboard': Permission.DASHBOARD_VIEW,
  
  // Events
  '/events': Permission.EVENTS_VIEW,
  '/events/new': Permission.EVENTS_CREATE,
  
  // Users
  '/exhibitors': Permission.EXHIBITORS_VIEW,
  '/suppliers': Permission.SUPPLIERS_VIEW,
  '/permissions': Permission.SETTINGS_PERMISSIONS_MANAGE,
  '/staff': Permission.STAFF_VIEW,
  '/visitors': Permission.VISITORS_VIEW,
  
  // Agenda
  '/activities': Permission.ACTIVITIES_VIEW,
  '/lectures': Permission.LECTURES_VIEW,
  '/venues': Permission.VENUES_VIEW,
  '/tracks': Permission.TRACKS_VIEW,
  
  // Tasks
  '/checklist': Permission.CHECKLIST_VIEW,
  '/team-tasks': Permission.TEAM_TASKS_VIEW,
  '/supplier-tasks': Permission.TEAM_TASKS_VIEW,
  
  // Credentialing
  '/checkin': Permission.CHECKIN_VIEW,
  '/registration': Permission.REGISTRATION_VIEW,
  '/access-history': Permission.ACCESS_HISTORY_VIEW,
  
  // Marketing
  '/marketing/ads': Permission.MARKETING_ADS_VIEW,
  '/marketing/content': Permission.MARKETING_CONTENT_VIEW,
  '/marketing/email': Permission.MARKETING_EMAIL_VIEW,
  '/marketing/pages': Permission.MARKETING_PAGES_VIEW,
  
  // Communication
  '/communication/humangpt': Permission.COMMUNICATION_NOTIFICATIONS_VIEW,
  '/communication/notifications': Permission.COMMUNICATION_NOTIFICATIONS_VIEW,
  
  // Analytics
  '/analytics': Permission.ANALYTICS_VIEW,
  '/analytics/engagement': Permission.ANALYTICS_ENGAGEMENT_VIEW,
  '/reports': Permission.REPORTS_VIEW,
  
  // Integrations
  '/api-management': Permission.API_MANAGEMENT_VIEW,
  '/integrations': Permission.INTEGRATIONS_VIEW,
  
  // Legal AI
  '/ai-validator': Permission.AI_VALIDATOR_VIEW,
  '/heatmap': Permission.HEATMAP_VIEW,
  '/dynamic-pricing': Permission.DYNAMIC_PRICING_VIEW,
  '/legal-ai': Permission.LEGAL_AI_VIEW,
  
  // Settings
  '/settings/organizer': Permission.SETTINGS_ORGANIZER_MANAGE,
  '/settings/branding': Permission.SETTINGS_BRANDING_MANAGE,
  '/settings/privacy': Permission.SETTINGS_PRIVACY_MANAGE,
  '/settings/permissions': Permission.SETTINGS_PERMISSIONS_MANAGE,
  
  // Support
  '/help/chat': Permission.DASHBOARD_VIEW,
  '/help/faq': Permission.DASHBOARD_VIEW,
  '/help/tutorial': Permission.DASHBOARD_VIEW,
};

/**
 * Filter menu items based on user permissions
 */
export const filterMenuItemsByPermissions = (
  items: MenuItem[],
  userRole: { code: string } | null
): MenuItem[] => {
  if (!userRole) return [];
  
  return items.filter(item => {
    const requiredPermission = sidebarRoutePermissionMap[item.to];
    return requiredPermission ? hasPermission(userRole, requiredPermission) : true;
  });
};

/**
 * Filter menu groups and their items based on user permissions
 */
export const filterMenuGroupsByPermissions = (
  groups: MenuGroup[],
  userRole: { code: string } | null
): MenuGroup[] => {
  if (!userRole) return [];
  
  return groups
    .map(group => ({
      ...group,
      items: filterMenuItemsByPermissions(group.items, userRole)
    }))
    .filter(group => group.items.length > 0); // Remove empty groups
};

/**
 * Check if dashboard item should be visible
 */
export const canAccessDashboard = (userRole: { code: string } | null): boolean => {
  return hasPermission(userRole, Permission.DASHBOARD_VIEW);
};

/**
 * Filter events items based on permissions
 */
export const filterEventsItems = (
  items: MenuItem[],
  userRole: { code: string } | null
): MenuItem[] => {
  return filterMenuItemsByPermissions(items, userRole);
};