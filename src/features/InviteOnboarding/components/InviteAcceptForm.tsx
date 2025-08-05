
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Upload, User } from 'lucide-react'
import { useInviteOnboarding } from '../context/InviteOnboardingContext'
import { useInviteAcceptance } from '../hooks/useInviteAcceptance'

export function InviteAcceptForm() {
  const { state, dispatch } = useInviteOnboarding()
  const { acceptInvite } = useInviteAcceptance()

  const handleInputChange = (field: string, value: string) => {
    dispatch({
      type: 'SET_FORM_DATA',
      payload: { [field]: value }
    })

    // Auto-gerar nome completo
    if (field === 'firstName' || field === 'lastName') {
      const firstName = field === 'firstName' ? value : state.formData.firstName
      const lastName = field === 'lastName' ? value : state.formData.lastName
      const fullName = `${firstName} ${lastName}`.trim()
      
      dispatch({
        type: 'SET_FORM_DATA',
        payload: { fullName }
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await acceptInvite()
  }

  const isFormValid = state.formData.firstName && 
                     state.formData.lastName && 
                     state.formData.acceptsTerms

  return (
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                type="text"
                value={state.formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
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
                onChange={(e) => handleInputChange('lastName', e.target.value)}
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
              onChange={(e) => handleInputChange('fullName', e.target.value)}
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
              onCheckedChange={(checked) => 
                dispatch({
                  type: 'SET_FORM_DATA',
                  payload: { acceptsTerms: !!checked }
                })
              }
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

          <Button
            type="submit"
            disabled={!isFormValid || state.isAccepting}
            className="w-full tech-button"
          >
            {state.isAccepting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Finalizando cadastro...
              </>
            ) : (
              'Finalizar cadastro'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
