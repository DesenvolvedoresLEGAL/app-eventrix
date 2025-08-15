import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

interface LoadingFallbackProps {
  message?: string;
  description?: string;
  showSkeleton?: boolean;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = "Carregando...",
  description = "Aguarde enquanto carregamos seus dados",
  showSkeleton = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{message}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        {showSkeleton && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default LoadingFallback;