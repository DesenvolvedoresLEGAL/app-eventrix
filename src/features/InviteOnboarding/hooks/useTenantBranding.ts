
import { useEffect } from 'react'
import { TenantBranding } from '../types/invite.types'

export function useTenantBranding(tenant: TenantBranding | null) {
  useEffect(() => {
    if (!tenant) return

    // Aplicar cores dinâmicas do tenant
    const root = document.documentElement
    root.style.setProperty('--tenant-primary', tenant.primary_color)
    root.style.setProperty('--tenant-secondary', tenant.secondary_color)
    
    // Aplicar fonte do tenant se disponível
    if (tenant.font_family) {
      root.style.setProperty('--tenant-font', tenant.font_family)
    }

    // Cleanup ao desmontar
    return () => {
      root.style.removeProperty('--tenant-primary')
      root.style.removeProperty('--tenant-secondary')
      root.style.removeProperty('--tenant-font')
    }
  }, [tenant])
}
