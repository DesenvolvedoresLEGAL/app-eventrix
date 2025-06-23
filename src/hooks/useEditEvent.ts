
import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { EventsService } from '@/services/eventsService';
import { useToast } from '@/hooks/use-toast';
import type { Event, EventUpdate } from '@/types/events';

// Interface para os dados do formulário (mesma do NewEventWizard)
interface EventFormData {
  // Informações Básicas
  name: string;
  description: string;
  category: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  website: string;

  // Local e Estrutura
  address: string;
  city: string;
  state: string;
  country: string;
  venueName: string;
  totalArea: string;
  capacity: string;
  accessibility: boolean;
  accessibilityInfo: string;

  // Identidade Visual
  logo: File | null;
  banner: File | null;
  primaryColor: string;
  secondaryColor: string;
  fontStyle: string;

  // Organizadores
  organizerName: string;
  primaryEmail: string;
  phone: string;
  company: string;
  teamMembers: Array<{
    name: string;
    email: string;
    role: string;
  }>;

  // Opções Avançadas
  publicRegistration: boolean;
  isHybrid: boolean;
  streamingPlatform: string;
  specialRequirements: string;
  lgpdAccepted: boolean;
  termsAccepted: boolean;
}

/**
 * Hook para gerenciar edição de eventos
 */
export const useEditEvent = (eventId: string | null) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Estado inicial do formulário
  const initialFormData: EventFormData = {
    name: '',
    description: '',
    category: '',
    startDate: null,
    endDate: null,
    startTime: '',
    endTime: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: 'Brasil',
    venueName: '',
    totalArea: '',
    capacity: '',
    accessibility: false,
    accessibilityInfo: '',
    logo: null,
    banner: null,
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    fontStyle: '',
    organizerName: '',
    primaryEmail: '',
    phone: '',
    company: '',
    teamMembers: [],
    publicRegistration: true,
    isHybrid: false,
    streamingPlatform: '',
    specialRequirements: '',
    lgpdAccepted: true,
    termsAccepted: true,
  };

  const [formData, setFormData] = useState<EventFormData>(initialFormData);

  // Query para buscar o evento
  const {
    data: event,
    isLoading: isLoadingEvent,
    error: eventError,
    refetch: refetchEvent
  } = useQuery({
    queryKey: ['event', eventId, user?.id],
    queryFn: async () => {
      if (!eventId || !user?.id) {
        throw new Error('ID do evento ou usuário não fornecido');
      }
      
      return await EventsService.getEventById(eventId, user.id);
    },
    enabled: !!(eventId && user?.id),
    staleTime: 5 * 60 * 1000,
  });

  // Transformar dados da API para o formato do formulário
  const transformEventToForm = useMemo(() => (event: Event): EventFormData => {
    return {
      name: event.name || '',
      description: event.short_description || '',
      category: event.category || '',
      startDate: event.start_date ? new Date(event.start_date) : null,
      endDate: event.end_date ? new Date(event.end_date) : null,
      startTime: event.start_time || '',
      endTime: event.end_time || '',
      website: event.official_website || '',
      address: event.full_address || '',
      city: event.city || '',
      state: event.state || '',
      country: event.country || 'Brasil',
      venueName: event.venue_name || '',
      totalArea: event.total_area?.toString() || '',
      capacity: event.estimated_capacity?.toString() || '',
      accessibility: event.has_accessibility || false,
      accessibilityInfo: '', // Não temos esse campo na tabela atual
      logo: null, // Files não podem ser pré-carregados
      banner: null, // Files não podem ser pré-carregados
      primaryColor: event.primary_color || '#3B82F6',
      secondaryColor: event.secondary_color || '#1E40AF',
      fontStyle: event.font_style || '',
      organizerName: '', // Vem da tabela event_organizers
      primaryEmail: '', // Vem da tabela event_organizers
      phone: '', // Vem da tabela event_organizers
      company: '', // Vem da tabela event_organizers
      teamMembers: [], // Vem da tabela event_team
      publicRegistration: event.is_public_registration || true,
      isHybrid: event.has_online_broadcast || false,
      streamingPlatform: event.broadcast_platform || '',
      specialRequirements: event.notes || '',
      lgpdAccepted: event.accepted_lgpd || false,
      termsAccepted: event.accepted_eventrix_terms || false,
    };
  }, []);

  // Transformar dados do formulário para o formato da API
  const transformFormToEvent = useMemo(() => (formData: EventFormData): EventUpdate => {
    return {
      name: formData.name,
      short_description: formData.description,
      category: formData.category as any,
      start_date: formData.startDate?.toISOString().split('T')[0] || null,
      end_date: formData.endDate?.toISOString().split('T')[0] || null,
      start_time: formData.startTime || null,
      end_time: formData.endTime || null,
      official_website: formData.website || null,
      full_address: formData.address || null,
      city: formData.city || null,
      state: formData.state || null,
      country: formData.country || null,
      venue_name: formData.venueName || null,
      total_area: formData.totalArea ? parseFloat(formData.totalArea) : null,
      estimated_capacity: formData.capacity ? parseInt(formData.capacity) : null,
      has_accessibility: formData.accessibility,
      primary_color: formData.primaryColor || null,
      secondary_color: formData.secondaryColor || null,
      font_style: formData.fontStyle as any || null,
      is_public_registration: formData.publicRegistration,
      has_online_broadcast: formData.isHybrid,
      broadcast_platform: formData.streamingPlatform || null,
      notes: formData.specialRequirements || null,
      accepted_lgpd: formData.lgpdAccepted,
      accepted_eventrix_terms: formData.termsAccepted,
    };
  }, []);

  // Carregar dados do evento no formulário quando disponível
  useEffect(() => {
    if (event) {
      const transformedData = transformEventToForm(event);
      setFormData(transformedData);
    }
  }, [event, transformEventToForm]);

  // Mutation para atualizar o evento
  const updateEventMutation = useMutation({
    mutationFn: async (updatedData: EventFormData) => {
      if (!eventId || !user?.id) {
        throw new Error('ID do evento ou usuário não fornecido');
      }

      const eventUpdateData = transformFormToEvent(updatedData);
      return await EventsService.updateEvent(eventId, eventUpdateData, user.id);
    },
    onSuccess: () => {
      // Invalidar cache para refetch automático
      queryClient.invalidateQueries({ 
        queryKey: ['events', user?.id] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['event', eventId, user?.id] 
      });

      toast({
        title: "Evento atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: (error: any) => {
      console.error('❌ Erro ao atualizar evento:', error);
      toast({
        title: "Erro ao atualizar evento",
        description: error.message || "Ocorreu um erro inesperado ao salvar as alterações.",
        variant: "destructive",
      });
    },
  });

  // Função para atualizar dados do formulário
  const updateFormData = (updates: Partial<EventFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Função para salvar as alterações
  const saveChanges = async () => {
    try {
      await updateEventMutation.mutateAsync(formData);
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    // Dados
    event,
    formData,
    
    // Estados
    isLoadingEvent,
    eventError,
    isSaving: updateEventMutation.isPending,
    
    // Funções
    updateFormData,
    saveChanges,
    refetchEvent,
    
    // Flags úteis
    hasEvent: !!event,
    isReady: !!event && !isLoadingEvent,
  };
};
