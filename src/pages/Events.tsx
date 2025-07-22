
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import EventsList from '@/components/events/EventsList';
import CreateEvent from '@/components/events/CreateEvent';

const Events = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  
  return (
    <DashboardLayout title={view === 'list' ? 'Eventos' : 'Criar Evento'}>
      {view === 'list' ? (
        <div>
          <EventsList />
          <div className="fixed bottom-6 right-6">
            <button 
              onClick={() => setView('create')}
              className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
            >
              <span className="text-2xl font-bold">+</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button 
            onClick={() => setView('list')}
            className="mb-4 text-sm flex items-center hover:underline"
          >
            ← Voltar para lista de eventos
          </button>
          <CreateEvent />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Events;
