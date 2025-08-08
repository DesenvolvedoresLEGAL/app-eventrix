
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarGroupProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  priority?: 'high' | 'medium' | 'low';
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ 
  icon, 
  label, 
  children, 
  isCollapsed, 
  isOpen, 
  onToggle, 
  priority = 'medium' 
}) => {
  if (isCollapsed) {
    return (
      <div className="space-y-1">
        {children}
      </div>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger className={cn(
        "flex items-center justify-between w-full px-3 py-2 rounded-xl transition-all duration-300 group",
        "text-slate-700 hover:text-slate-900 hover:bg-slate-50/80",
        priority === 'high' && "bg-gradient-to-r from-primary/5 to-transparent",
        isOpen && "bg-slate-50/60"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 text-slate-500 group-hover:text-slate-700">{icon}</div>
          <span className="font-semibold text-xs">{label}</span>
        </div>
        <div className={cn(
          "transition-transform duration-300 text-slate-400",
          isOpen && "rotate-180"
        )}>
          <ChevronDown size={12} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 ml-4 mt-1 border-l border-slate-200/60 pl-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarGroup;
