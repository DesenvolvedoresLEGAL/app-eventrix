
import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { InviteOnboardingProvider, useInviteOnboarding } from '../context/InviteOnboardingContext'
import { useInviteValidation } from '../hooks/useInviteValidation'
import { OnboardingSteps } from '../components/OnboardingSteps'
import { InviteStatusCard } from '../components/InviteStatusCard'
import { InviteAcceptForm } from '../components/InviteAcceptForm'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AcceptInviteContent: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const { state, setInviteId, setCurrentStep } = useInviteOnboarding()
  const { validateInvite, isValidating, inviteData, tenantData, error } = useInviteValidation()

  const inviteId = searchParams.get('invite_id')

  useEffect(() => {
    if (inviteId) {
      setInviteId(inviteId)
      validateInvite(inviteId)
    } else {
      navigate('/onboarding/invite-expired')
    }
  }, [inviteId, setInviteId, validateInvite, navigate])

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // TODO: Redirecionar para magic link ou página de login com convite
      console.log('Usuário não autenticado, redirecionando...')
    }
  }, [authLoading, isAuthenticated])

  useEffect(() => {
    if (inviteData && !error && !isValidating) {
      setCurrentStep(1)
    }
  }, [inviteData, error, isValidating, setCurrentStep])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Autenticando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="mb-4">
              <ArrowRight className="h-8 w-8 text-muted-foreground mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Autenticação necessária</h2>
            <p className="text-muted-foreground mb-4">
              Você precisa estar autenticado para aceitar este convite.
            </p>
            <p className="text-sm text-muted-foreground">
              Verifique seu email e clique no link mágico enviado.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 0:
        return (
          <InviteStatusCard
            isLoading={isValidating}
            inviteData={inviteData}
            tenantData={tenantData}
            error={error}
          />
        )
      case 1:
        return <InviteAcceptForm />
      case 2:
        return (
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <div className="mb-4">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Convite aceito!</h2>
              <p className="text-muted-foreground mb-4">
                Bem-vindo à {tenantData?.nome_fantasia}! 
                Seu perfil foi criado com sucesso.
              </p>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                Ir para o Dashboard
              </Button>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <OnboardingSteps currentStep={state.currentStep} />
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export const AcceptInvitePage: React.FC = () => {
  return (
    <InviteOnboardingProvider>
      <AcceptInviteContent />
    </InviteOnboardingProvider>
  )
}
