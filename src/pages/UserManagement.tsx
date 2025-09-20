import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Settings, Shield } from 'lucide-react';

const UserManagement = () => {
  return (
    <DashboardLayout title="Gestão de Usuários">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestão de Usuários</h2>
            <p className="text-muted-foreground">
              Gerencie usuários, permissões e controle de acesso do sistema
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.247</div>
              <p className="text-xs text-muted-foreground">+23 novos usuários</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Acesso total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Últimos Acessos</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24h</div>
              <p className="text-xs text-muted-foreground">547 usuários</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Usuários por Tipo</CardTitle>
              <CardDescription>Distribuição de perfis no sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Administradores</h4>
                  <p className="text-sm text-muted-foreground">Acesso total ao sistema</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500">8 usuários</Badge>
                  <Shield className="h-4 w-4 text-blue-500" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Organizadores</h4>
                  <p className="text-sm text-muted-foreground">Gestão de eventos e conteúdo</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500">47 usuários</Badge>
                  <Users className="h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Expositores</h4>
                  <p className="text-sm text-muted-foreground">Gestão de stands e produtos</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-500">234 usuários</Badge>
                  <Settings className="h-4 w-4 text-purple-500" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Participantes</h4>
                  <p className="text-sm text-muted-foreground">Acesso básico ao evento</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-orange-500">958 usuários</Badge>
                  <Users className="h-4 w-4 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usuários Recentes</CardTitle>
              <CardDescription>Últimos usuários cadastrados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Maria Silva</h4>
                  <p className="text-sm text-muted-foreground">maria.silva@empresa.com</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Organizador</Badge>
                  <Button variant="outline" size="sm">Ver Perfil</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">João Santos</h4>
                  <p className="text-sm text-muted-foreground">joao@startup.com</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Expositor</Badge>
                  <Button variant="outline" size="sm">Ver Perfil</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Ana Costa</h4>
                  <p className="text-sm text-muted-foreground">ana.costa@gmail.com</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Pendente</Badge>
                  <Button variant="outline" size="sm">Aprovar</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Carlos Lima</h4>
                  <p className="text-sm text-muted-foreground">carlos@participante.com</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Participante</Badge>
                  <Button variant="outline" size="sm">Ver Perfil</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Acesso</CardTitle>
            <CardDescription>
              Configure políticas de acesso e segurança
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Painel de configurações de acesso será implementado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;