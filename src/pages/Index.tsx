
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const { redirectToFirstAccessible, hasNoAccess, isLoading: isLoadingNavigation } = useSmartNavigation();
  
  useEffect(() => {
    // Se não está autenticado, redireciona para landing
    if (!loading && !isAuthenticated) {
      window.location.href = '/welcome';
      return;
    }
    
    // Se está autenticado e as permissões já foram carregadas
    if (isAuthenticated && !isLoadingNavigation) {
      if (hasNoAccess) {
        window.location.href = '/unauthorized';
      } else {
        redirectToFirstAccessible();
      }
    }
  }, [isAuthenticated, loading, isLoadingNavigation, hasNoAccess, redirectToFirstAccessible]);
  
  // Estado de loading enquanto carrega dados de autenticação e navegação
  if (loading || (isAuthenticated && isLoadingNavigation)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Eventrix™</h1>
          <p className="text-xl text-muted-foreground">
            {loading ? 'Carregando...' : 'Redirecionando...'}
          </p>
        </div>
      </div>
    );
  }
  
  // Fallback - não deveria chegar aqui normalmente
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Eventrix™</h1>
        <p className="text-xl text-muted-foreground">Redirecionando...</p>
      </div>
    </div>
  );
};

export default Index;
