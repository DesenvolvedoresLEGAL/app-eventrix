import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, ExternalLink } from 'lucide-react';

const BillingIntegration = () => {
  return (
    <DashboardLayout title="Integrações de Cobrança">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Integrações de Cobrança</h2>
            <p className="text-muted-foreground">
              Configure integrações com sistemas de pagamento e ERPs
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Integração
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Stripe</CardTitle>
                <Badge variant="secondary">Conectado</Badge>
              </div>
              <CardDescription>Gateway de pagamento internacional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configurar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">PagSeguro</CardTitle>
                <Badge variant="secondary">Conectado</Badge>
              </div>
              <CardDescription>Pagamentos nacionais e PIX</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configurar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">SAP</CardTitle>
                <Badge variant="outline">Disponível</Badge>
              </div>
              <CardDescription>Integração com ERP empresarial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Conectar
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Webhooks Configurados</CardTitle>
            <CardDescription>
              URLs de callback para sincronização de dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Lista de webhooks será implementada
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BillingIntegration;