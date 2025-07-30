
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Globe, Check, X, Loader2 } from 'lucide-react';
import { slugify } from '@/hooks/useFormValidation';
import { useTenantValidation } from '@/hooks/useTenantValidation';

interface CompanyDataStepProps {
  formData: {
    tenantName: string;
    slug: string;
    domain: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export const CompanyDataStep: React.FC<CompanyDataStepProps> = ({ 
  formData, 
  errors, 
  onChange 
}) => {
  const { checkSlugAvailability, isChecking } = useTenantValidation();
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  useEffect(() => {
    if (formData.tenantName) {
      const newSlug = slugify(formData.tenantName);
      onChange('slug', newSlug);
    }
  }, [formData.tenantName, onChange]);

  useEffect(() => {
    const checkSlug = async () => {
      if (!formData.slug) {
        setSlugStatus('idle');
        return;
      }

      setSlugStatus('checking');
      const isAvailable = await checkSlugAvailability(formData.slug);
      setSlugStatus(isAvailable ? 'available' : 'taken');
    };

    const debounceTimer = setTimeout(checkSlug, 500);
    return () => clearTimeout(debounceTimer);
  }, [formData.slug, checkSlugAvailability]);

  const getSlugStatusIcon = () => {
    switch (slugStatus) {
      case 'checking':
        return <Loader2 className="animate-spin text-muted-foreground" size={16} />;
      case 'available':
        return <Check className="text-green-500" size={16} />;
      case 'taken':
        return <X className="text-destructive" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Building className="text-primary" size={20} />
          <h3 className="text-xl font-semibold">Dados da Empresa</h3>
        </div>
        <p className="text-muted-foreground">Conte-nos sobre sua organização</p>
      </div>

      <div>
        <Label htmlFor="tenantName">Nome da Empresa *</Label>
        <Input
          id="tenantName"
          value={formData.tenantName}
          onChange={(e) => onChange('tenantName', e.target.value)}
          placeholder="Nome da sua empresa"
          className={errors.tenantName ? 'border-destructive' : ''}
        />
        {errors.tenantName && (
          <p className="text-sm text-destructive mt-1">{errors.tenantName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="slug">URL da Empresa *</Label>
        <div className="relative">
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
              eventrix.app/
            </span>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => onChange('slug', slugify(e.target.value))}
              placeholder="sua-empresa"
              className={`rounded-l-none ${errors.slug || slugStatus === 'taken' ? 'border-destructive' : ''}`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getSlugStatusIcon()}
            </div>
          </div>
        </div>
        {slugStatus === 'taken' && (
          <p className="text-sm text-destructive mt-1">Este nome já está em uso</p>
        )}
        {slugStatus === 'available' && (
          <p className="text-sm text-green-600 mt-1">Disponível!</p>
        )}
        {errors.slug && (
          <p className="text-sm text-destructive mt-1">{errors.slug}</p>
        )}
      </div>

      <div>
        <Label htmlFor="domain">Domínio Personalizado (Opcional)</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            id="domain"
            value={formData.domain}
            onChange={(e) => onChange('domain', e.target.value)}
            placeholder="meusistema.com.br"
            className={`pl-10 ${errors.domain ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.domain && (
          <p className="text-sm text-destructive mt-1">{errors.domain}</p>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          Conecte seu próprio domínio (pode ser configurado depois)
        </p>
      </div>
    </div>
  );
};
