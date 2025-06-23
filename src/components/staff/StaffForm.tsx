
import React, { useMemo } from 'react';
import FormFactory, { FormField, CheckboxSection } from '@/components/common/FormFactory';

interface StaffFormProps {
  onClose: () => void;
}

interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  permissions: string[];
  event_id?: string;
}

const StaffForm: React.FC<StaffFormProps> = ({ onClose }) => {
  const fields: FormField[] = useMemo(() => [
    {
      name: 'name',
      label: 'Nome Completo',
      type: 'text',
      placeholder: 'Nome do funcionário',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'email@eventrix.com',
      required: true
    },
    {
      name: 'phone',
      label: 'Telefone',
      type: 'tel',
      placeholder: '(11) 99999-9999'
    },
    {
      name: 'department',
      label: 'Departamento',
      type: 'select',
      placeholder: 'Selecione o departamento',
      required: true,
      options: [
        { value: 'Operações', label: 'Operações' },
        { value: 'Segurança', label: 'Segurança' },
        { value: 'Atendimento', label: 'Atendimento' },
        { value: 'Técnico', label: 'Técnico' },
        { value: 'Limpeza', label: 'Limpeza' },
        { value: 'Administrativo', label: 'Administrativo' },
        { value: 'Marketing', label: 'Marketing' }
      ]
    },
    {
      name: 'role',
      label: 'Cargo',
      type: 'text',
      placeholder: 'Ex: Coordenador, Supervisor...',
      required: true
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Selecione o status',
      required: true,
      options: [
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Inativo', label: 'Inativo' },
        { value: 'Suspenso', label: 'Suspenso' }
      ]
    }
  ], []);

  const checkboxSections: CheckboxSection[] = useMemo(() => [
    {
      title: 'Permissões de Acesso',
      name: 'permissions',
      options: [
        'Gestão de Equipe', 'Relatórios', 'Check-in', 'Segurança', 'Acesso',
        'Informações', 'Cadastros', 'Financeiro', 'Marketing', 'Configurações'
      ]
    }
  ], []);

  const handleSubmit = (data: StaffFormData) => {
    console.log('Dados do staff:', data);
    // Aqui seria feita a integração com a API event_team
    onClose();
  };

  return (
    <FormFactory<StaffFormData>
      fields={fields}
      checkboxSections={checkboxSections}
      onSubmit={handleSubmit}
      onCancel={onClose}
      submitText="Cadastrar Staff"
      cancelText="Cancelar"
    />
  );
};

export default StaffForm;
