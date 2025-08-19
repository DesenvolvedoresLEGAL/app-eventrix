import React, { useMemo, useState } from 'react';
import { Key, Filter, Download, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useRolesAdmin } from '@/context/RolesAdminContext';
import { usePermissionsList } from '@/hooks/queries/usePermissionsList';

export const PermissionMatrix: React.FC = () => {
  const { roles } = useRolesAdmin();
  const { permissions, groupedPermissions } = usePermissionsList();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [compactView, setCompactView] = useState(false);

  const filteredPermissions = useMemo(() => {
    let filtered = permissions;
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(permission => 
        permission.name.toLowerCase().includes(term) ||
        permission.description.toLowerCase().includes(term) ||
        permission.key.toLowerCase().includes(term)
      );
    }
    
    if (selectedModule !== 'all') {
      filtered = filtered.filter(permission => permission.module === selectedModule);
    }
    
    return filtered;
  }, [permissions, searchTerm, selectedModule]);

  const modules = useMemo(() => {
    return Array.from(new Set(permissions.map(p => p.module)));
  }, [permissions]);

  const getRolePermissions = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions || [];
  };

  const hasPermission = (roleId: string, permissionKey: string) => {
    const rolePermissions = getRolePermissions(roleId);
    return rolePermissions.includes(permissionKey as any);
  };

  const exportMatrix = () => {
    const csvContent = [
      ['Permissão', 'Módulo', 'Descrição', ...roles.map(r => r.code)].join(','),
      ...filteredPermissions.map(permission => [
        permission.name,
        permission.module,
        permission.description,
        ...roles.map(role => hasPermission(role.id, permission.key) ? 'Sim' : 'Não')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'matriz-permissoes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (roles.length === 0) {
    return (
      <div className="tech-card p-6">
        <h2 className="text-xl font-semibold mb-4">Matriz de Permissões</h2>
        <div className="text-center py-8">
          <Key size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nenhum perfil encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tech-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Matriz de Permissões</h2>
          <p className="text-sm text-muted-foreground">
            Visualização completa das permissões por perfil ({filteredPermissions.length} permissões)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline" 
            size="sm"
            onClick={() => setCompactView(!compactView)}
          >
            {compactView ? <Eye size={16} /> : <EyeOff size={16} />}
            {compactView ? 'Expandir' : 'Compacto'}
          </Button>
          <Button variant="outline" size="sm" onClick={exportMatrix}>
            <Download size={16} className="mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Buscar permissões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={selectedModule} onValueChange={setSelectedModule}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por módulo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Módulos</SelectItem>
            {modules.map(module => (
              <SelectItem key={module} value={module}>
                {module}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: `300px repeat(${roles.length}, 120px)` }}>
            <div className="font-semibold text-sm">Permissão</div>
            {roles.map(role => (
              <div key={role.id} className="font-semibold text-sm text-center">
                <div className="truncate" title={role.code}>
                  {role.code}
                </div>
              </div>
            ))}
          </div>

          {/* Permissions by Module */}
          {Object.entries(groupedPermissions).map(([module, modulePermissions]) => {
            const filteredModulePermissions = modulePermissions.permissions.filter(p => 
              filteredPermissions.some(fp => fp.key === p.key)
            );
            
            if (filteredModulePermissions.length === 0) return null;

            return (
              <div key={module} className="mb-6">
                <div className="mb-3">
                  <Badge variant="outline" className="text-xs">
                    {module} ({filteredModulePermissions.length})
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {filteredModulePermissions.map(permission => (
                    <div 
                      key={permission.key}
                      className="grid gap-2 p-2 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                      style={{ gridTemplateColumns: `300px repeat(${roles.length}, 120px)` }}
                    >
                      <div className="flex flex-col justify-center">
                        <div className="font-medium text-sm">{permission.name}</div>
                        {!compactView && (
                          <div className="text-xs text-muted-foreground truncate" title={permission.description}>
                            {permission.description}
                          </div>
                        )}
                      </div>
                      
                      {roles.map(role => (
                        <div key={role.id} className="flex items-center justify-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            hasPermission(role.id, permission.key)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {hasPermission(role.id, permission.key) ? '✓' : '✗'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredPermissions.length === 0 && (
        <div className="text-center py-8">
          <Filter size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nenhuma permissão encontrada com os filtros aplicados</p>
        </div>
      )}
    </div>
  );
};