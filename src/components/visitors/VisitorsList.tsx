/* eslint-disable react-hooks/exhaustive-deps */

import React, { memo, useMemo } from 'react';
import { Users, UserPlus, Mail, Phone, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EntityList from '@/components/common/EntityList';
import { useStatusClasses, useCategoryClasses } from '@/utils/statusUtils';

const VisitorsList = memo(() => {
  const visitors = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@empresa.com',
      phone: '+55 11 99999-1111',
      company: 'Tech Solutions Ltda',
      position: 'CTO',
      registrationDate: '2024-01-15',
      status: 'Confirmado',
      category: 'VIP',
      checkIn: true,
      qrCode: 'QR001'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@startup.io',
      phone: '+55 11 88888-2222',
      company: 'StartupTech',
      position: 'CEO',
      registrationDate: '2024-01-16',
      status: 'Pendente',
      category: 'Geral',
      checkIn: false,
      qrCode: 'QR002'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro.costa@inovacao.com',
      phone: '+55 11 77777-3333',
      company: 'Inovação Digital',
      position: 'Desenvolvedor',
      registrationDate: '2024-01-17',
      status: 'Confirmado',
      category: 'Estudante',
      checkIn: true,
      qrCode: 'QR003'
    }
  ];

  const stats = useMemo(() => [
    {
      title: 'Total Inscritos',
      value: '1,245',
      icon: <Users size={20} className="text-primary" />
    },
    {
      title: 'Check-ins',
      value: '892',
      icon: <QrCode size={20} className="text-green-600" />,
      color: 'bg-gradient-to-br from-green-100 to-green-50'
    },
    {
      title: 'Confirmados',
      value: '1,156',
      icon: <Users size={20} className="text-blue-600" />,
      color: 'bg-gradient-to-br from-blue-100 to-blue-50'
    },
    {
      title: 'Pendentes',
      value: '89',
      icon: <Users size={20} className="text-orange-600" />,
      color: 'bg-gradient-to-br from-orange-100 to-orange-50'
    }
  ], []);

  const handleAddNew = () => {
    console.log('Adicionar novo visitante');
  };

  const renderVisitors = useMemo(() => (
    <div className="tech-card p-6">
      <div className="space-y-4">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">{visitor.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{visitor.name}</h3>
                  <p className="text-sm text-muted-foreground">{visitor.position} • {visitor.company}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail size={12} />
                      <span>{visitor.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone size={12} />
                      <span>{visitor.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`tech-badge ${
                  visitor.status === 'Confirmado' 
                    ? 'text-green-600 bg-green-50 border-green-200' 
                    : 'text-orange-600 bg-orange-50 border-orange-200'
                }`}>
                  {visitor.status}
                </span>
                {visitor.checkIn && (
                  <span className="tech-badge text-blue-600 bg-blue-50 border-blue-200">
                    Check-in ✓
                  </span>
                )}
                <Button variant="outline" size="sm">
                  <QrCode size={14} className="mr-1" />
                  QR
                </Button>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Inscrito em: {new Date(visitor.registrationDate).toLocaleDateString('pt-BR')}</span>
                <span>QR Code: {visitor.qrCode}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ), [visitors]);

  return (
    <EntityList
      title="Visitantes"
      subtitle="Gerencie participantes do evento"
      searchPlaceholder="Buscar por nome, email ou empresa..."
      stats={stats}
      onAddNew={handleAddNew}
      addButtonText="Adicionar Visitante"
    >
      {renderVisitors}
    </EntityList>
  );
});

VisitorsList.displayName = 'VisitorsList';

export default VisitorsList;
