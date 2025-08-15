import { Permission } from '@/utils/permissions';

export interface UserRole {
  id: string;
  code: string;
  description: string | null;
  permissions: Permission[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateRoleRequest {
  code: string;
  description?: string;
  permissions: Permission[];
}

export interface UpdateRoleRequest {
  code?: string;
  description?: string;
  permissions?: Permission[];
}

export interface RoleStats {
  totalRoles: number;
  totalUsers: number;
  totalPermissions: number;
  activeRoles: number;
  mostUsedRole: {
    code: string;
    description: string;
    userCount: number;
  } | null;
  distributionByRole: Array<{
    code: string;
    description: string;
    userCount: number;
    percentage: number;
  }>;
}

export interface RoleFormData {
  code: string;
  description: string;
  permissions: Permission[];
}

export interface PermissionGroup {
  module: string;
  permissions: Array<{
    key: Permission;
    name: string;
    description: string;
  }>;
}

export interface UserRoleAssignment {
  userId: string;
  roleId: string;
  assignedAt: string;
  assignedBy?: string;
}

export interface AuditLogEntry {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ASSIGN' | 'UNASSIGN';
  entityType: 'ROLE' | 'PERMISSION' | 'USER_ROLE';
  entityId: string;
  userId: string;
  changes: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  user?: {
    fullName: string;
    email: string;
  };
}