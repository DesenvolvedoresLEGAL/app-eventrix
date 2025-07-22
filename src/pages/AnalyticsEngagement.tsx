
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Share2, Eye, Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AnalyticsEngagement = () => {
  const engagementData = [
    { name: 'Seg', likes: 120, comments: 45, shares: 23 },
    { name: 'Ter', likes: 150, comments: 67, shares: 34 },
    { name: 'Qua', likes: 180, comments: 89, shares: 45 },
    { name: 'Qui', likes: 220, comments: 123, shares: 67 },
    { name: 'Sex', likes: 280, comments: 156, shares: 89 },
    { name: 'Sab', likes: 320, comments: 189, shares: 112 },
    { name: 'Dom', likes: 290, comments: 167, shares: 98 },
  ];

  const sessionData = [
    { time: '09:00', sessions: 45 },
    { time: '10:00', sessions: 89 },
    { time: '11:00', sessions: 134 },
    { time: '12:00', sessions: 178 },
    { time: '13:00', sessions: 156 },
    { time: '14:00', sessions: 201 },
    { time: '15:00', sessions: 234 },
    { time: '16:00', sessions: 189 },
    { time: '17:00', sessions: 145 },
    { time: '18:00', sessions: 98 },
  ];

  return (
    <DashboardLayout title="Engajamento">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Análise de Engajamento</h2>
            <p className="text-muted-foreground">Métricas detalhadas de interação dos participantes</p>
          </div>
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Curtidas</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,570</div>
              <p className="text-xs text-muted-foreground">+18% vs semana passada</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comentários</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">836</div>
              <p className="text-xs text-muted-foreground">+25% vs semana passada</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compartilhamentos</CardTitle>
              <Share2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">468</div>
              <p className="text-xs text-muted-foreground">+12% vs semana passada</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.3%</div>
              <p className="text-xs text-muted-foreground">+2.1% vs semana passada</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Engajamento Semanal</CardTitle>
              <CardDescription>Interações por dia da semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#ef4444" name="Curtidas" />
                    <Bar dataKey="comments" fill="#3b82f6" name="Comentários" />
                    <Bar dataKey="shares" fill="#10b981" name="Compartilhamentos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Session Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade por Horário</CardTitle>
              <CardDescription>Sessões ativas ao longo do dia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sessionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="sessions" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Sessões Ativas"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Content */}
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo com Maior Engajamento</CardTitle>
            <CardDescription>Posts e atividades que mais geraram interação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Keynote - Futuro da IA', views: 2340, likes: 456, comments: 123, engagement: '8.7%' },
                { title: 'Workshop - React Avançado', views: 1890, likes: 378, comments: 89, engagement: '7.2%' },
                { title: 'Mesa Redonda - Startup', views: 1567, likes: 234, comments: 67, engagement: '6.1%' },
                { title: 'Networking Coffee Break', views: 1234, likes: 189, comments: 45, engagement: '5.4%' },
              ].map((content, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{content.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {content.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {content.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {content.comments}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">{content.engagement}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsEngagement;
