
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Building, Calendar, Clock, QrCode } from 'lucide-react';

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

const VisitorDetails: React.FC<VisitorDetailsProps> = ({ visitor }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return 'bg-blue-100 text-blue-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Check-in': return 'bg-green-100 text-green-800';
      case 'Check-out': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Imprensa': return 'bg-orange-100 text-orange-800';
      case 'Geral': return 'bg-blue-100 text-blue-800';
      case 'Estudante': return 'bg-green-100 text-green-800';
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
              <CardTitle className="text-xl">{visitor.name}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge className={getCategoryColor(visitor.category)}>
                  {visitor.category}
                </Badge>
                <Badge className={getStatusColor(visitor.status)}>
                  {visitor.status}
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-600">{visitor.email}</div>
              </div>
            </div>
            
            {visitor.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Telefone</div>
                  <div className="text-gray-600">{visitor.phone}</div>
                </div>
              </div>
            )}

            {visitor.company && (
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Empresa</div>
                  <div className="text-gray-600">{visitor.company}</div>
                  {visitor.position && (
                    <div className="text-sm text-gray-500">{visitor.position}</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Data de Registro</div>
                <div className="text-gray-600">{visitor.registrationDate}</div>
              </div>
            </div>

            {visitor.checkInTime && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Check-in</div>
                  <div className="text-gray-600">{visitor.checkInTime}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interesses */}
      {visitor.interests.length > 0 && (
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
      )}

      {/* Ações */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline">
          <Mail className="w-4 h-4 mr-2" />
          Enviar Email
        </Button>
        <Button variant="outline">
          Editar Dados
        </Button>
        {visitor.status === 'Confirmado' && (
          <Button>
            Fazer Check-in
          </Button>
        )}
      </div>
    </div>
  );
};

export default VisitorDetails;
