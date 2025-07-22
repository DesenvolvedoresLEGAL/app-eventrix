
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import TracksList from '@/components/tracks/TracksList';

const Tracks = () => {
  return (
    <DashboardLayout title="Trilhas">
      <TracksList />
    </DashboardLayout>
  );
};

export default Tracks;
