
import React, { memo, useMemo } from 'react';
import FormFactory, { FormField, CheckboxSection } from '@/components/common/FormFactory';

interface VisitorFormProps {
  onClose: () => void;
}

interface VisitorFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  category: string;
  interests: string[];
}

const VisitorForm: React.FC<VisitorFormProps> = memo(({ onClose }) => {
  const fields: FormField[] = useMemo(() => [
    {
      name: 'name',
      label: 'Nome Completo',
      type: 'text',
      placeholder: 'Nome do visitante',
      required: true,
      gridColumn: 'span-1'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'email@exemplo.com',
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
      name: 'company',
      label: 'Empresa',
      type: 'text',
      placeholder: 'Nome da empresa',
      gridColumn: 'span-1'
    },
    {
      name: 'position',
      label: 'Cargo',
      type: 'text',
      placeholder: 'Cargo/Função',
      gridColumn: 'span-1'
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'select',
      placeholder: 'Selecione a categoria',
      required: true,
      gridColumn: 'span-1',
      options: [
        { value: 'Geral', label: 'Geral' },
        { value: 'VIP', label: 'VIP' },
        { value: 'Imprensa', label: 'Imprensa' },
        { value: 'Estudante', label: 'Estudante' }
      ]
    }
  ], []);

  const checkboxSections: CheckboxSection[] = useMemo(() => [
    {
      title: 'Áreas de Interesse',
      name: 'interests',
      options: [
        'Tecnologia', 'Inovação', 'Startups', 'Negócios', 'Investimentos',
        'Marketing', 'Vendas', 'Sustentabilidade', 'IA', 'Blockchain'
      ]
    }
  ], []);

  const onSubmit = (data: VisitorFormData) => {
    console.log('Dados do visitante:', data);
    // TODO: integrar com API
    onClose();
  };

  return (
    <FormFactory
      fields={fields}
      checkboxSections={checkboxSections}
      onSubmit={onSubmit}
      onCancel={onClose}
      submitText="Cadastrar Visitante"
      cancelText="Cancelar"
    />
  );
});

VisitorForm.displayName = 'VisitorForm';

export default VisitorForm;
