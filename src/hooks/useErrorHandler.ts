import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ErrorDetails {
  type: 'network' | 'permission' | 'validation' | 'auth' | 'data' | 'unknown';
  message: string;
  originalError?: Error;
  retryable: boolean;
  code?: string;
}

export interface UseErrorHandlerReturn {
  error: ErrorDetails | null;
  isRetrying: boolean;
  retryCount: number;
  canRetry: boolean;
  maxRetries: number;
  handleError: (error: Error | ErrorDetails | string) => void;
  retry: () => Promise<void>;
  clearError: () => void;
  setRetryHandler: (handler: () => Promise<void>) => void;
}

interface UseErrorHandlerOptions {
  maxRetries?: number;
  showToast?: boolean;
  autoRetry?: boolean;
  retryDelay?: number;
}

export const useErrorHandler = (options: UseErrorHandlerOptions = {}): UseErrorHandlerReturn => {
  const {
    maxRetries = 3,
    showToast = true,
    autoRetry = false,
    retryDelay = 1000,
  } = options;

  const { toast } = useToast();
  const [error, setError] = useState<ErrorDetails | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [retryHandler, setRetryHandlerState] = useState<(() => Promise<void>) | null>(null);

  // Classificar o tipo de erro baseado na mensagem e propriedades
  const classifyError = useCallback((error: Error | string): ErrorDetails => {
    const message = typeof error === 'string' ? error : error.message;
    const originalError = typeof error === 'string' ? undefined : error;

    // Erros de rede
    if (message.includes('fetch') || 
        message.includes('network') || 
        message.includes('NetworkError') ||
        message.includes('Failed to fetch')) {
      return {
        type: 'network',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.',
        originalError,
        retryable: true,
        code: 'NETWORK_ERROR'
      };
    }

    // Erros de autenticação
    if (message.includes('unauthorized') || 
        message.includes('authentication') ||
        message.includes('token') ||
        message.includes('login')) {
      return {
        type: 'auth',
        message: 'Sessão expirada. Faça login novamente.',
        originalError,
        retryable: false,
        code: 'AUTH_ERROR'
      };
    }

    // Erros de permissão
    if (message.includes('permission') || 
        message.includes('forbidden') ||
        message.includes('access denied')) {
      return {
        type: 'permission',
        message: 'Você não tem permissão para realizar esta ação.',
        originalError,
        retryable: false,
        code: 'PERMISSION_ERROR'
      };
    }

    // Erros de validação
    if (message.includes('validation') || 
        message.includes('invalid') ||
        message.includes('required')) {
      return {
        type: 'validation',
        message: 'Dados inválidos. Verifique as informações e tente novamente.',
        originalError,
        retryable: false,
        code: 'VALIDATION_ERROR'
      };
    }

    // Erros de dados/servidor
    if (message.includes('server') || 
        message.includes('500') ||
        message.includes('database')) {
      return {
        type: 'data',
        message: 'Erro no servidor. Tente novamente em alguns instantes.',
        originalError,
        retryable: true,
        code: 'SERVER_ERROR'
      };
    }

    // Erro genérico
    return {
      type: 'unknown',
      message: 'Ocorreu um erro inesperado. Tente novamente.',
      originalError,
      retryable: true,
      code: 'UNKNOWN_ERROR'
    };
  }, []);

  const handleError = useCallback((errorInput: Error | ErrorDetails | string) => {
    let errorDetails: ErrorDetails;

    if (typeof errorInput === 'object' && 'type' in errorInput) {
      // Já é um ErrorDetails
      errorDetails = errorInput;
    } else {
      // Classificar o erro
      errorDetails = classifyError(errorInput as Error | string);
    }

    setError(errorDetails);
    setRetryCount(0);

    // Mostrar toast se habilitado
    if (showToast) {
      toast({
        title: "Erro",
        description: errorDetails.message,
        variant: "destructive",
      });
    }

    // Log para desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('Error handled:', errorDetails);
    }

    // Auto retry para erros específicos
    if (autoRetry && errorDetails.retryable && retryHandler) {
      setTimeout(() => {
        retry();
      }, retryDelay);
    }
  }, [classifyError, showToast, toast, autoRetry, retryDelay, retryHandler]);

  const retry = useCallback(async () => {
    if (!error?.retryable || retryCount >= maxRetries || !retryHandler) {
      return;
    }

    setIsRetrying(true);
    setRetryCount(prev => prev + 1);

    try {
      await retryHandler();
      setError(null);
      setRetryCount(0);
    } catch (retryError) {
      console.error('Retry failed:', retryError);
      handleError(retryError as Error);
    } finally {
      setIsRetrying(false);
    }
  }, [error, retryCount, maxRetries, retryHandler, handleError]);

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
    setIsRetrying(false);
  }, []);

  const setRetryHandler = useCallback((handler: () => Promise<void>) => {
    setRetryHandlerState(() => handler);
  }, []);

  const canRetry = useMemo(() => {
    return error?.retryable === true && retryCount < maxRetries && !isRetrying;
  }, [error, retryCount, maxRetries, isRetrying]);

  return {
    error,
    isRetrying,
    retryCount,
    canRetry,
    maxRetries,
    handleError,
    retry,
    clearError,
    setRetryHandler,
  };
};