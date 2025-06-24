// Storybook stories for the Register wizard. This file showcases each step of
// the multi-step form individually so designers and developers can iterate on
// the UI without navigating through the entire flow.
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import Register from './Register';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Building, Zap } from 'lucide-react';

const meta = {
  title: 'User/Register',
  component: Register,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Register>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Full wizard rendering with all providers so that the page behaves the same
 * as in the actual application.
 */
export const Default: Story = {
  render: () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Register />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  },
};

/**
 * Step 1 of the wizard - personal data fields used on account creation.
 */
const StepOneUI = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const update = (field: keyof typeof data, value: string) =>
    setData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <User className="text-primary" size={20} />
          <h3 className="text-xl font-semibold">Dados Pessoais</h3>
        </div>
        <p className="text-muted-foreground">
          Vamos começar com suas informações básicas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Nome *</Label>
          <Input
            value={data.firstName}
            onChange={e => update('firstName', e.target.value)}
            placeholder="Seu nome"
          />
        </div>
        <div>
          <Label>Sobrenome *</Label>
          <Input
            value={data.lastName}
            onChange={e => update('lastName', e.target.value)}
            placeholder="Seu sobrenome"
          />
        </div>
      </div>

      <div>
        <Label>Email *</Label>
        <Input
          type="email"
          value={data.email}
          onChange={e => update('email', e.target.value)}
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <Label>Telefone</Label>
        <Input
          value={data.phone}
          onChange={e => update('phone', e.target.value)}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div>
        <Label>Senha *</Label>
        <Input
          type="password"
          value={data.password}
          onChange={e => update('password', e.target.value)}
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div>
        <Label>Confirmar Senha *</Label>
        <Input
          type="password"
          value={data.confirmPassword}
          onChange={e => update('confirmPassword', e.target.value)}
          placeholder="Digite a senha novamente"
        />
        {data.confirmPassword && data.password !== data.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">As senhas não coincidem</p>
        )}
      </div>
    </div>
  );
};

/**
 * Step 2 of the wizard - company related information.
 */
const StepTwoUI = () => {
  const [data, setData] = useState({
    companyName: '',
    companySize: '',
    position: '',
    website: '',
  });

  const update = (field: keyof typeof data, value: string) =>
    setData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Building className="text-primary" size={20} />
          <h3 className="text-xl font-semibold">Dados da Empresa</h3>
        </div>
        <p className="text-muted-foreground">Conte-nos sobre sua organização</p>
      </div>

      <div>
        <Label>Nome da Empresa *</Label>
        <Input
          value={data.companyName}
          onChange={e => update('companyName', e.target.value)}
          placeholder="Nome da sua empresa"
        />
      </div>

      <div>
        <Label>Tamanho da Empresa *</Label>
        <Select onValueChange={value => update('companySize', value)}>
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
        <Input
          value={data.position}
          onChange={e => update('position', e.target.value)}
          placeholder="Ex: Gerente de Eventos"
        />
      </div>

      <div>
        <Label>Website</Label>
        <Input
          value={data.website}
          onChange={e => update('website', e.target.value)}
          placeholder="https://suaempresa.com"
        />
      </div>
    </div>
  );
};

/**
 * Step 3 of the wizard - event data used for onboarding analytics.
 */
const StepThreeUI = () => {
  const [data, setData] = useState({
    eventTypes: '',
    eventsPerYear: '',
    avgVisitors: '',
  });

  const update = (field: keyof typeof data, value: string) =>
    setData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="text-primary" size={20} />
          <h3 className="text-xl font-semibold">Sobre seus Eventos</h3>
        </div>
        <p className="text-muted-foreground">
          Ajude-nos a personalizar sua experiência
        </p>
      </div>

      <div>
        <Label>Tipos de Eventos *</Label>
        <Select onValueChange={value => update('eventTypes', value)}>
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
        <Select onValueChange={value => update('eventsPerYear', value)}>
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
        <Select onValueChange={value => update('avgVisitors', value)}>
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
};

// Individual steps exported for quick iteration when designing each stage of
// the registration wizard.
export const StepOne: Story = { render: () => <StepOneUI /> };
export const StepTwo: Story = { render: () => <StepTwoUI /> };
export const StepThree: Story = { render: () => <StepThreeUI /> };