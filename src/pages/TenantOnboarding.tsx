import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Tenant } from '@features/auth'

// Esquema básico para cadastro de tenant
const tenantSchema = z.object({
  razao_social: z.string().min(1, 'Razão social é obrigatória'),
  nome_fantasia: z.string().optional(),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  contact_email: z.string().email('Email inválido'),
})

type TenantFormValues = z.infer<typeof tenantSchema>

const TenantOnboarding: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantFormValues>({ resolver: zodResolver(tenantSchema) })

  const onSubmit = (data: TenantFormValues) => {
    const tenant: Partial<Tenant> = {
      razao_social: data.razao_social,
      nome_fantasia: data.nome_fantasia || '',
      cnpj: data.cnpj,
      contact_email: data.contact_email,
    }
    // Envio para API ou contexto
    console.log('Novo tenant', tenant)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-4 bg-card p-6 rounded-lg shadow-card"
      >
        <h1 className="text-2xl font-bold mb-2">Cadastro de Empresa</h1>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="razao">
            Razão Social
          </label>
          <Input id="razao" {...register('razao_social')} />
          {errors.razao_social && (
            <p className="text-sm text-destructive mt-1">{errors.razao_social.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fantasia">
            Nome Fantasia
          </label>
          <Input id="fantasia" {...register('nome_fantasia')} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="cnpj">
            CNPJ
          </label>
          <Input id="cnpj" {...register('cnpj')} placeholder="00.000.000/0000-00" />
          {errors.cnpj && <p className="text-sm text-destructive mt-1">{errors.cnpj.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="contactEmail">
            Email de Contato
          </label>
          <Input id="contactEmail" type="email" {...register('contact_email')} />
          {errors.contact_email && (
            <p className="text-sm text-destructive mt-1">{errors.contact_email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Salvar Empresa
        </Button>
      </form>
    </div>
  )
}

export default TenantOnboarding
