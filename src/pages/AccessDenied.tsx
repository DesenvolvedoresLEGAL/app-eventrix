
import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Acesso Negado</CardTitle>
          <CardDescription>
            Você não tem permissão para acessar esta página. Entre em contato com o administrador se acredita que isso é um erro.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Button asChild variant="default">
              <Link to="/dashboard">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="javascript:history.back()">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Página Anterior
              </Link>
            </Button>
          </div>
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Precisa de ajuda? Entre em contato com o suporte.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccessDenied
