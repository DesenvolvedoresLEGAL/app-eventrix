
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

export const DEFAULT_PERMISSIONS: RolePermissionMap = {
  owner: ['*'], // Acesso total
  admin: [
    'view_dashboard',
    'manage_events',
    'manage_users',
    'view_analytics',
    'manage_permissions',
    'view_reports'
  ],
  event_manager: [
    'view_dashboard',
    'manage_events',
    'view_analytics',
    'manage_activities',
    'manage_venues'
  ],
  staff: [
    'view_dashboard',
    'view_events',
    'manage_checkin'
  ],
  visitor: [
    'view_dashboard'
  ]
}
