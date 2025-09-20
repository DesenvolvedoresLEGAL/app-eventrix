import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Target, RefreshCw, Settings } from 'lucide-react';

const SmartMatching = () => {
  return (
    <DashboardLayout title="Matching Inteligente">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Matching Inteligente</h2>
            <p className="text-muted-foreground">
              Sistema de correspondência avançado baseado em IA
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Configurar
            </Button>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Executar Matching
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matches Gerados</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.234</div>
              <p className="text-xs text-muted-foreground">Últimas 24h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Precisão do Algoritmo</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Taxa de sucesso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matches Aceitos</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">72% taxa de aceite</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processamento</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">Tempo médio</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Matches Pendentes</CardTitle>
              <CardDescription>Sugestões aguardando confirmação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Maria Silva ↔ João Santos</h4>
                  <p className="text-sm text-muted-foreground">Compatibilidade: 96% • Área: Tecnologia</p>
                </div>
                <Badge variant="outline">Pendente</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Ana Costa ↔ Pedro Lima</h4>
                  <p className="text-sm text-muted-foreground">Compatibilidade: 89% • Área: Marketing</p>
                </div>
                <Badge variant="outline">Pendente</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Carlos Rocha ↔ Lucia Fernandes</h4>
                  <p className="text-sm text-muted-foreground">Compatibilidade: 92% • Área: Inovação</p>
                </div>
                <Badge variant="outline">Pendente</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Algoritmos de Matching</CardTitle>
              <CardDescription>Status dos diferentes modelos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Interesse Comum</h4>
                  <p className="text-sm text-muted-foreground">Baseado em perfis e preferências</p>
                </div>
                <Badge variant="secondary">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Proximidade Geográfica</h4>
                  <p className="text-sm text-muted-foreground">Considera localização atual</p>
                </div>
                <Badge variant="secondary">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Networking Histórico</h4>
                  <p className="text-sm text-muted-foreground">Analisa conexões anteriores</p>
                </div>
                <Badge variant="outline">Pausado</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SmartMatching;