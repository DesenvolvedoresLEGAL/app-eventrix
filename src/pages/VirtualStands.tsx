import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Monitor, Eye, Settings, Play } from 'lucide-react';

const VirtualStands = () => {
  return (
    <DashboardLayout title="Stands Virtuais">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Stands Virtuais</h2>
            <p className="text-muted-foreground">
              Gerencie os stands virtuais para participação online
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Stand Virtual
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stands Ativos</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div>
              <p className="text-xs text-muted-foreground">+8 novos stands</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitantes Online</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.247</div>
              <p className="text-xs text-muted-foreground">Atualmente navegando</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interações</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.891</div>
              <p className="text-xs text-muted-foreground">Hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Gerados</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">Esta semana</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">TechCorp Solutions</CardTitle>
                <Badge variant="secondary">Ativo</Badge>
              </div>
              <CardDescription>Stand de tecnologia empresarial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Monitor className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Visitantes: 127</span>
                <span>Leads: 23</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                Visualizar Stand
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Innovation Labs</CardTitle>
                <Badge variant="secondary">Ativo</Badge>
              </div>
              <CardDescription>Laboratório de inovação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Monitor className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex justify-between text-sm">
                <span>Visitantes: 89</span>
                <span>Leads: 15</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                Visualizar Stand
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">+ Adicionar Stand</CardTitle>
                <Badge variant="outline">Novo</Badge>
              </div>
              <CardDescription>Criar novo stand virtual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <Button size="sm" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Configurar Stand
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VirtualStands;