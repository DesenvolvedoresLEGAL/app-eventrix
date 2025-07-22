
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Pause, BarChart3, Target, DollarSign } from 'lucide-react';

const MarketingAds = () => {
  const campaigns = [
    {
      id: 1,
      name: 'Tech Summit 2024 - Early Bird',
      status: 'Ativa',
      budget: 'R$ 5.000',
      spent: 'R$ 2.450',
      impressions: '45.2K',
      clicks: '1.8K',
      conversions: '156'
    },
    {
      id: 2,
      name: 'Retargeting - Visitantes do Site',
      status: 'Pausada',
      budget: 'R$ 3.000',
      spent: 'R$ 890',
      impressions: '12.5K',
      clicks: '450',
      conversions: '23'
    }
  ];

  return (
    <DashboardLayout title="Ads & Campanhas">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Campanhas Publicitárias</h2>
            <p className="text-muted-foreground">Gerencie suas campanhas de marketing digital</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orçamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 8.000</div>
              <p className="text-xs text-muted-foreground">+12% vs mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impressões</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">57.7K</div>
              <p className="text-xs text-muted-foreground">+8.2% vs semana anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cliques</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.25K</div>
              <p className="text-xs text-muted-foreground">CTR: 3.9%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversões</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">179</div>
              <p className="text-xs text-muted-foreground">Taxa: 7.96%</p>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <Card>
          <CardHeader>
            <CardTitle>Campanhas Ativas</CardTitle>
            <CardDescription>
              Acompanhe o desempenho das suas campanhas publicitárias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{campaign.name}</h3>
                      <Badge variant={campaign.status === 'Ativa' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm text-muted-foreground">
                      <div>
                        <div className="font-medium">Orçamento</div>
                        <div>{campaign.budget}</div>
                      </div>
                      <div>
                        <div className="font-medium">Gasto</div>
                        <div>{campaign.spent}</div>
                      </div>
                      <div>
                        <div className="font-medium">Impressões</div>
                        <div>{campaign.impressions}</div>
                      </div>
                      <div>
                        <div className="font-medium">Cliques</div>
                        <div>{campaign.clicks}</div>
                      </div>
                      <div>
                        <div className="font-medium">Conversões</div>
                        <div>{campaign.conversions}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {campaign.status === 'Ativa' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4" />
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

export default MarketingAds;
