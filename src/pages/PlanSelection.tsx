import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface PlanForm {
  plan: 'basic' | 'pro' | 'enterprise'
  billing: 'monthly' | 'annual'
}

const PlanSelection: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<PlanForm>({
    defaultValues: { billing: 'monthly' },
  })

  const onSubmit = (data: PlanForm) => {
    console.log('Plano escolhido', data)
  }

  const billing = watch('billing')

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 bg-card p-6 rounded-lg shadow-card"
      >
        <h1 className="text-2xl font-bold">Seleção de Plano</h1>

        {/* Toggle mensal/anual */}
        <div className="flex gap-2">
          <label className="flex items-center gap-2">
            <input type="radio" value="monthly" {...register('billing')} /> Mensal
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="annual" {...register('billing')} /> Anual
          </label>
        </div>

        {/* Planos disponíveis */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" value="basic" {...register('plan', { required: true })} />
            Básico {billing === 'annual' ? 'R$100/ano' : 'R$10/mês'}
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="pro" {...register('plan', { required: true })} />
            Pro {billing === 'annual' ? 'R$200/ano' : 'R$20/mês'}
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="enterprise" {...register('plan', { required: true })} />
            Enterprise
          </label>
        </div>

        <Button type="submit" className="w-full">
          Continuar
        </Button>
      </form>
    </div>
  )
}

export default PlanSelection
