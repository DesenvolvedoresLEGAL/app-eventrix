
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import VisitorsList from '@/components/visitors/VisitorsList';

const Visitors = () => {
  return (
    <DashboardLayout title="Visitantes">
      <VisitorsList />
    </DashboardLayout>
  );
};

export default Visitors;
