
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import PermissionsList from '@/components/permissions/PermissionsList';
import { RolesAdminProvider } from '@/context/RolesAdminContext';

const Permissions = () => {
  return (
    <RolesAdminProvider>
      <DashboardLayout title="Permissões e Perfis">
        <PermissionsList />
      </DashboardLayout>
    </RolesAdminProvider>
  );
};

export default Permissions;
