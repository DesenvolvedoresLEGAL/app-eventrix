
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Building, Calendar, Clock, Shield, User } from 'lucide-react';

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Inativo': return 'bg-gray-100 text-gray-800';
      case 'Férias': return 'bg-blue-100 text-blue-800';
      case 'Licença': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'Manhã': return 'bg-yellow-100 text-yellow-800';
      case 'Tarde': return 'bg-orange-100 text-orange-800';
      case 'Noite': return 'bg-purple-100 text-purple-800';
      case 'Integral': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Informações principais */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{staff.name}</CardTitle>
              <p className="text-gray-600">{staff.role} - {staff.department}</p>
              <div className="flex gap-2 mt-2">
                <Badge className={getStatusColor(staff.status)}>
                  {staff.status}
                </Badge>
                <Badge className={getShiftColor(staff.shift)}>
                  {staff.shift}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Shield className="w-4 h-4 mr-2" />
              Permissões
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-600">{staff.email}</div>
              </div>
            </div>
            
            {staff.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Telefone</div>
                  <div className="text-gray-600">{staff.phone}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Departamento</div>
                <div className="text-gray-600">{staff.department}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Supervisor</div>
                <div className="text-gray-600">{staff.supervisor}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Data de Início</div>
                <div className="text-gray-600">{staff.startDate}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Emergência</div>
                <div className="text-gray-600">{staff.emergencyContact}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissões */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Permissões de Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {staff.permissions.map((permission, index) => (
              <Badge key={index} variant="outline">
                {permission}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline">
          <Mail className="w-4 h-4 mr-2" />
          Enviar Email
        </Button>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Ver Escala
        </Button>
        <Button variant="outline">
          Editar Dados
        </Button>
        <Button>
          Gerenciar Permissões
        </Button>
      </div>
    </div>
  );
};

export default StaffDetails;
