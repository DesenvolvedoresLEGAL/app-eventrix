
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, FileText, Image, Video, Calendar, Search } from 'lucide-react';

const MarketingContent = () => {
  const content = [
    {
      id: 1,
      title: 'Post Instagram - Speakers Confirmados',
      type: 'Imagem',
      status: 'Publicado',
      date: '2024-01-15',
      engagement: '2.4K'
    },
    {
      id: 2,
      title: 'Vídeo Teaser - Tech Summit 2024',
      type: 'Vídeo',
      status: 'Agendado',
      date: '2024-01-20',
      engagement: '-'
    },
    {
      id: 3,
      title: 'Blog Post - Tendências em IA',
      type: 'Artigo',
      status: 'Rascunho',
      date: '2024-01-18',
      engagement: '-'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Imagem': return <Image className="w-4 h-4" />;
      case 'Vídeo': return <Video className="w-4 h-4" />;
      case 'Artigo': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publicado': return 'default';
      case 'Agendado': return 'secondary';
      case 'Rascunho': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout title="Conteúdo">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Gestão de Conteúdo</h2>
            <p className="text-muted-foreground">Crie e gerencie conteúdo para suas redes sociais e blog</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Conteúdo
          </Button>
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Publicados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendados</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Para revisar</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engajamento Médio</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2K</div>
              <p className="text-xs text-muted-foreground">+15% vs mês anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Management */}
        <Card>
          <CardHeader>
            <CardTitle>Biblioteca de Conteúdo</CardTitle>
            <CardDescription>
              Gerencie todo o conteúdo criado para o evento
            </CardDescription>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar conteúdo..." className="pl-8" />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {content.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <Badge variant={getStatusColor(item.status) as any} className="text-xs">
                          {item.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.engagement !== '-' && (
                      <div className="text-sm">
                        <div className="font-medium">{item.engagement}</div>
                        <div className="text-muted-foreground">engajamento</div>
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
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

export default MarketingContent;
