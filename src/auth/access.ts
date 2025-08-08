export type AccessState = 'public' | 'unauthenticated' | 'authorized' | 'forbidden';

import type { UserPermissions } from '@/types/permissions';
import { hasPermission } from '@/utils/permissions';

interface AccessParams {
  isLoadingAuth: boolean;
  isAuthenticated: boolean;
  userPermissions: UserPermissions;
  requiredPermission?: string;
  allowedRoles?: string[];
  strict?: boolean;
  isPublic: boolean;
}

export function getAccessState(params: AccessParams): AccessState {
  const { isLoadingAuth, isAuthenticated, userPermissions, requiredPermission, allowedRoles, strict = false, isPublic } = params;

  if (isPublic) return 'public';
  if (isLoadingAuth) return 'unauthenticated'; // transient; guard should show fallback
  if (!isAuthenticated) return 'unauthenticated';

  // If no specific permission is required, consider it authorized for logged-in users
  if (!requiredPermission && (!allowedRoles || allowedRoles.length === 0)) return 'authorized';

  const ok = hasPermission(userPermissions, requiredPermission, allowedRoles, strict);
  return ok ? 'authorized' : 'forbidden';
}
