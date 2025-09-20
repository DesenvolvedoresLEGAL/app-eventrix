import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const CredenciamentoSmartBadge = () => {
  return (
    <DashboardLayout title="Smart Badge NFC">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Smart Badge NFC</h2>
            <p className="text-muted-foreground">
              Crachás inteligentes com tecnologia NFC
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
              Configurar Badge
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Smart Badges NFC</CardTitle>
            <CardDescription>
              Crachás com chip NFC para interações inteligentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Networking, check-ins e trocas de informações via NFC
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CredenciamentoSmartBadge;