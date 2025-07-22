
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

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

const VisitorForm: React.FC<VisitorFormProps> = ({ onClose }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<VisitorFormData>();

  const interestOptions = [
    'Tecnologia', 'Inovação', 'Startups', 'Negócios', 'Investimentos',
    'Marketing', 'Vendas', 'Sustentabilidade', 'IA', 'Blockchain'
  ];

  const onSubmit = (data: VisitorFormData) => {
    console.log('Dados do visitante:', data);
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
            placeholder="Nome do visitante"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'Email é obrigatório' })}
            placeholder="email@exemplo.com"
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
          <Label htmlFor="company">Empresa</Label>
          <Input
            id="company"
            {...register('company')}
            placeholder="Nome da empresa"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Cargo</Label>
          <Input
            id="position"
            {...register('position')}
            placeholder="Cargo/Função"
          />
        </div>

        <div className="space-y-2">
          <Label>Categoria *</Label>
          <Select onValueChange={(value) => setValue('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Geral">Geral</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Imprensa">Imprensa</SelectItem>
              <SelectItem value="Estudante">Estudante</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Áreas de Interesse</Label>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    onCheckedChange={(checked) => {
                      const currentInterests = watch('interests') || [];
                      if (checked) {
                        setValue('interests', [...currentInterests, interest]);
                      } else {
                        setValue('interests', currentInterests.filter(i => i !== interest));
                      }
                    }}
                  />
                  <Label htmlFor={interest} className="text-sm">{interest}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          Cadastrar Visitante
        </Button>
      </div>
    </form>
  );
};

export default VisitorForm;
