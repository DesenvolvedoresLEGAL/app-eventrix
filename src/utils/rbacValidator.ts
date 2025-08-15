import React from 'react';
import { Permission } from './permissions';

// Tipos para validação de consistência
interface RoutePermissionConfig {
  route: string;
  appTsxPermission: Permission;
  navigationUtilsPermission: Permission;
  permissionsTsPermission: Permission;
  sidebarPermission: Permission;
}

interface ValidationResult {
  isValid: boolean;
  inconsistencies: {
    route: string;
    field: string;
    expected: Permission;
    actual: Permission;
  }[];
}

/**
 * Mapeamento centralizado de rotas para permissões
 * Esta é a fonte da verdade para validação de consistência
 */
export const CANONICAL_ROUTE_PERMISSIONS: Record<string, Permission> = {
  // Dashboard & Core
  '/dashboard': Permission.DASHBOARD_VIEW,
  '/tenant-dashboard': Permission.DASHBOARD_VIEW,

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
  '/supplier-tasks': Permission.SUPPLIER_TASKS_VIEW,

  // Credentialing
  '/checkin': Permission.CHECKIN_VIEW,
  '/registration': Permission.REGISTRATION_VIEW,
  '/access-history': Permission.ACCESS_HISTORY_VIEW,

  // Marketing
  '/marketing': Permission.MARKETING_ADS_VIEW,
  '/marketing/ads': Permission.MARKETING_ADS_MANAGE,
  '/marketing/content': Permission.MARKETING_CONTENT_MANAGE,
  '/marketing/email': Permission.MARKETING_EMAIL_MANAGE,
  '/marketing/pages': Permission.MARKETING_PAGES_MANAGE,

  // Communication
  '/communication/humangpt': Permission.COMMUNICATION_NOTIFICATIONS_VIEW,
  '/communication/linkai': Permission.COMMUNICATION_NOTIFICATIONS_VIEW,
  '/communication/notifications': Permission.COMMUNICATION_NOTIFICATIONS_MANAGE,

  // Analytics
  '/analytics': Permission.ANALYTICS_VIEW,
  '/analytics/nps': Permission.ANALYTICS_VIEW,
  '/analytics/heatmap': Permission.ANALYTICS_VIEW,
  '/analytics/engagement': Permission.ANALYTICS_ENGAGEMENT_VIEW,
  '/reports': Permission.REPORTS_VIEW,

  // Integrations
  '/integrations': Permission.INTEGRATIONS_VIEW,
  '/api-management': Permission.API_MANAGEMENT_VIEW,

  // Legal AI
  '/ai-validator': Permission.AI_VALIDATOR_VIEW,
  '/heatmap': Permission.HEATMAP_VIEW,
  '/dynamic-pricing': Permission.DYNAMIC_PRICING_VIEW,
  '/legal-ai': Permission.LEGAL_AI_VIEW,
};

/**
 * Valida se uma configuração de rota está consistente entre todos os arquivos
 */
export const validateRouteConsistency = (config: RoutePermissionConfig): ValidationResult => {
  const canonical = CANONICAL_ROUTE_PERMISSIONS[config.route];
  const inconsistencies: ValidationResult['inconsistencies'] = [];

  if (!canonical) {
    console.warn(`Rota ${config.route} não encontrada no mapeamento canônico`);
    return { isValid: true, inconsistencies };
  }

  // Verificar App.tsx
  if (config.appTsxPermission !== canonical) {
    inconsistencies.push({
      route: config.route,
      field: 'App.tsx',
      expected: canonical,
      actual: config.appTsxPermission
    });
  }

  // Verificar navigationUtils.ts
  if (config.navigationUtilsPermission !== canonical) {
    inconsistencies.push({
      route: config.route,
      field: 'navigationUtils.ts',
      expected: canonical,
      actual: config.navigationUtilsPermission
    });
  }

  // Verificar permissions.ts (routePermissionMap)
  if (config.permissionsTsPermission !== canonical) {
    inconsistencies.push({
      route: config.route,
      field: 'permissions.ts (routePermissionMap)',
      expected: canonical,
      actual: config.permissionsTsPermission
    });
  }

  // Verificar permissions.ts (sidebarRoutePermissionMap)
  if (config.sidebarPermission !== canonical) {
    inconsistencies.push({
      route: config.route,
      field: 'permissions.ts (sidebarRoutePermissionMap)',
      expected: canonical,
      actual: config.sidebarPermission
    });
  }

  return {
    isValid: inconsistencies.length === 0,
    inconsistencies
  };
};

/**
 * Hook para validação em tempo de desenvolvimento
 */
export const useRBACValidator = () => {
  if (process.env.NODE_ENV === 'development') {
    // Usar useEffect para evitar execução em cada render
    React.useEffect(() => {
      const logInconsistencies = () => {
        console.group('🔒 RBAC Validation Results');
        
        // Aqui você pode adicionar validações específicas
        console.log('Validando consistência de permissões...');
        
        // Exemplo de validação para dynamic-pricing
        const dynamicPricingConfig: RoutePermissionConfig = {
          route: '/dynamic-pricing',
          appTsxPermission: Permission.DYNAMIC_PRICING_VIEW,
          navigationUtilsPermission: Permission.DYNAMIC_PRICING_VIEW,
          permissionsTsPermission: Permission.DYNAMIC_PRICING_VIEW,
          sidebarPermission: Permission.DYNAMIC_PRICING_VIEW
        };

        const result = validateRouteConsistency(dynamicPricingConfig);
        
        if (!result.isValid) {
          console.error('❌ Inconsistências encontradas:', result.inconsistencies);
        } else {
          console.log('✅ Todas as permissões estão consistentes');
        }
        
        console.groupEnd();
      };

      // Executar validação apenas uma vez quando o componente montar
      const timer = setTimeout(logInconsistencies, 1000);
      return () => clearTimeout(timer);
    }, []); // Array de dependências vazio para executar apenas uma vez
  }

  return {
    validateRoute: validateRouteConsistency,
    canonicalPermissions: CANONICAL_ROUTE_PERMISSIONS
  };
};

/**
 * Utilitário para debug de permissões do usuário
 */
export const debugUserPermissions = (userRole: { code: string } | null, route: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔍 Debug Permissions for route: ${route}`);
    console.log('User role:', userRole?.code || 'none');
    console.log('Required permission:', CANONICAL_ROUTE_PERMISSIONS[route] || 'none');
    console.groupEnd();
  }
};