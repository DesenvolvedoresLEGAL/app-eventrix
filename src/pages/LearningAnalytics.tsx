import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';

const LearningAnalytics = () => {
  return (
    <DashboardLayout title="Analytics de Aprendizado">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics de Aprendizado</h2>
          <p className="text-muted-foreground">
            Análise detalhada de métricas educacionais e performance dos estudantes
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engajamento Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3%</div>
              <p className="text-xs text-muted-foreground">+5.2% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio/Aula</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42 min</div>
              <p className="text-xs text-muted-foreground">Meta: 45 min</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-muted-foreground">Estudantes ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NPS Educacional</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.9</div>
              <p className="text-xs text-muted-foreground">Satisfação geral</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Curso</CardTitle>
              <CardDescription>Métricas de engajamento e conclusão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Inteligência Artificial</span>
                  <span className="text-sm text-muted-foreground">347 estudantes</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Engajamento</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '94%'}}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Conclusão</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Marketing Digital</span>
                  <span className="text-sm text-muted-foreground">289 estudantes</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Engajamento</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Conclusão</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Gestão de Projetos</span>
                  <span className="text-sm text-muted-foreground">234 estudantes</span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Engajamento</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Conclusão</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '89%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Padrões de Aprendizado</CardTitle>
              <CardDescription>Insights sobre comportamento dos estudantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Horário Pico de Estudo</h4>
                <p className="text-sm text-blue-700">19:00-22:00 concentra 65% da atividade</p>
                <div className="text-xs text-blue-600 mt-1">Maior engajamento nos fins de semana</div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Duração Ideal de Aula</h4>
                <p className="text-sm text-green-700">Aulas de 35-45 min têm melhor retenção</p>
                <div className="text-xs text-green-600 mt-1">94% completam aulas nessa faixa</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Dispositivos Preferidos</h4>
                <p className="text-sm text-purple-700">67% mobile, 28% desktop, 5% tablet</p>
                <div className="text-xs text-purple-600 mt-1">Mobile tem maior tempo de sessão</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Aprendizado</CardTitle>
              <CardDescription>Tendências ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Gráfico de evolução será implementado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mapa de Conhecimento</CardTitle>
              <CardDescription>Áreas de maior interesse e performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Mapa interativo será implementado
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearningAnalytics;