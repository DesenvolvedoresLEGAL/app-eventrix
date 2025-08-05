
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInviteOnboarding } from '../context/InviteOnboardingContext'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'

export function useInviteAcceptance() {
  const { state, dispatch } = useInviteOnboarding()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const acceptInvite = useCallback(async () => {
    if (!state.invite || !state.tenant || !user) return

    dispatch({ type: 'SET_ACCEPTING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      // TODO: Implementar upsert em profiles e update em invites
      // const { error: profileError } = await supabase
      //   .from('profiles')
      //   .upsert({
      //     id: user.id,
      //     email: state.invite.email,
      //     first_name: state.formData.firstName,
      //     last_name: state.formData.lastName,
      //     full_name: state.formData.fullName,
      //     tenant_id: state.invite.tenant_id,
      //     role: state.invite.role,
      //     is_active: true,
      //     updated_at: new Date().toISOString(),
      //   })

      // const { error: inviteError } = await supabase
      //   .from('invites')
      //   .update({
      //     status: 'accepted',
      //     accepted_at: new Date().toISOString(),
      //   })
      //   .eq('id', state.invite.id)

      // Simular processo de aceitação
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "Bem-vindo ao Eventrix!",
        description: `Sua conta foi criada com sucesso em ${state.tenant.nome_fantasia}`,
        variant: "default"
      })

      // Avançar para step de sucesso
      dispatch({ type: 'SET_CURRENT_STEP', payload: 3 })

      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)

    } catch (error) {
      console.error('Erro ao aceitar convite:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao processar convite. Tente novamente.' })
      toast({
        title: "Erro ao aceitar convite",
        description: "Não foi possível processar seu convite. Tente novamente.",
        variant: "destructive"
      })
    } finally {
      dispatch({ type: 'SET_ACCEPTING', payload: false })
    }
  }, [state.invite, state.tenant, state.formData, user, dispatch, navigate, toast])

  return { acceptInvite }
}
