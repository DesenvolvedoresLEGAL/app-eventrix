
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Clock, Users, Zap, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const DynamicPricing = () => {
  const pricingData = [
    { time: '00:00', price: 299, demand: 20 },
    { time: '04:00', price: 299, demand: 15 },
    { time: '08:00', price: 329, demand: 45 },
    { time: '12:00', price: 359, demand: 78 },
    { time: '16:00', price: 389, demand: 92 },
    { time: '20:00', price: 419, demand: 95 },
    { time: '23:59', price: 449, demand: 98 }
  ];

  const tickets = [
    {
      id: 1,
      name: 'Ingresso Geral',
      currentPrice: 349,
      basePrice: 299,
      demandLevel: 'Alto',
      nextAdjustment: '2h 30min',
      status: 'Ativo'
    },
    {
      id: 2,
      name: 'VIP Premium',
      currentPrice: 899,
      basePrice: 799,
      demandLevel: 'Muito Alto',
      nextAdjustment: '45min',
      status: 'Ativo'
    },
    {
      id: 3,
      name: 'Student Pass',
      currentPrice: 199,
      basePrice: 199,
      demandLevel: 'Baixo',
      nextAdjustment: '-',
      status: 'Pausado'
    }
  ];

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'Muito Alto': return 'destructive';
      case 'Alto': return 'default';
      case 'Médio': return 'secondary';
      case 'Baixo': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout title="Precificação Dinâmica">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              Precificação Dinâmica
            </h2>
            <p className="text-muted-foreground">Otimize preços automaticamente baseado na demanda</p>
          </div>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Configurar Regras
          </Button>
        </div>

        {/* Pricing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Otimizada</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 387K</div>
              <p className="text-xs text-muted-foreground">+23% vs preço fixo</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ajustes Hoje</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Mudanças de preço</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversão Média</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.4%</div>
              <p className="text-xs text-muted-foreground">+1.2% vs preço fixo</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demanda Atual</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Alto</div>
              <p className="text-xs text-muted-foreground">92% da capacidade</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="tickets">Tipos de Ingresso</TabsTrigger>
            <TabsTrigger value="rules">Regras de Precificação</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Evolution */}
              <Card>
                <CardHeader>
                  <CardTitle>Evolução dos Preços</CardTitle>
                  <CardDescription>Preços ao longo do dia baseado na demanda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pricingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => [
                            name === 'price' ? `R$ ${value}` : `${value}%`,
                            name === 'price' ? 'Preço' : 'Demanda'
                          ]}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          name="price"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Demand Curve */}
              <Card>
                <CardHeader>
                  <CardTitle>Curva de Demanda</CardTitle>
                  <CardDescription>Nível de demanda ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={pricingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Demanda']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="demand" 
                          stroke="hsl(var(--secondary))" 
                          fill="hsl(var(--secondary))" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Insights da IA</CardTitle>
                <CardDescription>Recomendações automáticas baseadas nos dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: 'Oportunidade',
                      title: 'Pico de demanda detectado',
                      description: 'A demanda está 92% acima do normal. Considere aumentar o preço em 15% nas próximas 2 horas.',
                      action: 'Aplicar Sugestão'
                    },
                    {
                      type: 'Alerta',
                      title: 'Queda na conversão VIP',
                      description: 'Os ingressos VIP estão com baixa conversão. Recomenda-se reduzir o preço em 10%.',
                      action: 'Analisar'
                    },
                    {
                      type: 'Insight',
                      title: 'Padrão sazonal identificado',
                      description: 'Detectado padrão de alta demanda entre 16h-20h nos últimos 7 dias.',
                      action: 'Ver Detalhes'
                    }
                  ].map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={insight.type === 'Alerta' ? 'destructive' : 'default'}>
                            {insight.type}
                          </Badge>
                          <h3 className="font-medium">{insight.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Ingressos</CardTitle>
                <CardDescription>
                  Configure e monitore a precificação dinâmica por tipo de ingresso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">{ticket.name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>Preço atual: <strong>R$ {ticket.currentPrice}</strong></span>
                            <span>Base: R$ {ticket.basePrice}</span>
                            <span>Próximo ajuste: {ticket.nextAdjustment}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getDemandColor(ticket.demandLevel) as any}>
                          {ticket.demandLevel}
                        </Badge>
                        <Switch checked={ticket.status === 'Ativo'} />
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Regras de Precificação</CardTitle>
                <CardDescription>
                  Configure os algoritmos de precificação dinâmica
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Parâmetros de Demanda</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Fator de demanda mínimo</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input type="range" min="0" max="100" value="20" className="flex-1" />
                            <span className="text-sm">20%</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Fator de demanda máximo</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input type="range" min="0" max="100" value="95" className="flex-1" />
                            <span className="text-sm">95%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Limites de Preço</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Desconto máximo</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input type="range" min="0" max="50" value="20" className="flex-1" />
                            <span className="text-sm">20%</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Aumento máximo</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input type="range" min="0" max="100" value="50" className="flex-1" />
                            <span className="text-sm">50%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Algoritmos Disponíveis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: 'Linear', description: 'Ajuste proporcional à demanda', active: true },
                        { name: 'Exponencial', description: 'Crescimento acelerado em alta demanda', active: false },
                        { name: 'Machine Learning', description: 'Predição baseada em dados históricos', active: false }
                      ].map((algo, index) => (
                        <div key={index} className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          algo.active ? 'border-primary bg-primary/5' : 'border-muted hover:bg-muted/50'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{algo.name}</h5>
                            <Switch checked={algo.active} />
                          </div>
                          <p className="text-xs text-muted-foreground">{algo.description}</p>
                        </div>
                      ))}
                    </div>
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

export default DynamicPricing;
