
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import SidebarItem from './sidebar/SidebarItem';
import SidebarGroup from './sidebar/SidebarGroup';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';
import { useNavigation } from '@/hooks/useNavigation';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>('');
  const location = useLocation();
  
  const { 
    dashboardItem, 
    eventsItems, 
    menuGroups, 
    hasAnyNavigation, 
    isLoading 
  } = useNavigation();

  const toggleGroup = (group: string) => {
    setActiveGroup(activeGroup === group ? '' : group);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={cn(
        "flex flex-col bg-white border-r border-slate-200/60 transition-all duration-300 h-screen shadow-sm shrink-0",
        isCollapsed ? "w-20" : "w-80"
      )}>
        <SidebarHeader 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
        <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <SidebarFooter isCollapsed={isCollapsed} />
      </div>
    );
  }

  // No navigation available
  if (!hasAnyNavigation) {
    return (
      <div className={cn(
        "flex flex-col bg-white border-r border-slate-200/60 transition-all duration-300 h-screen shadow-sm shrink-0",
        isCollapsed ? "w-20" : "w-80"
      )}>
        <SidebarHeader 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
        <div className="flex-1 min-h-0 overflow-y-auto p-3">
          <div className="text-center text-slate-500 mt-8">
            <p className="text-sm">Nenhum menu disponível</p>
          </div>
        </div>
        <SidebarFooter isCollapsed={isCollapsed} />
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col bg-white border-r border-slate-200/60 transition-all duration-300 h-screen shadow-sm shrink-0",
      isCollapsed ? "w-20" : "w-80"
    )}>
      {/* Header Fixo */}
      <SidebarHeader 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* Conteúdo de Navegação - Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-3 py-2 space-y-1 pb-20">
          {/* Dashboard - se disponível */}
          {dashboardItem && (
            <div className="space-y-1">
              <SidebarItem
                icon={dashboardItem.icon}
                label={dashboardItem.label}
                to={dashboardItem.to}
                isCollapsed={isCollapsed}
                isActive={location.pathname === dashboardItem.to}
              />
            </div>
          )}

          {/* Eventos - se disponível */}
          {eventsItems.length > 0 && (
            <div className="space-y-1">
              <SidebarGroup
                icon={<Calendar size={16} />}
                label="Eventos"
                isCollapsed={isCollapsed}
                isOpen={activeGroup === 'events'}
                onToggle={() => toggleGroup('events')}
                priority="high"
              >
                {eventsItems.map((item) => (
                  <SidebarItem
                    key={item.to}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    isCollapsed={isCollapsed}
                    isActive={location.pathname === item.to}
                    badge={item.badge}
                    isHighlighted={item.highlighted}
                  />
                ))}
              </SidebarGroup>
            </div>
          )}

          {/* Separador Visual - apenas se há itens acima */}
          {(dashboardItem || eventsItems.length > 0) && menuGroups.length > 0 && 
            !isCollapsed && (
              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            )
          }

          {/* Grupos Filtrados */}
          <div className="space-y-1">
            {menuGroups.map((group) => (
              <SidebarGroup
                key={group.id}
                icon={group.icon}
                label={group.label}
                isCollapsed={isCollapsed}
                isOpen={activeGroup === group.id}
                onToggle={() => toggleGroup(group.id)}
                priority={group.priority}
                requiredPermission={group.requiredPermission}
              >
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.to}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    isCollapsed={isCollapsed}
                    isActive={location.pathname === item.to}
                    requiredPermission={item.requiredPermission}
                  />
                ))}
              </SidebarGroup>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Fixo no Final */}
      <SidebarFooter isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;
