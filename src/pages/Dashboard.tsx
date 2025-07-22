
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default Dashboard;
