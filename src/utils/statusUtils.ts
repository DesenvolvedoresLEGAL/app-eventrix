import { useMemo } from 'react';

/**
 * Utilitários para mapeamento de status e suas respectivas classes CSS
 */

export type StatusType = 
  | 'Ativo' | 'Inativo' | 'Pendente' | 'Bloqueado' | 'Suspenso'
  | 'Confirmado' | 'Check-in' | 'Check-out'
  | 'Disponível' | 'Ocupado' | 'Manutenção'
  | 'Em Progresso' | 'Concluído' | 'Férias' | 'Licença';

export const getStatusClasses = (status: StatusType): string => {
  const statusMap: Record<StatusType, string> = {
    // Staff/Generic statuses
    'Ativo': 'bg-green-100 text-green-800',
    'Inativo': 'bg-gray-100 text-gray-800',
    'Pendente': 'bg-yellow-100 text-yellow-800',
    'Bloqueado': 'bg-red-100 text-red-800',
    'Suspenso': 'bg-red-100 text-red-800',
    
    // Visitor statuses
    'Confirmado': 'bg-blue-100 text-blue-800',
    'Check-in': 'bg-green-100 text-green-800',
    'Check-out': 'bg-gray-100 text-gray-800',
    
    // Venue statuses
    'Disponível': 'bg-green-100 text-green-800',
    'Ocupado': 'bg-orange-100 text-orange-800',
    'Manutenção': 'bg-red-100 text-red-800',
    
    // Task statuses
    'Em Progresso': 'bg-blue-100 text-blue-800',
    'Concluído': 'bg-green-100 text-green-800',
    
    // Leave statuses
    'Férias': 'bg-blue-100 text-blue-800',
    'Licença': 'bg-yellow-100 text-yellow-800'
  };
  
  return statusMap[status] || 'bg-gray-100 text-gray-800';
};

export const getShiftClasses = (shift: string): string => {
  const shiftMap: Record<string, string> = {
    'Manhã': 'bg-yellow-100 text-yellow-800',
    'Tarde': 'bg-orange-100 text-orange-800',
    'Noite': 'bg-purple-100 text-purple-800',
    'Integral': 'bg-blue-100 text-blue-800'
  };
  
  return shiftMap[shift] || 'bg-gray-100 text-gray-800';
};

export const getCategoryClasses = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'VIP': 'bg-purple-100 text-purple-800',
    'Imprensa': 'bg-orange-100 text-orange-800',
    'Geral': 'bg-blue-100 text-blue-800',
    'Estudante': 'bg-green-100 text-green-800'
  };
  
  return categoryMap[category] || 'bg-gray-100 text-gray-800';
};

export const getSupplierCategoryClasses = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'Audiovisual': 'bg-purple-100 text-purple-800',
    'Alimentação': 'bg-orange-100 text-orange-800',
    'Segurança': 'bg-red-100 text-red-800',
    'Decoração': 'bg-pink-100 text-pink-800',
    'Limpeza': 'bg-blue-100 text-blue-800',
    'Transporte': 'bg-green-100 text-green-800'
  };
  
  return categoryMap[category] || 'bg-gray-100 text-gray-800';
};

/**
 * Hook para memoizar classes de status
 */
export const useStatusClasses = (status: StatusType) => {
  return useMemo(() => getStatusClasses(status), [status]);
};

export const useShiftClasses = (shift: string) => {
  return useMemo(() => getShiftClasses(shift), [shift]);
};

export const useCategoryClasses = (category: string) => {
  return useMemo(() => getCategoryClasses(category), [category]);
};

export const useSupplierCategoryClasses = (category: string) => {
  return useMemo(() => getSupplierCategoryClasses(category), [category]);
};
