import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Award, Download, Calendar } from 'lucide-react';

const CertificationsLearning = () => {
  return (
    <DashboardLayout title="Certificações e Aprendizado">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Certificações e Aprendizado</h2>
            <p className="text-muted-foreground">
              Gerencie certificações digitais e trilhas de aprendizado
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Certificação
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificados Emitidos</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">+134 este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificações Ativas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">7 trilhas disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-muted-foreground">Dos iniciados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Validações Pendentes</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Certificações Disponíveis</CardTitle>
              <CardDescription>Programas de certificação ativos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Especialista em IA</h4>
                  <p className="text-sm text-muted-foreground">40h de curso • 3 projetos práticos</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Premium</Badge>
                  <span className="text-sm font-bold">247 certificados</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Marketing Digital Avançado</h4>
                  <p className="text-sm text-muted-foreground">60h de curso • Portfolio final</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Profissional</Badge>
                  <span className="text-sm font-bold">189 certificados</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Gestão Ágil de Projetos</h4>
                  <p className="text-sm text-muted-foreground">80h de curso • Certificação PMI</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Certificado</Badge>
                  <span className="text-sm font-bold">156 certificados</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Sustentabilidade Empresarial</h4>
                  <p className="text-sm text-muted-foreground">30h de curso • Certificação Verde</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Verde</Badge>
                  <span className="text-sm font-bold">89 certificados</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificados Recentes</CardTitle>
              <CardDescription>Últimas certificações emitidas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Maria Silva</h4>
                  <p className="text-sm text-muted-foreground">Especialista em IA • Emitido hoje</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">João Santos</h4>
                  <p className="text-sm text-muted-foreground">Marketing Digital • Emitido ontem</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Ana Costa</h4>
                  <p className="text-sm text-muted-foreground">Gestão Ágil • Emitido há 2 dias</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Carlos Lima</h4>
                  <p className="text-sm text-muted-foreground">Sustentabilidade • Emitido há 3 dias</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Trilhas de Aprendizado</CardTitle>
            <CardDescription>
              Jornadas educacionais estruturadas por área de conhecimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Sistema de trilhas de aprendizado será implementado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CertificationsLearning;