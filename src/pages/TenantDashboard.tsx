import React from 'react'
import DashboardLayout from '@/components/layout/Dashboard'
import { useAuth } from '@features/auth'
import InviteModal from '@/components/modals/InviteModal'

const TenantDashboard: React.FC = () => {
  // Obtém tenant do contexto de autenticação
  const { tenant } = useAuth()

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Bem-vindo</h2>
        {tenant ? (
          <p className="text-muted-foreground">Dados filtrados para o tenant: {tenant.id}</p>
        ) : (
          <p className="text-muted-foreground">Nenhum tenant selecionado</p>
        )}
        {/* Modal de convite de usuário */}
        <InviteModal />
      </div>
    </DashboardLayout>
  )
}

export default TenantDashboard
