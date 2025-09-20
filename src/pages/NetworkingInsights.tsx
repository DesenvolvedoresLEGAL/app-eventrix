import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';

const NetworkingInsights = () => {
  return (
    <DashboardLayout title="Insights de Networking">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Insights de Networking</h2>
          <p className="text-muted-foreground">
            Análises e insights profundos sobre padrões de networking
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eficiência Geral</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">Score de networking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Grupos Formados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Comunidades ativas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8m 32s</div>
              <p className="text-xs text-muted-foreground">Por conversa</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NPS Networking</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.9</div>
              <p className="text-xs text-muted-foreground">Satisfação média</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Padrões de Comportamento</CardTitle>
              <CardDescription>Insights sobre como as pessoas fazem networking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Horário Pico</h4>
                <p className="text-sm text-blue-700">15:30-16:30 é quando mais conexões acontecem</p>
                <div className="text-xs text-blue-600 mt-1">+78% de atividade vs média</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Local Preferido</h4>
                <p className="text-sm text-green-700">Área de coffee break concentra 45% das interações</p>
                <div className="text-xs text-green-600 mt-1">Ambiente mais favorável</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Duração Ideal</h4>
                <p className="text-sm text-purple-700">Conversas de 5-10 min têm maior taxa de follow-up</p>
                <div className="text-xs text-purple-600 mt-1">92% seguem conversando</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mapa de Afinidades</CardTitle>
              <CardDescription>Clusters de interesse mais ativos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Inteligência Artificial</span>
                  <span className="text-xs text-muted-foreground">234 conexões</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Startups & Inovação</span>
                  <span className="text-xs text-muted-foreground">189 conexões</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sustentabilidade</span>
                  <span className="text-xs text-muted-foreground">156 conexões</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recomendações Estratégicas</CardTitle>
            <CardDescription>
              Sugestões para otimizar o networking do evento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-900">Expandir Coffee Breaks</h4>
              <p className="text-sm text-blue-700">Aumentar o tempo de intervalo em 15 minutos pode gerar +30% mais conexões</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-green-900">Atividade de Icebreaker</h4>
              <p className="text-sm text-green-700">Introduzir dinâmica no início pode aumentar participação em 25%</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-medium text-purple-900">Otimização de Layout</h4>
              <p className="text-sm text-purple-700">Redistribuir stands pode equilibrar fluxo de networking</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NetworkingInsights;