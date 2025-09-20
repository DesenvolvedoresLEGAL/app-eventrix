import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const HibridaStreaming = () => {
  return (
    <DashboardLayout title="Streaming Integrado">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Streaming Integrado</h2>
            <p className="text-muted-foreground">
              Transmissão ao vivo para participantes remotos
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
              Nova Stream
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plataforma de Streaming</CardTitle>
            <CardDescription>
              Transmissão de alta qualidade para audiência global
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Configure streams multi-câmera e interações em tempo real
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HibridaStreaming;