import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const BilheteriaTypes = () => {
  return (
    <DashboardLayout title="Tipos de Ingressos">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tipos de Ingressos</h2>
            <p className="text-muted-foreground">
              Configure diferentes tipos de ingressos para seus eventos
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
              Novo Tipo
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tipos de Ingressos Configurados</CardTitle>
            <CardDescription>
              Gerencie os diferentes tipos de ingressos disponíveis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Configure diferentes tipos de ingressos: VIP, Estudante, Profissional, etc.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BilheteriaTypes;