
import React, { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useStaff } from '@/hooks/useStaff';
import { Database } from '@/integrations/supabase/types';

type StaffFormData = {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: Database['public']['Enums']['staff_status_enum'];
  permissions: string[];
};

interface StaffFormProps {
  onClose: () => void;
  initialData?: any;
  eventId: string;
}

const StaffForm: React.FC<StaffFormProps> = ({ onClose, initialData, eventId }) => {
  const { createStaff, updateStaff, isCreating, isUpdating } = useStaff(eventId);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<StaffFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      status: 'Ativo',
      permissions: []
    }
  });

  const watchedPermissions = watch('permissions') || [];

  // Departamentos disponíveis
  const departments = useMemo(() => [
    { value: 'Operações', label: 'Operações' },
    { value: 'Segurança', label: 'Segurança' },
    { value: 'Atendimento', label: 'Atendimento' },
    { value: 'Técnico', label: 'Técnico' },
    { value: 'Limpeza', label: 'Limpeza' },
    { value: 'Administrativo', label: 'Administrativo' },
    { value: 'Marketing', label: 'Marketing' }
  ], []);

  // Opções de status
  const statusOptions = useMemo(() => [
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Inativo', label: 'Inativo' },
    { value: 'Suspenso', label: 'Suspenso' }
  ], []);

  // Permissões disponíveis
  const availablePermissions = useMemo(() => [
    'Gestão de Equipe', 'Relatórios', 'Check-in', 'Segurança', 'Acesso',
    'Informações', 'Cadastros', 'Financeiro', 'Marketing', 'Configurações'
  ], []);

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name || '');
      setValue('email', initialData.email || '');
      setValue('phone', initialData.phone || '');
      setValue('department', initialData.department || '');
      setValue('role', initialData.role || '');
      setValue('status', initialData.status || 'Ativo');
      setValue('permissions', initialData.permissions || []);
    }
  }, [initialData, setValue]);

  const onSubmit = async (data: StaffFormData) => {
    try {
      const staffData = {
        ...data,
        event_id: eventId
      };

      if (initialData) {
        await updateStaff({ id: initialData.id, data: staffData });
      } else {
        await createStaff(staffData);
      }
      
      onClose();
    } catch (error) {
      console.error('Erro ao salvar staff:', error);
    }
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    const currentPermissions = watchedPermissions;
    let newPermissions;
    
    if (checked) {
      newPermissions = [...currentPermissions, permission];
    } else {
      newPermissions = currentPermissions.filter(p => p !== permission);
    }
    
    setValue('permissions', newPermissions);
  };

  const isLoading = isSubmitting || isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            {...register('name', { required: 'Nome é obrigatório' })}
            placeholder="Nome do funcionário"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'Email é obrigatório' })}
            placeholder="email@eventrix.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(11) 99999-9999"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Cargo *</Label>
          <Input
            id="role"
            {...register('role', { required: 'Cargo é obrigatório' })}
            placeholder="Ex: Coordenador, Supervisor..."
            disabled={isLoading}
          />
          {errors.role && (
            <p className="text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Departamento *</Label>
          <Select
            value={watch('department')}
            onValueChange={(value) => setValue('department', value)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o departamento" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && (
            <p className="text-sm text-red-600">Departamento é obrigatório</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={watch('status')}
            onValueChange={(value) => setValue('status', value as any)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Permissões */}
      <div className="space-y-4">
        <Label>Permissões de Acesso</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availablePermissions.map((permission) => (
            <div key={permission} className="flex items-center space-x-2">
              <Checkbox
                id={permission}
                checked={watchedPermissions.includes(permission)}
                onCheckedChange={(checked) => 
                  handlePermissionChange(permission, checked as boolean)
                }
                disabled={isLoading}
              />
              <Label
                htmlFor={permission}
                className="text-sm font-normal cursor-pointer"
              >
                {permission}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : (initialData ? 'Atualizar' : 'Cadastrar')} Staff
        </Button>
      </div>
    </form>
  );
};

export default StaffForm;
