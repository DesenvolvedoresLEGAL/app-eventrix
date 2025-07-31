import React from 'react'
import { Button } from '@/components/ui/button'

/**
 * Seleção de plano de assinatura com dados fictícios
 */
export interface Plan {
  id: string
  name: string
  price: string
  features: string[]
}

export interface PlanSelectionProps {
  plans?: Plan[]
  onSelect?: (planId: string) => void
}

const defaultPlans: Plan[] = [
  { id: 'basic', name: 'Básico', price: 'R$ 49/mês', features: ['1 evento', 'Suporte básico'] },
  { id: 'pro', name: 'Pro', price: 'R$ 99/mês', features: ['5 eventos', 'Suporte prioritário'] },
  { id: 'enterprise', name: 'Enterprise', price: 'Sob consulta', features: ['Eventos ilimitados', 'Suporte dedicado'] }
]

const PlanSelection: React.FC<PlanSelectionProps> = ({ plans = defaultPlans, onSelect }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map(plan => (
        <div key={plan.id} className="border rounded-lg p-4 bg-card flex flex-col">
          <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
          <p className="text-2xl font-bold mb-2">{plan.price}</p>
          <ul className="flex-1 text-sm list-disc list-inside mb-4 space-y-1">
            {plan.features.map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button onClick={() => onSelect?.(plan.id)}>Selecionar</Button>
        </div>
      ))}
    </div>
  )
}

export default PlanSelection
