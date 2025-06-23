
import React, { memo, useMemo } from 'react';
import { Mail, Phone, Building, Calendar, Clock, QrCode } from 'lucide-react';
import EntityDetails from '@/components/common/EntityDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCategoryClasses, useStatusClasses } from '@/utils/statusUtils';

interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  category: 'VIP' | 'Imprensa' | 'Geral' | 'Estudante';
  status: 'Confirmado' | 'Pendente' | 'Check-in' | 'Check-out';
  registrationDate: string;
  checkInTime?: string;
  interests: string[];
}

interface VisitorDetailsProps {
  visitor: Visitor;
}

const VisitorDetails: React.FC<VisitorDetailsProps> = memo(({ visitor }) => {
  const statusClasses = useStatusClasses(visitor.status as any);
  const categoryClasses = useCategoryClasses(visitor.category);

  const badges = useMemo(() => [
    {
      text: visitor.category,
      className: categoryClasses
    },
    {
      text: visitor.status,
      className: statusClasses
    }
  ], [visitor.category, visitor.status, categoryClasses, statusClasses]);

  const headerAction = useMemo(() => ({
    icon: <QrCode className="w-4 h-4 mr-2" />,
    label: 'QR Code',
    onClick: () => console.log('Gerar QR Code')
  }), []);

  const fields = useMemo(() => [
    {
      icon: <Mail className="w-5 h-5 text-gray-400" />,
      label: 'Email',
      value: visitor.email
    },
    ...(visitor.phone ? [{
      icon: <Phone className="w-5 h-5 text-gray-400" />,
      label: 'Telefone',
      value: visitor.phone
    }] : []),
    ...(visitor.company ? [{
      icon: <Building className="w-5 h-5 text-gray-400" />,
      label: 'Empresa',
      value: visitor.company,
      subValue: visitor.position
    }] : []),
    {
      icon: <Calendar className="w-5 h-5 text-gray-400" />,
      label: 'Data de Registro',
      value: visitor.registrationDate
    },
    ...(visitor.checkInTime ? [{
      icon: <Clock className="w-5 h-5 text-gray-400" />,
      label: 'Check-in',
      value: visitor.checkInTime
    }] : [])
  ], [visitor]);

  const actions = useMemo(() => [
    {
      icon: <Mail className="w-4 h-4 mr-2" />,
      label: 'Enviar Email',
      onClick: () => console.log('Enviar email'),
      variant: 'outline' as const
    },
    {
      label: 'Editar Dados',
      onClick: () => console.log('Editar dados'),
      variant: 'outline' as const
    },
    ...(visitor.status === 'Confirmado' ? [{
      label: 'Fazer Check-in',
      onClick: () => console.log('Fazer check-in'),
      variant: 'default' as const
    }] : [])
  ], [visitor.status]);

  const additionalSections = useMemo(() => (
    visitor.interests.length > 0 ? (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Áreas de Interesse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {visitor.interests.map((interest, index) => (
              <Badge key={index} variant="outline">
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    ) : null
  ), [visitor.interests]);

  return (
    <EntityDetails
      title={visitor.name}
      badges={badges}
      headerAction={headerAction}
      fields={fields}
      actions={actions}
      additionalSections={additionalSections}
    />
  );
});

VisitorDetails.displayName = 'VisitorDetails';

export default VisitorDetails;
