import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface UseAuthValidationReturn {
  isAuthenticated: boolean;
  isValidating: boolean;
  validateAuth: () => Promise<boolean>;
  refreshSession: () => Promise<boolean>;
}

export const useAuthValidation = (): UseAuthValidationReturn => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(false);

  const validateAuth = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);
    
    try {
      // Verificar se temos user e session básicos
      if (!user || !session) {
        console.warn('Auth validation failed: No user or session');
        return false;
      }

      // Verificar se a sessão ainda é válida no Supabase
      const { data: { user: currentUser }, error } = await supabase.auth.getUser();
      
      if (error || !currentUser) {
        console.warn('Auth validation failed: Supabase auth check failed', error);
        return false;
      }

      // Verificar se o token não expirou
      if (session.expires_at && session.expires_at < Math.floor(Date.now() / 1000)) {
        console.warn('Auth validation failed: Session expired');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Auth validation error:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [user, session]);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);
    
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error || !data.session) {
        console.error('Session refresh failed:', error);
        toast({
          title: "Sessão Expirada",
          description: "Sua sessão expirou. Você será redirecionado para o login.",
          variant: "destructive",
        });
        
        // Aguardar um pouco para mostrar o toast antes de redirecionar
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
        
        return false;
      }

      console.log('Session refreshed successfully');
      return true;
    } catch (error) {
      console.error('Session refresh error:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [navigate]);

  // Estado de autenticação baseado em validação básica
  const isAuthenticated = Boolean(user && session);

  return {
    isAuthenticated,
    isValidating,
    validateAuth,
    refreshSession,
  };
};