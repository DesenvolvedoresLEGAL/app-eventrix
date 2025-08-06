
import { useEffect } from 'react'
import { useInviteOnboarding } from '../context/InviteOnboardingContext'
import { InviteData, TenantBranding } from '../types/invite.types'
import supabase from '@/utils/supabase/client'

export function useInviteValidation(token: string | null) {
  const { dispatch } = useInviteOnboarding()

  useEffect(() => {
    if (!token) return

    const validateInvite = async () => {
      dispatch({ type: 'SET_VALIDATING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const supabaseClient = supabase as any
        const { data, error } = await supabaseClient
          .from('invites')
          .select(
            `id, tenant_id, email, role, token, status, expires_at, invited_by, created_at, accepted_at,
            tenants!inner(
              id,
              nome_fantasia,
              razao_social,
              logo_url,
              primary_color,
              secondary_color,
              font_family
            )`
          )
          .eq('token', token)
          .eq('status', 'pending')
          .gt('expires_at', new Date().toISOString())
          .single()

        if (error || !data) {
          throw error || new Error('Convite inválido ou expirado')
        }

        const invite: InviteData = {
          id: data.id,
          tenant_id: data.tenant_id,
          email: data.email,
          role: data.role,
          token: data.token,
          status: data.status,
          expires_at: data.expires_at,
          invited_by: data.invited_by,
          created_at: data.created_at,
          accepted_at: data.accepted_at ?? null,
        }

        const tenantData = data.tenants
        const tenant: TenantBranding = {
          id: tenantData.id,
          nome_fantasia: tenantData.nome_fantasia,
          razao_social: tenantData.razao_social,
          logo_url: tenantData.logo_url ?? undefined,
          primary_color: tenantData.primary_color,
          secondary_color: tenantData.secondary_color,
          font_family: tenantData.font_family,
        }

        dispatch({ type: 'SET_INVITE', payload: invite })
        dispatch({ type: 'SET_TENANT', payload: tenant })
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
