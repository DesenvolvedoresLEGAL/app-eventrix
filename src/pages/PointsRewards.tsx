import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trophy, Star, Medal } from 'lucide-react';

const PointsRewards = () => {
  return (
    <DashboardLayout title="Sistema de Pontos e Recompensas">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Sistema de Pontos e Recompensas</h2>
            <p className="text-muted-foreground">
              Configure pontos, níveis e recompensas para engajar participantes
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Recompensa
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pontos em Circulação</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127.452</div>
              <p className="text-xs text-muted-foreground">Total distribuído</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recompensas Ativas</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">8 resgatadas hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Resgate</CardTitle>
              <Medal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-muted-foreground">Dos pontos ganhos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nível Médio</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level 7</div>
              <p className="text-xs text-muted-foreground">Dos participantes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ações que Geram Pontos</CardTitle>
              <CardDescription>Configure quantos pontos cada ação vale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Check-in em Palestra</h4>
                  <p className="text-sm text-muted-foreground">Presença confirmada</p>
                </div>
                <Badge variant="secondary">50 pts</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Nova Conexão de Networking</h4>
                  <p className="text-sm text-muted-foreground">Conectar com outro participante</p>
                </div>
                <Badge variant="secondary">30 pts</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Avaliação de Palestra</h4>
                  <p className="text-sm text-muted-foreground">Feedback completo</p>
                </div>
                <Badge variant="secondary">25 pts</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Visita a Stand</h4>
                  <p className="text-sm text-muted-foreground">QR Code escaneado</p>
                </div>
                <Badge variant="secondary">15 pts</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Catálogo de Recompensas</CardTitle>
              <CardDescription>Prêmios disponíveis para resgate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gold/10 rounded-lg">
                <div>
                  <h4 className="font-medium">Certificado Premium</h4>
                  <p className="text-sm text-muted-foreground">Certificado digital personalizado</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">500 pts</Badge>
                  <p className="text-xs text-muted-foreground">12 resgatados</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Desconto 20% - Próximo Evento</h4>
                  <p className="text-sm text-muted-foreground">Cupom para próxima edição</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">300 pts</Badge>
                  <p className="text-xs text-muted-foreground">47 resgatados</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">E-book Exclusivo</h4>
                  <p className="text-sm text-muted-foreground">Material complementar</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">150 pts</Badge>
                  <p className="text-xs text-muted-foreground">89 resgatados</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Badge de Participação</h4>
                  <p className="text-sm text-muted-foreground">Distintivo digital</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">100 pts</Badge>
                  <p className="text-xs text-muted-foreground">156 resgatados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PointsRewards;