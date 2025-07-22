
import React from 'react';
import { Users, UserPlus, Shield, Mail, Phone, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const StaffList = () => {
  const staffMembers = [
    {
      id: 1,
      name: 'Ana Silva',
      role: 'Coordenadora Geral',
      department: 'Gestão',
      email: 'ana.silva@eventrix.com',
      phone: '+55 11 98765-4321',
      status: 'Ativo',
      permissions: ['admin', 'eventos', 'usuarios']
    },
    {
      id: 2,
      name: 'Carlos Santos',
      role: 'Gerente de Tecnologia',
      department: 'TI',
      email: 'carlos.santos@eventrix.com',
      phone: '+55 11 91234-5678',
      status: 'Ativo',
      permissions: ['tecnologia', 'integrações']
    },
    {
      id: 3,
      name: 'Maria Oliveira',
      role: 'Especialista em Marketing',
      department: 'Marketing',
      email: 'maria.oliveira@eventrix.com',
      phone: '+55 11 95555-7777',
      status: 'Ativo',
      permissions: ['marketing', 'conteudo']
    }
  ];

  return (
    <div className="space-y-6 tech-grid min-h-full p-6">
      {/* Header */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Equipe</h1>
            <p className="text-muted-foreground">Gerencie sua equipe e permissões</p>
          </div>
          <Button className="tech-button">
            <UserPlus size={16} className="mr-2" />
            Adicionar Membro
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por nome, email ou função..." className="pl-10 tech-input" />
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
              <p className="text-sm text-muted-foreground">Total de Staff</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
              <Users size={20} className="text-primary" />
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
              <Shield size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Departamentos</p>
              <h3 className="text-2xl font-bold mt-1">8</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Novos (30d)</p>
              <h3 className="text-2xl font-bold mt-1">3</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
              <UserPlus size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="tech-card p-6">
        <div className="space-y-4">
          {staffMembers.map((member) => (
            <div key={member.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail size={12} />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone size={12} />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tech-badge text-green-600 bg-green-50 border-green-200">
                    {member.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground mb-2">Permissões:</p>
                <div className="flex flex-wrap gap-1">
                  {member.permissions.map((permission) => (
                    <span key={permission} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffList;
