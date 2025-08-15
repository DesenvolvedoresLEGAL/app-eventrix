
import React, { useMemo } from 'react';
import { Shield, Plus, Users, Key, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRolesAdmin } from '@/context/RolesAdminContext';
import RoleStatsCards from './RoleStatsCards';
import { PermissionMatrix } from './PermissionMatrix';
import { UserDistributionChart } from './UserDistributionChart';
import RoleFormModal from './RoleFormModal';

const PermissionsList = () => {
  const {
    filteredRoles,
    statistics,
    isLoading,
    searchTerm,
    setSearch,
    openModal,
    isModalOpen,
    modalMode,
    selectedRole,
    closeModal
  } = useRolesAdmin();

  if (isLoading) {
    return (
      <div className="space-y-6 tech-grid min-h-full p-6">
        <div className="tech-card p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="tech-kpi-card">
              <div className="animate-pulse">
                <div className="h-6 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 tech-grid min-h-full p-6">
      {/* Header */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Permissões e Perfis</h1>
            <p className="text-muted-foreground">Controle de acesso e níveis de permissão</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar perfis..."
                value={searchTerm}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button 
              className="tech-button"
              onClick={() => openModal('create')}
            >
              <Plus size={16} className="mr-2" />
              Novo Perfil
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <RoleStatsCards statistics={statistics} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserDistributionChart />
      </div>

      {/* Roles List */}
      <div className="tech-card p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Perfis de Acesso</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredRoles.map((role) => (
              <div key={role.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    <div>
                      <h3 className="font-semibold">{role.code}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openModal('edit', role)}
                  >
                    Editar
                  </Button>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Permissões ({role.permissions.length}):</p>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                    {role.permissions.slice(0, 5).map((permission) => (
                      <span key={permission} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {permission}
                      </span>
                    ))}
                    {role.permissions.length > 5 && (
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                        +{role.permissions.length - 5} mais
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Permission Matrix */}
      <PermissionMatrix />

      {/* Modal */}
      <RoleFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        role={selectedRole}
      />
    </div>
  );
};

export default PermissionsList;
