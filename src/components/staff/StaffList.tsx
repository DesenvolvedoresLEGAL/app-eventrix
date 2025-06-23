
import React, { useMemo, useState } from 'react';
import { Users, UserPlus, Shield, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EntityList, { StatCard } from '@/components/common/EntityList';
import StaffForm from './StaffForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStatusClasses } from '@/utils/statusUtils';
import { useStaff } from '@/hooks/useStaff';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/context/AuthContext';

const StaffList = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  // Buscar o primeiro evento do usuário como contexto atual
  const { events, isLoading: eventsLoading } = useEvents();
  const currentEventId = events?.[0]?.id;

  // Hook para gerenciar staff do evento atual
  const {
    staffMembers,
    stats,
    isLoading: staffLoading,
    error,
    createStaff,
    updateStaff,
    deleteStaff,
    isCreating,
    isUpdating,
    isDeleting
  } = useStaff(currentEventId);

  const isLoading = eventsLoading || staffLoading;

  const statsCards: StatCard[] = useMemo(() => [
    {
      title: "Total de Staff",
      value: stats.total,
      icon: <Users size={20} className="text-primary" />,
      color: "bg-gradient-to-br from-primary/20 to-secondary/10"
    },
    {
      title: "Ativos",
      value: stats.active,
      icon: <Shield size={20} className="text-green-600" />,
      color: "bg-gradient-to-br from-green-100 to-green-50"
    },
    {
      title: "Departamentos",
      value: stats.departments,
      icon: <Users size={20} className="text-blue-600" />,
      color: "bg-gradient-to-br from-blue-100 to-blue-50"
    },
    {
      title: "Com Permissões",
      value: stats.withPermissions,
      icon: <UserPlus size={20} className="text-purple-600" />,
      color: "bg-gradient-to-br from-purple-100 to-purple-50"
    }
  ], [stats]);

  const handleAddNew = () => {
    setSelectedStaff(null);
    setShowForm(true);
  };

  const handleEdit = (member: any) => {
    setSelectedStaff(member);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este membro da equipe?')) {
      try {
        await deleteStaff(id);
      } catch (error) {
        console.error('Erro ao deletar staff:', error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedStaff(null);
  };

  const StaffCard = React.memo(({ member }: { member: any }) => {
    const statusClasses = useStatusClasses(member.status);
    
    return (
      <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
              <span className="font-semibold text-primary">
                {member.name.split(' ').map((n: string) => n[0]).join('')}
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
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEdit(member)}
              disabled={isUpdating}
            >
              <Edit size={14} className="mr-1" />
              Editar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDelete(member.id)}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
        {member.permissions && member.permissions.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Permissões:</p>
            <div className="flex flex-wrap gap-1">
              {member.permissions.map((permission: string) => (
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

  // Estados de loading e erro
  if (isLoading) {
    return (
      <EntityList
        title="Equipe"
        subtitle="Gerencie sua equipe e permissões por evento"
        searchPlaceholder="Buscar por nome, email ou função..."
        stats={[]}
        onAddNew={handleAddNew}
        addButtonText="Adicionar Membro"
      >
        <div className="tech-card p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Carregando equipe...</div>
          </div>
        </div>
      </EntityList>
    );
  }

  if (error) {
    return (
      <EntityList
        title="Equipe"
        subtitle="Gerencie sua equipe e permissões por evento"
        searchPlaceholder="Buscar por nome, email ou função..."
        stats={[]}
        onAddNew={handleAddNew}
        addButtonText="Adicionar Membro"
      >
        <div className="tech-card p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-red-600">Erro ao carregar equipe: {error.message}</div>
          </div>
        </div>
      </EntityList>
    );
  }

  if (!currentEventId) {
    return (
      <EntityList
        title="Equipe"
        subtitle="Gerencie sua equipe e permissões por evento"
        searchPlaceholder="Buscar por nome, email ou função..."
        stats={[]}
        onAddNew={handleAddNew}
        addButtonText="Adicionar Membro"
      >
        <div className="tech-card p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">
              Nenhum evento encontrado. Crie um evento primeiro para gerenciar a equipe.
            </div>
          </div>
        </div>
      </EntityList>
    );
  }

  return (
    <>
      <EntityList
        title="Equipe"
        subtitle="Gerencie sua equipe e permissões por evento"
        searchPlaceholder="Buscar por nome, email ou função..."
        stats={statsCards}
        onAddNew={handleAddNew}
        addButtonText="Adicionar Membro"
      >
        {/* Staff List */}
        <div className="tech-card p-6">
          {staffMembers.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum membro cadastrado</h3>
                <p className="text-muted-foreground mb-4">
                  Comece adicionando membros à sua equipe.
                </p>
                <Button onClick={handleAddNew} disabled={isCreating}>
                  <UserPlus size={16} className="mr-2" />
                  Adicionar Primeiro Membro
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {staffMembers.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </EntityList>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={handleFormClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedStaff ? 'Editar Membro da Equipe' : 'Adicionar Membro da Equipe'}
            </DialogTitle>
          </DialogHeader>
          <StaffForm 
            onClose={handleFormClose}
            initialData={selectedStaff}
            eventId={currentEventId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StaffList;
