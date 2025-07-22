
import React, { useState } from 'react';
import { Search, Star, Download, ExternalLink, Filter, Grid, List, Zap, Shield, Puzzle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layout/Dashboard';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'Todas', count: 127 },
    { id: 'payment', name: 'Pagamentos', count: 23 },
    { id: 'crm', name: 'CRM', count: 18 },
    { id: 'marketing', name: 'Marketing', count: 31 },
    { id: 'analytics', name: 'Analytics', count: 19 },
    { id: 'communication', name: 'Comunicação', count: 25 },
    { id: 'automation', name: 'Automação', count: 11 }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Stripe Payments',
      description: 'Processar pagamentos de ingressos e produtos com segurança',
      category: 'payment',
      rating: 4.8,
      downloads: 15420,
      price: 'Gratuito',
      verified: true,
      icon: '💳',
      features: ['Pagamentos online', 'Múltiplas moedas', 'Relatórios avançados', 'API REST']
    },
    {
      id: 2,
      name: 'Salesforce CRM',
      description: 'Sincronize leads e dados de participantes automaticamente',
      category: 'crm',
      rating: 4.6,
      downloads: 8934,
      price: '$29/mês',
      verified: true,
      icon: '🏢',
      features: ['Sync automático', 'Lead scoring', 'Pipeline management', 'Relatórios']
    },
    {
      id: 3,
      name: 'WhatsApp Business',
      description: 'Envie notificações e confirmações via WhatsApp',
      category: 'communication',
      rating: 4.9,
      downloads: 12847,
      price: 'Gratuito',
      verified: true,
      icon: '📱',
      features: ['Mensagens automáticas', 'Templates', 'Webhooks', 'API oficial']
    },
    {
      id: 4,
      name: 'Google Analytics 4',
      description: 'Análise avançada de comportamento dos visitantes',
      category: 'analytics',
      rating: 4.7,
      downloads: 23156,
      price: 'Gratuito',
      verified: true,
      icon: '📊',
      features: ['Eventos customizados', 'Conversões', 'Audiências', 'Relatórios']
    },
    {
      id: 5,
      name: 'Mailchimp Marketing',
      description: 'Campanhas de email marketing automatizadas',
      category: 'marketing',
      rating: 4.5,
      downloads: 9823,
      price: '$19/mês',
      verified: true,
      icon: '📧',
      features: ['Email campaigns', 'Automação', 'Segmentação', 'A/B Testing']
    },
    {
      id: 6,
      name: 'Zapier Automation',
      description: 'Conecte o Eventrix com mais de 5000 aplicativos',
      category: 'automation',
      rating: 4.4,
      downloads: 6742,
      price: '$20/mês',
      verified: true,
      icon: '⚡',
      features: ['5000+ apps', 'Workflows', 'Triggers', 'Webhooks']
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout title="Marketplace de Integrações">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketplace de Integrações</h1>
            <p className="text-muted-foreground">Conecte o Eventrix com suas ferramentas favoritas</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Desenvolver Integração
            </Button>
            <Button>
              <Puzzle className="h-4 w-4 mr-2" />
              Solicitar Integração
            </Button>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Buscar integrações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categorias em destaque */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.slice(1).map(category => (
            <Card 
              key={category.id} 
              className={`cursor-pointer transition-colors ${
                selectedCategory === category.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">
                  {category.id === 'payment' && '💳'}
                  {category.id === 'crm' && '🏢'}
                  {category.id === 'marketing' && '📧'}
                  {category.id === 'analytics' && '📊'}
                  {category.id === 'communication' && '📱'}
                  {category.id === 'automation' && '⚡'}
                </div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count} apps</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lista de Integrações */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {integration.name}
                        {integration.verified && (
                          <Shield className="h-4 w-4 text-green-600" />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{integration.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {integration.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={integration.price === 'Gratuito' ? 'secondary' : 'default'}>
                    {integration.price}
                  </Badge>
                </div>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Recursos principais:</h4>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Instalar
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Puzzle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma integração encontrada</h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
              <Button variant="outline">Solicitar Nova Integração</Button>
            </CardContent>
          </Card>
        )}

        {/* Seção de desenvolvimento */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Desenvolva sua própria integração</h3>
                <p className="text-blue-700 mb-4">
                  Use nossa API REST e webhooks para criar integrações personalizadas
                </p>
                <div className="flex gap-2">
                  <Button>Ver Documentação</Button>
                  <Button variant="outline">Exemplos de Código</Button>
                </div>
              </div>
              <div className="text-6xl opacity-20">🔧</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
