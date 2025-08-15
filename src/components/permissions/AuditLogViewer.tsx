import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  History, 
  Download, 
  Filter, 
  Search, 
  Calendar,
  User,
  Settings,
  Shield,
  Key,
  Eye,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuditHistory, useAuditStats } from '@/hooks/queries/useAuditLog';
import { AuditFilters } from '@/services/auditService';
import { auditService } from '@/services/auditService';

const ACTION_ICONS = {
  CREATE: Settings,
  UPDATE: Settings,
  DELETE: Settings,
  ASSIGN: User,
  UNASSIGN: User
};

const ACTION_COLORS = {
  CREATE: 'bg-green-100 text-green-800',
  UPDATE: 'bg-blue-100 text-blue-800',
  DELETE: 'bg-red-100 text-red-800',
  ASSIGN: 'bg-purple-100 text-purple-800',
  UNASSIGN: 'bg-orange-100 text-orange-800'
};

const ENTITY_ICONS = {
  ROLE: Shield,
  PERMISSION: Key,
  USER_ROLE: User
};

export const AuditLogViewer: React.FC = () => {
  const [filters, setFilters] = useState<AuditFilters>({
    page: 1,
    limit: 20
  });
  const [searchTerm, setSearchTerm] = useState('');

  const { entries, total, totalPages, isLoading, error, refetch } = useAuditHistory(filters);
  const { stats, isLoading: statsLoading } = useAuditStats();

  const filteredEntries = useMemo(() => {
    if (!searchTerm.trim()) return entries;
    
    const term = searchTerm.toLowerCase();
    return entries.filter(entry => 
      entry.entityId.toLowerCase().includes(term) ||
      entry.user?.fullName?.toLowerCase().includes(term) ||
      entry.user?.email?.toLowerCase().includes(term) ||
      JSON.stringify(entry.changes).toLowerCase().includes(term)
    );
  }, [entries, searchTerm]);

  const handleFilterChange = (key: keyof AuditFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const exportAuditLog = async (format: 'csv' | 'json') => {
    try {
      const blob = await auditService.exportAuditLog(format, filters);
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-log-${format === 'csv' ? 'export.csv' : 'export.json'}`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export audit log:', error);
    }
  };

  const formatChanges = (changes: Record<string, any>) => {
    if (!changes || Object.keys(changes).length === 0) {
      return 'Nenhuma alteração registrada';
    }
    
    return Object.entries(changes).map(([key, value], index) => (
      <div key={key} className="text-xs">
        <span className="font-medium">{key}:</span>{' '}
        {typeof value === 'object' && value.from !== undefined && value.to !== undefined ? (
          <>
            <span className="text-red-600 line-through">{JSON.stringify(value.from)}</span>
            {' → '}
            <span className="text-green-600">{JSON.stringify(value.to)}</span>
          </>
        ) : (
          <span>{JSON.stringify(value)}</span>
        )}
      </div>
    ));
  };

  if (error) {
    return (
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <History size={20} />
            Erro no Log de Auditoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Não foi possível carregar o log de auditoria. Tente novamente.
          </p>
          <Button variant="outline" onClick={() => refetch()} className="mt-4">
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="tech-kpi-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Registros</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalEntries}</h3>
                </div>
                <History className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="tech-kpi-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Este Mês</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.entriesThisMonth}</h3>
                </div>
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="tech-kpi-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Usuário Mais Ativo</p>
                  <h3 className="text-lg font-bold mt-1">
                    {stats.mostActiveUser ? `${stats.mostActiveUser.count} ações` : 'N/A'}
                  </h3>
                </div>
                <Activity className="h-8 w-8 text-tertiary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="tech-kpi-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ação Mais Comum</p>
                  <h3 className="text-lg font-bold mt-1">
                    {Object.entries(stats.actionDistribution).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                  </h3>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Audit Log */}
      <Card className="tech-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History size={20} />
                Log de Auditoria
              </CardTitle>
              <CardDescription>
                Histórico completo de alterações no sistema de permissões
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => exportAuditLog('csv')}>
                <Download size={16} className="mr-2" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportAuditLog('json')}>
                <Download size={16} className="mr-2" />
                JSON
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar registros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select 
              value={filters.action || 'all'} 
              onValueChange={(value) => handleFilterChange('action', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Ações</SelectItem>
                <SelectItem value="CREATE">Criação</SelectItem>
                <SelectItem value="UPDATE">Atualização</SelectItem>
                <SelectItem value="DELETE">Exclusão</SelectItem>
                <SelectItem value="ASSIGN">Atribuição</SelectItem>
                <SelectItem value="UNASSIGN">Remoção</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filters.entityType || 'all'} 
              onValueChange={(value) => handleFilterChange('entityType', value === 'all' ? undefined : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="ROLE">Perfis</SelectItem>
                <SelectItem value="PERMISSION">Permissões</SelectItem>
                <SelectItem value="USER_ROLE">Atribuições</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => setFilters({ page: 1, limit: 20 })}>
              <Filter size={16} className="mr-2" />
              Limpar Filtros
            </Button>
          </div>

          {/* Entries List */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-8">
              <History size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhum registro encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => {
                const ActionIcon = ACTION_ICONS[entry.action];
                const EntityIcon = ENTITY_ICONS[entry.entityType];
                
                return (
                  <div key={entry.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-muted">
                            <ActionIcon size={16} />
                          </div>
                          <div className="p-2 rounded-lg bg-muted">
                            <EntityIcon size={16} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={ACTION_COLORS[entry.action]}>
                              {entry.action}
                            </Badge>
                            <Badge variant="outline">
                              {entry.entityType}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {entry.user?.fullName || 'Usuário desconhecido'} • {entry.entityId}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        {format(new Date(entry.timestamp), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </div>
                    </div>
                    
                    {Object.keys(entry.changes).length > 0 && (
                      <>
                        <Separator className="my-3" />
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs font-medium mb-2">Alterações:</p>
                          <div className="space-y-1">
                            {formatChanges(entry.changes)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredEntries.length} de {total} registros
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={filters.page === 1}
                  onClick={() => handlePageChange(filters.page! - 1)}
                >
                  Anterior
                </Button>
                <span className="flex items-center px-3 py-1 text-sm">
                  {filters.page} de {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={filters.page === totalPages}
                  onClick={() => handlePageChange(filters.page! + 1)}
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};