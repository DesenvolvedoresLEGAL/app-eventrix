import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Shield, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserRoleDistribution } from '@/hooks/queries/useRoleStatistics';
import { useRolesAdmin } from '@/context/RolesAdminContext';

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))', 
  'hsl(var(--tertiary))',
  'hsl(254 79% 45%)',
  'hsl(181 100% 35%)',
  'hsl(239 90% 45%)',
  'hsl(254 79% 65%)',
  'hsl(181 100% 65%)'
];

export const UserDistributionChart: React.FC = () => {
  const { roles } = useRolesAdmin();
  const { distribution, isLoading, error } = useUserRoleDistribution();

  const pieData = useMemo(() => {
    if (!distribution) return [];
    
    return distribution.map((item, index) => ({
      name: item.code,
      value: item.userCount,
      percentage: item.percentage,
      color: COLORS[index % COLORS.length]
    }));
  }, [distribution]);

  const barData = useMemo(() => {
    if (!distribution) return [];
    
    return distribution.map((item, index) => ({
      name: item.code.length > 8 ? item.code.substring(0, 8) + '...' : item.code,
      fullName: item.code,
      users: item.userCount,
      permissions: roles.find(r => r.code === item.code)?.permissions.length || 0,
      color: COLORS[index % COLORS.length]
    }));
  }, [distribution, roles]);

  const totalUsers = useMemo(() => {
    return pieData.reduce((sum, item) => sum + item.value, 0);
  }, [pieData]);

  const exportData = () => {
    if (!distribution) return;
    
    const csvContent = [
      ['Perfil', 'Usuários', 'Percentual', 'Permissões'].join(','),
      ...distribution.map(item => [
        item.code,
        item.userCount,
        `${item.percentage.toFixed(1)}%`,
        roles.find(r => r.code === item.code)?.permissions.length || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'distribuicao-usuarios.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Distribuição de Usuários
          </CardTitle>
          <CardDescription>
            Análise da distribuição de usuários por perfil
          </CardDescription>      
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !distribution || distribution.length === 0) {
    return (
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Distribuição de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center">
            <Shield size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Dados não disponíveis</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pie Chart */}
      <Card className="tech-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                Distribuição de Usuários
              </CardTitle>
              <CardDescription>
                Total de {totalUsers} usuários distribuídos em {pieData.length} perfis
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download size={16} className="mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} usuários`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-sm mb-3">Detalhamento por Perfil</h4>
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {roles.find(r => r.code === item.name)?.permissions.length || 0} permissões
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Análise Comparativa
          </CardTitle>
          <CardDescription>
            Comparação entre número de usuários e permissões por perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(label) => {
                    const item = barData.find(d => d.name === label);
                    return item?.fullName || label;
                  }}
                  formatter={(value, name) => [
                    value, 
                    name === 'users' ? 'Usuários' : 'Permissões'
                  ]}
                />
                <Legend />
                <Bar 
                  dataKey="users" 
                  name="Usuários"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="permissions" 
                  name="Permissões"
                  fill="hsl(var(--secondary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};