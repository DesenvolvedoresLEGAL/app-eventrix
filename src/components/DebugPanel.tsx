import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Bug, Clock, Activity, User, Route, Zap, Trash2, Download } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { usePerformance } from '@/hooks/usePerformance';
import { Permission, getRolePermissions } from '@/utils/permissions';
import { getFirstAccessibleRoute } from '@/utils/navigationUtils';

interface DebugLog {
  id: string;
  timestamp: number;
  type: 'auth' | 'permission' | 'navigation' | 'performance' | 'error';
  message: string;
  data?: any;
  duration?: number;
}

const DEBUG_ROLES = [
  { code: 'admin', name: 'Administrador', permissions: ['DASHBOARD_VIEW', 'EVENTS_MANAGE', 'USERS_MANAGE'] },
  { code: 'finance', name: 'Financeiro', permissions: ['ANALYTICS_VIEW', 'DYNAMIC_PRICING_VIEW'] },
  { code: 'marketing', name: 'Marketing', permissions: ['MARKETING_ADS_MANAGE', 'ANALYTICS_VIEW'] },
  { code: 'support', name: 'Suporte', permissions: ['VISITORS_VIEW', 'STAFF_VIEW'] },
  { code: 'viewer', name: 'Visualizador', permissions: ['DASHBOARD_VIEW'] },
];

