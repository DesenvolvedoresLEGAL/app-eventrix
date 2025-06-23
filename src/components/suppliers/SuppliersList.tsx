
import React, { memo, useMemo } from 'react';
import { Truck, Plus, Phone, Mail, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EntityList from '@/components/common/EntityList';

const SuppliersList = memo(() => {
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

  const stats = useMemo(() => [
    {
      title: 'Total',
      value: '24',
      icon: <Truck size={20} className="text-primary" />
    },
    {
      title: 'Ativos',
      value: '22',
      icon: <Truck size={20} className="text-green-600" />,
      color: 'bg-gradient-to-br from-green-100 to-green-50'
    },
    {
      title: 'Categorias',
      value: '8',
      icon: <Truck size={20} className="text-blue-600" />,
      color: 'bg-gradient-to-br from-blue-100 to-blue-50'
    },
    {
      title: 'Avaliação Média',
      value: '4.8',
      icon: <Star size={20} className="text-yellow-600" />,
      color: 'bg-gradient-to-br from-yellow-100 to-yellow-50'
    }
  ], []);

  const handleAddNew = () => {
    console.log('Adicionar novo fornecedor');
  };

  const renderSuppliers = useMemo(() => (
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
  ), [suppliers]);

  return (
    <EntityList
      title="Fornecedores"
      subtitle="Gerencie parceiros e prestadores de serviço"
      searchPlaceholder="Buscar por nome, categoria ou serviço..."
      stats={stats}
      onAddNew={handleAddNew}
      addButtonText="Novo Fornecedor"
    >
      {renderSuppliers}
    </EntityList>
  );
});

SuppliersList.displayName = 'SuppliersList';

export default SuppliersList;
