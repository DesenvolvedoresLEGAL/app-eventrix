
import React, { useState } from 'react';
import EventsList from '@/components/events/EventsList';
import CreateEvent from '@/components/events/CreateEvent';

const Events = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  
  return (
      <>
      {view === 'list' ? (
        <div>
          <EventsList />
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
    </>
  );
};

export default Events;
