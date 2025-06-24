import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { User, Building, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { WizardFormData } from '@/types/profile';

const baseData: WizardFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  companyName: '',
  companySize: '',
  position: '',
  website: '',
  eventTypes: '',
  eventsPerYear: '',
  avgVisitors: '',
};

const filledData: WizardFormData = {
  firstName: 'João',
  lastName: 'Silva',
  email: 'joao@exemplo.com',
  phone: '(11) 99999-9999',
  password: '123456',
  confirmPassword: '123456',
  companyName: 'Acme LTDA',
  companySize: '11-50',
  position: 'Gerente de Eventos',
  website: 'https://acme.com',
  eventTypes: 'corporativo',
  eventsPerYear: '6-10',
  avgVisitors: '101-500',
};

interface RegisterStepProps {
  step: 1 | 2 | 3;
  data?: Partial<WizardFormData>;
}

const RegisterStep: React.FC<RegisterStepProps> = ({ step, data = {} }) => {
  const formData = { ...baseData, ...data } as WizardFormData;
  const loading = false;

  switch (step) {
    case 1:
      return (
        <div className="space-y-4 max-w-md p-4 border rounded-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="text-primary" size={20} />
              <h3 className="text-xl font-semibold">Dados Pessoais</h3>
            </div>
            <p className="text-muted-foreground">Vamos começar com suas informações básicas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome *</Label>
              <Input value={formData.firstName} readOnly placeholder="Seu nome" disabled={loading} />
            </div>
            <div>
              <Label>Sobrenome *</Label>
              <Input value={formData.lastName} readOnly placeholder="Seu sobrenome" disabled={loading} />
            </div>
          </div>
          <div>
            <Label>Email *</Label>
            <Input type="email" value={formData.email} readOnly placeholder="seu@email.com" disabled={loading} />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input value={formData.phone} readOnly placeholder="(11) 99999-9999" disabled={loading} />
          </div>
          <div>
            <Label>Senha *</Label>
            <Input type="password" value={formData.password} readOnly placeholder="Mínimo 6 caracteres" disabled={loading} />
          </div>
          <div>
            <Label>Confirmar Senha *</Label>
            <Input type="password" value={formData.confirmPassword} readOnly placeholder="Digite a senha novamente" disabled={loading} />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4 max-w-md p-4 border rounded-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building className="text-primary" size={20} />
              <h3 className="text-xl font-semibold">Dados da Empresa</h3>
            </div>
            <p className="text-muted-foreground">Conte-nos sobre sua organização</p>
          </div>
          <div>
            <Label>Nome da Empresa *</Label>
            <Input value={formData.companyName} readOnly placeholder="Nome da sua empresa" disabled={loading} />
          </div>
          <div>
            <Label>Tamanho da Empresa *</Label>
            <Select defaultValue={formData.companySize} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 funcionários</SelectItem>
                <SelectItem value="11-50">11-50 funcionários</SelectItem>
                <SelectItem value="51-200">51-200 funcionários</SelectItem>
                <SelectItem value="201-500">201-500 funcionários</SelectItem>
                <SelectItem value="500+">500+ funcionários</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Seu Cargo *</Label>
            <Input value={formData.position} readOnly placeholder="Ex: Gerente de Eventos" disabled={loading} />
          </div>
          <div>
            <Label>Website</Label>
            <Input value={formData.website} readOnly placeholder="https://suaempresa.com" disabled={loading} />
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4 max-w-md p-4 border rounded-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="text-primary" size={20} />
              <h3 className="text-xl font-semibold">Sobre seus Eventos</h3>
            </div>
            <p className="text-muted-foreground">Ajude-nos a personalizar sua experiência</p>
          </div>
          <div>
            <Label>Tipos de Eventos *</Label>
            <Select defaultValue={formData.eventTypes} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo principal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporativo">Eventos Corporativos</SelectItem>
                <SelectItem value="feiras">Feiras e Exposições</SelectItem>
                <SelectItem value="congressos">Congressos e Conferências</SelectItem>
                <SelectItem value="workshops">Workshops e Treinamentos</SelectItem>
                <SelectItem value="sociais">Eventos Sociais</SelectItem>
                <SelectItem value="esportivos">Eventos Esportivos</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Eventos por Ano *</Label>
            <Select defaultValue={formData.eventsPerYear} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Quantos eventos você organiza?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 eventos</SelectItem>
                <SelectItem value="6-10">6-10 eventos</SelectItem>
                <SelectItem value="11-20">11-20 eventos</SelectItem>
                <SelectItem value="20+">Mais de 20 eventos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Média de Visitantes *</Label>
            <Select defaultValue={formData.avgVisitors} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Média de participantes por evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100">Até 100 pessoas</SelectItem>
                <SelectItem value="101-500">101-500 pessoas</SelectItem>
                <SelectItem value="501-1000">501-1.000 pessoas</SelectItem>
                <SelectItem value="1001-5000">1.001-5.000 pessoas</SelectItem>
                <SelectItem value="5000+">Mais de 5.000 pessoas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const meta = {
  title: 'User/Register',
  component: RegisterStep,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RegisterStep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Step1Empty: Story = {
  args: { step: 1, data: {} },
};

export const Step1Filled: Story = {
  args: { step: 1, data: filledData },
};

export const Step2Empty: Story = {
  args: { step: 2, data: {} },
};

export const Step2Filled: Story = {
  args: { step: 2, data: filledData },
};

export const Step3Empty: Story = {
  args: { step: 3, data: {} },
};

export const Step3Filled: Story = {
  args: { step: 3, data: filledData },
};
