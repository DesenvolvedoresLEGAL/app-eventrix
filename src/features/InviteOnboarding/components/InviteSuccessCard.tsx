
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { TenantBranding } from '../types/invite.types'

interface InviteSuccessCardProps {
  tenant: TenantBranding | null
}

export function InviteSuccessCard({ tenant }: InviteSuccessCardProps) {
  return (
    <Card className="tech-card border-secondary/50">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <CardTitle className="text-xl text-secondary">
          Bem-vindo ao Eventrix!
        </CardTitle>
        <p className="text-muted-foreground">
          Sua conta foi criada com sucesso em {tenant?.nome_fantasia}
        </p>
      </CardHeader>
      
      <CardContent className="text-center space-y-6">
        <div className="p-4 bg-secondary/10 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={16} className="text-secondary" />
            <span className="text-sm font-medium text-secondary">Tudo pronto!</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Você será redirecionado para o dashboard em alguns segundos
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Redirecionando</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <ArrowRight size={16} />
        </div>
      </CardContent>
    </Card>
  )
}
