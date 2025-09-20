import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const HibridaEnquetes = () => {
  return (
    <DashboardLayout title="Enquetes e Q&A ao Vivo">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Enquetes e Q&A ao Vivo</h2>
            <p className="text-muted-foreground">
              Interações em tempo real durante transmissões
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
              Nova Enquete
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sistema de Interações</CardTitle>
            <CardDescription>
              Engage audiência virtual com enquetes e perguntas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Crie interações dinâmicas durante apresentações ao vivo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HibridaEnquetes;