import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const AcademicOverview = () => {
  return (
    <DashboardLayout title="Acadêmico - Visão Geral">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Acadêmico - Visão Geral</h2>
          <p className="text-muted-foreground">
            Central acadêmica para gestão de programas educacionais e certificações
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estudantes Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.247</div>
              <p className="text-xs text-muted-foreground">+156 novas matrículas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Disponíveis</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">12 novos este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificados Emitidos</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">234 pendentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-muted-foreground">+5.2% vs período anterior</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Programas Mais Populares</CardTitle>
              <CardDescription>Cursos com maior número de inscrições</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Inteligência Artificial Aplicada</h4>
                  <p className="text-sm text-muted-foreground">40h • Certificação Digital</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">347 inscritos</div>
                  <div className="text-xs text-muted-foreground">98% satisfação</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Marketing Digital Avançado</h4>
                  <p className="text-sm text-muted-foreground">60h • Certificação Premium</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">289 inscritos</div>
                  <div className="text-xs text-muted-foreground">95% satisfação</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Gestão de Projetos Ágil</h4>
                  <p className="text-sm text-muted-foreground">80h • Certificação Profissional</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">234 inscritos</div>
                  <div className="text-xs text-muted-foreground">92% satisfação</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Sustentabilidade Empresarial</h4>
                  <p className="text-sm text-muted-foreground">30h • Certificação Verde</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">189 inscritos</div>
                  <div className="text-xs text-muted-foreground">89% satisfação</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Aprendizado</CardTitle>
              <CardDescription>Indicadores de performance acadêmica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Engajamento Médio</span>
                  <span className="text-sm font-bold">87%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Tempo Médio por Aula</span>
                  <span className="text-sm font-bold">42 min</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Taxa de Aprovação</span>
                  <span className="text-sm font-bold">94%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">NPS Educacional</span>
                  <span className="text-sm font-bold">8.9/10</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Próximos Marcos Acadêmicos</CardTitle>
            <CardDescription>
              Eventos e atividades acadêmicas programadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">Período de matrículas para novos cursos</span>
              <span className="text-xs text-blue-600">Em 5 dias</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm">Cerimônia de certificação digital</span>
              <span className="text-xs text-green-600">Em 12 dias</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm">Workshop: Metodologias Ativas de Ensino</span>
              <span className="text-xs text-purple-600">Em 18 dias</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm">Avaliação de qualidade dos cursos</span>
              <span className="text-xs text-orange-600">Em 25 dias</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AcademicOverview;