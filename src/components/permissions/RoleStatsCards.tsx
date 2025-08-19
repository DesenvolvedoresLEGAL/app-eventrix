import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Users, Key, UserCheck, AlertCircle } from 'lucide-react';
import { RoleStats } from '@/types/roles.types';
import { cn } from '@/lib/utils';

interface RoleStatsCardsProps {
  statistics: RoleStats | null;
  isLoading: boolean;
}

// Helper function to format numbers with K/M suffixes
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const RoleStatsCards: React.FC<RoleStatsCardsProps> = ({ statistics, isLoading }) => {
  // Loading state with improved skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Memoized stats calculation for better performance
  const stats = useMemo(() => {
    const hasNoUsers = !statistics?.totalUsers || statistics.totalUsers === 0;
    const hasNoRoles = !statistics?.totalRoles || statistics.totalRoles === 0;
    
    return [
      {
        id: 'total-roles',
        title: 'Total de Perfis',
        value: statistics?.totalRoles || 0,
        formattedValue: formatNumber(statistics?.totalRoles || 0),
        icon: Shield,
        description: hasNoRoles ? 'Nenhum perfil criado ainda' : 'Perfis criados no sistema',
        isEmpty: hasNoRoles,
        color: 'text-primary',
        bgColor: 'bg-primary/10'
      },
      {
        id: 'active-roles',
        title: 'Perfis Ativos',
        value: statistics?.activeRoles || 0,
        formattedValue: formatNumber(statistics?.activeRoles || 0),
        icon: UserCheck,
        description: hasNoUsers ? 'Aguardando usuários' : 'Perfis com usuários ativos',
        isEmpty: hasNoUsers || (statistics?.activeRoles || 0) === 0,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        id: 'total-users',
        title: 'Total de Usuários',
        value: statistics?.totalUsers || 0,
        formattedValue: formatNumber(statistics?.totalUsers || 0),
        icon: Users,
        description: hasNoUsers ? 'Nenhum usuário cadastrado' : 'Usuários cadastrados',
        isEmpty: hasNoUsers,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        id: 'permissions',
        title: 'Permissões',
        value: statistics?.totalPermissions || 0,
        formattedValue: formatNumber(statistics?.totalPermissions || 0),
        icon: Key,
        description: (statistics?.totalPermissions || 0) === 0 
          ? 'Nenhuma permissão definida' 
          : 'Permissões únicas disponíveis',
        isEmpty: (statistics?.totalPermissions || 0) === 0,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50'
      }
    ];
  }, [statistics]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isEmpty = stat.isEmpty;
        
        return (
          <Card 
            key={stat.id} 
            className={cn(
              "relative overflow-hidden transition-all duration-200 hover:shadow-md",
              isEmpty && "border-dashed opacity-75"
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    {isEmpty && (
                      <AlertCircle className="h-3 w-3 text-muted-foreground/50" />
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <p className={cn(
                      "text-3xl font-bold tracking-tight",
                      isEmpty ? "text-muted-foreground" : stat.color
                    )}>
                      {stat.formattedValue}
                    </p>
                  </div>
                  
                  <p className={cn(
                    "text-xs leading-tight",
                    isEmpty ? "text-muted-foreground/70" : "text-muted-foreground"
                  )}>
                    {stat.description}
                  </p>
                </div>
                
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                  isEmpty ? "bg-muted/30" : stat.bgColor
                )}>
                  <Icon className={cn(
                    "h-5 w-5",
                    isEmpty ? "text-muted-foreground/40" : stat.color
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RoleStatsCards;