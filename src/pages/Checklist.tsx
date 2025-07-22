
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import ChecklistManager from '@/components/checklist/ChecklistManager';

const Checklist = () => {
  return (
    <DashboardLayout title="Checklist Geral">
      <ChecklistManager />
    </DashboardLayout>
  );
};

export default Checklist;
