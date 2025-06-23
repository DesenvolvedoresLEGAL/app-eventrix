
import React, { useMemo, useState } from 'react';
import { Users, UserPlus, Shield, Mail, Phone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EntityList, { StatCard } from '@/components/common/EntityList';
import StaffForm from './StaffForm';
import { useStaff } from '@/hooks/useStaff';
import { useSearchParams } from 'react-router-dom';
import { useStatusClasses } from '@/utils/statusUtils';

const StaffList = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId') || ''; // Pegar eventId da URL
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { 
    staff, 
    isLoading, 
    isError, 
    error, 
    deleteStaff, 
    isDeleting 
  } = useStaff(eventId);

  const stats: StatCard[] = useMemo(() => [
    {
      title: "Total de Staff",
      value: staff.length,
      icon: <Users size={20} className="text-primary" />,
      color: "bg-gradient-to-br from-primary/20 to-secondary/10"
    },
    {
      title: "Ativos",
      value: staff.length, // Todos são considerados ativos (não há soft delete)
      icon: <Shield size={20} className="text-green-600" />,
      color: "bg-gradient-to-br from-green-100 to-green-50"
    },
    {
      title: "Funções Únicas",
      value: new Set(staff.map(member => member.role)).size,
      icon: <Users size={20} className="text-blue-600" />,
      color: "bg-gradient-to-br from-blue-100 to-blue-50"
    },
    {
      title: "Novos (30d)",
      value: staff.filter(member => {
        if (!member.created_at) return false;
        const createdDate = new Date(member.created_at);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return createdDate > thirtyDaysAgo;
      }).length,
      icon: <UserPlus size={20} className="text-purple-600" />,
      color: "bg-gradient-to-br from-purple-100 to-purple-50"
    }
  ], [staff]);

  const handleAddNew = () => {
    if (!eventId) {
      console.error('Event ID é obrigatório para adicionar staff');
      return;
    }
    setIsFormOpen(true);
  };

  const handleDelete = (staffId: string) => {
    if (confirm('Tem certeza que deseja remover este membro da equipe?')) {
      deleteStaff(staffId);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <EntityList
        title="Equipe"
        subtitle="Gerencie sua equipe e permissões"
        searchPlaceholder="Buscar por nome, email ou função..."
        stats={[]}
        onAddNew={() => {}}
        addButtonText="Adicionar Membro"
      >
        <div className="tech-card p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Carregando equipe...</span>
          </div>
        </div>
      </EntityList>
    );
  }

  // Error state
  if (isError) {
    return (
      <EntityList
        title="Equipe"
        subtitle="Gerencie sua equipe e permissões"
        searchPlaceholder="Buscar por nome, email ou função..."
        stats={[]}
        onAddNew={() => {}}
        addButtonText="Adicionar Membro"
      >
        <div className="tech-card p-6">
          <div className="flex items-center justify-center py-12 text-red-600">
            <AlertCircle className="h-8 w-8" />
            <div className="ml-2 text-center">
              <p className="text-lg font-semibold">Erro ao carregar equipe</p>
              <p className="text-sm text-gray-600">{error?.message || 'Ocorreu um erro inesperado'}</p>
            </div>
          </div>
        </div>
      </EntityList>
    );
  }

  // Empty state
  if (staff.length === 0) {
    return (
      <EntityList
        title="Equipe"
        subtitle="Gerencie sua equipe e permissões"
        searchPlaceholder="Buscar por nome, email ou função..."
        stats={stats}
        onAddNew={handleAddNew}
        addButtonText="Adicionar Membro"
      >
        <div className="tech-card p-6">
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Users className="h-16 w-16 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma equipe cadastrada</h3>
            <p className="text-center mb-4">
              {eventId ? 'Adicione membros à sua equipe para este evento.' : 'Selecione um evento para gerenciar a equipe.'}
            </p>
            {eventId && (
              <Button onClick={handleAddNew}>
                <UserPlus size={16} className="mr-2" />
                Adicionar Primeiro Membro
              </Button>
            )}
          </div>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Membro da Equipe</DialogTitle>
            </DialogHeader>
            <StaffForm 
              eventId={eventId}
              onClose={() => setIsFormOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </EntityList>
    );
  }

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
          {staff.map((member) => (
            <div key={member.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail size={12} />
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="tech-badge text-green-600 bg-green-50 border-green-200">
                    Ativo
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(member.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Remover'}
                  </Button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground mb-2">Função:</p>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Membro da Equipe</DialogTitle>
          </DialogHeader>
          <StaffForm 
            eventId={eventId}
            onClose={() => setIsFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </EntityList>
  );
};

export default StaffList;
