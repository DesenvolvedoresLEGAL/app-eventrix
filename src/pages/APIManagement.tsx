
import React from 'react';
import { Key, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layout/Dashboard';
import ApiStats from '@/components/api-management/ApiStats';
import ApiKeysSection from '@/components/api-management/ApiKeysSection';
import EndpointsSection from '@/components/api-management/EndpointsSection';
import WebhooksSection from '@/components/api-management/WebhooksSection';
import DocumentationSection from '@/components/api-management/DocumentationSection';
import LogsSection from '@/components/api-management/LogsSection';

const APIManagement = () => {
  const apiKey = 'ev_live_sk_1234567890abcdef...';

  const apiStats = {
    totalRequests: 45820,
    successRate: 99.2,
    avgResponseTime: 145,
    activeEndpoints: 24
  };

  const apiKeys = [
    {
      id: 1,
      name: 'Produção Principal',
      key: 'ev_live_sk_***',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      requests: 15420,
      status: 'active'
    },
    {
      id: 2,
      name: 'Desenvolvimento',
      key: 'ev_test_sk_***',
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      requests: 3847,
      status: 'active'
    },
    {
      id: 3,
      name: 'Mobile App',
      key: 'ev_live_pk_***',
      created: '2024-01-08',
      lastUsed: '2024-01-18',
      requests: 8923,
      status: 'inactive'
    }
  ];

  const endpoints = [
    {
      method: 'GET',
      path: '/api/v1/events',
      description: 'Listar todos os eventos',
      requests: 12847,
      avgResponse: '120ms',
      errorRate: '0.1%'
    },
    {
      method: 'POST',
      path: '/api/v1/events',
      description: 'Criar novo evento',
      requests: 234,
      avgResponse: '340ms',
      errorRate: '0.3%'
    },
    {
      method: 'GET',
      path: '/api/v1/visitors',
      description: 'Listar visitantes',
      requests: 8934,
      avgResponse: '95ms',
      errorRate: '0.2%'
    },
    {
      method: 'POST',
      path: '/api/v1/registrations',
      description: 'Registrar participante',
      requests: 5642,
      avgResponse: '180ms',
      errorRate: '0.5%'
    },
    {
      method: 'GET',
      path: '/api/v1/analytics',
      description: 'Dados de analytics',
      requests: 3421,
      avgResponse: '250ms',
      errorRate: '0.1%'
    }
  ];

  const webhooks = [
    {
      id: 1,
      url: 'https://myapp.com/webhook/events',
      events: ['event.created', 'event.updated'],
      status: 'active',
      lastDelivery: '2024-01-20 14:30',
      success: true
    },
    {
      id: 2,
      url: 'https://crm.company.com/webhook',
      events: ['visitor.registered', 'visitor.checked_in'],
      status: 'active',
      lastDelivery: '2024-01-20 14:25',
      success: true
    },
    {
      id: 3,
      url: 'https://backup.service.com/webhook',
      events: ['*'],
      status: 'inactive',
      lastDelivery: '2024-01-19 10:15',
      success: false
    }
  ];

  const codeExamples = {
    javascript: `// Listar eventos
fetch('https://api.eventrix.com/v1/events', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`,
    
    python: `import requests

# Listar eventos
response = requests.get(
    'https://api.eventrix.com/v1/events',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)
events = response.json()`,
    
    curl: `curl -X GET "https://api.eventrix.com/v1/events" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
  };

  return (
    <DashboardLayout title="Gerenciamento de APIs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gerenciamento de APIs</h1>
            <p className="text-muted-foreground">Gerencie chaves de API, monitore uso e configure webhooks</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              Documentação
            </Button>
            <Button>
              <Key className="h-4 w-4 mr-2" />
              Nova Chave
            </Button>
          </div>
        </div>

        {/* KPIs da API */}
        <ApiStats stats={apiStats} />

        {/* Tabs principais */}
        <Tabs defaultValue="keys" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="keys">Chaves API</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="docs">Documentação</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="keys" className="space-y-6">
            <ApiKeysSection apiKey={apiKey} apiKeys={apiKeys} />
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <EndpointsSection endpoints={endpoints} />
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <WebhooksSection webhooks={webhooks} />
          </TabsContent>

          <TabsContent value="docs" className="space-y-6">
            <DocumentationSection codeExamples={codeExamples} />
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <LogsSection />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default APIManagement;
