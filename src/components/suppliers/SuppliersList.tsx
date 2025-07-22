
import React from 'react';
import { Truck, Plus, Phone, Mail, Filter, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SuppliersList = () => {
  const suppliers = [
    {
      id: 1,
      name: 'Tech Audio Solutions',
      category: 'Equipamentos de Som',
      contact: 'Carlos Santos',
      email: 'carlos@techaudio.com',
      phone: '+55 11 99999-1111',
      rating: 4.8,
      services: ['Som', 'Microfones', 'Caixas de Som'],
      status: 'Ativo',
      lastEvent: '2024-01-10'
    },
    {
      id: 2,
      name: 'Visual Pro',
      category: 'Equipamentos Visuais',
      contact: 'Ana Silva',
      email: 'ana@visualpro.com',
      phone: '+55 11 88888-2222',
      rating: 4.9,
      services: ['Projetores', 'Telões', 'Iluminação'],
      status: 'Ativo',
      lastEvent: '2024-01-15'
    },
    {
      id: 3,
      name: 'Catering Excellence',
      category: 'Alimentação',
      contact: 'Roberto Lima',
      email: 'roberto@catering.com',
      phone: '+55 11 77777-3333',
      rating: 4.7,
      services: ['Coffee Break', 'Almoço', 'Jantar'],
      status: 'Ativo',
      lastEvent: '2024-01-12'
    }
  ];

  return (
    <div className="space-y-6 tech-grid min-h-full p-6">
      {/* Header */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Fornecedores</h1>
            <p className="text-muted-foreground">Gerencie parceiros e prestadores de serviço</p>
          </div>
          <Button className="tech-button">
            <Plus size={16} className="mr-2" />
            Novo Fornecedor
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por nome, categoria ou serviço..." className="pl-10 tech-input" />
            </div>
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter size={16} className="mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
              <Truck size={20} className="text-primary" />
            </div>
          </div>
        </div>
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ativos</p>
              <h3 className="text-2xl font-bold mt-1">22</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
              <Truck size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Categorias</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <Truck size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
              <h3 className="text-2xl font-bold mt-1">4.8</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center">
              <Star size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Suppliers List */}
      <div className="tech-card p-6">
        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                    <Truck size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{supplier.name}</h3>
                    <p className="text-sm text-muted-foreground">{supplier.category} • {supplier.contact}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail size={12} />
                        <span>{supplier.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone size={12} />
                        <span>{supplier.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-yellow-600">
                        <Star size={12} fill="currentColor" />
                        <span>{supplier.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tech-badge text-green-600 bg-green-50 border-green-200">
                    {supplier.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Serviços:</p>
                    <div className="flex flex-wrap gap-1">
                      {supplier.services.map((service) => (
                        <span key={service} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Último evento:</p>
                    <p className="text-xs font-medium">{new Date(supplier.lastEvent).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuppliersList;
