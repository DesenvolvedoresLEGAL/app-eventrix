
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Mail, Users, BarChart3, Clock, Search } from 'lucide-react';

const MarketingEmail = () => {
  const campaigns = [
    {
      id: 1,
      name: 'Últimos dias para inscrição',
      status: 'Enviada',
      date: '2024-01-15',
      recipients: '12.450',
      openRate: '24.8%',
      clickRate: '4.2%'
    },
    {
      id: 2,
      name: 'Confirmação de inscrição',
      status: 'Agendada',
      date: '2024-01-20',
      recipients: '8.500',
      openRate: '-',
      clickRate: '-'
    },
    {
      id: 3,
      name: 'Lembrete do evento',
      status: 'Rascunho',
      date: '2024-01-22',
      recipients: '15.200',
      openRate: '-',
      clickRate: '-'
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

  return (
    <DashboardLayout title="Email Marketing">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Email Marketing</h2>
            <p className="text-muted-foreground">Crie e gerencie campanhas de email para seus participantes</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
        </div>

        {/* Email Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Enviados</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25.4K</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22.3%</div>
              <p className="text-xs text-muted-foreground">+2.1% vs mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Clique</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8%</div>
              <p className="text-xs text-muted-foreground">+0.5% vs mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contatos Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.2K</div>
              <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Email Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Campanhas de Email</CardTitle>
            <CardDescription>
              Acompanhe o desempenho das suas campanhas de email marketing
            </CardDescription>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar campanhas..." className="pl-8" />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(campaign.status) as any} className="text-xs">
                          {campaign.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {campaign.date}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {campaign.recipients} destinatários
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {campaign.openRate !== '-' && (
                      <>
                        <div className="text-sm text-center">
                          <div className="font-medium">{campaign.openRate}</div>
                          <div className="text-muted-foreground">Abertura</div>
                        </div>
                        <div className="text-sm text-center">
                          <div className="font-medium">{campaign.clickRate}</div>
                          <div className="text-muted-foreground">Clique</div>
                        </div>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      {campaign.status === 'Rascunho' ? 'Editar' : 'Ver Relatório'}
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

export default MarketingEmail;
