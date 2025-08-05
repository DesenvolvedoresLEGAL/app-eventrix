
import React from 'react'
import { Check, User, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  number: number
  title: string
  icon: React.ReactNode
  completed: boolean
}

interface OnboardingStepsProps {
  currentStep: number
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Validação',
      icon: <CheckCircle className="w-5 h-5" />,
      completed: currentStep > 1
    },
    {
      number: 2,
      title: 'Perfil',
      icon: <User className="w-5 h-5" />,
      completed: currentStep > 2
    }
  ]

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
                currentStep === step.number
                  ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                  : step.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              )}
            >
              {step.completed ? <Check className="w-6 h-6" /> : step.icon}
            </div>
            <span
              className={cn(
                'absolute mt-14 text-xs font-medium whitespace-nowrap',
                currentStep === step.number ? 'text-primary' : 'text-gray-500'
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'w-16 h-0.5 mx-4',
                step.completed ? 'bg-green-500' : 'bg-gray-300'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default OnboardingSteps
