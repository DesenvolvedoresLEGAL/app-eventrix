import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

const AgendaOverview = () => {
  return (
    <DashboardLayout title="Agenda - Visão Geral">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agenda - Visão Geral</h2>
          <p className="text-muted-foreground">
            Dashboard centralizado para gestão de eventos, palestras e atividades
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">6 palestras, 3 workshops, 3 reuniões</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Atividade</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14:30</div>
              <p className="text-xs text-muted-foreground">Palestra: IA no Futuro</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.847</div>
              <p className="text-xs text-muted-foreground">Inscritos nas atividades</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Salas em Uso</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8/15</div>
              <p className="text-xs text-muted-foreground">53% de ocupação</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Programação de Hoje</CardTitle>
              <CardDescription>Eventos agendados para hoje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-bold">09:00</div>
                  <div className="text-xs text-muted-foreground">10:30</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Workshop: Design Thinking</h4>
                  <p className="text-sm text-muted-foreground">Sala A1 • 45 participantes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-bold">14:30</div>
                  <div className="text-xs text-muted-foreground">15:30</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Palestra: IA no Futuro</h4>
                  <p className="text-sm text-muted-foreground">Auditório Principal • 320 participantes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-bold">16:00</div>
                  <div className="text-xs text-muted-foreground">17:00</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Mesa Redonda: Inovação</h4>
                  <p className="text-sm text-muted-foreground">Sala B2 • 80 participantes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alertas e Pendências</CardTitle>
              <CardDescription>Itens que requerem atenção</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-sm">Conflito de horário - Sala A2</span>
                <span className="text-xs text-red-600">Crítico</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-sm">2 palestrantes não confirmaram</span>
                <span className="text-xs text-yellow-600">Atenção</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm">Setup técnico pendente - Sala C1</span>
                <span className="text-xs text-blue-600">Info</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm">Todas as trilhas programadas</span>
                <span className="text-xs text-green-600">OK</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgendaOverview;