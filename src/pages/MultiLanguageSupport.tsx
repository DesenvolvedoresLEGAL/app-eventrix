import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages, Globe, Plus, Settings } from 'lucide-react';

const MultiLanguageSupport = () => {
  return (
    <DashboardLayout title="Suporte Multi-idioma">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Suporte Multi-idioma</h2>
            <p className="text-muted-foreground">
              Gerencie traduções e suporte para múltiplos idiomas
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Idioma
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Idiomas Ativos</CardTitle>
              <Languages className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">3 em implementação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Strings Traduzidas</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.847</div>
              <p className="text-xs text-muted-foreground">89% cobertura</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tradução Automática</CardTitle>
              <Languages className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Precisão média</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Globais</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35%</div>
              <p className="text-xs text-muted-foreground">Não nativos em PT</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Idiomas Disponíveis</CardTitle>
              <CardDescription>Status de implementação por idioma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇧🇷</span>
                  <div>
                    <h4 className="font-medium">Português (Brasil)</h4>
                    <p className="text-sm text-muted-foreground">Idioma principal</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-500">100%</Badge>
                  <Badge variant="secondary">Nativo</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <h4 className="font-medium">English (US)</h4>
                    <p className="text-sm text-muted-foreground">Segundo idioma</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500">98%</Badge>
                  <Badge variant="secondary">Completo</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇪🇸</span>
                  <div>
                    <h4 className="font-medium">Español</h4>
                    <p className="text-sm text-muted-foreground">Em revisão</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-500">87%</Badge>
                  <Badge variant="outline">Revisão</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🇫🇷</span>
                  <div>
                    <h4 className="font-medium">Français</h4>
                    <p className="text-sm text-muted-foreground">Tradução automática</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-500">76%</Badge>
                  <Badge variant="outline">Auto</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uso por Idioma</CardTitle>
              <CardDescription>Preferências dos usuários internacionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Português (Brasil)</span>
                  <span className="text-sm font-bold">65%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">English (US)</span>
                  <span className="text-sm font-bold">23%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Español</span>
                  <span className="text-sm font-bold">8%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '8%'}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Français</span>
                  <span className="text-sm font-bold">3%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '3%'}}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Outros</span>
                  <span className="text-sm font-bold">1%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{width: '1%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ferramentas de Tradução</CardTitle>
            <CardDescription>
              Gerencie traduções manuais e automáticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Interface de gerenciamento de traduções será implementada
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MultiLanguageSupport;