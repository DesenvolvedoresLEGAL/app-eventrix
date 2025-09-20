import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Users, Languages, MapPin } from 'lucide-react';

const InternationalOverview = () => {
  return (
    <DashboardLayout title="Internacionalização - Visão Geral">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Internacionalização - Visão Geral</h2>
          <p className="text-muted-foreground">
            Dashboard centralizado para gestão de eventos globais e participantes internacionais
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Países Representados</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Em 5 continentes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participantes Internacionais</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.847</div>
              <p className="text-xs text-muted-foreground">35% do total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Idiomas Suportados</CardTitle>
              <Languages className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Tradução simultânea</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fusos Horários</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Cobertura global</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição Geográfica</CardTitle>
              <CardDescription>Participantes por região</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">América do Sul</span>
                  <span className="text-sm text-muted-foreground">1.247 participantes</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '44%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">América do Norte</span>
                  <span className="text-sm text-muted-foreground">892 participantes</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '31%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Europa</span>
                  <span className="text-sm text-muted-foreground">456 participantes</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '16%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Ásia</span>
                  <span className="text-sm text-muted-foreground">189 participantes</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '7%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Outros</span>
                  <span className="text-sm text-muted-foreground">63 participantes</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{width: '2%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Principais Países</CardTitle>
              <CardDescription>Top 10 países com mais participantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🇧🇷</span>
                  <span className="font-medium">Brasil</span>
                </div>
                <span className="font-bold">1.847</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-medium">Estados Unidos</span>
                </div>
                <span className="font-bold">534</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🇦🇷</span>
                  <span className="font-medium">Argentina</span>
                </div>
                <span className="font-bold">287</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🇨🇦</span>
                  <span className="font-medium">Canadá</span>
                </div>
                <span className="font-bold">189</span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🇪🇸</span>
                  <span className="font-medium">Espanha</span>
                </div>
                <span className="font-bold">156</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recursos de Internacionalização</CardTitle>
            <CardDescription>
              Ferramentas ativas para suporte internacional
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Languages className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-medium">Tradução Simultânea</h4>
              <p className="text-sm text-muted-foreground">12 idiomas suportados</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h4 className="font-medium">Fusos Horários</h4>
              <p className="text-sm text-muted-foreground">Eventos adaptados por região</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h4 className="font-medium">Moedas Locais</h4>
              <p className="text-sm text-muted-foreground">15 moedas aceitas</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InternationalOverview;