
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowLeft, Clock } from 'lucide-react'

export default function InviteExpiredPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="tech-card border-destructive/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-destructive" />
            </div>
            <CardTitle className="text-xl text-destructive">
              Convite expirado
            </CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="p-4 bg-destructive/5 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={16} className="text-destructive" />
                <span className="text-sm font-medium text-destructive">Link não disponível</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Este convite expirou e não pode mais ser utilizado
              </p>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground text-left">
              <h4 className="font-semibold text-foreground text-center">O que fazer agora?</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Entre em contato com o administrador da organização</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Solicite um novo convite com prazo de validade estendido</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Verifique se você possui outro email de convite</span>
                </li>
              </ul>
            </div>

            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar à página inicial
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>
    </div>
  )
}
