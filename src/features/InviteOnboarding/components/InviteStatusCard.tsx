
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Clock, Building2 } from 'lucide-react'
import { InviteData, TenantBranding } from '../types/invite.types'

interface InviteStatusCardProps {
  invite: InviteData | null
  tenant: TenantBranding | null
  isValidating: boolean
  error: string | null
}

export function InviteStatusCard({ invite, tenant, isValidating, error }: InviteStatusCardProps) {
  if (isValidating) {
    return (
      <Card className="tech-card">
        <CardHeader className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <CardTitle className="text-lg">Validando convite...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="tech-card border-destructive/50">
        <CardHeader className="text-center">
          <AlertCircle size={32} className="text-destructive mx-auto mb-4" />
          <CardTitle className="text-lg text-destructive">Convite inválido</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Verifique se o link está correto ou solicite um novo convite.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!invite || !tenant) return null

  const isExpired = new Date(invite.expires_at) < new Date()
  
  if (isExpired) {
    return (
      <Card className="tech-card border-destructive/50">
        <CardHeader className="text-center">
          <AlertCircle size={32} className="text-destructive mx-auto mb-4" />
          <CardTitle className="text-lg text-destructive">Convite expirado</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Este convite expirou em {new Date(invite.expires_at).toLocaleDateString('pt-BR')}
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
            <p className="font-semibold">{tenant.nome_fantasia}</p>
            <p className="text-sm text-muted-foreground">{tenant.razao_social}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Email:</span>
            <p className="font-medium">{invite.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Cargo:</span>
            <p className="font-medium capitalize">{invite.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>
            Expira em {new Date(invite.expires_at).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
