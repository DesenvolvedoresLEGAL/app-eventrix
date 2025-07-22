
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import NewEventWizard from '@/components/events/NewEventWizard';

const NewEvent = () => {
  return (
    <DashboardLayout title="Criar Novo Evento">
      <NewEventWizard />
    </DashboardLayout>
  );
};

export default NewEvent;
