
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { Users, Search, Filter, Check, X, Building, ArrowUpDown, MapPin } from 'lucide-react';

const Exhibitors = () => {
  // Sample exhibitors data
  const exhibitors = [
    { 
      id: 1, 
      name: 'TechCorp Solutions', 
      category: 'Software & Tecnologia',
      stand: 'A42',
      status: 'approved',
      contactName: 'João Silva',
      contactEmail: 'joao@techcorp.com',
      phone: '+55 11 99999-8888',
    },
    { 
      id: 2, 
      name: 'CloudSys Pro', 
      category: 'Cloud & Infraestrutura',
      stand: 'B18',
      status: 'pending',
      contactName: 'Maria Oliveira',
      contactEmail: 'maria@cloudsys.com',
      phone: '+55 11 98888-7777',
    },
    { 
      id: 3, 
      name: 'DataViz Analytics', 
      category: 'Business Intelligence',
      stand: 'C23',
      status: 'approved',
      contactName: 'Pedro Santos',
      contactEmail: 'pedro@dataviz.com',
      phone: '+55 11 97777-6666',
    },
    { 
      id: 4, 
      name: 'SecureNet Defenses', 
      category: 'Segurança',
      stand: 'A15',
      status: 'rejected',
      contactName: 'Ana Ferreira',
      contactEmail: 'ana@securenet.com',
      phone: '+55 11 96666-5555',
    },
    { 
      id: 5, 
      name: 'EduTech Platforms', 
      category: 'Educação & Treinamento',
      stand: 'B32',
      status: 'approved',
      contactName: 'Lucas Moreira',
      contactEmail: 'lucas@edutech.com',
      phone: '+55 11 95555-4444',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          <Check size={12} /> Aprovado
        </div>;
      case 'pending':
        return <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" /> Pendente
        </div>;
      case 'rejected':
        return <div className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
          <X size={12} /> Rejeitado
        </div>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout title="Expositores">
      <div className="space-y-6">
        <div className="flex justify-between">
          <div>
            <h2>Gestão de Expositores</h2>
            <p className="text-muted-foreground">Gerencie os expositores do seu evento</p>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
            + Novo Expositor
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar expositor..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 border rounded-md bg-muted/30">
              <Filter size={16} />
              <span>Filtros</span>
            </button>
            
            <button className="flex items-center gap-1 px-3 py-2 border rounded-md">
              <ArrowUpDown size={16} />
              <span>Ordenar</span>
            </button>
          </div>
        </div>
        
        {/* Exhibitors Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted border-b">
                  <th className="px-4 py-3 text-left font-medium">Expositor</th>
                  <th className="px-4 py-3 text-left font-medium">Categoria</th>
                  <th className="px-4 py-3 text-left font-medium">Stand</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Contato</th>
                  <th className="px-4 py-3 text-center font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {exhibitors.map((exhibitor) => (
                  <tr key={exhibitor.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="bg-primary/10 w-8 h-8 rounded flex items-center justify-center mr-3">
                          <Building size={16} className="text-primary" />
                        </div>
                        <span className="font-medium">{exhibitor.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{exhibitor.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-muted-foreground" />
                        {exhibitor.stand}
                      </div>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(exhibitor.status)}</td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{exhibitor.contactName}</div>
                        <div className="text-xs text-muted-foreground">{exhibitor.contactEmail}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center space-x-2">
                        <button className="p-1.5 rounded-md hover:bg-muted">
                          <Check size={16} className="text-green-500" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-muted">
                          <X size={16} className="text-destructive" />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground">
                          •••
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Tools for Exhibitors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-5 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <div className="bg-primary/10 p-1 rounded">
                <div className="text-sm font-bold text-primary">AI</div>
              </div>
              LegalGPT™ para Expositores
            </h3>
            <p className="text-sm mb-4">
              Gere documentos personalizados e tire dúvidas sobre o manual do expositor de forma automática.
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition-colors">
              Acessar LegalGPT™
            </button>
          </div>
          
          <div className="border p-5 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <div className="bg-secondary/10 p-1 rounded">
                <div className="text-sm font-bold text-secondary">AI</div>
              </div>
              LinkAI™ Matchmaking
            </h3>
            <p className="text-sm mb-4">
              Conecte seus expositores com visitantes de alta relevância utilizando nossa tecnologia de matchmaking.
            </p>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm hover:bg-secondary/80 transition-colors">
              Configurar Matchmaking
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Exhibitors;
