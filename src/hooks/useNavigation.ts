
import { useMemo } from 'react';
import { useRolePermissions } from './useRolePermissions';
import { hasRouteAccess } from '@/utils/permissions';
import { dashboardItem, eventsItems, menuGroups } from '@/components/layout/sidebar/sidebarConfig';

export interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: string;
  highlighted?: boolean;
}

export interface NavigationGroup {
  id: string;
  icon: React.ReactNode;
  label: string;
  priority: 'high' | 'medium' | 'low';
  items: NavigationItem[];
}

export const useNavigation = () => {
  const { role, isFetching } = useRolePermissions();

  const filteredDashboard = useMemo(() => {
    if (!role || isFetching) return null;
    
    return hasRouteAccess(dashboardItem.to, role) ? dashboardItem : null;
  }, [role, isFetching]);

  const filteredEvents = useMemo(() => {
    if (!role || isFetching) return [];
    
    return eventsItems.filter(item => hasRouteAccess(item.to, role));
  }, [role, isFetching]);

  const filteredMenuGroups = useMemo(() => {
    if (!role || isFetching) return [];
    
    return menuGroups.map(group => {
      const filteredItems = group.items.filter(item => 
        hasRouteAccess(item.to, role)
      );
      
      return {
        ...group,
        items: filteredItems
      };
    }).filter(group => group.items.length > 0); // Remove grupos sem itens
  }, [role, isFetching]);

  const hasAnyNavigation = useMemo(() => {
    return !!(filteredDashboard || 
             filteredEvents.length > 0 || 
             filteredMenuGroups.length > 0);
  }, [filteredDashboard, filteredEvents.length, filteredMenuGroups.length]);

  return {
    dashboardItem: filteredDashboard,
    eventsItems: filteredEvents,
    menuGroups: filteredMenuGroups,
    hasAnyNavigation,
    isLoading: isFetching
  };
};
