
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import VenuesList from '@/components/venues/VenuesList';

const Venues = () => {
  return (
    <DashboardLayout title="Salas/Locais">
      <VenuesList />
    </DashboardLayout>
  );
};

export default Venues;
