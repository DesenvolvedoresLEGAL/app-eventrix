import * as React from 'react'
import { purgeAuthSession } from '@/utils/authStorage'

/**
 * Hook para limpar sessão/token de autenticação ao entrar em rotas públicas
 * como "/" e "/login". Evita duplicação de lógica nos componentes.
 */
export function useEntryAuthCleanup() {
  React.useEffect(() => {
    // Desacoplar do ciclo de renderização
    let cancelled = false
    ;(async () => {
      if (cancelled) return
      await purgeAuthSession()
    })()
    return () => {
      cancelled = true
    }
  }, [])
}
