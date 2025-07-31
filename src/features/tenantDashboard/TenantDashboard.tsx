import React from 'react'

/**
 * Lista de dados da empresa filtrados por tenant_id (dados fictícios)
 */
export interface TenantDashboardProps {
  tenantId: string
}

interface DataItem {
  id: number
  name: string
  value: string
}

const sampleData: DataItem[] = [
  { id: 1, name: 'Eventos', value: '3' },
  { id: 2, name: 'Usuários', value: '12' },
  { id: 3, name: 'Visitantes', value: '150' }
]

const TenantDashboard: React.FC<TenantDashboardProps> = ({ tenantId }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard da Empresa</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Dados filtrados para tenant: <strong>{tenantId}</strong>
      </p>
      <table className="w-full text-sm border">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Valor</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map(item => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TenantDashboard
