
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Building, Calendar, Shield, User } from 'lucide-react';
import EntityDetails, { FieldInfo, BadgeInfo, ActionButton } from '@/components/common/EntityDetails';
import { getStatusClasses, getShiftClasses } from '@/utils/statusUtils';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  permissions: string[];
  status: 'Ativo' | 'Inativo' | 'Férias' | 'Licença';
  shift: 'Manhã' | 'Tarde' | 'Noite' | 'Integral';
  startDate: string;
  supervisor: string;
  emergencyContact: string;
}

interface StaffDetailsProps {
  staff: StaffMember;
}

const StaffDetails: React.FC<StaffDetailsProps> = ({ staff }) => {
  const badges: BadgeInfo[] = useMemo(() => [
    {
      text: staff.status,
      className: getStatusClasses(staff.status)
    },
    {
      text: staff.shift,
      className: getShiftClasses(staff.shift)
    }
  ], [staff.status, staff.shift]);

  const fields: FieldInfo[] = useMemo(() => [
    {
      icon: <Mail className="w-5 h-5 text-gray-400" />,
      label: "Email",
      value: staff.email
    },
    {
      icon: <Phone className="w-5 h-5 text-gray-400" />,
      label: "Telefone",
      value: staff.phone
    },
    {
      icon: <Building className="w-5 h-5 text-gray-400" />,
      label: "Departamento",
      value: staff.department
    },
    {
      icon: <User className="w-5 h-5 text-gray-400" />,
      label: "Supervisor",
      value: staff.supervisor
    },
    {
      icon: <Calendar className="w-5 h-5 text-gray-400" />,
      label: "Data de Início",
      value: staff.startDate
    },
    {
      icon: <Phone className="w-5 h-5 text-gray-400" />,
      label: "Emergência",
      value: staff.emergencyContact
    }
  ], [staff]);

  const actions: ActionButton[] = useMemo(() => [
    {
      icon: <Mail className="w-4 h-4 mr-2" />,
      label: "Enviar Email",
      onClick: () => console.log('Enviar email'),
      variant: 'outline'
    },
    {
      icon: <Calendar className="w-4 h-4 mr-2" />,
      label: "Ver Escala",
      onClick: () => console.log('Ver escala'),
      variant: 'outline'
    },
    {
      label: "Editar Dados",
      onClick: () => console.log('Editar dados'),
      variant: 'outline'
    },
    {
      label: "Gerenciar Permissões",
      onClick: () => console.log('Gerenciar permissões'),
      variant: 'default'
    }
  ], []);

  const permissionsSection = useMemo(() => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Permissões de Acesso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {staff.permissions.map((permission, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              {permission}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  ), [staff.permissions]);

  return (
    <EntityDetails
      title={staff.name}
      subtitle={`${staff.role} - ${staff.department}`}
      badges={badges}
      headerAction={{
        icon: <Shield className="w-4 h-4 mr-2" />,
        label: "Permissões",
        onClick: () => console.log('Gerenciar permissões')
      }}
      fields={fields}
      actions={actions}
      additionalSections={permissionsSection}
    />
  );
};

export default StaffDetails;
