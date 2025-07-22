
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import PermissionsList from '@/components/permissions/PermissionsList';

const Permissions = () => {
  return (
    <DashboardLayout title="Permissões e Perfis">
      <PermissionsList />
    </DashboardLayout>
  );
};

export default Permissions;
