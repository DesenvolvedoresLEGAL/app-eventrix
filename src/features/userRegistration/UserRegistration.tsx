import React, { useState } from 'react'
import InputField from '../common/InputField'
import { Button } from '@/components/ui/button'

/**
 * Tela de cadastro de usuário
 */
export interface UserData {
  firstName: string
  lastName: string
  email: string
  password: string
  whatsapp: string
}

export interface UserRegistrationProps {
  onSubmit?: (data: UserData) => void
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onSubmit }) => {
  const [data, setData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    whatsapp: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof UserData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errs.email = 'Email inválido'
    }
    if (data.password.length < 6) {
      errs.password = 'Mínimo 6 caracteres'
    }
    if (data.whatsapp && !/^\+?\d{10,15}$/.test(data.whatsapp)) {
      errs.whatsapp = 'Telefone inválido'
    }
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length === 0) {
      onSubmit?.(data)
      // Apenas log para fins de demonstração
      console.log('Usuário cadastrado', data)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-card p-6 rounded-md max-w-md mx-auto"
    >
      <InputField
        id="firstName"
        label="Primeiro Nome"
        value={data.firstName}
        onChange={e => handleChange('firstName', e.target.value)}
        required
      />
      <InputField
        id="lastName"
        label="Sobrenome"
        value={data.lastName}
        onChange={e => handleChange('lastName', e.target.value)}
        required
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        value={data.email}
        onChange={e => handleChange('email', e.target.value)}
        error={errors.email}
        required
      />
      <InputField
        id="password"
        label="Senha"
        type="password"
        value={data.password}
        onChange={e => handleChange('password', e.target.value)}
        error={errors.password}
        required
      />
      <InputField
        id="whatsapp"
        label="WhatsApp"
        placeholder="(00) 90000-0000"
        value={data.whatsapp}
        onChange={e => handleChange('whatsapp', e.target.value)}
        error={errors.whatsapp}
      />
      <Button type="submit" className="w-full">
        Cadastrar
      </Button>
    </form>
  )
}

export default UserRegistration
