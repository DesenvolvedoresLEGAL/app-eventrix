
import React, { memo, useMemo, ReactNode } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface StatCard {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export interface EntityListProps {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  stats: StatCard[];
  onAddNew: () => void;
  addButtonText: string;
  children: ReactNode;
  className?: string;
}

/**
 * Componente genérico para listas de entidades com filtros e estatísticas
 */
const EntityList: React.FC<EntityListProps> = memo(({
  title,
  subtitle,
  searchPlaceholder,
  stats,
  onAddNew,
  addButtonText,
  children,
  className = ""
}) => {
  const statsCards = useMemo(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="tech-kpi-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.color || 'bg-gradient-to-br from-primary/20 to-secondary/10'} flex items-center justify-center`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  ), [stats]);

  return (
    <div className={`space-y-6 tech-grid min-h-full p-6 ${className}`}>
      {/* Header */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <Button className="tech-button" onClick={onAddNew}>
            <Plus size={16} className="mr-2" />
            {addButtonText}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="tech-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={searchPlaceholder} className="pl-10 tech-input" />
            </div>
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter size={16} className="mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Stats */}
      {statsCards}

      {/* Content */}
      {children}
    </div>
  );
});

EntityList.displayName = 'EntityList';

export default EntityList;
