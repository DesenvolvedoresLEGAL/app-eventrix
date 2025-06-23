
import React, { useMemo } from 'react';
import { Calendar, MapPin, Users, Globe, Wifi, Accessibility, Eye, Building } from 'lucide-react';
import { useEvent } from '@/hooks/useEvents';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  formatEventPeriod, 
  formatEventLocation, 
  getStatusBadgeClasses, 
  getStatusLabel,
  getCategoryLabel 
} from '@/utils/eventUtils';

interface EventDetailsModalProps {
  eventId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal = ({ eventId, isOpen, onClose }: EventDetailsModalProps) => {
  const { data: event, isLoading, error } = useEvent(eventId);

  // Função para mapear font_style para família de fontes
  const getFontFamily = useMemo(() => (fontStyle: string | null) => {
    const fontMap: Record<string, string> = {
      'roboto': 'Roboto, sans-serif',
      'montserrat': 'Montserrat, sans-serif',
      'open_sans': 'Open Sans, sans-serif',
      'lato': 'Lato, sans-serif',
      'poppins': 'Poppins, sans-serif',
    };
    return fontMap[fontStyle || ''] || 'Inter, sans-serif';
  }, []);

  // Função para garantir contraste adequado
  const getContrastColor = useMemo(() => (bgColor: string | null) => {
    if (!bgColor) return '#000000';
    
    // Remove # se presente
    const hex = bgColor.replace('#', '');
    
    // Converte para RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcula luminância
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retorna branco ou preto baseado na luminância
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }, []);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-0"
        style={{ 
          fontFamily: event ? getFontFamily(event.font_style) : 'Inter, sans-serif' 
        }}
      >
        {/* Banner Section */}
        {event?.banner_url && (
          <div 
            className="w-full h-32 md:h-48 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${event.banner_url})` }}
          />
        )}
        
        {/* Header com logo e título */}
        <div className="p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-4">
              {event?.logo_url && (
                <img 
                  src={event.logo_url} 
                  alt="Logo do evento" 
                  className="h-8 md:h-12 w-auto max-w-24 md:max-w-32 object-contain"
                />
              )}
              {isLoading ? (
                <Skeleton className="h-8 w-64" />
              ) : (
                <span 
                  style={{ 
                    color: event?.primary_color || 'inherit' 
                  }}
                >
                  {event?.name || 'Detalhes do Evento'}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6">
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">❌ Erro ao carregar detalhes do evento</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          )}

          {isLoading && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {event && !isLoading && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 
                      className="text-lg font-semibold mb-2 flex items-center"
                      style={{ color: event.primary_color || 'inherit' }}
                    >
                      <Calendar 
                        className="mr-2 h-5 w-5" 
                        style={{ color: event.primary_color || 'inherit' }}
                      />
                      Informações Básicas
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Categoria:</span>
                        <span className="text-sm">{getCategoryLabel(event.category)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(event.status)}`}
                          style={{
                            backgroundColor: event.secondary_color ? `${event.secondary_color}20` : undefined,
                            color: event.secondary_color || undefined,
                            borderColor: event.secondary_color || undefined,
                            border: event.secondary_color ? `1px solid ${event.secondary_color}` : undefined
                          }}
                        >
                          {getStatusLabel(event.status)}
                        </span>
                      </div>
                      {event.short_description && (
                        <div>
                          <span className="text-sm font-medium">Descrição:</span>
                          <p className="text-sm text-muted-foreground mt-1">{event.short_description}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Data e Horário */}
                  <div>
                    <h3 
                      className="text-lg font-semibold mb-2 flex items-center"
                      style={{ color: event.primary_color || 'inherit' }}
                    >
                      <Calendar 
                        className="mr-2 h-5 w-5" 
                        style={{ color: event.primary_color || 'inherit' }}
                      />
                      Data e Horário
                    </h3>
                    <div 
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: event.primary_color ? `${event.primary_color}10` : undefined,
                        borderColor: event.primary_color || undefined,
                        border: event.primary_color ? `1px solid ${event.primary_color}30` : undefined
                      }}
                    >
                      <p className="text-sm font-medium">
                        {formatEventPeriod(
                          event.start_date, 
                          event.end_date, 
                          event.start_time, 
                          event.end_time
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Localização */}
                  <div>
                    <h3 
                      className="text-lg font-semibold mb-2 flex items-center"
                      style={{ color: event.primary_color || 'inherit' }}
                    >
                      <MapPin 
                        className="mr-2 h-5 w-5" 
                        style={{ color: event.primary_color || 'inherit' }}
                      />
                      Localização
                    </h3>
                    <div className="space-y-2">
                      {event.venue_name && (
                        <div className="flex items-center">
                          <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{event.venue_name}</span>
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {formatEventLocation(
                          event.location,
                          event.city,
                          event.state,
                          event.venue_name
                        )}
                      </div>
                      {event.full_address && (
                        <p className="text-sm text-muted-foreground">{event.full_address}</p>
                      )}
                    </div>
                  </div>

                  {/* Detalhes do Evento */}
                  <div>
                    <h3 
                      className="text-lg font-semibold mb-2 flex items-center"
                      style={{ color: event.primary_color || 'inherit' }}
                    >
                      <Users 
                        className="mr-2 h-5 w-5" 
                        style={{ color: event.primary_color || 'inherit' }}
                      />
                      Detalhes
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Expositores:</span>
                        <span className="text-sm">{event.exhibitors_count || 0}</span>
                      </div>
                      {event.estimated_capacity && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Capacidade:</span>
                          <span className="text-sm">{event.estimated_capacity.toLocaleString()}</span>
                        </div>
                      )}
                      {event.total_area && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Área Total:</span>
                          <span className="text-sm">{event.total_area} m²</span>
                        </div>
                      )}
                      {event.has_accessibility && (
                        <div 
                          className="flex items-center text-sm"
                          style={{ color: event.secondary_color || '#10b981' }}
                        >
                          <Accessibility className="mr-2 h-4 w-4" />
                          Acessibilidade disponível
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Configurações */}
              <div>
                <h3 
                  className="text-lg font-semibold mb-2 flex items-center"
                  style={{ color: event.primary_color || 'inherit' }}
                >
                  <Globe 
                    className="mr-2 h-5 w-5" 
                    style={{ color: event.primary_color || 'inherit' }}
                  />
                  Configurações
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Registro Público:</span>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          event.is_public_registration 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                        style={event.is_public_registration && event.secondary_color ? {
                          backgroundColor: `${event.secondary_color}20`,
                          color: event.secondary_color
                        } : undefined}
                      >
                        {event.is_public_registration ? 'Sim' : 'Não'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Transmissão Online:</span>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          event.has_online_broadcast 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                        style={event.has_online_broadcast && event.secondary_color ? {
                          backgroundColor: `${event.secondary_color}20`,
                          color: event.secondary_color
                        } : undefined}
                      >
                        {event.has_online_broadcast ? 'Sim' : 'Não'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {event.broadcast_platform && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Plataforma:</span>
                        <span className="text-sm">{event.broadcast_platform}</span>
                      </div>
                    )}
                    {event.official_website && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Site Oficial:</span>
                        <a 
                          href={event.official_website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                          style={{ color: event.secondary_color || '#3b82f6' }}
                        >
                          Acessar site
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Identidade Visual */}
              {(event.logo_url || event.banner_url) && (
                <div>
                  <h3 
                    className="text-lg font-semibold mb-2 flex items-center"
                    style={{ color: event.primary_color || 'inherit' }}
                  >
                    <Eye 
                      className="mr-2 h-5 w-5" 
                      style={{ color: event.primary_color || 'inherit' }}
                    />
                    Identidade Visual
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.logo_url && (
                      <div>
                        <p className="text-sm font-medium mb-2">Logo:</p>
                        <div className="border rounded-lg p-4 bg-muted/50">
                          <img 
                            src={event.logo_url} 
                            alt="Logo do evento" 
                            className="max-h-16 max-w-32 object-contain mx-auto"
                          />
                        </div>
                      </div>
                    )}
                    {event.banner_url && (
                      <div>
                        <p className="text-sm font-medium mb-2">Banner:</p>
                        <div className="border rounded-lg p-4 bg-muted/50">
                          <img 
                            src={event.banner_url} 
                            alt="Banner do evento" 
                            className="max-h-16 max-w-full object-contain mx-auto"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cores do Tema */}
              {(event.primary_color || event.secondary_color) && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cores do Tema</h3>
                  <div className="flex space-x-4">
                    {event.primary_color && (
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: event.primary_color }}
                        />
                        <span className="text-sm">Primária: {event.primary_color}</span>
                      </div>
                    )}
                    {event.secondary_color && (
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: event.secondary_color }}
                        />
                        <span className="text-sm">Secundária: {event.secondary_color}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Observações */}
              {event.notes && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Observações</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{event.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
