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
  orgName: '',
  documentId: '',
  contactEmail: '',
  contactPhone: '',
  planId: ''
};

const filledData: WizardFormData = {
  firstName: 'João',
  lastName: 'Silva',
  email: 'joao@exemplo.com',
  phone: '(11) 99999-9999',
  password: '123456',
  confirmPassword: '123456',
  orgName: 'Acme LTDA',
  documentId: '12.345.678/0001-00',
  contactEmail: 'contato@acme.com',
  contactPhone: '(11) 11111-1111',
  planId: 'Start'
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
              <h3 className="text-xl font-semibold">Conta</h3>
            </div>
            <p className="text-muted-foreground">Dados do responsável</p>
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
              <h3 className="text-xl font-semibold">Organização</h3>
            </div>
            <p className="text-muted-foreground">Dados da empresa</p>
          </div>
          <div>
            <Label>Nome da Organização *</Label>
            <Input value={formData.orgName} readOnly placeholder="Nome" disabled={loading} />
          </div>
          <div>
            <Label>CNPJ/CPF *</Label>
            <Input value={formData.documentId} readOnly placeholder="00.000.000/0000-00" disabled={loading} />
          </div>
          <div>
            <Label>Email de Contato *</Label>
            <Input value={formData.contactEmail} readOnly placeholder="contato@empresa.com" disabled={loading} />
          </div>
          <div>
            <Label>Telefone de Contato</Label>
            <Input value={formData.contactPhone} readOnly placeholder="(11) 99999-9999" disabled={loading} />
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4 max-w-md p-4 border rounded-md">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="text-primary" size={20} />
              <h3 className="text-xl font-semibold">Plano</h3>
            </div>
            <p className="text-muted-foreground">Escolha o plano</p>
          </div>
          <div>
            <Label>Plano *</Label>
            <Select defaultValue={formData.planId} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o plano" />
              </SelectTrigger>
              <SelectContent>
                {['Start', 'Scale', 'Boom', 'Enterprise'].map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
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
