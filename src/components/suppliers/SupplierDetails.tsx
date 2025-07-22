
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Building, MapPin, Calendar, DollarSign, FileText, Star } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: string;
  category: string;
  services: string[];
  status: 'Ativo' | 'Inativo' | 'Pendente' | 'Bloqueado';
  contractValue: number;
  contractDate: string;
  responsiblePerson: string;
  rating: number;
  paymentTerms: string;
}

interface SupplierDetailsProps {
  supplier: Supplier;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({ supplier }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Inativo': return 'bg-gray-100 text-gray-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Bloqueado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Informações principais */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{supplier.name}</CardTitle>
              <p className="text-gray-600">CNPJ: {supplier.cnpj}</p>
              <div className="flex gap-2 mt-2 items-center">
                <Badge className={getStatusColor(supplier.status)}>
                  {supplier.status}
                </Badge>
                <Badge variant="outline">{supplier.category}</Badge>
                <div className="flex items-center gap-1">
                  {renderStars(supplier.rating)}
                  <span className="text-sm text-gray-600 ml-1">({supplier.rating})</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Contrato
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-600">{supplier.email}</div>
              </div>
            </div>
            
            {supplier.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Telefone</div>
                  <div className="text-gray-600">{supplier.phone}</div>
                </div>
              </div>
            )}

            {supplier.address && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Endereço</div>
                  <div className="text-gray-600">{supplier.address}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Responsável</div>
                <div className="text-gray-600">{supplier.responsiblePerson}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Data do Contrato</div>
                <div className="text-gray-600">{supplier.contractDate}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Valor do Contrato</div>
                <div className="text-gray-600">
                  R$ {supplier.contractValue.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm text-gray-500">
                  Pagamento: {supplier.paymentTerms}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Serviços */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Serviços Oferecidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {supplier.services.map((service, index) => (
              <Badge key={index} variant="outline">
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico de contratos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Histórico de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Contrato Atual</div>
                <div className="text-sm text-gray-600">
                  Vigência: {supplier.contractDate} - 31/12/2024
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">R$ {supplier.contractValue.toLocaleString('pt-BR')}</div>
                <Badge className="bg-green-100 text-green-800">Ativo</Badge>
              </div>
            </div>
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
          <FileText className="w-4 h-4 mr-2" />
          Ver Contrato
        </Button>
        <Button variant="outline">
          Editar Dados
        </Button>
        <Button>
          Renovar Contrato
        </Button>
      </div>
    </div>
  );
};

export default SupplierDetails;
