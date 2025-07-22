
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SupplierFormProps {
  onClose: () => void;
}

interface SupplierFormData {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  address: string;
  category: string;
  services: string[];
  contractValue: number;
  responsiblePerson: string;
  paymentTerms: string;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ onClose }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SupplierFormData>();

  const serviceOptions = [
    'Som', 'Iluminação', 'Projeção', 'Coffee Break', 'Almoço', 'Jantar',
    'Vigilância', 'Controle de Acesso', 'Decoração', 'Flores', 'Limpeza',
    'Transporte', 'Estacionamento', 'Recepção', 'Tradução'
  ];

  const onSubmit = (data: SupplierFormData) => {
    console.log('Dados do fornecedor:', data);
    // Aqui seria feita a integração com a API
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Empresa *</Label>
          <Input
            id="name"
            {...register('name', { required: 'Nome é obrigatório' })}
            placeholder="Nome do fornecedor"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ *</Label>
          <Input
            id="cnpj"
            {...register('cnpj', { required: 'CNPJ é obrigatório' })}
            placeholder="12.345.678/0001-90"
          />
          {errors.cnpj && <p className="text-sm text-red-600">{errors.cnpj.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'Email é obrigatório' })}
            placeholder="contato@fornecedor.com"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            {...register('address')}
            placeholder="Endereço completo"
          />
        </div>

        <div className="space-y-2">
          <Label>Categoria *</Label>
          <Select onValueChange={(value) => setValue('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Audiovisual">Audiovisual</SelectItem>
              <SelectItem value="Alimentação">Alimentação</SelectItem>
              <SelectItem value="Segurança">Segurança</SelectItem>
              <SelectItem value="Decoração">Decoração</SelectItem>
              <SelectItem value="Limpeza">Limpeza</SelectItem>
              <SelectItem value="Transporte">Transporte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsiblePerson">Pessoa Responsável</Label>
          <Input
            id="responsiblePerson"
            {...register('responsiblePerson')}
            placeholder="Nome do responsável"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contractValue">Valor do Contrato (R$)</Label>
          <Input
            id="contractValue"
            type="number"
            {...register('contractValue')}
            placeholder="0,00"
          />
        </div>

        <div className="space-y-2">
          <Label>Prazo de Pagamento</Label>
          <Select onValueChange={(value) => setValue('paymentTerms', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o prazo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="À vista">À vista</SelectItem>
              <SelectItem value="15 dias">15 dias</SelectItem>
              <SelectItem value="30 dias">30 dias</SelectItem>
              <SelectItem value="45 dias">45 dias</SelectItem>
              <SelectItem value="60 dias">60 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Serviços Oferecidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {serviceOptions.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  onCheckedChange={(checked) => {
                    const currentServices = watch('services') || [];
                    if (checked) {
                      setValue('services', [...currentServices, service]);
                    } else {
                      setValue('services', currentServices.filter(s => s !== service));
                    }
                  }}
                />
                <Label htmlFor={service} className="text-sm">{service}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          Cadastrar Fornecedor
        </Button>
      </div>
    </form>
  );
};

export default SupplierForm;
