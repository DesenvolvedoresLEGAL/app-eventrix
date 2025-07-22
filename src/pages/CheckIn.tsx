
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import CheckInManager from '@/components/checkin/CheckInManager';

const CheckIn = () => {
  return (
    <DashboardLayout title="Check-in/Check-out">
      <CheckInManager />
    </DashboardLayout>
  );
};

export default CheckIn;
