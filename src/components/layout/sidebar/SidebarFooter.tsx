
import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      console.log('[DEBUG] Trying logout');
      auth.logout();
      console.log('[DEBUG] Success logout');
      toast.info('Você desconectou da sua conta!')
      navigate('/login');
    } catch (error) {
      toast.error(error);
    }
  }
  
  return (
    <div className="p-3 border-t border-slate-200/60 bg-gradient-to-r from-white to-slate-50">
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300",
        "text-red-600 hover:text-red-700 hover:bg-red-50 hover:shadow-sm",
        isCollapsed ? "justify-center px-3" : "px-3"
      )}>
        <LogOut size={14} />
        {!isCollapsed && <button onClick={handleLogout} className="font-medium text-xs">Sair</button>}
      </div>
    </div>
  );
};

export default SidebarFooter;
