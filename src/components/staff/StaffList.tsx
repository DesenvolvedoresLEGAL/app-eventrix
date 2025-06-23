
import React, { useMemo } from 'react';
import { Users, UserPlus, Shield, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EntityList, { StatCard } from '@/components/common/EntityList';
import { useStatusClasses, useShiftClasses } from '@/utils/statusUtils';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  phone?: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  permissions: string[];
  event_id: string;
  created_at: string;
  updated_at: string;
}

const StaffList = () => {
  // Dados mockados que seguem a nova estrutura
  const staffMembers: StaffMember[] = useMemo(() => [
    {
      id: '1',
      name: 'Ana Silva',
      role: 'Coordenadora Geral',
      department: 'Operações',
      email: 'ana.silva@eventrix.com',
      phone: '+55 11 98765-4321',
      status: 'Ativo',
      permissions: ['Gestão de Equipe', 'Relatórios', 'Configurações'],
      event_id: 'event-1',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Carlos Santos',
      role: 'Gerente de Tecnologia',
      department: 'Técnico',
      email: 'carlos.santos@eventrix.com',
      phone: '+55 11 91234-5678',
      status: 'Ativo',
      permissions: ['Acesso', 'Configurações'],
      event_id: 'event-1',
      created_at: '2024-01-16T14:30:00Z',
      updated_at: '2024-01-16T14:30:00Z'
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      role: 'Especialista em Marketing',
      department: 'Marketing',
      email: 'maria.oliveira@eventrix.com',
      phone: '+55 11 95555-7777',
      status: 'Ativo',
      permissions: ['Marketing', 'Informações'],
      event_id: 'event-1',
      created_at: '2024-01-17T09:15:00Z',
      updated_at: '2024-01-17T09:15:00Z'
    }
  ], []);

  const stats: StatCard[] = useMemo(() => [
    {
      title: "Total de Staff",
      value: staffMembers.length,
      icon: <Users size={20} className="text-primary" />,
      color: "bg-gradient-to-br from-primary/20 to-secondary/10"
    },
    {
      title: "Ativos",
      value: staffMembers.filter(s => s.status === 'Ativo').length,
      icon: <Shield size={20} className="text-green-600" />,
      color: "bg-gradient-to-br from-green-100 to-green-50"
    },
    {
      title: "Departamentos",
      value: new Set(staffMembers.map(s => s.department).filter(Boolean)).size,
      icon: <Users size={20} className="text-blue-600" />,
      color: "bg-gradient-to-br from-blue-100 to-blue-50"
    },
    {
      title: "Com Permissões",
      value: staffMembers.filter(s => s.permissions.length > 0).length,
      icon: <UserPlus size={20} className="text-purple-600" />,
      color: "bg-gradient-to-br from-purple-100 to-purple-50"
    }
  ], [staffMembers]);

  const handleAddNew = () => {
    console.log('Adicionar novo staff');
  };

  const StaffCard = React.memo(({ member }: { member: StaffMember }) => {
    const statusClasses = useStatusClasses(member.status);
    
    return (
      <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">
                {member.role}
                {member.department && ` • ${member.department}`}
              </p>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail size={12} />
                  <span>{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone size={12} />
                    <span>{member.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`tech-badge ${statusClasses}`}>
              {member.status}
            </span>
            <Button variant="outline" size="sm">
              Editar
            </Button>
          </div>
        </div>
        {member.permissions.length > 0 && (
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
        )}
      </div>
    );
  });

  StaffCard.displayName = 'StaffCard';

  return (
    <EntityList
      title="Equipe"
      subtitle="Gerencie sua equipe e permissões por evento"
      searchPlaceholder="Buscar por nome, email ou função..."
      stats={stats}
      onAddNew={handleAddNew}
      addButtonText="Adicionar Membro"
    >
      {/* Staff List */}
      <div className="tech-card p-6">
        <div className="space-y-4">
          {staffMembers.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </EntityList>
  );
};

export default StaffList;
