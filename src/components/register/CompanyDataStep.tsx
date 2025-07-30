
import React from 'react';
import { Building, Globe, Check, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CompanyData {
  tenantName: string;
  slug: string;
  domain: string;
}

interface CompanyDataStepProps {
  data: CompanyData;
  errors: Record<string, string[]>;
  slugAvailable: boolean | null;
  isCheckingSlug: boolean;
  onDataChange: (field: keyof CompanyData, value: string) => void;
}

/**
 * Componente para o segundo passo do wizard - Dados da Empresa
 */
const CompanyDataStep: React.FC<CompanyDataStepProps> = ({
  data,
  errors,
  slugAvailable,
  isCheckingSlug,
  onDataChange
}) => {
  const getSlugStatus = () => {
    if (isCheckingSlug) {
      return <Loader2 className="text-muted-foreground animate-spin" size={16} />;
    }
    if (slugAvailable === true) {
      return <Check className="text-green-500" size={16} />;
    }
    if (slugAvailable === false) {
      return <X className="text-destructive" size={16} />;
    }
    return null;
  };

  const getSlugMessage = () => {
    if (isCheckingSlug) return 'Verificando disponibilidade...';
    if (slugAvailable === true) return 'Slug disponível!';
    if (slugAvailable === false) return 'Slug já está em uso';
    return '';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Building className="text-primary" size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dados da Empresa</h2>
        <p className="text-muted-foreground">Configure sua organização na plataforma</p>
      </div>

      <div>
        <Label htmlFor="tenantName">Nome da Empresa *</Label>
        <Input
          id="tenantName"
          value={data.tenantName}
          onChange={(e) => onDataChange('tenantName', e.target.value)}
          placeholder="Nome da sua empresa"
          className={errors.tenantName ? 'border-destructive' : ''}
        />
        {errors.tenantName && (
          <p className="text-xs text-destructive mt-1">{errors.tenantName[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="slug">Identificador Único (Slug) *</Label>
        <div className="relative">
          <Input
            id="slug"
            value={data.slug}
            onChange={(e) => onDataChange('slug', e.target.value)}
            placeholder="minha-empresa"
            className={`pr-10 ${errors.slug ? 'border-destructive' : ''} ${
              slugAvailable === false ? 'border-destructive' : ''
            }`}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getSlugStatus()}
          </div>
        </div>
        <div className="mt-1 space-y-1">
          <p className="text-xs text-muted-foreground">
            Será usado na URL: https://{data.slug || 'sua-empresa'}.eventrix.com
          </p>
          {getSlugMessage() && (
            <p className={`text-xs ${
              slugAvailable === true ? 'text-green-600' : 
              slugAvailable === false ? 'text-destructive' : 
              'text-muted-foreground'
            }`}>
              {getSlugMessage()}
            </p>
          )}
          {errors.slug && (
            <p className="text-xs text-destructive">{errors.slug[0]}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="domain">Domínio Personalizado (Opcional)</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            id="domain"
            value={data.domain}
            onChange={(e) => onDataChange('domain', e.target.value)}
            placeholder="eventos.suaempresa.com"
            className={`pl-10 ${errors.domain ? 'border-destructive' : ''}`}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Configure depois na área de configurações
        </p>
        {errors.domain && (
          <p className="text-xs text-destructive mt-1">{errors.domain[0]}</p>
        )}
      </div>

      <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
        <h4 className="font-medium text-sm mb-2">ℹ️ Sobre o Identificador Único</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Será usado na URL da sua conta</li>
          <li>• Deve ser único na plataforma</li>
          <li>• Apenas letras, números e hífens</li>
          <li>• Não pode ser alterado depois</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyDataStep;
