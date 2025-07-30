
import React from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface PersonalDataStepProps {
  data: PersonalData;
  errors: Record<string, string[]>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onDataChange: (field: keyof PersonalData, value: string) => void;
  onTogglePasswordVisibility: (field: 'password' | 'confirmPassword') => void;
}

/**
 * Componente para o primeiro passo do wizard - Dados Pessoais
 */
const PersonalDataStep: React.FC<PersonalDataStepProps> = ({
  data,
  errors,
  showPassword,
  showConfirmPassword,
  onDataChange,
  onTogglePasswordVisibility
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <User className="text-primary" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dados Pessoais</h2>
        <p className="text-muted-foreground">Vamos começar com suas informações básicas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Nome *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onDataChange('firstName', e.target.value)}
            placeholder="Seu nome"
            className={errors.firstName ? 'border-destructive' : ''}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive mt-1">{errors.firstName[0]}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Sobrenome *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onDataChange('lastName', e.target.value)}
            placeholder="Seu sobrenome"
            className={errors.lastName ? 'border-destructive' : ''}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive mt-1">{errors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onDataChange('email', e.target.value)}
            placeholder="seu@email.com"
            className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Telefone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => onDataChange('phone', e.target.value)}
            placeholder="(11) 99999-9999"
            className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-destructive mt-1">{errors.phone[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Senha *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={data.password}
            onChange={(e) => onDataChange('password', e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
          />
          <button
            type="button"
            onClick={() => onTogglePasswordVisibility('password')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-destructive mt-1">{errors.password[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={data.confirmPassword}
            onChange={(e) => onDataChange('confirmPassword', e.target.value)}
            placeholder="Digite a senha novamente"
            className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
          />
          <button
            type="button"
            onClick={() => onTogglePasswordVisibility('confirmPassword')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-destructive mt-1">{errors.confirmPassword[0]}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalDataStep;
