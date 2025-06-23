import React, { useMemo } from 'react';
import { Users, UserPlus, Shield, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EntityList, { StatCard } from '@/components/common/EntityList';

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

  const stats: StatCard[] = useMemo(() => [
    {
      title: "Total de Staff",
      value: 24,
      icon: <Users size={20} className="text-primary" />,
      color: "bg-gradient-to-br from-primary/20 to-secondary/10"
    },
    {
      title: "Ativos",
      value: 22,
      icon: <Shield size={20} className="text-green-600" />,
      color: "bg-gradient-to-br from-green-100 to-green-50"
    },
    {
      title: "Departamentos",
      value: 8,
      icon: <Users size={20} className="text-blue-600" />,
      color: "bg-gradient-to-br from-blue-100 to-blue-50"
    },
    {
      title: "Novos (30d)",
      value: 3,
      icon: <UserPlus size={20} className="text-purple-600" />,
      color: "bg-gradient-to-br from-purple-100 to-purple-50"
    }
  ], []);

  const handleAddNew = () => {
    console.log('Adicionar novo staff');
  };

  return (
    <EntityList
      title="Equipe"
      subtitle="Gerencie sua equipe e permissões"
      searchPlaceholder="Buscar por nome, email ou função..."
      stats={stats}
      onAddNew={handleAddNew}
      addButtonText="Adicionar Membro"
    >
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
    </EntityList>
  );
};

export default StaffList;
