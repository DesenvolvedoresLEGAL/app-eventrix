
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed: boolean;
  isActive: boolean;
  badge?: string;
  isHighlighted?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  isCollapsed, 
  isActive, 
  badge, 
  isHighlighted = false 
}) => (
  <Link to={to} className={cn(
    "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 group relative",
    "text-slate-600 hover:text-slate-900 hover:bg-white/80 hover:shadow-sm",
    isActive && "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 shadow-sm",
    isHighlighted && "bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary border border-secondary/20 font-semibold",
    isCollapsed ? "justify-center px-3" : "px-3"
  )}>
    <div className="w-4 h-4 flex-shrink-0">{icon}</div>
    {!isCollapsed && (
      <>
        <span className="font-medium text-xs truncate">{label}</span>
        {badge && (
          <span className={cn(
            "ml-auto text-xs px-1 py-0.5 rounded-full font-medium",
            isHighlighted ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
          )}>
            {badge}
          </span>
        )}
      </>
    )}
    {isCollapsed && isActive && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
    )}
  </Link>
);

export default SidebarItem;
