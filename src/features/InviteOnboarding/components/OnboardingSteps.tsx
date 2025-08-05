
import React from 'react'
import { CheckCircle2, Circle, User, Sparkles } from 'lucide-react'

interface OnboardingStepsProps {
  currentStep: number
  tenantPrimaryColor?: string
}

const steps = [
  {
    number: 1,
    title: 'Validar convite',
    description: 'Verificando suas credenciais',
    icon: CheckCircle2
  },
  {
    number: 2,
    title: 'Completar perfil',
    description: 'Preencha seus dados pessoais',
    icon: User
  },
  {
    number: 3,
    title: 'Bem-vindo!',
    description: 'Tudo pronto para começar',
    icon: Sparkles
  }
]

export function OnboardingSteps({ currentStep, tenantPrimaryColor }: OnboardingStepsProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep
          const isCompleted = step.number < currentStep
          const IconComponent = step.icon

          return (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-secondary border-secondary text-white' 
                      : isActive 
                        ? 'border-primary text-primary bg-primary/10' 
                        : 'border-muted text-muted-foreground'
                    }
                  `}
                  style={
                    isActive && tenantPrimaryColor 
                      ? { borderColor: tenantPrimaryColor, color: tenantPrimaryColor } 
                      : {}
                  }
                >
                  {isCompleted ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <IconComponent size={20} />
                  )}
                </div>
                
                <div className="mt-3 max-w-[120px]">
                  <p className={`text-sm font-semibold ${
                    isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className={`
                  w-16 h-0.5 transition-colors duration-300
                  ${step.number < currentStep ? 'bg-secondary' : 'bg-muted'}
                `} />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
