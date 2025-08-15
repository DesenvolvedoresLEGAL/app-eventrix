import supabase from '@/utils/supabase/client';
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

class AuditService {
  private readonly TABLE_NAME = 'role_audit_log';

  /**
   * Log a role-related change
   */
  async logRoleChange(
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ASSIGN' | 'UNASSIGN',
    entityType: 'ROLE' | 'PERMISSION' | 'USER_ROLE',
    entityId: string,
    changes: Record<string, { from?: any; to?: any }>,
    userId?: string
  ): Promise<void> {
    try {
      const currentUser = await supabase.auth.getUser();
      const logUserId = userId || currentUser.data.user?.id;

      if (!logUserId) {
        console.warn('No user ID available for audit log');
        return;
      }

      // Get user agent and IP from headers if available
      const userAgent = navigator?.userAgent || 'Unknown';
      
      const auditEntry = {
        action,
        entity_type: entityType,
        entity_id: entityId,
        user_id: logUserId,
        changes,
        timestamp: new Date().toISOString(),
        user_agent: userAgent,
        ip_address: null, // Will be populated by database trigger if available
      };

      const { error } = await supabase
        .from(this.TABLE_NAME)
        .insert([auditEntry]);

      if (error) {
        console.error('Failed to log audit entry:', error);
        throw error;
      }
    } catch (error) {
      console.error('Audit logging failed:', error);
      // Don't throw - audit logging should not break main functionality
    }
  }

  /**
   * Get audit history with filtering and pagination
   */
  async getAuditHistory(filters: AuditFilters = {}): Promise<{
    entries: AuditLogEntry[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const {
        startDate,
        endDate,
        userId,
        action,
        entityType,
        entityId,
        page = 1,
        limit = 20
      } = filters;

      let query = supabase
        .from(this.TABLE_NAME)
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `);

      // Apply filters
      if (startDate) {
        query = query.gte('timestamp', startDate.toISOString());
      }

      if (endDate) {
        query = query.lte('timestamp', endDate.toISOString());
      }

      if (userId) {
        query = query.eq('user_id', userId);
      }

      if (action) {
        query = query.eq('action', action);
      }

      if (entityType) {
        query = query.eq('entity_type', entityType);
      }

      if (entityId) {
        query = query.eq('entity_id', entityId);
      }

      // Get total count
      const { count } = await query.select('*', { count: 'exact', head: true });
      const total = count || 0;

      // Get paginated results
      const offset = (page - 1) * limit;
      const { data, error } = await query
        .order('timestamp', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Failed to fetch audit history:', error);
        throw error;
      }

      const entries: AuditLogEntry[] = (data || []).map(entry => ({
        id: entry.id,
        action: entry.action,
        entityType: entry.entity_type,
        entityId: entry.entity_id,
        userId: entry.user_id,
        changes: entry.changes || {},
        timestamp: entry.timestamp,
        ipAddress: entry.ip_address,
        userAgent: entry.user_agent,
        user: entry.profiles ? {
          fullName: entry.profiles.full_name,
          email: entry.profiles.email
        } : undefined
      }));

      return {
        entries,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Failed to get audit history:', error);
      throw error;
    }
  }

  /**
   * Get audit statistics
   */
  async getAuditStats(): Promise<AuditStats> {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const thisMonth = new Date();
      thisMonth.setMonth(thisMonth.getMonth(), 1);
      thisMonth.setHours(0, 0, 0, 0);

      // Get total entries
      const { count: totalEntries } = await supabase
        .from(this.TABLE_NAME)
        .select('*', { count: 'exact', head: true });

      // Get entries this month
      const { count: entriesThisMonth } = await supabase
        .from(this.TABLE_NAME)
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', thisMonth.toISOString());

      // Get action distribution
      const { data: actionData } = await supabase
        .from(this.TABLE_NAME)
        .select('action')
        .gte('timestamp', thirtyDaysAgo.toISOString());

      const actionDistribution: Record<string, number> = {};
      actionData?.forEach(entry => {
        actionDistribution[entry.action] = (actionDistribution[entry.action] || 0) + 1;
      });

      // Get most active user
      const { data: userActivity } = await supabase
        .from(this.TABLE_NAME)
        .select('user_id')
        .gte('timestamp', thirtyDaysAgo.toISOString());

      const userCounts: Record<string, number> = {};
      userActivity?.forEach(entry => {
        userCounts[entry.user_id] = (userCounts[entry.user_id] || 0) + 1;
      });

      const mostActiveUser = Object.entries(userCounts)
        .sort(([,a], [,b]) => b - a)[0];

      // Get recent activity
      const { data: recentData } = await supabase
        .from(this.TABLE_NAME)
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order('timestamp', { ascending: false })
        .limit(10);

      const recentActivity: AuditLogEntry[] = (recentData || []).map(entry => ({
        id: entry.id,
        action: entry.action,
        entityType: entry.entity_type,
        entityId: entry.entity_id,
        userId: entry.user_id,
        changes: entry.changes || {},
        timestamp: entry.timestamp,
        ipAddress: entry.ip_address,
        userAgent: entry.user_agent,
        user: entry.profiles ? {
          fullName: entry.profiles.full_name,
          email: entry.profiles.email
        } : undefined
      }));

      return {
        totalEntries: totalEntries || 0,
        entriesThisMonth: entriesThisMonth || 0,
        mostActiveUser: mostActiveUser ? {
          userId: mostActiveUser[0],
          count: mostActiveUser[1]
        } : null,
        actionDistribution,
        recentActivity
      };
    } catch (error) {
      console.error('Failed to get audit stats:', error);
      throw error;
    }
  }

  /**
   * Export audit log to CSV
   */
  async exportAuditLog(
    format: 'csv' | 'json',
    filters: AuditFilters = {}
  ): Promise<Blob> {
    try {
      // Get all entries without pagination for export
      const { entries } = await this.getAuditHistory({
        ...filters,
        limit: 10000 // Large limit for export
      });

      if (format === 'csv') {
        const csvHeaders = [
          'Timestamp',
          'Action',
          'Entity Type',
          'Entity ID',
          'User',
          'Changes',
          'IP Address',
          'User Agent'
        ];

        const csvRows = entries.map(entry => [
          entry.timestamp,
          entry.action,
          entry.entityType,
          entry.entityId,
          entry.user?.fullName || entry.userId,
          JSON.stringify(entry.changes),
          entry.ipAddress || '',
          entry.userAgent || ''
        ]);

        const csvContent = [
          csvHeaders.join(','),
          ...csvRows.map(row => 
            row.map(cell => 
              typeof cell === 'string' && cell.includes(',') 
                ? `"${cell.replace(/"/g, '""')}"` 
                : cell
            ).join(',')
          )
        ].join('\n');

        return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      } else {
        // JSON format
        const jsonContent = JSON.stringify(entries, null, 2);
        return new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      }
    } catch (error) {
      console.error('Failed to export audit log:', error);
      throw error;
    }
  }

  /**
   * Clean up old audit entries (should be run periodically)
   */
  async cleanupOldEntries(retentionDays: number = 365): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      const { count, error } = await supabase
        .from(this.TABLE_NAME)
        .delete({ count: 'exact' })
        .lt('timestamp', cutoffDate.toISOString());

      if (error) {
        console.error('Failed to cleanup old audit entries:', error);
        throw error;
      }

      return count || 0;
    } catch (error) {
      console.error('Audit cleanup failed:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const auditService = new AuditService();

// Export types and interfaces
export type { AuditFilters, AuditStats };