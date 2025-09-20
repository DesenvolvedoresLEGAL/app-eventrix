import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const LegalclubMetricas = () => {
  return (
    <DashboardLayout title="Métricas de Engajamento">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Métricas de Engajamento</h2>
            <p className="text-muted-foreground">
              Analytics da comunidade LEGAL Club
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
              Novo Relatório
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard de Engajamento</CardTitle>
            <CardDescription>
              Métricas de participação e interação da comunidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Monitore saúde e crescimento da comunidade
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LegalclubMetricas;