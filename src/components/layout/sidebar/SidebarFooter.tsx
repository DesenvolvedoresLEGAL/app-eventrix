
import React, { useState, useCallback } from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // CORREÇÃO: Função otimizada com debounce e tratamento de erros robusto
  const handleLogout = useCallback(async () => {
    // Prevenir múltiplos cliques durante processo de logout
    if (isLoggingOut) {
      console.warn('🚫 Logout already in progress, ignoring additional click');
      return;
    }

    console.log('🚀 SidebarFooter: Starting logout process');
    setIsLoggingOut(true);

    try {
      // Chamar função de logout centralizada
      await logout();
      console.log('✅ SidebarFooter: Logout completed successfully');
      
      // Navegação será feita pelo useAuthOperations, mas mantemos fallback
    } catch (error: any) {
      console.error('❌ SidebarFooter: Logout error caught:', error);
      
      // Fallback de navegação em caso de erro
      console.log('🔄 SidebarFooter: Executing fallback navigation to login');
      navigate('/login', { replace: true });
    } finally {
      // Sempre limpar loading state
      console.log('🧹 SidebarFooter: Cleaning logout loading state');
      setIsLoggingOut(false);
    }
  }, [logout, navigate, isLoggingOut]);

  return (
    <div className="p-3 border-t border-slate-200/60 bg-gradient-to-r from-white to-slate-50">
      <div 
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300",
          "text-red-600 hover:text-red-700 hover:bg-red-50 hover:shadow-sm",
          isCollapsed ? "justify-center px-3" : "px-3",
          // Estado de loading
          isLoggingOut && "opacity-70 cursor-not-allowed"
        )}
        onClick={handleLogout}
        role="button"
        tabIndex={0}
        aria-label={isLoggingOut ? "Saindo..." : "Sair da conta"}
        aria-disabled={isLoggingOut}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isLoggingOut) {
            e.preventDefault();
            handleLogout();
          }
        }}
      >
        <LogOut 
          size={14} 
          className={cn(
            "transition-transform duration-200",
            isLoggingOut && "animate-pulse"
          )}
        />
        {!isCollapsed && (
          <span className="font-medium text-xs">
            {isLoggingOut ? 'Saindo...' : 'Sair'}
          </span>
        )}
      </div>
    </div>
  );
};

export default SidebarFooter;
