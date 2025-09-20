import { useMemo } from 'react';
import { useAuth } from '@/context/FixedAuthContext';

/**
 * Hook para obter informações do tenant atual
 */
export const useTenant = () => {
  const { tenant, profile } = useAuth();

  return useMemo(() => ({
    tenant,
    tenantId: profile?.tenant_id || null,
    isLoading: !profile, // Se profile não carregou ainda, está loading
  }), [tenant, profile]);
};