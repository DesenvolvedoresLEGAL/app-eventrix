
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Bell, Users, Clock, Send, Search } from 'lucide-react';

const CommunicationNotifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'Palestra começando em 30 minutos',
      type: 'Push',
      status: 'Enviada',
      recipients: '2.450',
      sent: '2024-01-15 14:30',
      opened: '1.890'
    },
    {
      id: 2,
      title: 'Novo palestrante confirmado',
      type: 'In-App',
      status: 'Agendada',
      recipients: '8.200',
      sent: '2024-01-16 09:00',
      opened: '-'
    },
    {
      id: 3,
      title: 'Lembrete: Check-in disponível',
      type: 'Push',
      status: 'Rascunho',
      recipients: '12.500',
      sent: '-',
      opened: '-'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Enviada': return 'default';
      case 'Agendada': return 'secondary';
      case 'Rascunho': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Push': return 'default';
      case 'In-App': return 'secondary';
      case 'SMS': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout title="Notificações">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Central de Notificações</h2>
            <p className="text-muted-foreground">Envie notificações push e in-app para os participantes</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Notificação
          </Button>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notificações Enviadas</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.2%</div>
              <p className="text-xs text-muted-foreground">+5% vs mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dispositivos Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4K</div>
              <p className="text-xs text-muted-foreground">+8% vs semana anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendadas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
            </CardContent>
          </Card>
        </div>

        {/* Notification Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <CardTitle className="text-base">Push Notifications</CardTitle>
              </div>
              <CardDescription>
                Notificações que aparecem na tela do dispositivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>• Alcance: 95% dos dispositivos</div>
                <div>• Taxa média de abertura: 78%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-secondary/10 rounded">
                  <Bell className="w-4 h-4 text-secondary" />
                </div>
                <CardTitle className="text-base">In-App Notifications</CardTitle>
              </div>
              <CardDescription>
                Notificações dentro do aplicativo do evento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>• Alcance: 100% dos usuários ativos</div>
                <div>• Taxa média de visualização: 92%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-tertiary/10 rounded">
                  <Send className="w-4 h-4 text-tertiary" />
                </div>
                <CardTitle className="text-base">SMS Notifications</CardTitle>
              </div>
              <CardDescription>
                Mensagens de texto para casos urgentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>• Alcance: 98% dos participantes</div>
                <div>• Taxa média de leitura: 95%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Notificações</CardTitle>
            <CardDescription>
              Acompanhe todas as notificações enviadas e agendadas
            </CardDescription>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar notificações..." className="pl-8" />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getTypeColor(notification.type) as any} className="text-xs">
                          {notification.type}
                        </Badge>
                        <Badge variant={getStatusColor(notification.status) as any} className="text-xs">
                          {notification.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {notification.recipients} destinatários
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {notification.sent !== '-' && (
                      <>
                        <div className="text-sm text-center">
                          <div className="font-medium">{notification.sent}</div>
                          <div className="text-muted-foreground">Enviado</div>
                        </div>
                        {notification.opened !== '-' && (
                          <div className="text-sm text-center">
                            <div className="font-medium">{notification.opened}</div>
                            <div className="text-muted-foreground">Visualizações</div>
                          </div>
                        )}
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      {notification.status === 'Rascunho' ? 'Editar' : 'Ver Detalhes'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CommunicationNotifications;
