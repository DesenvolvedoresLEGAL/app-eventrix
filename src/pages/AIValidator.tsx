
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, CheckCircle, AlertTriangle, Clock, Bot } from 'lucide-react';

const AIValidator = () => {
  const validationResults = [
    {
      id: 1,
      document: 'Contrato de Patrocínio - TechCorp',
      status: 'Aprovado',
      confidence: 95,
      issues: 0,
      reviewed: '2024-01-15 14:30',
      type: 'Contrato'
    },
    {
      id: 2,
      document: 'Termo de Uso - Aplicativo',
      status: 'Atenção',
      confidence: 78,
      issues: 3,
      reviewed: '2024-01-15 12:45',
      type: 'Legal'
    },
    {
      id: 3,
      document: 'Política de Privacidade',
      status: 'Rejeitado',
      confidence: 45,
      issues: 8,
      reviewed: '2024-01-15 09:20',
      type: 'Legal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado': return 'default';
      case 'Atenção': return 'secondary';
      case 'Rejeitado': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Atenção': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'Rejeitado': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout title="AI Validator">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              AI Validator™
            </h2>
            <p className="text-muted-foreground">Validação inteligente de documentos e contratos</p>
          </div>
          <Button>
            <Bot className="w-4 h-4 mr-2" />
            Nova Validação
          </Button>
        </div>

        {/* Validation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos Analisados</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% vs mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3min</div>
              <p className="text-xs text-muted-foreground">Por análise</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Precisão</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Confiabilidade</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="validator" className="space-y-4">
          <TabsList>
            <TabsTrigger value="validator">Validar Documento</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="validator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Documento</CardTitle>
                <CardDescription>
                  Cole o texto do documento para validação automática
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Cole aqui o texto do documento que deseja validar..."
                  className="min-h-48"
                />
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium">Tipo de Documento</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Contrato de Patrocínio</option>
                      <option>Termo de Uso</option>
                      <option>Política de Privacidade</option>
                      <option>Acordo de Fornecimento</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="text-sm font-medium">Nível de Rigor</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Padrão</option>
                      <option>Alto</option>
                      <option>Crítico</option>
                    </select>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Iniciar Validação
                </Button>
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle>Capacidades da IA</CardTitle>
                <CardDescription>O que o AI Validator pode fazer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Análise Legal</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Verificação de cláusulas obrigatórias</li>
                      <li>• Detecção de termos problemáticos</li>
                      <li>• Análise de conformidade LGPD</li>
                      <li>• Validação de linguagem jurídica</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Análise Técnica</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Consistência terminológica</li>
                      <li>• Estrutura do documento</li>
                      <li>• Referências cruzadas</li>
                      <li>• Completude das informações</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Validações</CardTitle>
                <CardDescription>
                  Documentos analisados pelo AI Validator
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {validationResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(result.status)}
                        <div>
                          <h3 className="font-medium">{result.document}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {result.type}
                            </Badge>
                            <Badge variant={getStatusColor(result.status) as any} className="text-xs">
                              {result.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {result.issues} problemas encontrados
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Analisado em {result.reviewed}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{result.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confiança</div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Ver Relatório
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Templates de Validação</CardTitle>
                <CardDescription>
                  Modelos pré-configurados para diferentes tipos de documento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Contrato de Patrocínio', icon: '📄', rules: 23 },
                    { name: 'Termo de Uso', icon: '📋', rules: 18 },
                    { name: 'Política de Privacidade', icon: '🔒', rules: 31 },
                    { name: 'Acordo de Fornecimento', icon: '📦', rules: 15 },
                    { name: 'Contrato de Trabalho', icon: '👥', rules: 27 },
                    { name: 'NDA', icon: '🤐', rules: 12 },
                  ].map((template, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{template.icon}</div>
                        <h3 className="font-medium mb-1">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {template.rules} regras de validação
                        </p>
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          Usar Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIValidator;
