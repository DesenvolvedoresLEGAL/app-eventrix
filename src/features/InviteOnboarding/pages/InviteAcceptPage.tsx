
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useAuth } from '@/context/FixedAuthContext'
import { InviteOnboardingProvider, useInviteOnboarding } from '../context/InviteOnboardingContext'
import { useInviteValidation } from '../hooks/useInviteValidation'
import { useTenantBranding } from '../hooks/useTenantBranding'
import { InviteStatusCard } from '../components/InviteStatusCard'
import { InviteAcceptForm } from '../components/InviteAcceptForm'
import { InviteSuccessCard } from '../components/InviteSuccessCard'
import { OnboardingSteps } from '../components/OnboardingSteps'

function InviteAcceptPageContent() {
  const [searchParams] = useSearchParams()
  const { sendMagicLink } = useAuth()
  const { state, dispatch } = useInviteOnboarding()
  
  const inviteToken = searchParams.get('invite_id')
  
  useInviteValidation(inviteToken)
  useTenantBranding(state.tenant)

  useEffect(() => {
    if (inviteToken) {
      dispatch({ type: 'SET_TOKEN', payload: inviteToken })
    }
  }, [inviteToken, dispatch])

  useEffect(() => {
    // TODO: Implementar Magic Link authentication com Supabase
    // Quando o usuário acessar via Magic Link, o Supabase deve autenticá-lo automaticamente
    // const handleMagicLinkAuth = async () => {
    //   if (inviteToken && state.invite) {
    //     try {
    //       await sendMagicLink(state.invite.email)
    //     } catch (error) {
    //       console.error('Erro na autenticação Magic Link:', error)
    //       dispatch({ type: 'SET_ERROR', payload: 'Erro na autenticação. Tente novamente.' })
    //     }
    //   }
    // }
    // handleMagicLinkAuth()
  }, [inviteToken, state.invite, dispatch, sendMagicLink])

  const renderContent = () => {
    // Step 3: Success
    if (state.currentStep === 3) {
      return <InviteSuccessCard tenant={state.tenant} />
    }

    // Step 1: Validating or showing invite status
    if (state.currentStep === 1 || state.isValidating || state.error || !state.invite) {
      return (
        <InviteStatusCard
          invite={state.invite}
          tenant={state.tenant}
          isValidating={state.isValidating}
          error={state.error}
        />
      )
    }

    // Step 2: Form to complete profile
    if (state.currentStep === 2 && state.invite && !state.error) {
      return <InviteAcceptForm />
    }

    return null
  }

  // Auto-advance to form step when invite is validated successfully
  useEffect(() => {
    if (state.invite && !state.error && !state.isValidating && state.currentStep === 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: 2 })
    }
  }, [state.invite, state.error, state.isValidating, state.currentStep, dispatch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header with branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl font-black">EVENTRIX™</h1>
          </div>
          <div className="flex items-center justify-center gap-1 mb-6">
            <Zap size={12} className="text-secondary" />
            <span className="text-sm font-semibold text-muted-foreground">Powered by LEGAL AI</span>
          </div>
        </div>

        {/* Progress steps */}
        <OnboardingSteps 
          currentStep={state.currentStep} 
          tenantPrimaryColor={state.tenant?.primary_color}
        />

        {/* Main content */}
        <div className="max-w-lg mx-auto">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>
    </div>
  )
}

export default function InviteAcceptPage() {
  return (
    <InviteOnboardingProvider>
      <InviteAcceptPageContent />
    </InviteOnboardingProvider>
  )
}
