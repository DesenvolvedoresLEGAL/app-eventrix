
import React from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import supabase from '@/utils/supabase/client';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  return (
    <div className="p-3 border-t border-slate-200/60 bg-gradient-to-r from-white to-slate-50">
      <div
      onClick={async () => {await supabase.auth.signOut}}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300",
        "text-red-600 hover:text-red-700 hover:bg-red-50 hover:shadow-sm",
        isCollapsed ? "justify-center px-3" : "px-3"
      )}>
        <LogOut size={14} />
        {!isCollapsed && <span className="font-medium text-xs">Sair</span>}
      </div>
    </div>
  );
};

export default SidebarFooter;
