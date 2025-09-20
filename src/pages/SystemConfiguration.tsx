import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Database, Shield, Users } from 'lucide-react';

const SystemConfiguration = () => {
  return (
    <DashboardLayout title="Configurações do Sistema">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h2>
            <p className="text-muted-foreground">
              Configure parâmetros gerais e preferências da plataforma
            </p>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Módulos Ativos</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">De 52 disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Backup Automático</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ativo</div>
              <p className="text-xs text-muted-foreground">Último: há 2h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Segurança</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Alta</div>
              <p className="text-xs text-muted-foreground">SSL/TLS ativo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Online</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.247</div>
              <p className="text-xs text-muted-foreground">Pico: 1.892</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Parâmetros básicos do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Modo de Manutenção</h4>
                  <p className="text-sm text-muted-foreground">Bloqueia acesso de usuários</p>
                </div>
                <Badge variant="outline">Inativo</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Registro de Novos Usuários</h4>
                  <p className="text-sm text-muted-foreground">Permite cadastros públicos</p>
                </div>
                <Badge variant="secondary">Ativo</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Notificações por Email</h4>
                  <p className="text-sm text-muted-foreground">Sistema de comunicação</p>
                </div>
                <Badge variant="secondary">Ativo</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Cache de Sistema</h4>
                  <p className="text-sm text-muted-foreground">Otimização de performance</p>
                </div>
                <Badge variant="secondary">Ativo</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Módulos da Plataforma</CardTitle>
              <CardDescription>Ative ou desative funcionalidades</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Gamificação</h4>
                  <p className="text-sm text-muted-foreground">Sistema de pontos e recompensas</p>
                </div>
                <Badge className="bg-green-500">Ativo</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium">LinkAI</h4>
                  <p className="text-sm text-muted-foreground">Networking inteligente</p>
                </div>
                <Badge className="bg-blue-500">Ativo</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Experiência Híbrida</h4>
                  <p className="text-sm text-muted-foreground">Eventos virtuais e presenciais</p>
                </div>
                <Badge className="bg-purple-500">Ativo</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Marketplace 365</h4>
                  <p className="text-sm text-muted-foreground">Vendas permanentes</p>
                </div>
                <Badge variant="outline">Inativo</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Backup e Segurança</CardTitle>
              <CardDescription>Configurações de proteção de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Backup Automático</h4>
                <p className="text-sm text-green-700">Executado a cada 6 horas</p>
                <div className="text-xs text-green-600 mt-1">Último backup: há 2h • Status: OK</div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Criptografia SSL/TLS</h4>
                <p className="text-sm text-blue-700">Certificado válido até 12/2025</p>
                <div className="text-xs text-blue-600 mt-1">Grade A+ no teste SSL Labs</div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Autenticação 2FA</h4>
                <p className="text-sm text-purple-700">Disponível para administradores</p>
                <div className="text-xs text-purple-600 mt-1">6 de 8 admins ativaram</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance e Monitoramento</CardTitle>
              <CardDescription>Métricas do sistema em tempo real</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Uso de CPU</span>
                  <span className="text-sm font-bold">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Uso de Memória</span>
                  <span className="text-sm font-bold">62%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '62%'}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Armazenamento</span>
                  <span className="text-sm font-bold">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Uptime</span>
                  <span className="text-sm font-bold">99.8%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '99.8%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemConfiguration;