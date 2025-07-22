
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Globe, Eye, MousePointer, BarChart3, Search, ExternalLink } from 'lucide-react';

const MarketingPages = () => {
  const pages = [
    {
      id: 1,
      name: 'Tech Summit 2024 - Landing Page',
      url: 'techsummit2024.evento.com',
      status: 'Publicada',
      views: '15.4K',
      conversions: '892',
      conversionRate: '5.8%'
    },
    {
      id: 2,
      name: 'Página de Inscrição - Palestrantes',
      url: 'techsummit2024.evento.com/speakers',
      status: 'Publicada',
      views: '8.2K',
      conversions: '234',
      conversionRate: '2.9%'
    },
    {
      id: 3,
      name: 'Página de Patrocínio',
      url: 'techsummit2024.evento.com/patrocinio',
      status: 'Rascunho',
      views: '-',
      conversions: '-',
      conversionRate: '-'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publicada': return 'default';
      case 'Rascunho': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout title="Landing Pages">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Landing Pages</h2>
            <p className="text-muted-foreground">Crie e gerencie landing pages para seu evento</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Página
          </Button>
        </div>

        {/* Pages Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Páginas Ativas</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 em rascunho</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizações Totais</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28.6K</div>
              <p className="text-xs text-muted-foreground">+18% vs mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversões</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2K</div>
              <p className="text-xs text-muted-foreground">+8.5% vs mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2%</div>
              <p className="text-xs text-muted-foreground">+0.3% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Pages Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Landing Pages</CardTitle>
            <CardDescription>
              Visualize e gerencie todas as landing pages do evento
            </CardDescription>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar páginas..." className="pl-8" />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{page.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(page.status) as any} className="text-xs">
                          {page.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          {page.url}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {page.views !== '-' && (
                      <>
                        <div className="text-sm text-center">
                          <div className="font-medium">{page.views}</div>
                          <div className="text-muted-foreground">Visualizações</div>
                        </div>
                        <div className="text-sm text-center">
                          <div className="font-medium">{page.conversions}</div>
                          <div className="text-muted-foreground">Conversões</div>
                        </div>
                        <div className="text-sm text-center">
                          <div className="font-medium">{page.conversionRate}</div>
                          <div className="text-muted-foreground">Taxa Conv.</div>
                        </div>
                      </>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      {page.status === 'Publicada' && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketingPages;
