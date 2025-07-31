import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Schema de validação usando Zod para garantir regras de negócio
const userSchema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/\d/, 'Deve conter número')
    .regex(/[^A-Za-z0-9]/, 'Deve conter caractere especial'),
  whatsapp: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, 'Formato E.164 obrigatório'),
})

type UserFormValues = z.infer<typeof userSchema>

const UserOnboarding: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({ resolver: zodResolver(userSchema) })

  const onSubmit = (data: UserFormValues) => {
    // Aqui enviaríamos os dados para a API
    console.log('Novo usuário', data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 bg-card p-6 rounded-lg shadow-card"
      >
        <h1 className="text-2xl font-bold mb-2">Cadastro de Usuário</h1>
        {/* Campo nome */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="firstName">
            Nome
          </label>
          <Input id="firstName" {...register('firstName')} />
          {errors.firstName && (
            <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
          )}
        </div>
        {/* Campo sobrenome */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="lastName">
            Sobrenome
          </label>
          <Input id="lastName" {...register('lastName')} />
          {errors.lastName && (
            <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>
        {/* Senha com requisitos */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Senha
          </label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && (
            <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
          )}
        </div>
        {/* WhatsApp no padrão E.164 */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="whatsapp">
            WhatsApp
          </label>
          <Input id="whatsapp" placeholder="+5511999999999" {...register('whatsapp')} />
          {errors.whatsapp && (
            <p className="text-sm text-destructive mt-1">{errors.whatsapp.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </div>
  )
}

export default UserOnboarding
