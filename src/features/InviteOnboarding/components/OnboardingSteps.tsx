
import React from 'react'
import { CheckCircle, Circle, User, CheckCircle2 } from 'lucide-react'

interface OnboardingStepsProps {
  currentStep: number
}

export const OnboardingSteps: React.FC<OnboardingStepsProps> = ({ currentStep }) => {
  const steps = [
    {
      id: 0,
      title: 'Validação do convite',
      description: 'Verificando seus dados',
      icon: Circle,
    },
    {
      id: 1,
      title: 'Complete seu perfil',
      description: 'Preencha suas informações',
      icon: User,
    },
    {
      id: 2,
      title: 'Pronto!',
      description: 'Convite aceito com sucesso',
      icon: CheckCircle2,
    },
  ]

  return (
    <div className="w-full max-w-md mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id
          const IconComponent = step.icon

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2
                    ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 
                      isCurrent ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'}
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <IconComponent className="w-4 h-4" />
                  )}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-2 mt-[-16px]
                    ${isCompleted ? 'bg-primary' : 'bg-muted'}
                  `}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
