
import { useEffect } from 'react'
import { useInviteOnboarding } from '../context/InviteOnboardingContext'
import { InviteData, TenantBranding } from '../types/invite.types'

export function useInviteValidation(token: string | null) {
  const { dispatch } = useInviteOnboarding()

  useEffect(() => {
    if (!token) return

    const validateInvite = async () => {
      dispatch({ type: 'SET_VALIDATING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      try {
        // TODO: Implementar consulta à tabela invites
        // const { data: invite, error } = await supabase
        //   .from('invites')
        //   .select(`
        //     *,
        //     tenants (
        //       id,
        //       nome_fantasia,
        //       razao_social,
        //       logo_url,
        //       primary_color,
        //       secondary_color,
        //       font_family
        //     )
        //   `)
        //   .eq('id', token)
        //   .eq('status', 'pending')
        //   .gt('expires_at', new Date().toISOString())
        //   .single()

        // Simulação para desenvolvimento
        const mockInvite: InviteData = {
          id: token,
          email: 'usuario@example.com',
          tenant_id: 'tenant-123',
          role: 'staff',
          status: 'pending',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          invited_by: 'owner-123',
          created_at: new Date().toISOString(),
        }

        const mockTenant: TenantBranding = {
          id: 'tenant-123',
          nome_fantasia: 'Eventrix Demo',
          razao_social: 'Eventrix Tecnologia Ltda',
          primary_color: '#4D2BFB',
          secondary_color: '#03F9FF',
          font_family: 'Neue Haas Unica',
        }

        // Simular delay da rede
        await new Promise(resolve => setTimeout(resolve, 1000))

        dispatch({ type: 'SET_INVITE', payload: mockInvite })
        dispatch({ type: 'SET_TENANT', payload: mockTenant })

      } catch (error) {
        console.error('Erro ao validar convite:', error)
        dispatch({ type: 'SET_ERROR', payload: 'Convite inválido ou expirado' })
      } finally {
        dispatch({ type: 'SET_VALIDATING', payload: false })
      }
    }

    validateInvite()
  }, [token, dispatch])
}
