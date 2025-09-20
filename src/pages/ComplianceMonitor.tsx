import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

const ComplianceMonitor = () => {
  return (
    <DashboardLayout title="Monitor de Compliance">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Monitor de Compliance</h2>
            <p className="text-muted-foreground">
              Monitoramento contínuo de conformidade legal e regulatória
            </p>
          </div>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Executar Auditoria
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score de Compliance</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Violações Detectadas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">1 crítica, 2 moderadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Políticas Ativas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">LGPD, ISO 27001, SOX</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Auditoria</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2 dias</div>
              <p className="text-xs text-muted-foreground">Próxima em 28 dias</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Status por Regulamentação</CardTitle>
              <CardDescription>Conformidade com diferentes marcos legais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">LGPD (Lei Geral de Proteção de Dados)</h4>
                  <p className="text-sm text-muted-foreground">Proteção de dados pessoais</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500">97%</Badge>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">ISO 27001</h4>
                  <p className="text-sm text-muted-foreground">Gestão de segurança da informação</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500">94%</Badge>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Marco Civil da Internet</h4>
                  <p className="text-sm text-muted-foreground">Direitos e deveres na internet</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-500">87%</Badge>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Código de Defesa do Consumidor</h4>
                  <p className="text-sm text-muted-foreground">Relações de consumo</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-red-500">73%</Badge>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alertas de Compliance</CardTitle>
              <CardDescription>Questões que requerem atenção imediata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-red-900">Política de Cookies Desatualizada</h4>
                    <p className="text-sm text-red-700">LGPD exige atualização da política</p>
                  </div>
                  <Badge className="bg-red-500">Crítico</Badge>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Corrigir Agora
                </Button>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-yellow-900">Backup de Dados Pendente</h4>
                    <p className="text-sm text-yellow-700">ISO 27001 - Último backup há 8 dias</p>
                  </div>
                  <Badge className="bg-yellow-500">Atenção</Badge>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Agendar Backup
                </Button>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">Treinamento de Equipe</h4>
                    <p className="text-sm text-blue-700">Capacitação LGPD vence em 15 dias</p>
                  </div>
                  <Badge className="bg-blue-500">Info</Badge>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Programar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Auditorias</CardTitle>
            <CardDescription>
              Registro das últimas verificações de compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Timeline de auditorias será implementada
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComplianceMonitor;