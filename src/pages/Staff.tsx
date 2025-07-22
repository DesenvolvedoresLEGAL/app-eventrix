
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import StaffList from '@/components/staff/StaffList';

const Staff = () => {
  return (
    <DashboardLayout title="Staff">
      <StaffList />
    </DashboardLayout>
  );
};

export default Staff;
