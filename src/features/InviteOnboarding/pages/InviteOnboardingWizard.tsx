
import React, { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Zap, AlertCircle, CheckCircle2, Clock, Building2, Upload, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/FixedAuthContext'
import { useToast } from '@/hooks/use-toast'
import { InviteOnboardingProvider, useInviteOnboarding } from '../context/InviteOnboardingContext'
import { useInviteValidation } from '../hooks/useInviteValidation'
import { useInviteAcceptance } from '../hooks/useInviteAcceptance'
import { useTenantBranding } from '../hooks/useTenantBranding'
import InviteStepIndicator from '../components/InviteStepIndicator'

function InviteOnboardingWizardContent() {
  const [searchParams] = useSearchParams()
  const { sendMagicLink } = useAuth()
  const { toast } = useToast()
  const { 
    state, 
    dispatch, 
    nextStep, 
    prevStep, 
    canProceed, 
    updateFormData 
  } = useInviteOnboarding()
  const { acceptInvite } = useInviteAcceptance()
  
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
  }, [inviteToken, state.invite, dispatch, sendMagicLink])

  // Auto-advance para step 2 quando convite é validado
  useEffect(() => {
    if (state.invite && !state.error && !state.isValidating && state.currentStep === 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: 2 })
    }
  }, [state.invite, state.error, state.isValidating, state.currentStep, dispatch])

  const renderValidationStep = useMemo(() => () => {
    if (state.isValidating) {
      return (
        <Card className="tech-card">
          <CardHeader className="text-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <CardTitle className="text-lg">Validando convite...</CardTitle>
          </CardHeader>
        </Card>
      )
    }

    if (state.error) {
      return (
        <Card className="tech-card border-destructive/50">
          <CardHeader className="text-center">
            <AlertCircle size={32} className="text-destructive mx-auto mb-4" />
            <CardTitle className="text-lg text-destructive">Convite inválido</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">{state.error}</p>
            <p className="text-sm text-muted-foreground">
              Verifique se o link está correto ou solicite um novo convite.
            </p>
          </CardContent>
        </Card>
      )
    }

    if (!state.invite || !state.tenant) return null

    const isExpired = new Date(state.invite.expires_at) < new Date()
    
    if (isExpired) {
      return (
        <Card className="tech-card border-destructive/50">
          <CardHeader className="text-center">
            <AlertCircle size={32} className="text-destructive mx-auto mb-4" />
            <CardTitle className="text-lg text-destructive">Convite expirado</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Este convite expirou em {new Date(state.invite.expires_at).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-sm text-muted-foreground">
              Solicite um novo convite ao administrador.
            </p>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="tech-card">
        <CardHeader className="text-center">
          <CheckCircle2 size={32} className="text-secondary mx-auto mb-4" />
          <CardTitle className="text-lg">Convite válido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
            <Building2 size={20} className="text-secondary" />
            <div className="flex-1">
              <p className="font-semibold">{state.tenant.nome_fantasia}</p>
              <p className="text-sm text-muted-foreground">{state.tenant.razao_social}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Email:</span>
              <p className="font-medium">{state.invite.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Cargo:</span>
              <p className="font-medium capitalize">{state.invite.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>
              Expira em {new Date(state.invite.expires_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }, [state.isValidating, state.error, state.invite, state.tenant])

  const renderProfileStep = useMemo(() => () => (
    <Card className="tech-card">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={24} className="text-white" />
        </div>
        <CardTitle className="text-xl">
          Complete seu perfil
        </CardTitle>
        <p className="text-muted-foreground">
          Preencha seus dados para finalizar o cadastro em {state.tenant?.nome_fantasia}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                type="text"
                value={state.formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                className="tech-input"
                placeholder="Seu primeiro nome"
                required
                disabled={state.isAccepting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Sobrenome *</Label>
              <Input
                id="lastName"
                type="text"
                value={state.formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className="tech-input"
                placeholder="Seu sobrenome"
                required
                disabled={state.isAccepting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Nome completo</Label>
            <Input
              id="fullName"
              type="text"
              value={state.formData.fullName}
              onChange={(e) => updateFormData('fullName', e.target.value)}
              className="tech-input"
              placeholder="Nome completo (será preenchido automaticamente)"
              disabled={state.isAccepting}
            />
          </div>

          <div className="space-y-2">
            <Label>Foto do perfil (opcional)</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Arraste uma imagem ou clique para selecionar
              </p>
              <Button type="button" variant="outline" size="sm" disabled={state.isAccepting}>
                Selecionar arquivo
              </Button>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={state.formData.acceptsTerms}
              onCheckedChange={(checked) => updateFormData('acceptsTerms', !!checked)}
              disabled={state.isAccepting}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="terms" className="text-sm font-normal">
                Aceito os{' '}
                <button type="button" className="text-primary hover:underline">
                  termos de uso
                </button>{' '}
                e{' '}
                <button type="button" className="text-primary hover:underline">
                  política de privacidade
                </button>
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ), [state.formData, state.tenant, state.isAccepting, updateFormData])

  const renderSuccessStep = useMemo(() => () => (
    <Card className="tech-card">
      <CardHeader className="text-center">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <CardTitle className="text-2xl mb-4">
          Bem-vindo ao Eventrix!
        </CardTitle>
        <p className="text-lg text-muted-foreground mb-6">
          Seu perfil foi configurado com sucesso em <br/>
          <strong>{state.tenant?.nome_fantasia}</strong>
        </p>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Você já pode acessar todas as funcionalidades da plataforma.
            Seja bem-vindo à equipe!
          </p>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Redirecionando para o dashboard em alguns segundos...
        </div>
      </CardContent>
    </Card>
  ), [state.tenant])

  const handleNext = async () => {
    if (state.currentStep === 2 && canProceed) {
      // Step 2 -> 3: Aceitar convite
      await acceptInvite()
    } else if (canProceed) {
      nextStep()
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      })
    }
  }

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return renderValidationStep()
      case 2:
        return renderProfileStep()
      case 3:
        return renderSuccessStep()
      default:
        return null
    }
  }

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

        {/* Progress indicator */}
        <InviteStepIndicator 
          currentStep={state.currentStep}
          tenantPrimaryColor={state.tenant?.primary_color}
        />

        {/* Main content */}
        <div className="max-w-lg mx-auto">
          {renderCurrentStep()}
          
          {/* Navigation buttons */}
          {state.currentStep > 1 && state.currentStep < 3 && (
            <div className="flex justify-between mt-6 gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={state.isAccepting}
              >
                Voltar
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed || state.isAccepting}
                className="tech-button"
              >
                {state.isAccepting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Finalizando...
                  </>
                ) : state.currentStep === 2 ? (
                  'Finalizar cadastro'
                ) : (
                  'Continuar'
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>
    </div>
  )
}

export default function InviteOnboardingWizard() {
  return (
    <InviteOnboardingProvider>
      <InviteOnboardingWizardContent />
    </InviteOnboardingProvider>
  )
}
