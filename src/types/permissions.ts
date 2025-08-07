
import { UserRole } from '@/shared/config/permissions'

export interface RoleBasedRouteProps {
  children: JSX.Element
  allowedRoles?: string[]
  requiredPermission?: string
  fallbackPath?: string
}

export interface UserPermissions {
  role: string
  permissions: string[]
  isFetching: boolean
}

export interface RolePermissionMap {
  [key: string]: string[]
}

// Manter compatibilidade com sistema anterior
export const DEFAULT_PERMISSIONS: RolePermissionMap = {
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
    'view_analytics',
    'manage_activities',
    'manage_venues'
  ],
  finance: [
    'view_analytics',
    'view_reports',
    'manage_dynamic_pricing'
  ],
  coordinator: [
    'view_dashboard',
    'view_events',
    'manage_checkin'
  ],
  content_editor: [
    'manage_content',
    'manage_marketing_pages',
    'manage_emails'
  ],
  support: [
    'manage_support',
    'view_tutorials'
  ],
  viewer: [
    'view_dashboard'
  ]
}

// Re-export tipos da configuração centralizada
export type { UserRole } from '@/shared/config/permissions'
