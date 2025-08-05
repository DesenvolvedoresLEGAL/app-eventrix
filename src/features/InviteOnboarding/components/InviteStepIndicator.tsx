
import React from 'react'
import { CheckCircle2, Shield, User, Sparkles, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InviteStepIndicatorProps {
  currentStep: number
  tenantPrimaryColor?: string
}

const steps = [
  {
    number: 1,
    title: 'Validar Convite',
    description: 'Verificando credenciais',
    icon: Shield
  },
  {
    number: 2,
    title: 'Completar Perfil',
    description: 'Seus dados pessoais',
    icon: User
  },
  {
    number: 3,
    title: 'Bem-vindo!',
    description: 'Tudo pronto',
    icon: Sparkles
  }
]

const InviteStepIndicator = React.memo<InviteStepIndicatorProps>(({ currentStep, tenantPrimaryColor }) => {
  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => {
        const isActive = currentStep === step.number
        const isCompleted = currentStep > step.number
        const IconComponent = step.icon

        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg scale-110"
                      : "",
                    isCompleted ? "bg-secondary text-white" : "",
                    !isActive && !isCompleted ? "bg-muted text-muted-foreground" : ""
                  )}
                  style={
                    isActive && tenantPrimaryColor 
                      ? { backgroundColor: tenantPrimaryColor, color: 'white' } 
                      : {}
                  }
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <IconComponent className="w-6 h-6" />}
                </div>
                <span
                  className={cn(
                    "absolute -bottom-8 text-sm font-medium whitespace-nowrap text-center",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                  style={
                    isActive && tenantPrimaryColor 
                      ? { color: tenantPrimaryColor } 
                      : {}
                  }
                >
                  {step.title}
                </span>
                <span className="absolute -bottom-14 text-xs text-muted-foreground whitespace-nowrap text-center">
                  {step.description}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <ChevronRight
                className={cn(
                  "w-6 h-6 mx-8",
                  currentStep > step.number ? "text-secondary" : "text-muted"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
})

InviteStepIndicator.displayName = 'InviteStepIndicator'

export default InviteStepIndicator
