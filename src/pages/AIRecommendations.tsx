import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Target, Lightbulb } from 'lucide-react';

const AIRecommendations = () => {
  return (
    <DashboardLayout title="Recomendações IA">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recomendações IA</h2>
          <p className="text-muted-foreground">
            Sugestões inteligentes baseadas em comportamento e preferências dos usuários
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recomendações Geradas</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.547</div>
              <p className="text-xs text-muted-foreground">Últimas 24h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Clique</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% vs média</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9.1/10</div>
              <p className="text-xs text-muted-foreground">Score médio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modelos Ativos</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Algoritmos rodando</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Recomendações</CardTitle>
              <CardDescription>Performance por categoria de sugestão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Conexões de Networking</span>
                  <p className="text-sm text-muted-foreground">872 recomendações</p>
                </div>
                <Badge variant="secondary">92% aceite</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Palestras Relacionadas</span>
                  <p className="text-sm text-muted-foreground">1.245 sugestões</p>
                </div>
                <Badge variant="secondary">78% aceite</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Produtos/Serviços</span>
                  <p className="text-sm text-muted-foreground">430 indicações</p>
                </div>
                <Badge variant="secondary">65% aceite</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Recomendações</CardTitle>
              <CardDescription>Sugestões mais populares no momento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium">Workshop: IA Generativa</h4>
                <p className="text-sm text-muted-foreground">Recomendado para 234 participantes</p>
                <Badge variant="outline" className="mt-2">Trending</Badge>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium">Networking: Startups</h4>
                <p className="text-sm text-muted-foreground">89 conexões sugeridas</p>
                <Badge variant="outline" className="mt-2">Hot</Badge>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium">Stand: TechCorp</h4>
                <p className="text-sm text-muted-foreground">Visitação recomendada para 156 pessoas</p>
                <Badge variant="outline" className="mt-2">Popular</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIRecommendations;