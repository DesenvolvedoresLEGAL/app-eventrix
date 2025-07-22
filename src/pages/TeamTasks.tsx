
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import TeamTasksManager from '@/components/team-tasks/TeamTasksManager';

const TeamTasks = () => {
  return (
    <DashboardLayout title="Tarefas por Equipe">
      <TeamTasksManager />
    </DashboardLayout>
  );
};

export default TeamTasks;
