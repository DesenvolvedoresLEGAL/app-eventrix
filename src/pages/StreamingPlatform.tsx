import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Settings, Monitor } from 'lucide-react';

const StreamingPlatform = () => {
  return (
    <DashboardLayout title="Plataforma de Streaming">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Plataforma de Streaming</h2>
            <p className="text-muted-foreground">
              Gerencie todas as transmissões ao vivo do evento
            </p>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Palestra Principal</CardTitle>
                <Badge variant="secondary">Ao Vivo</Badge>
              </div>
              <CardDescription>Auditório Principal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Monitor className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Stream Ativo</p>
                  <p className="text-xs">547 viewers</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Qualidade: 1080p</span>
                <span>Bitrate: 4.5 Mbps</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Pause className="mr-2 h-4 w-4" />
                  Pausar
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Workshop IA</CardTitle>
                <Badge variant="secondary">Ao Vivo</Badge>
              </div>
              <CardDescription>Sala B</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Monitor className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Stream Ativo</p>
                  <p className="text-xs">234 viewers</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Qualidade: 720p</span>
                <span>Bitrate: 2.5 Mbps</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Pause className="mr-2 h-4 w-4" />
                  Pausar
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mesa Redonda</CardTitle>
                <Badge variant="outline">Standby</Badge>
              </div>
              <CardDescription>Sala C</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <Monitor className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Aguardando</p>
                  <p className="text-xs">Início: 16:00</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Configurado: 1080p</span>
                <span>Estimado: 3.8 Mbps</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Transmissão</CardTitle>
            <CardDescription>
              Configure qualidade e opções avançadas de streaming
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Painel de configurações detalhadas será implementado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StreamingPlatform;