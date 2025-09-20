import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Settings, BarChart3 } from 'lucide-react';

const SimpleDashboard: React.FC = () => {
  return (
    <DashboardLayout title="Dashboard do Eventrix">
      <div className="space-y-6">
        {/* Bem-vindo */}
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao Eventrix</CardTitle>
            <CardDescription>
              Gerencie seus eventos de forma simples e eficiente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              O Eventrix está funcionando! Agora você pode começar a organizar seus eventos.
            </p>
          </CardContent>
        </Card>

        {/* Cards de navegação rápida */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Eventos</h3>
                  <p className="text-sm text-gray-600">Criar e gerenciar eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Participantes</h3>
                  <p className="text-sm text-gray-600">Gerenciar inscrições</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <BarChart3 className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Relatórios</h3>
                  <p className="text-sm text-gray-600">Análises e métricas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Settings className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Configurações</h3>
                  <p className="text-sm text-gray-600">Personalizar sistema</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Comece agora mesmo a usar o Eventrix
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Criar Novo Evento
              </Button>
              <Button variant="outline" className="flex-1">
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Participantes
              </Button>
              <Button variant="outline" className="flex-1">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Relatórios
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Status do sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 font-medium">
                Sistema operacional
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Todos os serviços estão funcionando normalmente.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SimpleDashboard;