
import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2, User } from 'lucide-react'
import { useInviteOnboarding } from '../context/InviteOnboardingContext'
import { useInviteAcceptance } from '../hooks/useInviteAcceptance'

const InviteAcceptForm: React.FC = () => {
  const {
    userForm,
    updateUserForm,
    isSubmitting,
    inviteData
  } = useInviteOnboarding()

  const { acceptInvite } = useInviteAcceptance()

  const isFormValid = useMemo(() => {
    return userForm.firstName.trim().length > 0 && 
           userForm.lastName.trim().length > 0
  }, [userForm.firstName, userForm.lastName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid && !isSubmitting) {
      acceptInvite()
    }
  }

  // Atualizar nome completo automaticamente
  React.useEffect(() => {
    const fullName = `${userForm.firstName} ${userForm.lastName}`.trim()
    if (fullName !== userForm.fullName) {
      updateUserForm('fullName', fullName)
    }
  }, [userForm.firstName, userForm.lastName, userForm.fullName, updateUserForm])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Complete seu perfil
        </CardTitle>
        <p className="text-sm text-gray-600">
          Preencha seus dados para acessar a plataforma
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">
              Primeiro Nome *
            </Label>
            <Input
              id="firstName"
              type="text"
              value={userForm.firstName}
              onChange={(e) => updateUserForm('firstName', e.target.value)}
              placeholder="Digite seu primeiro nome"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="lastName">
              Último Nome *
            </Label>
            <Input
              id="lastName"
              type="text"
              value={userForm.lastName}
              onChange={(e) => updateUserForm('lastName', e.target.value)}
              placeholder="Digite seu último nome"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
            <p><strong>Email:</strong> {inviteData?.email}</p>
            <p><strong>Cargo:</strong> {inviteData?.role}</p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Aceitar convite e entrar'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default InviteAcceptForm
