
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import LecturesList from '@/components/lectures/LecturesList';

const Lectures = () => {
  return (
    <DashboardLayout title="Palestras">
      <LecturesList />
    </DashboardLayout>
  );
};

export default Lectures;
