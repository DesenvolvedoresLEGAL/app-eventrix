
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Users, Clock, Zap } from 'lucide-react';

const CommunicationHumanGPT = () => {
  const conversations = [
    {
      id: 1,
      participant: 'João Silva',
      lastMessage: 'Qual o horário da palestra sobre IA?',
      status: 'Ativo',
      time: '2 min atrás',
      responses: 12
    },
    {
      id: 2,
      participant: 'Maria Santos',
      lastMessage: 'Como faço para alterar minha inscrição?',
      status: 'Pendente',
      time: '15 min atrás',
      responses: 3
    },
    {
      id: 3,
      participant: 'Pedro Costa',
      lastMessage: 'Obrigado pelas informações!',
      status: 'Resolvido',
      time: '1h atrás',
      responses: 8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'default';
      case 'Pendente': return 'destructive';
      case 'Resolvido': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout title="HumanGPT">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              HumanGPT™
            </h2>
            <p className="text-muted-foreground">Assistente de IA para atendimento humanizado aos participantes</p>
          </div>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Configurar IA
          </Button>
        </div>

        {/* HumanGPT Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversas Ativas</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+8 nas últimas 2h</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resoluções Automáticas</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Taxa de sucesso</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3min</div>
              <p className="text-xs text-muted-foreground">Por conversa</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">Avaliação média</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuração da IA</CardTitle>
            <CardDescription>
              Configure o comportamento e respostas do assistente HumanGPT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Base de Conhecimento</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Documentos e informações sobre o evento
                </p>
                <Button variant="outline" size="sm">
                  Gerenciar Conhecimento
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Personalidade</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tom de voz e estilo de comunicação
                </p>
                <Button variant="outline" size="sm">
                  Configurar Tom
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Escalação</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Quando transferir para humano
                </p>
                <Button variant="outline" size="sm">
                  Definir Regras
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Conversations */}
        <Card>
          <CardHeader>
            <CardTitle>Conversas Recentes</CardTitle>
            <CardDescription>
              Acompanhe as interações do HumanGPT com os participantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div key={conversation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-full">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{conversation.participant}</h3>
                      <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(conversation.status) as any} className="text-xs">
                          {conversation.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {conversation.responses} respostas
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{conversation.time}</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Ver Conversa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CommunicationHumanGPT;
