
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Building2, Mail, User } from 'lucide-react'
import { InviteData } from '../types/invite.types'
import { Tenant } from '@/context/AuthContext'

interface InviteStatusCardProps {
  inviteData: InviteData | null
  tenantData: Tenant | null
  isValidating: boolean
}

const InviteStatusCard: React.FC<InviteStatusCardProps> = ({
  inviteData,
  tenantData,
  isValidating
}) => {
  if (isValidating) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    )
  }

  if (!inviteData || !tenantData) {
    return null
  }

  const getRoleLabel = (role: string) => {
    const labels = {
      owner: 'Proprietário',
      admin: 'Administrador',
      manager: 'Gerente',
      staff: 'Colaborador'
    }
    return labels[role as keyof typeof labels] || role
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      revoked: 'bg-gray-100 text-gray-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Convite para {tenantData.nome_fantasia || tenantData.razao_social}
        </CardTitle>
        <Badge className={getStatusColor(inviteData.status)}>
          {inviteData.status === 'pending' ? 'Pendente' : inviteData.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          {inviteData.email}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          Cargo: {getRoleLabel(inviteData.role)}
        </div>
        <div className="text-xs text-gray-500">
          Convite criado em {new Date(inviteData.created_at).toLocaleDateString('pt-BR')}
        </div>
      </CardContent>
    </Card>
  )
}

export default InviteStatusCard
