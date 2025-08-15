import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/utils/permissions';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredPermission: Permission;
}

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-foreground mb-2">Verificando permissões...</h2>
      <p className="text-muted-foreground">Aguarde um momento</p>
    </div>
  </div>
);

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children, requiredPermission }) => {
  const { hasPermission, isLoading } = usePermissions();

  // Mostrar loading enquanto verifica permissões
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Verificar se o usuário tem a permissão necessária
  if (!hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;