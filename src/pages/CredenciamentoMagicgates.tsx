import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const CredenciamentoMagicgates = () => {
  return (
    <DashboardLayout title="MagicGates - Portais de Entrada">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">MagicGates</h2>
            <p className="text-muted-foreground">
              Portais inteligentes de entrada e saída
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Portal
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portais MagicGates</CardTitle>
            <CardDescription>
              Controle de acesso automático em pontos estratégicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Portais que reconhecem e liberam acesso automaticamente
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CredenciamentoMagicgates;