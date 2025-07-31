import React, { useState } from 'react'
import InputField from '../common/InputField'
import { Button } from '@/components/ui/button'

/**
 * Tela de cadastro de empresa (tenant)
 */
export interface TenantData {
  razaoSocial: string
  cnpj: string
  cnaePrincipal?: string
  contactEmail: string
  contactPhone?: string
  cep: string
  enderecoLogradouro: string
  enderecoNumero?: string
  enderecoBairro: string
  enderecoCidade: string
  slug: string
  organizerTypeId: string
  planId: string
  primarySegmentId: string
  stateId: string
  statusId: string
  billingCnpj?: string
  billingEmail?: string
}

export interface TenantRegistrationProps {
  onSubmit?: (data: TenantData) => void
}

const TenantRegistration: React.FC<TenantRegistrationProps> = ({ onSubmit }) => {
  const [data, setData] = useState<TenantData>({
    razaoSocial: '',
    cnpj: '',
    cnaePrincipal: '',
    contactEmail: '',
    contactPhone: '',
    cep: '',
    enderecoLogradouro: '',
    enderecoNumero: '',
    enderecoBairro: '',
    enderecoCidade: '',
    slug: '',
    organizerTypeId: '',
    planId: '',
    primarySegmentId: '',
    stateId: '',
    statusId: '',
    billingCnpj: '',
    billingEmail: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof TenantData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!/^\d{14}$/.test(data.cnpj.replace(/\D/g, ''))) {
      errs.cnpj = 'CNPJ inválido'
    }
    if (!/^\S+@\S+\.\S+$/.test(data.contactEmail)) {
      errs.contactEmail = 'Email inválido'
    }
    if (data.contactPhone && !/^\+?\d{10,15}$/.test(data.contactPhone)) {
      errs.contactPhone = 'Telefone inválido'
    }
    if (!/^\d{5}-?\d{3}$/.test(data.cep)) {
      errs.cep = 'CEP inválido'
    }
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length === 0) {
      onSubmit?.(data)
      console.log('Empresa cadastrada', data)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-card p-6 rounded-md max-w-2xl mx-auto"
    >
      <InputField
        id="razaoSocial"
        label="Razão Social"
        value={data.razaoSocial}
        onChange={e => handleChange('razaoSocial', e.target.value)}
        required
      />
      <InputField
        id="cnpj"
        label="CNPJ"
        value={data.cnpj}
        onChange={e => handleChange('cnpj', e.target.value)}
        error={errors.cnpj}
        required
      />
      <InputField
        id="cnaePrincipal"
        label="CNAE Principal"
        value={data.cnaePrincipal}
        onChange={e => handleChange('cnaePrincipal', e.target.value)}
      />
      <InputField
        id="contactEmail"
        label="Email de Contato"
        type="email"
        value={data.contactEmail}
        onChange={e => handleChange('contactEmail', e.target.value)}
        error={errors.contactEmail}
        required
      />
      <InputField
        id="contactPhone"
        label="Telefone"
        value={data.contactPhone}
        onChange={e => handleChange('contactPhone', e.target.value)}
        error={errors.contactPhone}
      />
      <InputField
        id="cep"
        label="CEP"
        value={data.cep}
        onChange={e => handleChange('cep', e.target.value)}
        error={errors.cep}
        required
      />
      <InputField
        id="enderecoLogradouro"
        label="Logradouro"
        value={data.enderecoLogradouro}
        onChange={e => handleChange('enderecoLogradouro', e.target.value)}
        required
      />
      <InputField
        id="enderecoNumero"
        label="Número"
        value={data.enderecoNumero}
        onChange={e => handleChange('enderecoNumero', e.target.value)}
      />
      <InputField
        id="enderecoBairro"
        label="Bairro"
        value={data.enderecoBairro}
        onChange={e => handleChange('enderecoBairro', e.target.value)}
        required
      />
      <InputField
        id="enderecoCidade"
        label="Cidade"
        value={data.enderecoCidade}
        onChange={e => handleChange('enderecoCidade', e.target.value)}
        required
      />
      <InputField
        id="slug"
        label="Slug"
        value={data.slug}
        onChange={e => handleChange('slug', e.target.value)}
        required
      />
      <InputField
        id="organizerTypeId"
        label="Organizer Type ID"
        value={data.organizerTypeId}
        onChange={e => handleChange('organizerTypeId', e.target.value)}
        required
      />
      <InputField
        id="planId"
        label="Plan ID"
        value={data.planId}
        onChange={e => handleChange('planId', e.target.value)}
        required
      />
      <InputField
        id="primarySegmentId"
        label="Segmento Principal"
        value={data.primarySegmentId}
        onChange={e => handleChange('primarySegmentId', e.target.value)}
        required
      />
      <InputField
        id="stateId"
        label="Estado"
        value={data.stateId}
        onChange={e => handleChange('stateId', e.target.value)}
        required
      />
      <InputField
        id="statusId"
        label="Status ID"
        value={data.statusId}
        onChange={e => handleChange('statusId', e.target.value)}
        required
      />
      <InputField
        id="billingCnpj"
        label="CNPJ de Cobrança"
        value={data.billingCnpj}
        onChange={e => handleChange('billingCnpj', e.target.value)}
      />
      <InputField
        id="billingEmail"
        label="Email de Cobrança"
        type="email"
        value={data.billingEmail}
        onChange={e => handleChange('billingEmail', e.target.value)}
      />
      <Button type="submit" className="w-full">
        Cadastrar Empresa
      </Button>
    </form>
  )
}

export default TenantRegistration
