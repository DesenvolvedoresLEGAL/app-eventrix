import { toast } from '@/hooks/use-toast';

export interface ErrorDetails {
  type: 'network' | 'validation' | 'server' | 'unknown';
  message: string;
  field?: string;
  code?: string;
}

export function classifyError(error: unknown): ErrorDetails {
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return {
        type: 'network',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      };
    }

    // CNPJ validation errors
    if (error.message.includes('CNPJ')) {
      return {
        type: 'validation',
        message: 'CNPJ inválido. Verifique o formato e tente novamente.',
        field: 'cnpj'
      };
    }

    // CEP validation errors
    if (error.message.includes('CEP')) {
      return {
        type: 'validation',
        message: 'CEP inválido. Verifique o formato e tente novamente.',
        field: 'cep'
      };
    }

    // Color validation errors
    if (error.message.includes('cor') || error.message.includes('color')) {
      return {
        type: 'validation',
        message: 'Formato de cor inválido. Use códigos hexadecimais (#RRGGBB).',
        field: 'color'
      };
    }

    // Server errors
    if (error.message.includes('500') || error.message.includes('server')) {
      return {
        type: 'server',
        message: 'Erro interno do servidor. Tente novamente em alguns minutos.'
      };
    }
  }

  return {
    type: 'unknown',
    message: 'Ocorreu um erro inesperado. Tente novamente.'
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleFormError(error: any): void {
  const errorDetails = classifyError(error);
  
  toast({
    title: getErrorTitle(errorDetails.type),
    description: errorDetails.message,
    variant: "destructive",
  });

  // Log error for debugging
  console.error('Form submission error:', {
    type: errorDetails.type,
    message: errorDetails.message,
    field: errorDetails.field,
    originalError: error
  });
  
  console.error('Error stack:', error.stack);
}

function getErrorTitle(type: ErrorDetails['type']): string {
  switch (type) {
    case 'network':
      return 'Erro de Conexão';
    case 'validation':
      return 'Dados Inválidos';
    case 'server':
      return 'Erro do Servidor';
    default:
      return 'Erro ao Salvar';
  }
}