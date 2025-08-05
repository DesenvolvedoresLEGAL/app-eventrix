
import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { InviteOnboardingProvider, useInviteOnboarding } from '../context/InviteOnboardingContext'
import { useInviteValidation } from '../hooks/useInviteValidation'
import { useAuth } from '@/context/AuthContext'
import InviteStatusCard from '../components/InviteStatusCard'
import InviteAcceptForm from '../components/InviteAcceptForm'
import OnboardingSteps from '../components/OnboardingSteps'

const AcceptInviteContent: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const {
    inviteId,
    inviteData,
    tenantData,
    currentStep,
    isValidating,
    error,
    setInviteId,
    setCurrentStep
  } = useInviteOnboarding()

  useInviteValidation()

  useEffect(() => {
    const inviteIdParam = searchParams.get('invite_id')
    if (inviteIdParam) {
      setInviteId(inviteIdParam)
    } else {
      navigate('/onboarding/invite-expired')
    }
  }, [searchParams, setInviteId, navigate])

  useEffect(() => {
    // Se o usuário não está autenticado, redirecionar para login com Magic Link
    if (!authLoading && !user && inviteData) {
      // TODO: Implementar redirecionamento para Magic Link específico do convite
      console.log('User not authenticated, should redirect to magic link')
    }
  }, [authLoading, user, inviteData])

  useEffect(() => {
    // Avançar para o step do formulário quando o convite for validado
    if (inviteData && user && currentStep === 1) {
      setCurrentStep(2)
    }
  }, [inviteData, user, currentStep, setCurrentStep])

  if (authLoading || isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">
            {authLoading ? 'Carregando...' : 'Validando convite...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!inviteData || !tenantData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Convite não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Bem-vindo ao Eventrix
          </h1>
          <p className="text-gray-600">
            Você foi convidado para participar de {tenantData.nome_fantasia || tenantData.razao_social}
          </p>
        </div>

        {/* Progress Steps */}
        <OnboardingSteps currentStep={currentStep} />

        {/* Content */}
        <div className="flex flex-col items-center space-y-6">
          {currentStep === 1 && (
            <InviteStatusCard
              inviteData={inviteData}
              tenantData={tenantData}
              isValidating={isValidating}
            />
          )}

          {currentStep === 2 && user && (
            <InviteAcceptForm />
          )}
        </div>
      </div>
    </div>
  )
}

const AcceptInvitePage: React.FC = () => {
  return (
    <InviteOnboardingProvider>
      <AcceptInviteContent />
    </InviteOnboardingProvider>
  )
}

export default AcceptInvitePage
