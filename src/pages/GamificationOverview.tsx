import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Target, Zap } from 'lucide-react';

const GamificationOverview = () => {
  return (
    <DashboardLayout title="Gamificação - Visão Geral">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gamificação - Visão Geral</h2>
          <p className="text-muted-foreground">
            Dashboard centralizado para sistema de gamificação e engajamento
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participantes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.247</div>
              <p className="text-xs text-muted-foreground">+23% engajamento</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pontos Distribuídos</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.892</div>
              <p className="text-xs text-muted-foreground">Últimas 24h</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conquistas Desbloqueadas</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">387 únicas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Desafios Ativos</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">8 completados hoje</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Players</CardTitle>
              <CardDescription>Ranking dos participantes mais engajados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gold/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Maria Silva</h4>
                    <p className="text-sm text-muted-foreground">Level 15 • Super Networker</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">2.847 pts</div>
                  <div className="text-xs text-muted-foreground">+247 hoje</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-silver/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">João Santos</h4>
                    <p className="text-sm text-muted-foreground">Level 12 • Knowledge Seeker</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">2.134 pts</div>
                  <div className="text-xs text-muted-foreground">+189 hoje</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Ana Costa</h4>
                    <p className="text-sm text-muted-foreground">Level 10 • Event Explorer</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">1.892 pts</div>
                  <div className="text-xs text-muted-foreground">+156 hoje</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividades Gamificadas</CardTitle>
              <CardDescription>Status dos elementos gamificados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Check-ins nas Palestras</span>
                  <span className="text-sm font-bold">78% participação</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Networking Challenges</span>
                  <span className="text-sm font-bold">65% completos</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Quizzes Interativos</span>
                  <span className="text-sm font-bold">82% respondidos</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Feedback Forms</span>
                  <span className="text-sm font-bold">54% preenchidos</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '54%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Alertas e Recomendações</CardTitle>
            <CardDescription>
              Insights para otimizar o sistema de gamificação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">Criar desafio de networking para área tecnologia</span>
              <span className="text-xs text-blue-600">Sugestão IA</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm">Aumentar recompensas para feedback - baixa participação</span>
              <span className="text-xs text-green-600">Ação recomendada</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm">Sistema funcionando perfeitamente - 89% engajamento</span>
              <span className="text-xs text-purple-600">Status</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GamificationOverview;