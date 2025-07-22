
import React from 'react';
import { Calendar, Edit, Info, MoreHorizontal, Trash2 } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  exhibitors: number;
}

const EventsList = () => {
  // Sample data
  const events: Event[] = [
    {
      id: 1,
      name: 'Tech Summit 2024',
      date: '10-12 de Outubro, 2024',
      location: 'São Paulo, SP',
      status: 'upcoming',
      exhibitors: 120,
    },
    {
      id: 2,
      name: 'Business Expo 2024',
      date: '15-18 de Setembro, 2024',
      location: 'Rio de Janeiro, RJ',
      status: 'upcoming',
      exhibitors: 85,
    },
    {
      id: 3,
      name: 'Innovation Conference',
      date: '20-22 de Julho, 2024',
      location: 'Belo Horizonte, MG',
      status: 'ongoing',
      exhibitors: 50,
    },
    {
      id: 4,
      name: 'Digital Marketing Forum',
      date: '5-7 de Junho, 2024',
      location: 'Florianópolis, SC',
      status: 'completed',
      exhibitors: 32,
    },
    {
      id: 5,
      name: 'Startup Weekend',
      date: '18-20 de Maio, 2024',
      location: 'Recife, PE',
      status: 'completed',
      exhibitors: 25,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Próximo</span>;
      case 'ongoing':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Em andamento</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Concluído</span>;
      default:
        return null;
    }
  };

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
                  <td className="px-4 py-3">{event.date}</td>
                  <td className="px-4 py-3">{event.location}</td>
                  <td className="px-4 py-3">{getStatusBadge(event.status)}</td>
                  <td className="px-4 py-3">{event.exhibitors}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-2">
                      <button className="p-1.5 rounded-md hover:bg-muted">
                        <Info size={16} className="text-primary" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-muted">
                        <Edit size={16} className="text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-muted">
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
    </div>
  );
};

export default EventsList;
