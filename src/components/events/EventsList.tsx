
import React, { useMemo } from 'react';
import { Calendar, Edit, Info, Trash2 } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/context/AuthContext';
import { 
  formatEventPeriod, 
  formatEventLocation, 
  getStatusBadgeClasses, 
  getStatusLabel 
} from '@/utils/eventUtils';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const EventsList = () => {
  const { user } = useAuth();
  const { events, isLoading, error, hasEvents, refetchEvents, deleteEvent, isDeleting } = useEvents();

  const handleEventDelete = async (eventId: string, eventName: string) => {
    const confirmation = confirm(`Certeza que deseja deletar o evento "${eventName}"?\nO evento será movido para a lixeira e poderá ser recuperado posteriormente.`);

    if (confirmation) {
      try {
        await deleteEvent(eventId);
        toast.success("Evento movido para a lixeira!", {
          description: "O evento foi deletado com sucesso e pode ser recuperado se necessário."
        });
      } catch (error: any) {
        console.error('❌ Erro ao deletar evento:', error);
        toast.error("Erro ao deletar evento", {
          description: error.message || "Ocorreu um erro inesperado ao tentar deletar o evento."
        });
      }
    }
  };

  // Memoizar a renderização da tabela para otimizar performance
  const eventsTable = useMemo(() => {
    if (!hasEvents) return null;

    return (
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b">
                <th className="px-4 py-3 text-left font-medium">Evento</th>
                <th className="px-4 py-3 text-left font-medium">Data</th>
                <th className="px-4 py-3 text-left font-medium">Local</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Expositores</th>
                <th className="px-4 py-3 text-center font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="bg-primary/10 w-8 h-8 rounded flex items-center justify-center mr-3">
                        <Calendar size={16} className="text-primary" />
                      </div>
                      <span className="font-medium">{event.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {formatEventPeriod(
                      event.start_date, 
                      event.end_date, 
                      event.start_time, 
                      event.end_time
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {formatEventLocation(
                      event.location,
                      event.city,
                      event.state,
                      event.venue_name
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(event.status)}`}>
                      {getStatusLabel(event.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {event.exhibitors_count || 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-2">
                      <button className="p-1.5 rounded-md hover:bg-muted">
                        <Info size={16} className="text-primary" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-muted">
                        <Edit size={16} className="text-muted-foreground" />
                      </button>
                      <button 
                        onClick={() => handleEventDelete(event.id, event.name)} 
                        disabled={isDeleting}
                        className="p-1.5 rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }, [events, hasEvents, isDeleting, handleEventDelete]);

  // Loading state
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between mb-6">
          <div>
            <h2>Eventos</h2>
            <p className="text-muted-foreground">Carregando seus eventos...</p>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <div className="flex justify-between mb-6">
          <div>
            <h2>Eventos</h2>
            <p className="text-muted-foreground">Gerencie todos os seus eventos</p>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
            + Novo Evento
          </button>
        </div>

        <Card className="p-6">
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">❌ {error}</p>
            <button 
              onClick={refetchEvents}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return (
      <div>
        <div className="flex justify-between mb-6">
          <div>
            <h2>Eventos</h2>
            <p className="text-muted-foreground">Gerencie todos os seus eventos</p>
          </div>
        </div>

        <Card className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Você precisa estar logado para ver seus eventos.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Empty state
  if (!hasEvents) {
    return (
      <div>
        <div className="flex justify-between mb-6">
          <div>
            <h2>Eventos</h2>
            <p className="text-muted-foreground">Gerencie todos os seus eventos</p>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
            + Novo Evento
          </button>
        </div>

        <Card className="p-6">
          <div className="text-center py-8">
            <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum evento encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Você ainda não criou nenhum evento. Comece criando seu primeiro evento!
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
              + Criar Primeiro Evento
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Main content with events
  return (
    <div>
      <div className="flex justify-between mb-6">
        <div>
          <h2>Eventos</h2>
          <p className="text-muted-foreground">
            Gerencie todos os seus eventos ({events.length} evento{events.length !== 1 ? 's' : ''})
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
          + Novo Evento
        </button>
      </div>

      {eventsTable}
      
      {isDeleting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span>Deletando evento...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsList;
