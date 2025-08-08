
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEntryAuthCleanup } from '@/hooks/useEntryAuthCleanup';

const Index = () => {
  const navigate = useNavigate();
  
  // Limpeza de sessão/token ao entrar
  useEntryAuthCleanup();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Eventrix™</h1>
        <p className="text-xl text-muted-foreground">Redirecionando para login...</p>
      </div>
    </div>
  );
};

export default Index;
