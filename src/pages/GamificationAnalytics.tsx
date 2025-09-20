import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

const GamificationAnalytics = () => {
  return (
    <DashboardLayout title="Analytics de Gamificação">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics de Gamificação</h2>
          <p className="text-muted-foreground">
            Métricas detalhadas sobre engajamento e performance do sistema gamificado
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.2%</div>
              <p className="text-xs text-muted-foreground">+15% vs evento anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio Ativo</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4h 32m</div>
              <p className="text-xs text-muted-foreground">Por participante</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI de Gamificação</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">340%</div>
              <p className="text-xs text-muted-foreground">Retorno vs investimento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NPS Gamificação</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7</div>
              <p className="text-xs text-muted-foreground">Satisfação média</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Pontos</CardTitle>
              <CardDescription>Como os pontos foram ganhos pelos participantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Check-ins em Palestras</span>
                  <span className="text-sm font-bold">35%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '35%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Networking</span>
                  <span className="text-sm font-bold">28%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '28%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Avaliações</span>
                  <span className="text-sm font-bold">22%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '22%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Visitas a Stands</span>
                  <span className="text-sm font-bold">15%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance por Segmento</CardTitle>
              <CardDescription>Engajamento por tipo de participante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Expositores</h4>
                  <p className="text-sm text-muted-foreground">247 participantes</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">94%</div>
                  <div className="text-xs text-muted-foreground">Engajamento</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Visitantes VIP</h4>
                  <p className="text-sm text-muted-foreground">89 participantes</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">91%</div>
                  <div className="text-xs text-muted-foreground">Engajamento</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Palestrantes</h4>
                  <p className="text-sm text-muted-foreground">34 participantes</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">87%</div>
                  <div className="text-xs text-muted-foreground">Engajamento</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Visitantes Gerais</h4>
                  <p className="text-sm text-muted-foreground">877 participantes</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-600">78%</div>
                  <div className="text-xs text-muted-foreground">Engajamento</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Engajamento</CardTitle>
              <CardDescription>Evolução do engajamento ao longo do evento</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Gráfico de tendências será implementado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Heatmap de Atividades</CardTitle>
              <CardDescription>Horários e locais com maior atividade gamificada</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Heatmap interativo será implementado
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GamificationAnalytics;