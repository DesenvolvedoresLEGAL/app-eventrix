import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const SmartContracts = () => {
  return (
    <DashboardLayout title="Contratos Inteligentes">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contratos Inteligentes</h2>
            <p className="text-muted-foreground">
              IA avançada para análise, revisão e gestão automatizada de contratos
            </p>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Analisar Novo Contrato
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contratos Processados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Riscos Identificados</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">12 resolvidos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">198</div>
              <p className="text-xs text-muted-foreground">80% taxa de aprovação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 min</div>
              <p className="text-xs text-muted-foreground">Para análise completa</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Análises em Andamento</CardTitle>
              <CardDescription>Contratos sendo processados pela IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Contrato Patrocínio - TechCorp</h4>
                  <p className="text-sm text-muted-foreground">Upload: há 5 min • 45 páginas</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Analisando</Badge>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Termo de Uso - Plataforma</h4>
                  <p className="text-sm text-muted-foreground">Upload: há 12 min • 23 páginas</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Em revisão</Badge>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Acordo de Fornecimento</h4>
                  <p className="text-sm text-muted-foreground">Upload: há 8 min • 12 páginas</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Aguardando</Badge>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Análises Concluídas</CardTitle>
              <CardDescription>Relatórios prontos para revisão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border">
                <div>
                  <h4 className="font-medium">Contrato Stand - Innovation Lab</h4>
                  <p className="text-sm text-muted-foreground">Score: 92/100 • Baixo risco</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500">Aprovado</Badge>
                  <Button variant="outline" size="sm">Ver Relatório</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border">
                <div>
                  <h4 className="font-medium">Acordo de Confidencialidade</h4>
                  <p className="text-sm text-muted-foreground">Score: 76/100 • 3 cláusulas de atenção</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-500">Revisão</Badge>
                  <Button variant="outline" size="sm">Ver Relatório</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border">
                <div>
                  <h4 className="font-medium">Termo de Responsabilidade</h4>
                  <p className="text-sm text-muted-foreground">Score: 45/100 • Alto risco</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-red-500">Rejeitado</Badge>
                  <Button variant="outline" size="sm">Ver Relatório</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações da IA Jurídica</CardTitle>
            <CardDescription>
              Configure parâmetros de análise e critérios de aprovação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Painel de configurações avançadas será implementado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SmartContracts;