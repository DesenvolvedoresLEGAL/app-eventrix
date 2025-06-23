
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { StaffService } from '@/services/staffService';
import { Database } from '@/integrations/supabase/types';
import { useMemo } from 'react';

type StaffMember = Database['public']['Tables']['event_team']['Row'];
type StaffInsert = Database['public']['Tables']['event_team']['Insert'];
type StaffUpdate = Database['public']['Tables']['event_team']['Update'];

export const useStaff = (eventId?: string) => {
  const queryClient = useQueryClient();

  // Query para buscar staff do evento
  const {
    data: staffMembers = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['staff', eventId],
    queryFn: () => eventId ? StaffService.getEventStaff(eventId) : Promise.resolve([]),
    enabled: !!eventId
  });

  // Mutation para criar staff
  const createStaffMutation = useMutation({
    mutationFn: (data: StaffInsert) => StaffService.createStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', eventId] });
    }
  });

  // Mutation para atualizar staff
  const updateStaffMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: StaffUpdate }) => 
      StaffService.updateStaff(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', eventId] });
    }
  });

  // Mutation para deletar staff
  const deleteStaffMutation = useMutation({
    mutationFn: (id: string) => StaffService.deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff', eventId] });
    }
  });

  // Estatísticas memoizadas
  const stats = useMemo(() => {
    const active = staffMembers.filter(s => s.status === 'Ativo').length;
    const departments = new Set(staffMembers.map(s => s.department).filter(Boolean)).size;
    const withPermissions = staffMembers.filter(s => s.permissions && s.permissions.length > 0).length;

    return {
      total: staffMembers.length,
      active,
      departments,
      withPermissions
    };
  }, [staffMembers]);

  return {
    staffMembers,
    stats,
    isLoading,
    error,
    createStaff: createStaffMutation.mutate,
    updateStaff: updateStaffMutation.mutate,
    deleteStaff: deleteStaffMutation.mutate,
    isCreating: createStaffMutation.isPending,
    isUpdating: updateStaffMutation.isPending,
    isDeleting: deleteStaffMutation.isPending
  };
};

export const useStaffById = (id?: string) => {
  return useQuery({
    queryKey: ['staff', 'detail', id],
    queryFn: () => id ? StaffService.getStaffById(id) : Promise.resolve(null),
    enabled: !!id
  });
};
