import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const LegalaiValidadorStand = () => {
  return (
    <DashboardLayout title="Validador IA de Stand">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Validador IA de Stand</h2>
            <p className="text-muted-foreground">
              IA para validação automática de montagem de stands
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
              Nova Validação
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sistema de Validação</CardTitle>
            <CardDescription>
              IA que verifica conformidade de stands com regulamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Automatize verificações de segurança e conformidade
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LegalaiValidadorStand;