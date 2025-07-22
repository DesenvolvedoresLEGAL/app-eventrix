
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import AccessHistoryManager from '@/components/access-history/AccessHistoryManager';

const AccessHistory = () => {
  return (
    <DashboardLayout title="Histórico de Acessos">
      <AccessHistoryManager />
    </DashboardLayout>
  );
};

export default AccessHistory;
