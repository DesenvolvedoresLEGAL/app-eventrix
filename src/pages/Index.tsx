
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.clear();
    // Redirect to login page
    setInterval(() => {
      navigate('/login');
    }, 2000);
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
