import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, Users, Calendar } from 'lucide-react';

const ChallengesQuests = () => {
  return (
    <DashboardLayout title="Desafios e Quests">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Desafios e Quests</h2>
            <p className="text-muted-foreground">
              Crie missões e desafios para aumentar o engajamento
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Desafio
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Desafios Ativos</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">4 terminam hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-muted-foreground">Em pelo menos 1 desafio</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">Dos desafios iniciados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quests Criadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">15 completadas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Desafios Ativos</CardTitle>
              <CardDescription>Desafios em andamento no evento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Networking Master</h4>
                    <p className="text-sm text-muted-foreground">Conecte-se com 10 pessoas diferentes</p>
                  </div>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>234/500 participantes</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '47%'}}></div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Termina em: 2 dias • Recompensa: 200 pts
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Knowledge Hunter</h4>
                    <p className="text-sm text-muted-foreground">Assista 5 palestras completas</p>
                  </div>
                  <Badge variant="secondary">Ativo</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>189/300 participantes</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '63%'}}></div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Termina em: 6 horas • Recompensa: 150 pts
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Stand Explorer</h4>
                    <p className="text-sm text-muted-foreground">Visite 15 stands diferentes</p>
                  </div>
                  <Badge variant="outline">Finalizado</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Participaram</span>
                    <span>456 pessoas</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Finalizado ontem • 312 completaram
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quests Especiais</CardTitle>
              <CardDescription>Missões de longo prazo e conquistas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Embaixador do Evento</h4>
                    <p className="text-sm text-muted-foreground">Complete todos os desafios disponíveis</p>
                  </div>
                  <Badge className="bg-purple-500">Quest</Badge>
                </div>
                <div className="text-xs text-purple-700">
                  Progresso: 7/12 desafios • Recompensa: Certificado Especial + 1000 pts
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Social Butterfly</h4>
                    <p className="text-sm text-muted-foreground">Faça 25 conexões e participe de 3 workshops</p>
                  </div>
                  <Badge className="bg-blue-500">Quest</Badge>
                </div>
                <div className="text-xs text-blue-700">
                  Progresso: 18/25 conexões, 2/3 workshops • Recompensa: 500 pts
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Feedback Champion</h4>
                    <p className="text-sm text-muted-foreground">Avalie 10 palestras e 5 stands</p>
                  </div>
                  <Badge className="bg-green-500">Quest</Badge>
                </div>
                <div className="text-xs text-green-700">
                  Progresso: 12/10 palestras ✓, 3/5 stands • Recompensa: 300 pts
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Early Bird</h4>
                    <p className="text-sm text-muted-foreground">Seja um dos primeiros em 5 palestras</p>
                  </div>
                  <Badge className="bg-orange-500">Quest</Badge>
                </div>
                <div className="text-xs text-orange-700">
                  Progresso: 4/5 palestras • Recompensa: 200 pts + Badge Especial
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChallengesQuests;