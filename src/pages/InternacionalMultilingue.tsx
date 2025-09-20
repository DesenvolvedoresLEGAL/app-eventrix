import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const InternacionalMultilingue = () => {
  return (
    <DashboardLayout title="Suporte Multilíngue">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Suporte Multilíngue</h2>
            <p className="text-muted-foreground">
              Gestão de idiomas e traduções para eventos globais
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
              Novo Idioma
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Centro de Idiomas</CardTitle>
            <CardDescription>
              Configure idiomas e traduções para a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Suporte a múltiplos idiomas com tradução automática
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InternacionalMultilingue;