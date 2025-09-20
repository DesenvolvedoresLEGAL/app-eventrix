import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Building } from 'lucide-react';

const PaymentGateway = () => {
  return (
    <DashboardLayout title="Gateway de Pagamento">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gateway de Pagamento</h2>
          <p className="text-muted-foreground">
            Configure e monitore os métodos de pagamento disponíveis
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <CardTitle className="text-sm font-medium">Cartão de Crédito</CardTitle>
              </div>
              <Badge variant="secondary">Ativo</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Visa, Mastercard, American Express
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <CardTitle className="text-sm font-medium">PIX</CardTitle>
              </div>
              <Badge variant="secondary">Ativo</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Pagamento instantâneo via PIX
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <CardTitle className="text-sm font-medium">Boleto Bancário</CardTitle>
              </div>
              <Badge variant="outline">Inativo</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Pagamento via boleto bancário
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações do Gateway</CardTitle>
            <CardDescription>
              Configure as opções de pagamento para seus eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Configurações detalhadas do gateway serão implementadas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentGateway;