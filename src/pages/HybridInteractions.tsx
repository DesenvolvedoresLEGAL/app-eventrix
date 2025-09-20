import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MonitorSpeaker, Users, MessageSquare, Video } from 'lucide-react';

const HybridInteractions = () => {
  return (
    <DashboardLayout title="Interações Híbridas">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Interações Híbridas</h2>
          <p className="text-muted-foreground">
            Conecte participantes presenciais e virtuais em tempo real
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interações Ativas</CardTitle>
              <MonitorSpeaker className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">347</div>
              <p className="text-xs text-muted-foreground">Entre presencial e virtual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Salas Conectadas</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Com bridge ativo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perguntas Híbridas</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">De participantes online</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Networking Cross</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">Conexões híbridas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bridge de Comunicação</CardTitle>
              <CardDescription>Status das conexões entre ambientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Auditório Principal ↔ Virtual</h4>
                  <p className="text-sm text-muted-foreground">Audio/vídeo bidireccional</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 text-sm font-medium">Conectado</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Sala Workshop ↔ Breakout</h4>
                  <p className="text-sm text-muted-foreground">Q&A integrado</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 text-sm font-medium">Conectado</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Stand Virtual Tour</h4>
                  <p className="text-sm text-muted-foreground">Sincronização em andamento</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-600 text-sm font-medium">Sincronizando</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ferramentas de Integração</CardTitle>
              <CardDescription>Recursos para unificar experiências</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium">Chat Unificado</h4>
                <p className="text-sm text-muted-foreground">Mensagens de ambos os ambientes</p>
                <div className="text-xs text-blue-600 mt-1">1.247 mensagens hoje</div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium">Q&A Integrado</h4>
                <p className="text-sm text-muted-foreground">Perguntas presenciais e virtuais</p>
                <div className="text-xs text-green-600 mt-1">89 perguntas na fila</div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium">Polls Simultâneos</h4>
                <p className="text-sm text-muted-foreground">Votação em tempo real</p>
                <div className="text-xs text-purple-600 mt-1">3 polls ativos</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analytics de Interação</CardTitle>
            <CardDescription>
              Métricas de engajamento entre participantes híbridos
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Dashboard de analytics híbridos será implementado
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HybridInteractions;