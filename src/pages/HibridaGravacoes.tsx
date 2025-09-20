import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const HibridaGravacoes = () => {
  return (
    <DashboardLayout title="Gravações On-Demand">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gravações On-Demand</h2>
            <p className="text-muted-foreground">
              Biblioteca de conteúdos gravados para acesso posterior
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
              Nova Gravação
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Biblioteca de Vídeos</CardTitle>
            <CardDescription>
              Conteúdo gravado disponível para replay
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Organize e disponibilize gravações para acesso sob demanda
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HibridaGravacoes;