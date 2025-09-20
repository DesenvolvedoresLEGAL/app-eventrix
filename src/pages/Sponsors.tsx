import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Star, Award, Crown } from 'lucide-react';

const Sponsors = () => {
  return (
    <DashboardLayout title="Patrocinadores">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Patrocinadores</h2>
            <p className="text-muted-foreground">
              Gerencie todos os patrocinadores dos seus eventos
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Patrocinador
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2 flex-1">
                <Crown className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-sm font-medium">Patrocinador Master</CardTitle>
              </div>
              <Badge variant="secondary">3 ativos</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Nível mais alto de patrocínio com máxima visibilidade
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2 flex-1">
                <Award className="h-5 w-5 text-silver" />
                <CardTitle className="text-sm font-medium">Patrocinador Ouro</CardTitle>
              </div>
              <Badge variant="secondary">8 ativos</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Alto nível de visibilidade e benefícios exclusivos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2 flex-1">
                <Star className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-sm font-medium">Patrocinador Prata</CardTitle>
              </div>
              <Badge variant="secondary">12 ativos</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Boa visibilidade com benefícios intermediários
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patrocinadores Ativos</CardTitle>
              <CardDescription>Lista dos patrocinadores confirmados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Lista de patrocinadores será implementada
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receita por Patrocínio</CardTitle>
              <CardDescription>Valor arrecadado por categoria</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Gráfico de receita será implementado
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sponsors;