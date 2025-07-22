
import React from 'react';
import DashboardLayout from '@/components/layout/Dashboard';
import SuppliersList from '@/components/suppliers/SuppliersList';

const Suppliers = () => {
  return (
    <DashboardLayout title="Fornecedores">
      <SuppliersList />
    </DashboardLayout>
  );
};

export default Suppliers;
