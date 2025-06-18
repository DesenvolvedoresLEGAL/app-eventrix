
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { EventStatus, EventCategory } from '@/types/events';

/**
 * Utilitários para formatação e manipulação de dados de eventos
 */

// Mapeamento de status para labels em português
export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  'upcoming': 'Próximo',
  'in_progress': 'Em andamento', 
  'completed': 'Concluído'
};

// Mapeamento de categorias para labels em português
export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  'conferencia': 'Conferência',
  'workshop': 'Workshop',
  'seminario': 'Seminário',
  'feira/exposicao': 'Feira/Exposição',
  'festival': 'Festival',
  'congresso': 'Congresso',
  'treinamento': 'Treinamento',
  'lancamento de produto': 'Lançamento de Produto',
  'networking': 'Networking',
  'webinar': 'Webinar',
  'outro': 'Outro'
};

/**
 * Formata uma data ISO para formato brasileiro
 * @param dateString - String da data em formato ISO
 * @param includeTime - Se deve incluir horário na formatação
 * @returns Data formatada ou string vazia se inválida
 */
export const formatEventDate = (
  dateString: string | null, 
  includeTime: boolean = false
): string => {
  if (!dateString) return '';
  
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return '';
    
    const formatStr = includeTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy';
    return format(date, formatStr, { locale: ptBR });
  } catch (error) {
    console.warn('Erro ao formatar data:', dateString, error);
    return '';
  }
};

/**
 * Formata período do evento (data inicial - data final)
 * @param startDate - Data de início
 * @param endDate - Data de fim
 * @param startTime - Horário de início (opcional)
 * @param endTime - Horário de fim (opcional)
 * @returns String formatada do período
 */
export const formatEventPeriod = (
  startDate: string | null,
  endDate: string | null,
  startTime?: string | null,
  endTime?: string | null
): string => {
  const formattedStart = formatEventDate(startDate);
  const formattedEnd = formatEventDate(endDate);
  
  if (!formattedStart && !formattedEnd) {
    return 'Data não definida';
  }
  
  if (formattedStart === formattedEnd) {
    // Mesmo dia
    if (startTime && endTime) {
      return `${formattedStart}, ${startTime} - ${endTime}`;
    }
    return formattedStart;
  }
  
  // Dias diferentes
  if (formattedStart && formattedEnd) {
    return `${formattedStart} - ${formattedEnd}`;
  }
  
  return formattedStart || formattedEnd;
};

/**
 * Formata localização do evento
 * @param location - Localização geral
 * @param city - Cidade
 * @param state - Estado
 * @param venueName - Nome do local
 * @returns String formatada da localização
 */
export const formatEventLocation = (
  location: string | null,
  city: string | null,
  state: string | null,
  venueName: string | null
): string => {
  const parts: string[] = [];
  
  if (venueName) parts.push(venueName);
  if (location) parts.push(location);
  if (city && state) {
    parts.push(`${city}, ${state}`);
  } else if (city) {
    parts.push(city);
  } else if (state) {
    parts.push(state);
  }
  
  return parts.length > 0 ? parts.join(' - ') : 'Local não definido';
};

/**
 * Obtém a cor CSS para o badge de status
 * @param status - Status do evento
 * @returns Classes CSS para o badge
 */
export const getStatusBadgeClasses = (status: EventStatus | null): string => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'in_progress':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Obtém label do status em português
 * @param status - Status do evento
 * @returns Label em português
 */
export const getStatusLabel = (status: EventStatus | null): string => {
  return status ? EVENT_STATUS_LABELS[status] : 'Indefinido';
};

/**
 * Obtém label da categoria em português
 * @param category - Categoria do evento
 * @returns Label em português
 */
export const getCategoryLabel = (category: EventCategory): string => {
  return EVENT_CATEGORY_LABELS[category] || 'Outro';
};
