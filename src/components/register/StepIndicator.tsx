
import React from 'react';
import { Check, User, Building, Users } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

const steps = [
  { number: 1, title: "Dados Pessoais", description: "Suas informações básicas", icon: User },
  { number: 2, title: "Empresa", description: "Dados da sua organização", icon: Building },
  { number: 3, title: "Convites", description: "Convide sua equipe", icon: Users }
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, completedSteps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const isActive = currentStep === step.number;
        const isCompleted = completedSteps.includes(step.number);
        const Icon = step.icon;

        return (
          <div key={step.number} className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors
              ${isCompleted 
                ? 'bg-green-500 text-white' 
                : isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-white/20 text-white/60'
              }
            `}>
              {isCompleted ? <Check size={16} /> : <Icon size={16} />}
            </div>
            <div>
              <div className={`font-medium ${isActive || isCompleted ? 'text-white' : 'text-white/60'}`}>
                {step.title}
              </div>
              <div className="text-sm text-white/60">{step.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
