
import React from 'react';
import { Users, UserPlus, Mail, Phone, Filter, Search, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const VisitorsList = () => {
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
      checkIn: true,
      qrCode: 'QR003'
    }
  ];

  return (
    <div className="space-y-6 tech-grid min-h-full p-6">
      {/* Header */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Visitantes</h1>
            <p className="text-muted-foreground">Gerencie participantes do evento</p>
          </div>
          <Button className="tech-button">
            <UserPlus size={16} className="mr-2" />
            Adicionar Visitante
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por nome, email ou empresa..." className="pl-10 tech-input" />
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
              <p className="text-sm text-muted-foreground">Total Inscritos</p>
              <h3 className="text-2xl font-bold mt-1">1,245</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
              <Users size={20} className="text-primary" />
            </div>
          </div>
        </div>
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Check-ins</p>
              <h3 className="text-2xl font-bold mt-1">892</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
              <QrCode size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Confirmados</p>
              <h3 className="text-2xl font-bold mt-1">1,156</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <h3 className="text-2xl font-bold mt-1">89</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
              <Users size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Visitors List */}
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
    </div>
  );
};

export default VisitorsList;
