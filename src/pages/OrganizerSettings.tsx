import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import { OrganizerDataForm } from '@/components/settings/OrganizerDataForm';

const OrganizerSettings: React.FC = () => {
  return (
    <DashboardLayout title="Configurações da Organização">
      <OrganizerDataForm />
    </DashboardLayout>
  );
};

export default OrganizerSettings;