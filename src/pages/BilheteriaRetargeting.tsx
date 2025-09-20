import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download } from 'lucide-react';

const BilheteriaRetargeting = () => {
  return (
    <DashboardLayout title="Retargeting Carrinho Abandonado">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Retargeting Carrinho Abandonado</h2>
            <p className="text-muted-foreground">
              Recupere vendas perdidas com campanhas automáticas
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
              Nova Campanha
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campanhas de Retargeting</CardTitle>
            <CardDescription>
              Automatize recuperação de carrinhos abandonados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Configure e-mails automáticos para recuperar vendas perdidas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BilheteriaRetargeting;