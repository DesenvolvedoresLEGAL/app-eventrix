
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<StaffFormData>();

  const permissionOptions = [
    'Gestão de Equipe', 'Relatórios', 'Check-in', 'Segurança', 'Acesso',
    'Informações', 'Cadastros', 'Financeiro', 'Marketing', 'Configurações'
  ];

  const onSubmit = (data: StaffFormData) => {
    console.log('Dados do staff:', data);
    // Aqui seria feita a integração com a API
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            {...register('name', { required: 'Nome é obrigatório' })}
            placeholder="Nome do funcionário"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'Email é obrigatório' })}
            placeholder="email@eventrix.com"
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

        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Contato de Emergência</Label>
          <Input
            id="emergencyContact"
            {...register('emergencyContact')}
            placeholder="(11) 88888-8888"
          />
        </div>

        <div className="space-y-2">
          <Label>Departamento *</Label>
          <Select onValueChange={(value) => setValue('department', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Operações">Operações</SelectItem>
              <SelectItem value="Segurança">Segurança</SelectItem>
              <SelectItem value="Atendimento">Atendimento</SelectItem>
              <SelectItem value="Técnico">Técnico</SelectItem>
              <SelectItem value="Limpeza">Limpeza</SelectItem>
              <SelectItem value="Administrativo">Administrativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Cargo *</Label>
          <Input
            id="role"
            {...register('role', { required: 'Cargo é obrigatório' })}
            placeholder="Ex: Coordenador, Supervisor..."
          />
          {errors.role && <p className="text-sm text-red-600">{errors.role.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Turno *</Label>
          <Select onValueChange={(value) => setValue('shift', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o turno" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manhã">Manhã (06:00 - 14:00)</SelectItem>
              <SelectItem value="Tarde">Tarde (14:00 - 22:00)</SelectItem>
              <SelectItem value="Noite">Noite (22:00 - 06:00)</SelectItem>
              <SelectItem value="Integral">Integral (08:00 - 18:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supervisor">Supervisor</Label>
          <Input
            id="supervisor"
            {...register('supervisor')}
            placeholder="Nome do supervisor"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Permissões de Acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {permissionOptions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Checkbox
                  id={permission}
                  onCheckedChange={(checked) => {
                    const currentPermissions = watch('permissions') || [];
                    if (checked) {
                      setValue('permissions', [...currentPermissions, permission]);
                    } else {
                      setValue('permissions', currentPermissions.filter(p => p !== permission));
                    }
                  }}
                />
                <Label htmlFor={permission} className="text-sm">{permission}</Label>
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
          Cadastrar Staff
        </Button>
      </div>
    </form>
  );
};

export default StaffForm;
