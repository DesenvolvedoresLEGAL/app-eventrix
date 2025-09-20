import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen, Play, Users } from 'lucide-react';

const CoursesPrograms = () => {
  return (
    <DashboardLayout title="Cursos e Programas">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Cursos e Programas</h2>
            <p className="text-muted-foreground">
              Gerencie o catálogo completo de cursos e programas educacionais
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Curso
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">8 em produção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aulas Disponíveis</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.247</div>
              <p className="text-xs text-muted-foreground">89h de conteúdo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Instrutores</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 novos este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa Aprovação</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Média geral</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Inteligência Artificial</CardTitle>
                <Badge variant="secondary">40h</Badge>
              </div>
              <CardDescription>Curso completo de IA aplicada aos negócios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso médio</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>347 estudantes</span>
                <span>4.9/5.0 ⭐</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">Editar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Marketing Digital</CardTitle>
                <Badge variant="secondary">60h</Badge>
              </div>
              <CardDescription>Estratégias avançadas de marketing online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso médio</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>289 estudantes</span>
                <span>4.7/5.0 ⭐</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">Editar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Gestão de Projetos</CardTitle>
                <Badge variant="secondary">80h</Badge>
              </div>
              <CardDescription>Metodologias ágeis e tradicionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso médio</span>
                  <span>89%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>234 estudantes</span>
                <span>4.8/5.0 ⭐</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">Editar</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Programas de Especialização</CardTitle>
            <CardDescription>
              Trilhas de aprendizado estruturadas para desenvolvimento profissional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Interface de programas de especialização será implementada
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CoursesPrograms;