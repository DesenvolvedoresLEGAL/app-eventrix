
import React, { useState } from 'react';
import { Camera, Users, AlertTriangle, TrendingUp, Activity, MapPin, Eye, Play, Pause, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import KpiCard from '@/components/ui-custom/KpiCard';
import DashboardLayout from '@/components/layout/Dashboard';

const HeatmapAI = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState('all');

  const cameras = [
    { id: 'cam1', name: 'Entrada Principal', status: 'online', alerts: 2 },
    { id: 'cam2', name: 'Área de Stands', status: 'online', alerts: 0 },
    { id: 'cam3', name: 'Auditório', status: 'online', alerts: 1 },
    { id: 'cam4', name: 'Networking', status: 'offline', alerts: 0 },
  ];

  const realTimeAlerts = [
    {
      id: 1,
      type: 'Aglomeração Detectada',
      camera: 'Entrada Principal',
      severity: 'High',
      time: '14:23:45',
      description: 'Densidade superior a 90% detectada'
    },
    {
      id: 2,
      type: 'Fluxo Anômalo',
      camera: 'Auditório',
      severity: 'Medium',
      time: '14:18:12',
      description: 'Padrão de movimento irregular identificado'
    },
    {
      id: 3,
      type: 'Área Vazia',
      camera: 'Stand A-15',
      severity: 'Low',
      time: '14:10:33',
      description: 'Baixo engajamento na área'
    }
  ];

  const heatmapZones = [
    { zone: 'Entrada', density: 95, visitors: 347, avgTime: '2.3min', temperature: 'hot' },
    { zone: 'Stand A1-A10', density: 78, visitors: 234, avgTime: '8.5min', temperature: 'warm' },
    { zone: 'Stand B1-B10', density: 45, visitors: 156, avgTime: '6.2min', temperature: 'cool' },
    { zone: 'Auditório', density: 88, visitors: 298, avgTime: '25min', temperature: 'hot' },
    { zone: 'Networking', density: 62, visitors: 187, avgTime: '12min', temperature: 'warm' },
    { zone: 'Praça Alimentação', density: 71, visitors: 203, avgTime: '15min', temperature: 'warm' }
  ];

  return (
    <DashboardLayout title="HeatmapAI™">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">HeatmapAI™ - Monitoramento Inteligente</h1>
            <p className="text-muted-foreground">Análise de densidade e comportamento em tempo real com IA</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={isRecording ? "destructive" : "default"}
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isRecording ? 'Pausar' : 'Iniciar'} Monitoramento
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Status das Câmeras */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {cameras.map((camera) => (
            <Card key={camera.id} className="relative">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    <span className="font-medium text-sm">{camera.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {camera.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs">{camera.alerts}</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiCard
            title="Pessoas Detectadas"
            value="1,425"
            icon={<Users />}
            trend={{ value: 15.3, isPositive: true }}
          />
          <KpiCard
            title="Alertas Ativos"
            value="3"
            icon={<AlertTriangle />}
            trend={{ value: 2, isPositive: false }}
          />
          <KpiCard
            title="Densidade Média"
            value="72%"
            icon={<Activity />}
            trend={{ value: 8.1, isPositive: true }}
          />
          <KpiCard
            title="Zonas Monitoradas"
            value="18"
            icon={<MapPin />}
            trend={{ value: 0, isPositive: true }}
          />
        </div>

        {/* Mapa de Calor Principal */}
        <Card>
          <CardHeader>
            <CardTitle>Mapa de Calor em Tempo Real</CardTitle>
            <CardDescription>Visualização da densidade de pessoas por área</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2 h-80 bg-gray-100 p-4 rounded-lg">
              {/* Simulação visual do evento */}
              <div className="col-span-6 h-8 bg-red-400 rounded flex items-center justify-center text-white text-xs font-bold">
                Entrada Principal (95%)
              </div>
              
              <div className="col-span-2 bg-yellow-300 rounded flex items-center justify-center text-xs font-semibold">
                Stands A (78%)
              </div>
              <div className="col-span-2 bg-blue-200 rounded flex items-center justify-center text-xs font-semibold">
                Stands B (45%)
              </div>
              <div className="col-span-2 bg-green-200 rounded flex items-center justify-center text-xs font-semibold">
                Stands C (52%)
              </div>
              
              <div className="col-span-3 bg-orange-300 rounded flex items-center justify-center text-xs font-semibold">
                Auditório Principal (88%)
              </div>
              <div className="col-span-3 bg-yellow-200 rounded flex items-center justify-center text-xs font-semibold">
                Área Networking (62%)
              </div>
              
              <div className="col-span-6 bg-yellow-200 rounded flex items-center justify-center text-xs font-semibold">
                Praça de Alimentação (71%)
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-300 rounded"></div>
                <span className="text-sm">Baixa (0-50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                <span className="text-sm">Média (51-75%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-300 rounded"></div>
                <span className="text-sm">Alta (76-90%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span className="text-sm">Crítica (&gt;90%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs para análises */}
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Alertas em Tempo Real</TabsTrigger>
            <TabsTrigger value="zones">Análise por Zona</TabsTrigger>
            <TabsTrigger value="ai-insights">Insights de IA</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alertas Automáticos</CardTitle>
                <CardDescription>Detecção inteligente de anomalias e aglomerações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realTimeAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <AlertTriangle className={`h-5 w-5 ${
                          alert.severity === 'High' ? 'text-red-500' : 
                          alert.severity === 'Medium' ? 'text-yellow-500' : 'text-blue-500'
                        }`} />
                        <div>
                          <h4 className="font-semibold">{alert.type}</h4>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                          <p className="text-xs text-muted-foreground">{alert.camera} • {alert.time}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          alert.severity === 'High' ? "destructive" : 
                          alert.severity === 'Medium' ? "default" : "secondary"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise Detalhada por Zona</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heatmapZones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{zone.zone}</h4>
                          <div className={`w-3 h-3 rounded-full ${
                            zone.temperature === 'hot' ? 'bg-red-500' :
                            zone.temperature === 'warm' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{zone.visitors} pessoas</span>
                          <span>{zone.avgTime} tempo médio</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{zone.density}%</div>
                        <div className="text-xs text-muted-foreground">densidade</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Insights Gerados por IA</CardTitle>
                <CardDescription>Análises preditivas e recomendações inteligentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900">Padrão de Fluxo Identificado</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      A IA detectou que 78% dos visitantes seguem o padrão: Entrada → Stands A → Auditório → Networking
                    </p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-900">Recomendação de Redistribuição</h4>
                    <p className="text-yellow-700 text-sm mt-1">
                      Sugerimos direcionar 20% do fluxo da entrada para os Stands C para equilibrar a densidade
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900">Previsão de Pico</h4>
                    <p className="text-green-700 text-sm mt-1">
                      Baseado nos padrões históricos, esperamos um pico de 40% mais visitantes entre 15h30 e 16h30
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900">Otimização de Layout</h4>
                    <p className="text-purple-700 text-sm mt-1">
                      A configuração atual do Auditório está 15% mais eficiente que eventos anteriores
                    </p>
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

export default HeatmapAI;