export const DebugPanel: React.FC = () => {
  const { user, userRole, userPermissions, loading } = useAuth();
  const { hasPermission, canAccessRoute, getAllowedRoutes } = usePermissions();
  const { firstAccessibleRoute, isLoading: navLoading } = useSmartNavigation();
  const { metrics, clearMetrics, clearCache } = usePerformance();
  
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [simulationMode, setSimulationMode] = useState(false);
  const [showPerformanceMetrics, setShowPerformanceMetrics] = useState(true);

  // Adicionar log de debug
  const addLog = useCallback((type: DebugLog['type'], message: string, data?: any, duration?: number) => {
    const log: DebugLog = {
      id: `${Date.now()}_${Math.random()}`,
      timestamp: Date.now(),
      type,
      message,
      data,
      duration,
    };
    
    setDebugLogs(prev => [log, ...prev].slice(0, 100)); // Manter apenas os últimos 100 logs
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG ${type.toUpperCase()}]`, message, data);
    }
  }, []);

  // Simular diferentes roles
  const simulateRole = useCallback((roleCode: string) => {
    const role = DEBUG_ROLES.find(r => r.code === roleCode);
    if (!role) return;

    setSelectedRole(roleCode);
    setSimulationMode(true);
    
    const mockPermissions = role.permissions as Permission[];
    const mockHasPermission = (permission: Permission) => mockPermissions.includes(permission);
    const firstRoute = getFirstAccessibleRoute(mockHasPermission);
    
    addLog('navigation', `Simulando role: ${role.name}`, {
      roleCode,
      permissions: mockPermissions,
      firstAccessibleRoute: firstRoute,
    });
  }, [addLog]);

  // Teste de performance
  const runPerformanceTest = useCallback(() => {
    addLog('performance', 'Iniciando teste de performance');
    
    const start = performance.now();
    
    // Simular cálculo intensivo de permissões
    const testPermissions = Object.values(Permission);
    const results = testPermissions.map(permission => ({
      permission,
      hasAccess: hasPermission(permission),
    }));
    
    const permissionTime = performance.now() - start;
    
    // Testar cálculo de rotas
    const routeStart = performance.now();
    const allowedRoutes = getAllowedRoutes();
    const routeTime = performance.now() - routeStart;
    
    const totalTime = performance.now() - start;
    
    addLog('performance', 'Teste de performance concluído', {
      permissionCalculationTime: permissionTime,
      routeCalculationTime: routeTime,
      totalTime,
      permissionsChecked: results.length,
      allowedRoutesCount: allowedRoutes.length,
    }, totalTime);
  }, [hasPermission, getAllowedRoutes, addLog]);

  // Exportar logs para análise
  const exportLogs = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      user: user?.email,
      userRole: userRole?.code,
      permissions: userPermissions,
      metrics,
      logs: debugLogs,
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eventrix-debug-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    addLog('performance', 'Logs exportados para análise');
  }, [user, userRole, userPermissions, metrics, debugLogs, addLog]);

  const clearLogs = useCallback(() => {
    setDebugLogs([]);
    clearMetrics();
    addLog('performance', 'Logs e métricas limpos');
  }, [clearMetrics, addLog]);

  // Informações do usuário atual
  const currentUserInfo = useMemo(() => ({
    email: user?.email || 'Não autenticado',
    role: userRole?.code || 'Sem role',
    permissions: userPermissions.length,
    firstRoute: firstAccessibleRoute?.route || 'Nenhuma',
    isLoading: loading || navLoading,
  }), [user, userRole, userPermissions, firstAccessibleRoute, loading, navLoading]);

  // Formatação de logs
  const getLogIcon = (type: DebugLog['type']) => {
    switch (type) {
      case 'auth': return <User className="h-4 w-4" />;
      case 'permission': return <Route className="h-4 w-4" />;
      case 'navigation': return <Activity className="h-4 w-4" />;
      case 'performance': return <Zap className="h-4 w-4" />;
      case 'error': return <Bug className="h-4 w-4" />;
      default: return <Bug className="h-4 w-4" />;
    }
  };

  const getLogColor = (type: DebugLog['type']) => {
    switch (type) {
      case 'auth': return 'bg-blue-500';
      case 'permission': return 'bg-green-500';
      case 'navigation': return 'bg-purple-500';
      case 'performance': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Não mostrar em produção
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 z-50">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Debug Panel</CardTitle>
            </div>
            <Badge variant="secondary">DEV</Badge>
          </div>
          <CardDescription>Sistema de debug e performance</CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 text-xs">
              <TabsTrigger value="overview">Info</TabsTrigger>
              <TabsTrigger value="simulation">Roles</TabsTrigger>
              <TabsTrigger value="performance">Perf</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Usuário Atual</h4>
                <div className="text-sm space-y-1">
                  <div>Email: <Badge variant="outline">{currentUserInfo.email}</Badge></div>
                  <div>Role: <Badge variant="outline">{currentUserInfo.role}</Badge></div>
                  <div>Permissões: <Badge>{currentUserInfo.permissions}</Badge></div>
                  <div>Primeira Rota: <Badge variant="secondary">{currentUserInfo.firstRoute}</Badge></div>
                  <div>Loading: <Badge variant={currentUserInfo.isLoading ? "destructive" : "default"}>
                    {currentUserInfo.isLoading ? "Sim" : "Não"}
                  </Badge></div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex gap-2">
                <Button size="sm" onClick={runPerformanceTest} className="flex-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Teste Perf
                </Button>
                <Button size="sm" variant="outline" onClick={exportLogs}>
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button size="sm" variant="outline" onClick={clearLogs}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="simulation" className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Simular Roles</h4>
                <Switch 
                  checked={simulationMode} 
                  onCheckedChange={setSimulationMode}
                />
              </div>
              
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {DEBUG_ROLES.map(role => (
                    <Button
                      key={role.code}
                      variant={selectedRole === role.code ? "default" : "outline"}
                      className="w-full justify-start"
                      size="sm"
                      onClick={() => simulateRole(role.code)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {role.name}
                      <Badge className="ml-auto" variant="secondary">
                        {role.permissions.length}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="performance" className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Métricas</h4>
                <Switch 
                  checked={showPerformanceMetrics} 
                  onCheckedChange={setShowPerformanceMetrics}
                />
              </div>
              
              {showPerformanceMetrics && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Auth Load:</span>
                    <Badge variant="outline">{metrics.authLoadTime.toFixed(2)}ms</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Permissions:</span>
                    <Badge variant="outline">{metrics.permissionCalculationTime.toFixed(2)}ms</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Routes:</span>
                    <Badge variant="outline">{metrics.routeCalculationTime.toFixed(2)}ms</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Redirect:</span>
                    <Badge variant="outline">{metrics.redirectTime.toFixed(2)}ms</Badge>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Login:</span>
                    <Badge>{metrics.totalLoginTime.toFixed(2)}ms</Badge>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="flex gap-2">
                <Button size="sm" onClick={clearCache} variant="outline" className="flex-1">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Limpar Cache
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="logs" className="p-4">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {debugLogs.map(log => (
                    <div key={log.id} className="p-2 border rounded-sm text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${getLogColor(log.type)}`} />
                        {getLogIcon(log.type)}
                        <span className="font-medium">{log.type.toUpperCase()}</span>
                        <span className="text-muted-foreground ml-auto">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="ml-6">
                        <div>{log.message}</div>
                        {log.duration && (
                          <Badge variant="outline" className="mt-1">
                            {log.duration.toFixed(2)}ms
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {debugLogs.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      Nenhum log disponível
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};