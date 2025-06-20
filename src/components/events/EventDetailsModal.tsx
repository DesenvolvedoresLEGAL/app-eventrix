
import React from 'react';
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

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isLoading ? (
              <Skeleton className="h-8 w-64" />
            ) : (
              event?.name || 'Detalhes do Evento'
            )}
          </DialogTitle>
        </DialogHeader>

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
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Informações Básicas
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Categoria:</span>
                      <span className="text-sm">{getCategoryLabel(event.category)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(event.status)}`}>
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
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Data e Horário
                  </h3>
                  <div className="bg-muted p-3 rounded-lg">
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
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
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
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Users className="mr-2 h-5 w-5" />
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
                      <div className="flex items-center text-sm text-green-600">
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
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Configurações
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Registro Público:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.is_public_registration 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.is_public_registration ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Transmissão Online:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.has_online_broadcast 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
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
                        className="text-sm text-primary hover:underline"
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
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
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
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
