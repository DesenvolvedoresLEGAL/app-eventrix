import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Calendar, Users } from 'lucide-react';

const GlobalTimezones = () => {
  return (
    <DashboardLayout title="Fusos Horários Globais">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Fusos Horários Globais</h2>
          <p className="text-muted-foreground">
            Gerencie eventos e horários para participantes em diferentes fusos horários
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fusos Cobertos</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">De UTC-8 a UTC+8</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horário de Brasília</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14:35</div>
              <p className="text-xs text-muted-foreground">UTC-3 (BRT)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Em diferentes fusos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participantes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.247</div>
              <p className="text-xs text-muted-foreground">Conectados agora</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Horários Regionais</CardTitle>
              <CardDescription>Horário atual nas principais regiões</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇧🇷</span>
                  <div>
                    <h4 className="font-medium">São Paulo, Brasil</h4>
                    <p className="text-sm text-muted-foreground">UTC-3 (BRT)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">14:35</div>
                  <div className="text-xs text-muted-foreground">847 participantes</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <h4 className="font-medium">Nova York, EUA</h4>
                    <p className="text-sm text-muted-foreground">UTC-5 (EST)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">12:35</div>
                  <div className="text-xs text-muted-foreground">234 participantes</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇪🇸</span>
                  <div>
                    <h4 className="font-medium">Madrid, Espanha</h4>
                    <p className="text-sm text-muted-foreground">UTC+1 (CET)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">18:35</div>
                  <div className="text-xs text-muted-foreground">89 participantes</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇯🇵</span>
                  <div>
                    <h4 className="font-medium">Tóquio, Japão</h4>
                    <p className="text-sm text-muted-foreground">UTC+9 (JST)</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">02:35</div>
                  <div className="text-xs text-muted-foreground">45 participantes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos Globais</CardTitle>
              <CardDescription>Agenda adaptada para diferentes fusos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Keynote: Future of AI</h4>
                    <p className="text-sm text-muted-foreground">Palestrante: Dr. Sarah Chen</p>
                  </div>
                  <div className="text-xs bg-blue-100 px-2 py-1 rounded">Global</div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>🇧🇷 Brasil:</span>
                    <span className="font-medium">15:00 (em 25 min)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🇺🇸 Nova York:</span>
                    <span className="font-medium">13:00 (em 25 min)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🇪🇸 Madrid:</span>
                    <span className="font-medium">19:00 (em 25 min)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Workshop: Digital Marketing</h4>
                    <p className="text-sm text-muted-foreground">Facilitador: Mark Johnson</p>
                  </div>
                  <div className="text-xs bg-green-100 px-2 py-1 rounded">Americas</div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>🇧🇷 Brasil:</span>
                    <span className="font-medium">16:30 (em 1h 55min)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🇺🇸 Nova York:</span>
                    <span className="font-medium">14:30 (em 1h 55min)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🇦🇷 Buenos Aires:</span>
                    <span className="font-medium">16:30 (em 1h 55min)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 border rounded-lg opacity-60">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Panel: Innovation in Europe</h4>
                    <p className="text-sm text-muted-foreground">Diversos palestrantes</p>
                  </div>
                  <div className="text-xs bg-purple-100 px-2 py-1 rounded">Europe</div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>🇪🇸 Madrid:</span>
                    <span className="font-medium">Concluído</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🇩🇪 Berlim:</span>
                    <span className="font-medium">Concluído</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Fuso Horário</CardTitle>
            <CardDescription>
              Configure automatização e preferências regionais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Painel de configurações de fusos horários será implementado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GlobalTimezones;