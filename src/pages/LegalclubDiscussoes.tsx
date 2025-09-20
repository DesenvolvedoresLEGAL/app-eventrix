import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const LegalclubDiscussoes = () => {
  return (
    <DashboardLayout title="Hub de Discussões">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Hub de Discussões</h2>
            <p className="text-muted-foreground">
              Espaço para discussões pós-evento e networking contínuo
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
              Nova Discussão
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fóruns de Discussão</CardTitle>
            <CardDescription>
              Mantenha engajamento após o evento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Plataforma para continuar conversas iniciadas no evento
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LegalclubDiscussoes;