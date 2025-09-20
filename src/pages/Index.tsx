import React, { useEffect } from 'react';
import { useAuth } from '@/context/FixedAuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Se não está autenticado, redireciona para landing
    if (!loading && !isAuthenticated) {
      navigate('/welcome');
      return;
    }
    
    // Se está autenticado, redireciona para dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);
   
  // Estado de loading enquanto carrega dados de autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Eventrix™</h1>
          <p className="text-xl text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }
   
  // Fallback
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