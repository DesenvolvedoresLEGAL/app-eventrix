
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plug, Check, AlertCircle, Settings, Plus } from 'lucide-react';

const Integrations = () => {
  const activeIntegrations = [
    {
      id: 1,
      name: 'Stripe',
      description: 'Processamento de pagamentos',
      status: 'Conectado',
      lastSync: '2024-01-15 14:30',
      icon: '💳'
    },
    {
      id: 2,
      name: 'WhatsApp Business',
      description: 'Notificações via WhatsApp',
      status: 'Conectado',
      lastSync: '2024-01-15 12:45',
      icon: '📱'
    },
    {
      id: 3,
      name: 'Google Analytics',
      description: 'Análise de dados',
      status: 'Erro',
      lastSync: '2024-01-14 08:20',
      icon: '📊'
    }
  ];

  const availableIntegrations = [
    {
      id: 4,
      name: 'Salesforce',
      description: 'CRM e gestão de leads',
      category: 'CRM',
      icon: '🏢'
    },
    {
      id: 5,
      name: 'Mailchimp',
      description: 'Email marketing',
      category: 'Marketing',
      icon: '📧'
    },
    {
      id: 6,
      name: 'Slack',
      description: 'Notificações da equipe',
      category: 'Comunicação',
      icon: '💬'
    },
    {
      id: 7,
      name: 'Zoom',
      description: 'Videoconferências',
      category: 'Comunicação',
      icon: '📹'
    }
  ];

  return (
    <DashboardLayout title="Integrações">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Integrações</h2>
            <p className="text-muted-foreground">Conecte o Eventrix com suas ferramentas favoritas</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Explorar Integrações
          </Button>
        </div>

        {/* Integration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Integrações Ativas</CardTitle>
              <Plug className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 adicionadas este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Funcionando</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">83% de disponibilidade</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Problemas</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requer atenção</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sincronizações</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2K</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Integrações Ativas</TabsTrigger>
            <TabsTrigger value="available">Disponíveis</TabsTrigger>
            <TabsTrigger value="custom">Personalizadas</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integrações Ativas</CardTitle>
                <CardDescription>
                  Gerencie suas integrações conectadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeIntegrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={integration.status === 'Conectado' ? 'default' : 'destructive'}>
                              {integration.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Última sinc: {integration.lastSync}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={integration.status === 'Conectado'} />
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integrações Disponíveis</CardTitle>
                <CardDescription>
                  Explore e conecte novas ferramentas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableIntegrations.map((integration) => (
                    <Card key={integration.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{integration.icon}</div>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <Badge variant="outline" className="text-xs mt-1">
                              {integration.category}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {integration.description}
                        </p>
                        <Button size="sm" className="w-full">
                          <Plug className="w-3 h-3 mr-1" />
                          Conectar
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integrações Personalizadas</CardTitle>
                <CardDescription>
                  Crie suas próprias integrações usando webhooks e APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma integração personalizada</h3>
                  <p className="text-muted-foreground mb-4">
                    Use nossa API REST e webhooks para criar integrações sob medida
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button>Ver Documentação</Button>
                    <Button variant="outline">Criar Webhook</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
