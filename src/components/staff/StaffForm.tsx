
import React, { useMemo } from 'react';
import FormFactory, { FormField } from '@/components/common/FormFactory';
import { StaffFormData } from '@/types/staff';
import { useStaff } from '@/hooks/useStaff';

interface StaffFormProps {
  eventId: string;
  onClose: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ eventId, onClose }) => {
  const { createStaff, isCreating } = useStaff(eventId);

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
      name: 'role',
      label: 'Função/Cargo',
      type: 'text',
      placeholder: 'Ex: Coordenador, Supervisor, Assistente...',
      required: true
    }
  ], []);

  const handleSubmit = (data: StaffFormData) => {
    console.log('Dados do staff submetidos:', data);
    
    const staffData = {
      name: data.name,
      email: data.email,
      role: data.role,
      event_id: eventId
    };

    createStaff(staffData);
    onClose();
  };

  return (
    <FormFactory<StaffFormData>
      fields={fields}
      onSubmit={handleSubmit}
      onCancel={onClose}
      submitText={isCreating ? "Cadastrando..." : "Cadastrar Staff"}
      cancelText="Cancelar"
      defaultValues={{
        name: '',
        email: '',
        role: '',
        event_id: eventId
      }}
    />
  );
};

export default StaffForm;
