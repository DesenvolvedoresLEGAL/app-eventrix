import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Users, Key, UserCheck } from 'lucide-react';
import { RoleStats } from '@/types/roles.types';

interface RoleStatsCardsProps {
  statistics: RoleStats | null;
  isLoading: boolean;
}

const RoleStatsCards: React.FC<RoleStatsCardsProps> = ({ statistics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Perfis Ativos',
      value: statistics?.activeRoles || 0,
      icon: Shield,
      description: 'Perfis em uso no sistema'
    },
    {
      title: 'Total de Usuários',
      value: statistics?.totalUsers || 0,
      icon: Users,
      description: 'Usuários cadastrados'
    },
    {
      title: 'Permissões',
      value: statistics?.totalPermissions || 0,
      icon: Key,
      description: 'Permissões únicas disponíveis'
    },
    {
      title: 'Perfil Mais Usado',
      value: statistics?.mostUsedRole?.userCount || 0,
      icon: UserCheck,
      description: statistics?.mostUsedRole?.description || 'Nenhum perfil em destaque'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div className="ml-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
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