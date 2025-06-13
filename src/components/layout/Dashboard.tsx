
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { pageTitles } from '@/constants/pageTitles';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? '';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar fixo à esquerda */}
      <Sidebar />

      {/* Conteúdo principal com scroll independente */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
