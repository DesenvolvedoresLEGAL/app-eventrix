
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { XCircle, ArrowLeft, Mail } from 'lucide-react'

export const InviteExpiredPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl text-foreground">Convite inválido</CardTitle>
          <p className="text-muted-foreground text-sm">
            O convite que você está tentando acessar pode ter expirado ou não existe mais.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              <strong>Possíveis motivos:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• O convite expirou (geralmente válido por 7 dias)</li>
                <li>• O link foi cancelado pelo administrador</li>
                <li>• O convite já foi usado anteriormente</li>
                <li>• Há um erro no link fornecido</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong>O que você pode fazer:</strong>
            </p>
            
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.location.href = 'mailto:'}
              >
                <Mail className="h-4 w-4 mr-2" />
                Solicitar novo convite
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar à página inicial
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Se você acredita que isso é um erro, entre em contato com o administrador 
              que enviou o convite.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
