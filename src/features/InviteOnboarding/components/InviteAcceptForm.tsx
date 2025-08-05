
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Phone, AlertCircle } from 'lucide-react'
import { useInviteOnboarding } from '../context/InviteOnboardingContext'
import { useInviteAcceptance } from '../hooks/useInviteAcceptance'

export const InviteAcceptForm: React.FC = () => {
  const { state, updateUserForm } = useInviteOnboarding()
  const { acceptInvite, isSubmitting, error } = useInviteAcceptance()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await acceptInvite()
  }

  const handleInputChange = (field: string, value: string) => {
    updateUserForm({ [field]: value })
  }

  const isFormValid = state.userForm.firstName.trim() && state.userForm.lastName.trim()

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-xl">Complete seu perfil</CardTitle>
        <p className="text-muted-foreground text-sm">
          Preencha as informações abaixo para finalizar seu cadastro
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome *</Label>
            <Input
              id="firstName"
              type="text"
              value={state.userForm.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Seu primeiro nome"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Sobrenome *</Label>
            <Input
              id="lastName"
              type="text"
              value={state.userForm.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Seu sobrenome"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="whatsapp"
                type="tel"
                value={state.userForm.whatsappNumber || ''}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                placeholder="(11) 99999-9999"
                className="pl-10"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Processando...' : 'Aceitar convite'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
