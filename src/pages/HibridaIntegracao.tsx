import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const HibridaIntegracao = () => {
  return (
    <DashboardLayout title="Integração MagicPass/MagicGates">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Integração MagicPass/MagicGates</h2>
            <p className="text-muted-foreground">
              Sincronização entre experiências físicas e digitais
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
              Nova Integração
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ponte Físico-Digital</CardTitle>
            <CardDescription>
              Conecte presença física com participação virtual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Unifique experiências presenciais e remotas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HibridaIntegracao;