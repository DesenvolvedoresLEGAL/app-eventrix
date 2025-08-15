import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldX, ArrowLeft, Mail, Home, Calendar, Users, Activity, CheckSquare, QrCode, Megaphone, MessageSquare, BarChart3, Puzzle, Zap, Settings, HelpCircle } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { getRouteIcon } from '@/utils/navigationUtils';

// Componente para loading state
const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-4 w-3/4 mx-auto" />
    <div className="space-y-2">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

// Mapeamento de ícones
const iconMap = {
  Home, Calendar, Users, Activity, CheckSquare, QrCode, Megaphone, 
  MessageSquare, BarChart3, Puzzle, Zap, Settings, HelpCircle, ArrowLeft
};

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const { firstAccessibleRoute, redirectToFirstAccessible, isLoading, hasNoAccess, error, clearError, retry } = useSmartNavigation();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRetryNavigation = async () => {
    await retry();
  };

  // Obter ícone dinâmico baseado na rota
  const getIconComponent = (route: string) => {
    const iconName = getRouteIcon(route) as keyof typeof iconMap;
    const IconComponent = iconMap[iconName] || iconMap.ArrowLeft;
    return <IconComponent className="mr-2 h-4 w-4" />;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <ShieldX className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {error ? 'Erro de Navegação' : 'Acesso Negado'}
          </CardTitle>
          <CardDescription>
            {error 
              ? 'Ocorreu um erro ao determinar suas permissões de acesso'
              : 'Você não tem permissão para acessar esta página'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <p className="text-sm text-muted-foreground text-center">
                {error 
                  ? "Houve um problema ao verificar suas permissões. Tente novamente ou entre em contato com o suporte."
                  : hasNoAccess 
                    ? "Você não possui permissão para acessar nenhuma funcionalidade do sistema."
                    : "Redirecionaremos você para uma página permitida ou entre em contato com o administrador."
                }
              </p>
              
              <div className="flex flex-col space-y-2">
                <Button onClick={handleGoBack} variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
                
                {error ? (
                  <Button onClick={handleRetryNavigation} className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Tentar Novamente
                  </Button>
                ) : firstAccessibleRoute ? (
                  <Button onClick={redirectToFirstAccessible} className="w-full">
                    {getIconComponent(firstAccessibleRoute.route)}
                    Ir para {firstAccessibleRoute.displayName}
                  </Button>
                ) : null}
                
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:suporte@eventrix.com.br'}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contatar Suporte
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;