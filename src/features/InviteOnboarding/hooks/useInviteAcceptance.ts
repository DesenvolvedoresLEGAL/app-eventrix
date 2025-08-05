
import { useCallback } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useInviteOnboarding } from '../context/InviteOnboardingContext'
// import supabase from '@/utils/supabase/client'

export const useInviteAcceptance = () => {
  const { user } = useAuth()
  const { state, setSubmitting, setError, setCurrentStep } = useInviteOnboarding()

  const acceptInvite = useCallback(async () => {
    if (!user || !state.inviteData || !state.userForm.firstName || !state.userForm.lastName) {
      setError('Dados incompletos para aceitar o convite')
      return false
    }

    setSubmitting(true)
    setError(null)

    try {
      // TODO: Atualizar status do convite para 'accepted'
      // const { error: inviteUpdateError } = await supabase
      //   .from('invites')
      //   .update({
      //     status: 'accepted',
      //     accepted_at: new Date().toISOString()
      //   })
      //   .eq('id', state.inviteData.id)

      // if (inviteUpdateError) {
      //   throw new Error('Erro ao aceitar convite')
      // }

      // TODO: Criar/atualizar perfil do usuário
      // const { error: profileError } = await supabase
      //   .from('profiles')
      //   .upsert({
      //     id: user.id,
      //     email: user.email,
      //     first_name: state.userForm.firstName,
      //     last_name: state.userForm.lastName,
      //     full_name: `${state.userForm.firstName} ${state.userForm.lastName}`,
      //     whatsapp_number: state.userForm.whatsappNumber || null,
      //     tenant_id: state.inviteData.tenant_id,
      //     role: state.inviteData.role
      //   })

      // if (profileError) {
      //   throw new Error('Erro ao criar perfil do usuário')
      // }

      // Simulação para desenvolvimento
      console.log('Convite aceito:', {
        inviteId: state.inviteData.id,
        userId: user.id,
        userForm: state.userForm,
        tenantId: state.inviteData.tenant_id,
      })

      setCurrentStep(2) // Passo de sucesso
      return true

    } catch (error) {
      console.error('Erro ao aceitar convite:', error)
      setError(error instanceof Error ? error.message : 'Erro ao aceitar convite')
      return false
    } finally {
      setSubmitting(false)
    }
  }, [user, state.inviteData, state.userForm, setSubmitting, setError, setCurrentStep])

  return {
    acceptInvite,
    isSubmitting: state.isSubmitting,
    error: state.error,
  }
}
