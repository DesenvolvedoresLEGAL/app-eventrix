import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const CaexPatrocinadores = () => {
  return (
    <DashboardLayout title="Patrocinadores">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Patrocinadores</h2>
            <p className="text-muted-foreground">
              Gerencie patrocinadores e cotas de patrocínio
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
              Novo Patrocinador
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patrocinadores Ativos</CardTitle>
            <CardDescription>
              Lista de patrocinadores e suas cotas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Gerencie patrocinadores Master, Gold, Silver e Bronze
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CaexPatrocinadores;