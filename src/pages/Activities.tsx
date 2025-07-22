
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import ActivitiesList from '@/components/activities/ActivitiesList';

const Activities = () => {
  return (
    <DashboardLayout title="Atividades">
      <ActivitiesList />
    </DashboardLayout>
  );
};

export default Activities;
