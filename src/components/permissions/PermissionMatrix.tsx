import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Combobox, ComboboxOption } from '@/components/ui/combobox';
import { Search, Download, Eye, EyeOff, Filter, Key } from 'lucide-react';
import { useRolesAdmin } from '@/context/RolesAdminContext';
import { usePermissionsList } from '@/hooks/queries/usePermissionsList';
import { formatRoleName, groupFormattedPermissions, searchFormattedPermissions } from '@/utils/roleFormatter';

export const PermissionMatrix: React.FC = () => {
  const { roles } = useRolesAdmin();
  const { permissions } = usePermissionsList();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [compactView, setCompactView] = useState(false);

  // Memoized filtered permissions with enhanced formatting
  const { filteredPermissions, formattedModules } = useMemo(() => {
    const groupedFormatted = groupFormattedPermissions(permissions.map(p => p.key));
    
    // Create module options for the combobox
    const moduleOptions: ComboboxOption[] = [
      { value: 'all', label: 'Todos os Módulos', icon: '📂' },
      ...groupedFormatted.map(group => ({
        value: group.module,
        label: group.module,
        icon: group.permissions[0]?.icon || '📁'
      }))
    ];

    // Apply search and module filters
    let filtered = groupedFormatted;

    if (selectedModule && selectedModule !== 'all') {
      filtered = filtered.filter(group => group.module === selectedModule);
    }

    if (searchTerm) {
      filtered = filtered.map(group => ({
        ...group,
        permissions: searchFormattedPermissions(group.permissions, searchTerm)
      })).filter(group => group.permissions.length > 0);
    }

    return {
      filteredPermissions: filtered,
      formattedModules: moduleOptions
    };
  }, [permissions, searchTerm, selectedModule]);

  const getRolePermissions = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions || [];
  };

  const hasPermission = (roleId: string, permissionKey: string) => {
    const rolePermissions = getRolePermissions(roleId);
    return rolePermissions.includes(permissionKey as any);
  };

  const exportMatrix = () => {
    const csvHeaders = ['Permissão', 'Módulo', ...roles.map(role => formatRoleName(role.code))];
    const csvRows = filteredPermissions.flatMap(group => 
      group.permissions.map(permission => [
        permission.name,
        permission.module,
        ...roles.map(role => hasPermission(role.id, permission.key) ? 'Sim' : 'Não')
      ])
    );
    
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `matriz-permissoes-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (roles.length === 0) {
    return (
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Matriz de Permissões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Nenhum perfil encontrado. Crie perfis primeiro para visualizar a matriz de permissões.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="tech-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Matriz de Permissões
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Visualização completa das permissões por perfil
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCompactView(!compactView)}
            >
              {compactView ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              {compactView ? 'Expandir' : 'Compactar'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportMatrix}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar permissões por nome, descrição ou módulo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="w-64">
              <Combobox
                options={formattedModules}
                value={selectedModule}
                onValueChange={setSelectedModule}
                placeholder="Filtrar por módulo"
                searchPlaceholder="Buscar módulo..."
                emptyText="Nenhum módulo encontrado"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Permission Matrix */}
        <div className="space-y-6">
          {filteredPermissions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Nenhuma permissão encontrada</h3>
              <p>Tente ajustar os filtros de busca ou módulo.</p>
            </div>
          ) : (
            filteredPermissions.map((group) => (
              <div key={group.module} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{group.permissions[0]?.icon || '📁'}</span>
                  <h3 className="font-semibold text-primary">
                    {group.module}
                  </h3>
                  <Badge variant="outline" className="ml-auto">
                    {group.permissions.length} {group.permissions.length === 1 ? 'permissão' : 'permissões'}
                  </Badge>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium min-w-[200px]">Permissão</th>
                        {roles.map(role => (
                          <th key={role.id} className="text-center p-2 font-medium min-w-[120px]">
                            <div className="space-y-1">
                              <div className="font-semibold">{formatRoleName(role.code)}</div>
                              <div className="text-xs text-muted-foreground">
                                {getRolePermissions(role.id).length} permissões
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.permissions.map(permission => (
                        <tr key={permission.key} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-2">
                            <div className="flex items-start gap-3">
                              <span className="text-lg mt-0.5" style={{ color: permission.color }}>
                                {permission.icon}
                              </span>
                              <div className="flex-1">
                                <div className="font-medium">{permission.name}</div>
                                <div className="text-sm text-muted-foreground">{permission.description}</div>
                                <Badge 
                                  variant="outline" 
                                  className="mt-1 text-xs"
                                  style={{ borderColor: permission.color, color: permission.color }}
                                >
                                  {permission.level === 'basic' ? 'Básico' : 
                                   permission.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                                </Badge>
                              </div>
                            </div>
                          </td>
                          {roles.map(role => (
                            <td key={role.id} className="text-center p-2">
                              {hasPermission(role.id, permission.key) ? (
                                <Badge 
                                  variant="default" 
                                  className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100"
                                >
                                  ✓ Concedida
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-muted-foreground">
                                  ✗ Negada
                                </Badge>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};