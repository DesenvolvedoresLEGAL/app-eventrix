import React from 'react'
import { useParams } from 'react-router-dom'
import TenantDashboard from '@/features/tenantDashboard/TenantDashboard'

const TenantDashboardPage: React.FC = () => {
  const { tenantId = '1' } = useParams<{ tenantId: string }>()
  return (
    <div className="p-6">
      <TenantDashboard tenantId={tenantId} />
    </div>
  )
}

export default TenantDashboardPage
