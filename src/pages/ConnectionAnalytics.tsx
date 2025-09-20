import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, BarChart3, PieChart, Activity } from 'lucide-react';

const ConnectionAnalytics = () => {
  return (
    <DashboardLayout title="Analytics de Conexões">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics de Conexões</h2>
          <p className="text-muted-foreground">
            Análise detalhada de conexões e networking entre participantes
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Conexões</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.247</div>
              <p className="text-xs text-muted-foreground">+18% vs evento anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conexões por Pessoa</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.8</div>
              <p className="text-xs text-muted-foreground">Média do evento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conexões Ativas</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.892</div>
              <p className="text-xs text-muted-foreground">Com interação recente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualidade Média</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7/10</div>
              <p className="text-xs text-muted-foreground">Score de relevância</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Conexões</CardTitle>
              <CardDescription>Visualização de rede de networking</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Visualização interativa de rede será implementada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hubs de Networking</CardTitle>
              <CardDescription>Participantes mais conectados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gold/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Maria Silva</h4>
                  <p className="text-sm text-muted-foreground">CEO, TechCorp</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">47 conexões</div>
                  <div className="text-xs text-muted-foreground">Super Connector</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-silver/10 rounded-lg">
                <div>
                  <h4 className="font-medium">João Santos</h4>
                  <p className="text-sm text-muted-foreground">CTO, Innovation Labs</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">34 conexões</div>
                  <div className="text-xs text-muted-foreground">Connector</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-bronze/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Ana Costa</h4>
                  <p className="text-sm text-muted-foreground">Head of Marketing</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">28 conexões</div>
                  <div className="text-xs text-muted-foreground">Active Networker</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Análise Temporal</CardTitle>
            <CardDescription>
              Evolução das conexões ao longo do evento
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Gráfico temporal será implementado
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ConnectionAnalytics;