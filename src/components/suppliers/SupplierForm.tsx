
import React, { memo, useMemo } from 'react';
import FormFactory, { FormField, CheckboxSection } from '@/components/common/FormFactory';

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

const SupplierForm: React.FC<SupplierFormProps> = memo(({ onClose }) => {
  const fields: FormField[] = useMemo(() => [
    {
      name: 'name',
      label: 'Nome da Empresa',
      type: 'text',
      placeholder: 'Nome do fornecedor',
      required: true,
      gridColumn: 'span-1'
    },
    {
      name: 'cnpj',
      label: 'CNPJ',
      type: 'text',
      placeholder: '12.345.678/0001-90',
      required: true,
      gridColumn: 'span-1'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'contato@fornecedor.com',
      required: true,
      gridColumn: 'span-1'
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      placeholder: '(11) 99999-9999',
      gridColumn: 'span-1'
    },
    {
      name: 'address',
      label: 'Endereço',
      type: 'text',
      placeholder: 'Endereço completo',
      gridColumn: 'span-2'
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'select',
      placeholder: 'Selecione a categoria',
      required: true,
      gridColumn: 'span-1',
      options: [
        { value: 'Audiovisual', label: 'Audiovisual' },
        { value: 'Alimentação', label: 'Alimentação' },
        { value: 'Segurança', label: 'Segurança' },
        { value: 'Decoração', label: 'Decoração' },
        { value: 'Limpeza', label: 'Limpeza' },
        { value: 'Transporte', label: 'Transporte' }
      ]
    },
    {
      name: 'responsiblePerson',
      label: 'Pessoa Responsável',
      type: 'text',
      placeholder: 'Nome do responsável',
      gridColumn: 'span-1'
    },
    {
      name: 'contractValue',
      label: 'Valor do Contrato (R$)',
      type: 'number',
      placeholder: '0,00',
      gridColumn: 'span-1'
    },
    {
      name: 'paymentTerms',
      label: 'Prazo de Pagamento',
      type: 'select',
      placeholder: 'Selecione o prazo',
      gridColumn: 'span-1',
      options: [
        { value: 'À vista', label: 'À vista' },
        { value: '15 dias', label: '15 dias' },
        { value: '30 dias', label: '30 dias' },
        { value: '45 dias', label: '45 dias' },
        { value: '60 dias', label: '60 dias' }
      ]
    }
  ], []);

  const checkboxSections: CheckboxSection[] = useMemo(() => [
    {
      title: 'Serviços Oferecidos',
      name: 'services',
      options: [
        'Som', 'Iluminação', 'Projeção', 'Coffee Break', 'Almoço', 'Jantar',
        'Vigilância', 'Controle de Acesso', 'Decoração', 'Flores', 'Limpeza',
        'Transporte', 'Estacionamento', 'Recepção', 'Tradução'
      ]
    }
  ], []);

  const onSubmit = (data: SupplierFormData) => {
    console.log('Dados do fornecedor:', data);
    // Aqui seria feita a integração com a API
    onClose();
  };

  return (
    <FormFactory
      fields={fields}
      checkboxSections={checkboxSections}
      onSubmit={onSubmit}
      onCancel={onClose}
      submitText="Cadastrar Fornecedor"
      cancelText="Cancelar"
    />
  );
});

SupplierForm.displayName = 'SupplierForm';

export default SupplierForm;
