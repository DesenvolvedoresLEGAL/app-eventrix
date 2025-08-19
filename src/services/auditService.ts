// Desabilitado temporariamente devido a conflitos com o schema do banco
// O sistema de auditoria será reimplementado posteriormente

import { AuditLogEntry } from '@/types/roles.types';

export interface AuditFilters {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  action?: 'CREATE' | 'UPDATE' | 'DELETE' | 'ASSIGN' | 'UNASSIGN';
  entityType?: 'ROLE' | 'PERMISSION' | 'USER_ROLE';
  entityId?: string;
  page?: number;
  limit?: number;
}

export interface AuditStats {
  totalEntries: number;
  entriesThisMonth: number;
  mostActiveUser: {
    userId: string;
    count: number;
  } | null;
  actionDistribution: Record<string, number>;
  recentActivity: AuditLogEntry[];
}

// Service temporariamente desabilitado - implementação futura
export const auditService = {
  logRoleChange: async (...args: any[]) => {
    console.log('Audit service temporarily disabled');
  },
  getAuditHistory: async (filters?: AuditFilters) => ({
    entries: [] as AuditLogEntry[], 
    total: 0, 
    page: 1, 
    totalPages: 0 
  }),
  getAuditStats: async () => ({ 
    totalEntries: 0, 
    entriesThisMonth: 0, 
    mostActiveUser: null, 
    actionDistribution: {} as Record<string, number>, 
    recentActivity: [] as AuditLogEntry[]
  }),
  exportAuditLog: async (...args: any[]) => new Blob(),
  cleanupOldEntries: async (...args: any[]) => 0
};

export type { AuditFilters as AuditFiltersType, AuditStats as AuditStatsType };