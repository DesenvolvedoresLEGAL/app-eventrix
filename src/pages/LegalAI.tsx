
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import LegalGPT from '@/components/ai-tools/LegalGPT';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, FileText, Shield, Zap } from 'lucide-react';

const LegalAI = () => {
  const recentDocuments = [
    {
      id: 1,
      title: 'Contrato de Patrocínio - TechCorp 2024',
      type: 'Contrato',
      status: 'Analisado',
      confidence: 94,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Termo de Uso - Aplicativo Mobile',
      type: 'Legal',
      status: 'Em Análise',
      confidence: 87,
      date: '2024-01-14'
    },
    {
      id: 3,
      title: 'Política de Privacidade LGPD',
      type: 'Compliance',
      status: 'Aprovado',
      confidence: 96,
      date: '2024-01-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado': return 'default';
      case 'Analisado': return 'secondary';
      case 'Em Análise': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout title="Legal AI">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              LegalGPT™
            </h2>
            <p className="text-muted-foreground">Assistente jurídico inteligente para análise de documentos</p>
          </div>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Nova Análise
          </Button>
        </div>

        {/* Legal AI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos Analisados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">347</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Precisão Média</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Confiabilidade</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Economizado</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156h</div>
              <p className="text-xs text-muted-foreground">Vs análise manual</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conformidade</CardTitle>
              <Scale className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">Taxa de aprovação</p>
            </CardContent>
          </Card>
        </div>

        {/* LegalGPT Interface */}
        <Card>
          <CardHeader>
            <CardTitle>Assistente Jurídico IA</CardTitle>
            <CardDescription>
              Faça perguntas jurídicas, analise documentos e obtenha orientações especializadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LegalGPT />
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Recentes</CardTitle>
            <CardDescription>
              Últimos documentos analisados pelo LegalGPT
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                        <Badge variant={getStatusColor(doc.status) as any} className="text-xs">
                          {doc.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {doc.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{doc.confidence}%</div>
                    <div className="text-xs text-muted-foreground">Confiança</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Ver Análise
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle>Capacidades do LegalGPT™</CardTitle>
            <CardDescription>O que nossa IA jurídica pode fazer por você</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: <FileText className="w-5 h-5" />,
                  title: 'Análise de Contratos',
                  description: 'Revisão automática de cláusulas, termos e condições'
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: 'Conformidade LGPD',
                  description: 'Verificação de compliance com leis de proteção de dados'
                },
                {
                  icon: <Scale className="w-5 h-5" />,
                  title: 'Consultoria Jurídica',
                  description: 'Orientações sobre questões legais específicas'
                },
                {
                  icon: <Zap className="w-5 h-5" />,
                  title: 'Geração de Documentos',
                  description: 'Criação automática de contratos e termos'
                },
                {
                  icon: <FileText className="w-5 h-5" />,
                  title: 'Análise de Riscos',
                  description: 'Identificação de potenciais problemas legais'
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: 'Validação Legal',
                  description: 'Verificação de validade e aplicabilidade jurídica'
                }
              ].map((capability, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded">
                      {capability.icon}
                    </div>
                    <h3 className="font-medium">{capability.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LegalAI;
