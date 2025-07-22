
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Users, Clock, TrendingUp, MapPin, Eye } from 'lucide-react';

const Heatmap = () => {
  const heatmapData = [
    { area: 'Entrada Principal', visitors: 2450, avgTime: '3.2min', engagement: 'Alto' },
    { area: 'Pavilhão A', visitors: 1890, avgTime: '15.7min', engagement: 'Muito Alto' },
    { area: 'Food Court', visitors: 1567, avgTime: '22.3min', engagement: 'Alto' },
    { area: 'Pavilhão B', visitors: 1234, avgTime: '12.4min', engagement: 'Médio' },
    { area: 'Auditório Principal', visitors: 980, avgTime: '45.6min', engagement: 'Muito Alto' },
    { area: 'Área de Networking', visitors: 876, avgTime: '18.9min', engagement: 'Alto' },
    { area: 'Pavilhão C', visitors: 654, avgTime: '8.7min', engagement: 'Baixo' },
    { area: 'Banheiros', visitors: 543, avgTime: '2.1min', engagement: 'Muito Baixo' }
  ];

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'Muito Alto': return 'bg-green-500';
      case 'Alto': return 'bg-blue-500';
      case 'Médio': return 'bg-yellow-500';
      case 'Baixo': return 'bg-orange-500';
      case 'Muito Baixo': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEngagementBadge = (engagement: string) => {
    switch (engagement) {
      case 'Muito Alto': return 'default';
      case 'Alto': return 'secondary';
      case 'Médio': return 'outline';
      case 'Baixo': return 'destructive';
      case 'Muito Baixo': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout title="Mapa de Calor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Mapa de Calor</h2>
            <p className="text-muted-foreground">Análise de fluxo e engajamento por área do evento</p>
          </div>
          <Button>
            <Map className="w-4 h-4 mr-2" />
            Atualizar Dados
          </Button>
        </div>

        {/* Heatmap Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,245</div>
              <p className="text-xs text-muted-foreground">Detectados hoje</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Área Mais Popular</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Pavilhão A</div>
              <p className="text-xs text-muted-foreground">2,450 visitantes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16.2min</div>
              <p className="text-xs text-muted-foreground">Por área visitada</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pontos de Interesse</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Áreas monitoradas</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="live" className="space-y-4">
          <TabsList>
            <TabsTrigger value="live">Tempo Real</TabsTrigger>
            <TabsTrigger value="historical">Histórico</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            {/* Visual Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle>Mapa Visual do Evento</CardTitle>
                <CardDescription>
                  Visualização em tempo real do fluxo de pessoas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg p-8 h-96">
                  {/* Simplified visual representation */}
                  <div className="grid grid-cols-3 gap-4 h-full">
                    <div className="space-y-4">
                      <div className="bg-green-400 rounded-lg p-4 h-20 flex items-center justify-center text-white font-semibold">
                        Pavilhão A
                        <br />
                        <span className="text-sm">1,890 pessoas</span>
                      </div>
                      <div className="bg-yellow-400 rounded-lg p-4 h-16 flex items-center justify-center text-white font-semibold">
                        Pavilhão B
                        <br />
                        <span className="text-sm">1,234 pessoas</span>
                      </div>
                      <div className="bg-orange-400 rounded-lg p-4 h-16 flex items-center justify-center text-white font-semibold">
                        Pavilhão C
                        <br />
                        <span className="text-sm">654 pessoas</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-red-500 rounded-lg p-4 h-12 flex items-center justify-center text-white font-semibold">
                        Entrada Principal
                        <br />
                        <span className="text-sm">2,450 pessoas</span>
                      </div>
                      <div className="bg-green-500 rounded-lg p-4 h-24 flex items-center justify-center text-white font-semibold">
                        Auditório Principal
                        <br />
                        <span className="text-sm">980 pessoas</span>
                      </div>
                      <div className="bg-blue-400 rounded-lg p-4 h-20 flex items-center justify-center text-white font-semibold">
                        Food Court
                        <br />
                        <span className="text-sm">1,567 pessoas</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-500 rounded-lg p-4 h-16 flex items-center justify-center text-white font-semibold">
                        Networking
                        <br />
                        <span className="text-sm">876 pessoas</span>
                      </div>
                      <div className="bg-gray-400 rounded-lg p-4 h-12 flex items-center justify-center text-white font-semibold">
                        Banheiros
                        <br />
                        <span className="text-sm">543 pessoas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span>Baixo</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-gray-400 rounded"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                        <div className="w-3 h-3 bg-orange-400 rounded"></div>
                        <div className="w-3 h-3 bg-red-400 rounded"></div>
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                      </div>
                      <span>Alto</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Area Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes por Área</CardTitle>
                <CardDescription>
                  Métricas detalhadas de cada zona do evento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {heatmapData.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getEngagementColor(area.engagement)}`}></div>
                        <div>
                          <h3 className="font-medium">{area.area}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {area.visitors}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {area.avgTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={getEngagementBadge(area.engagement) as any}>
                        {area.engagement}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise Histórica</CardTitle>
                <CardDescription>
                  Comparação de dados de fluxo ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Dados Históricos</h3>
                  <p className="text-muted-foreground mb-4">
                    Visualize tendências e padrões de comportamento dos visitantes
                  </p>
                  <Button>Gerar Relatório Histórico</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Insights Inteligentes</CardTitle>
                <CardDescription>
                  Análises automáticas e recomendações baseadas em IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: 'Oportunidade',
                      title: 'Otimizar fluxo no Pavilhão B',
                      description: 'O tempo médio no Pavilhão B está abaixo da média. Considere adicionar mais atividades interativas.',
                      impact: 'Alto'
                    },
                    {
                      type: 'Alerta',
                      title: 'Congestionamento na Entrada Principal',
                      description: 'Pico de visitantes detectado. Considere abrir entradas alternativas.',
                      impact: 'Crítico'
                    },
                    {
                      type: 'Insight',
                      title: 'Food Court muito popular',
                      description: 'O Food Court está excedendo as expectativas. Considere expandir a área para próximos eventos.',
                      impact: 'Médio'
                    }
                  ].map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={insight.type === 'Alerta' ? 'destructive' : 'default'}>
                          {insight.type}
                        </Badge>
                        <Badge variant="outline">{insight.impact}</Badge>
                      </div>
                      <h3 className="font-medium mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Heatmap;
