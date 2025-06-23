
import React, { memo, useMemo } from 'react';
import { Mail, Phone, Building, MapPin, Calendar, DollarSign, FileText, Star } from 'lucide-react';
import EntityDetails from '@/components/common/EntityDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStatusClasses, useSupplierCategoryClasses } from '@/utils/statusUtils';

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

const SupplierDetails: React.FC<SupplierDetailsProps> = memo(({ supplier }) => {
  const statusClasses = useStatusClasses(supplier.status);
  const categoryClasses = useSupplierCategoryClasses(supplier.category);

  const badges = useMemo(() => [
    {
      text: supplier.status,
      className: statusClasses
    },
    {
      text: supplier.category,
      className: 'bg-gray-100 text-gray-800'
    }
  ], [supplier.status, supplier.category, statusClasses]);

  const headerAction = useMemo(() => ({
    icon: <FileText className="w-4 h-4 mr-2" />,
    label: 'Contrato',
    onClick: () => console.log('Ver contrato')
  }), []);

  const fields = useMemo(() => [
    {
      icon: <Mail className="w-5 h-5 text-gray-400" />,
      label: 'Email',
      value: supplier.email
    },
    ...(supplier.phone ? [{
      icon: <Phone className="w-5 h-5 text-gray-400" />,
      label: 'Telefone',
      value: supplier.phone
    }] : []),
    ...(supplier.address ? [{
      icon: <MapPin className="w-5 h-5 text-gray-400" />,
      label: 'Endereço',
      value: supplier.address
    }] : []),
    {
      icon: <Building className="w-5 h-5 text-gray-400" />,
      label: 'Responsável',
      value: supplier.responsiblePerson
    },
    {
      icon: <Calendar className="w-5 h-5 text-gray-400" />,
      label: 'Data do Contrato',
      value: supplier.contractDate
    },
    {
      icon: <DollarSign className="w-5 h-5 text-gray-400" />,
      label: 'Valor do Contrato',
      value: `R$ ${supplier.contractValue.toLocaleString('pt-BR')}`,
      subValue: `Pagamento: ${supplier.paymentTerms}`
    }
  ], [supplier]);

  const actions = useMemo(() => [
    {
      icon: <Mail className="w-4 h-4 mr-2" />,
      label: 'Enviar Email',
      onClick: () => console.log('Enviar email'),
      variant: 'outline' as const
    },
    {
      icon: <FileText className="w-4 h-4 mr-2" />,
      label: 'Ver Contrato',
      onClick: () => console.log('Ver contrato'),
      variant: 'outline' as const
    },
    {
      label: 'Editar Dados',
      onClick: () => console.log('Editar dados'),
      variant: 'outline' as const
    },
    {
      label: 'Renovar Contrato',
      onClick: () => console.log('Renovar contrato'),
      variant: 'default' as const
    }
  ], []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const additionalSections = useMemo(() => (
    <>
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
    </>
  ), [supplier]);

  return (
    <EntityDetails
      title={supplier.name}
      subtitle={`CNPJ: ${supplier.cnpj}`}
      badges={badges}
      headerAction={headerAction}
      fields={fields}
      actions={actions}
      additionalSections={additionalSections}
    />
  );
});

SupplierDetails.displayName = 'SupplierDetails';

export default SupplierDetails;
