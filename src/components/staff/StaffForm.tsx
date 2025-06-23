
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
  shift: string;
  supervisor: string;
  emergencyContact: string;
  permissions: string[];
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
      name: 'emergencyContact',
      label: 'Contato de Emergência',
      type: 'tel',
      placeholder: '(11) 88888-8888'
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
        { value: 'Administrativo', label: 'Administrativo' }
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
      name: 'shift',
      label: 'Turno',
      type: 'select',
      placeholder: 'Selecione o turno',
      required: true,
      options: [
        { value: 'Manhã', label: 'Manhã (06:00 - 14:00)' },
        { value: 'Tarde', label: 'Tarde (14:00 - 22:00)' },
        { value: 'Noite', label: 'Noite (22:00 - 06:00)' },
        { value: 'Integral', label: 'Integral (08:00 - 18:00)' }
      ]
    },
    {
      name: 'supervisor',
      label: 'Supervisor',
      type: 'text',
      placeholder: 'Nome do supervisor'
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
    // TODO: integrar com API
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
