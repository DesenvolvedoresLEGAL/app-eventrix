
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarItem from './sidebar/SidebarItem';
import SidebarGroup from './sidebar/SidebarGroup';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';
import { dashboardItem, eventsItems, menuGroups } from './sidebar/sidebarConfig';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>('');
  const location = useLocation();

  const toggleGroup = (group: string) => {
    setActiveGroup(activeGroup === group ? '' : group);
  };

  return (
    <div className={cn(
      "flex flex-col bg-white border-r border-slate-200/60 transition-all duration-300 h-screen shadow-sm",
      isCollapsed ? "w-20" : "w-80"
    )}>
      {/* Header Fixo */}
      <SidebarHeader 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />

      {/* Conteúdo de Navegação - altura fixa calculada */}
      <div className="flex-1 px-4 py-6 space-y-3" style={{ height: 'calc(100vh - 160px)' }}>
        {/* Dashboard - sempre visível */}
        <div className="space-y-1">
          <SidebarItem
            icon={dashboardItem.icon}
            label={dashboardItem.label}
            to={dashboardItem.to}
            isCollapsed={isCollapsed}
            isActive={location.pathname === dashboardItem.to}
          />
        </div>

        {/* Eventos - sempre visível */}
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

        {/* Separador Visual */}
        {!isCollapsed && <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />}

        {/* Grupos Organizados - Sistema de Acordeão Inteligente */}
        <div className="space-y-2">
          {menuGroups.map((group) => (
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
      </div>

      {/* Footer Fixo */}
      <SidebarFooter isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;
