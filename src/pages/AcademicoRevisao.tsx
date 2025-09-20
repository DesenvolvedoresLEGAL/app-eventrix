import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const AcademicoRevisao = () => {
  return (
    <DashboardLayout title="Revisão por Pares">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Revisão por Pares</h2>
            <p className="text-muted-foreground">
              Sistema de peer review para artigos submetidos
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
              Novo Revisor
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sistema de Peer Review</CardTitle>
            <CardDescription>
              Gestão de revisões acadêmicas e avaliadores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Organize revisões cegas e duplas cegas de artigos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AcademicoRevisao;