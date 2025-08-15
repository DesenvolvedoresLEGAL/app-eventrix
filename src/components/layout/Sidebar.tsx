
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePermissions } from '@/hooks/usePermissions';
import { 
  filterMenuGroupsByPermissions, 
  filterEventsItems, 
  canAccessDashboard 
} from '@/utils/permissions';
import SidebarItem from './sidebar/SidebarItem';
import SidebarGroup from './sidebar/SidebarGroup';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';
import { dashboardItem, eventsItems, menuGroups } from './sidebar/sidebarConfig';

// Loading component for permission checks
const SidebarLoader = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div className={cn(
    "flex flex-col bg-white border-r border-slate-200/60 h-screen shadow-sm shrink-0",
    isCollapsed ? "w-20" : "w-80"
  )}>
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
        {!isCollapsed && (
          <p className="text-sm text-muted-foreground">Carregando menu...</p>
        )}
      </div>
    </div>
  </div>
);

// No access component
const NoAccessSidebar = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div className={cn(
    "flex flex-col bg-white border-r border-slate-200/60 h-screen shadow-sm shrink-0",
    isCollapsed ? "w-20" : "w-80"
  )}>
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="text-center space-y-3">
        <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
        {!isCollapsed && (
          <p className="text-sm text-muted-foreground">
            Sem permissões de acesso
          </p>
        )}
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>('');
  const location = useLocation();
  const { userRole, isLoading } = usePermissions();

  // Memoized filtering for performance optimization
  const filteredContent = useMemo(() => {
    if (!userRole) return null;
    
    return {
      canSeeDashboard: canAccessDashboard(userRole),
      filteredEventsItems: filterEventsItems(eventsItems, userRole),
      filteredMenuGroups: filterMenuGroupsByPermissions(menuGroups, userRole)
    };
  }, [userRole]);

  const toggleGroup = (group: string) => {
    setActiveGroup(activeGroup === group ? '' : group);
  };

  
  // Show loading state while checking permissions
  if (isLoading) {
    return <SidebarLoader isCollapsed={isCollapsed} />;
  }
  
  // Show no access state if user has no permissions
  if (!filteredContent) {
    return <NoAccessSidebar isCollapsed={isCollapsed} />;
  }
  
  const { canSeeDashboard, filteredEventsItems, filteredMenuGroups } = filteredContent;

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
          {/* Dashboard - baseado em permissões */}
          {canSeeDashboard && (
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

          {/* Eventos - baseado em permissões */}
          {filteredEventsItems.length > 0 && (
            <div className="space-y-1">
              <SidebarGroup
                icon={<Calendar size={16} />}
                label="Eventos"
                isCollapsed={isCollapsed}
                isOpen={activeGroup === 'events'}
                onToggle={() => toggleGroup('events')}
                priority="high"
              >
                {filteredEventsItems.map((item) => (
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
          {(canSeeDashboard || filteredEventsItems.length > 0) && filteredMenuGroups.length > 0 && !isCollapsed && (
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          )}

          {/* Grupos Filtrados por Permissões */}
          <div className="space-y-1">
            {filteredMenuGroups.map((group) => (
              <SidebarGroup
                key={group.id}
                icon={group.icon}
                label={group.label}
                isCollapsed={isCollapsed}
                isOpen={activeGroup === group.id}
                onToggle={() => toggleGroup(group.id)}
                priority={group.priority}
              >
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.to}
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    isCollapsed={isCollapsed}
                    isActive={location.pathname === item.to}
                  />
                ))}
              </SidebarGroup>
            ))}
          </div>

          {/* Mensagem quando não há conteúdo */}
          {!canSeeDashboard && filteredEventsItems.length === 0 && filteredMenuGroups.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              {!isCollapsed && (
                <p className="text-sm text-muted-foreground">
                  Nenhum menu disponível
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Fixo no Final */}
      <SidebarFooter isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;
