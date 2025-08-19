
import React, { useMemo } from 'react';
import { Shield, Plus, Users, Key, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRolesAdmin } from '@/context/RolesAdminContext';
import RoleStatsCards from './RoleStatsCards';
import { PermissionMatrix } from './PermissionMatrix';
import { UserDistributionChart } from './UserDistributionChart';
import RoleFormModal from './RoleFormModal';
import RoleCard from './RoleCard';
import capitalize from '@/utils/stringUtils';

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
      <RoleStatsCards statistics={statistics} isLoading={isLoading} />

      {/* Charts */}
      <div>
        <UserDistributionChart />
      </div>

      {/* Roles List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Perfis de Acesso</h2>
          <p className="text-sm text-muted-foreground">
            {filteredRoles.length} perfis encontrados
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRoles.map((role) => (
            <RoleCard
              key={role.id}
              role={{
                ...role,
                userCount: Math.floor(Math.random() * 50) // TODO: Replace with real user count
              }}
              onEdit={() => openModal('edit', role)}
            />
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="tech-card p-12 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum perfil encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `Nenhum perfil corresponde aos critérios de busca "${searchTerm}"`
                : "Não há perfis cadastrados no sistema"
              }
            </p>
            {!searchTerm && (
              <Button onClick={() => openModal('create')} className="tech-button">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Perfil
              </Button>
            )}
          </div>
        )}
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
