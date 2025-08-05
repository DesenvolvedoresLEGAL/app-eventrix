
import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Building, Mail, AlertCircle, CheckCircle } from 'lucide-react'
import type { InviteData, TenantData } from '../types/invite.types'

interface InviteStatusCardProps {
  isLoading: boolean
  inviteData: InviteData | null
  tenantData: TenantData | null
  error: string | null
}

export const InviteStatusCard: React.FC<InviteStatusCardProps> = ({
  isLoading,
  inviteData,
  tenantData,
  error
}) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!inviteData || !tenantData) {
    return null
  }

  const isValidInvite = inviteData.status === 'pending' && 
    new Date(inviteData.expires_at) > new Date()

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          {tenantData.logo_url ? (
            <img 
              src={tenantData.logo_url} 
              alt={tenantData.nome_fantasia}
              className="h-16 w-16 object-contain rounded-lg"
            />
          ) : (
            <div 
              className="h-16 w-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: tenantData.primary_color }}
            >
              {tenantData.nome_fantasia.charAt(0)}
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Você foi convidado!
        </h2>
        <p className="text-muted-foreground text-sm">
          {tenantData.nome_fantasia} convidou você para participar da plataforma
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 text-sm">
          <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">{tenantData.razao_social}</p>
            <p className="text-muted-foreground">{tenantData.nome_fantasia}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-muted-foreground">Seu email:</p>
            <p className="font-medium text-foreground">{inviteData.email}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-sm">
          {isValidInvite ? (
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
          )}
          <div>
            <p className="text-muted-foreground">Status do convite:</p>
            <p className={`font-medium ${isValidInvite ? 'text-green-600' : 'text-orange-600'}`}>
              {isValidInvite ? 'Válido' : 'Expirado'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
