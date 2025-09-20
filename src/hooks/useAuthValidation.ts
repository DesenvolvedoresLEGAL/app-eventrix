import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/FixedAuthContext';
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
      // Nível 1: Verificação simples do Supabase
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error || !currentSession) {
        console.warn('Auth validation failed: No session in Supabase', error);
        return false;
      }

      // Verificar se há usuário na sessão
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !currentUser) {
        console.warn('Auth validation failed: No user found', userError);
        return false;
      }

      // Verificar se o token não expirou
      if (currentSession.expires_at && currentSession.expires_at < Math.floor(Date.now() / 1000)) {
        console.warn('Auth validation failed: Session expired');
        return false;
      }

      // Verificar sincronização com estado React
      if (!user || !session) {
        console.warn('Auth validation failed: React state desynchronized, triggering sync');
        // Forçar re-sincronização disparando onAuthStateChange
        await supabase.auth.getUser();
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
      // Primeiro verificar se existe uma sessão para refresh
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (!currentSession) {
        console.warn('Cannot refresh session: No active session found');
        toast({
          title: "Sessão Perdida",
          description: "Sua sessão foi perdida. Você será redirecionado para o login.",
          variant: "destructive",
        });
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
        
        return false;
      }

      // Nível 2: Tentar refresh do token
      const { data, error } = await supabase.auth.refreshSession(currentSession);
      
      if (error || !data.session) {
        console.error('Session refresh failed:', error);
        
        // Nível 3: Redirect para re-login completo
        toast({
          title: "Falha na Renovação",
          description: "Não foi possível renovar sua sessão. Faça login novamente.",
          variant: "destructive",
        });
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
        
        return false;
      }

      console.log('Session refreshed successfully');
      return true;
    } catch (error) {
      console.error('Session refresh error:', error);
      
      // Em caso de erro, sempre redirecionar para login
      toast({
        title: "Erro de Autenticação",
        description: "Ocorreu um erro com sua sessão. Faça login novamente.",
        variant: "destructive",
      });
      
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
      
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