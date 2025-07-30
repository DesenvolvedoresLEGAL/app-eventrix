
import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="space-y-6">
      {steps.map((step) => {
        const isActive = currentStep === step.number;
        const isCompleted = completedSteps.includes(step.number);
        
        return (
          <div key={step.number} className="flex items-start gap-4">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all
              ${isActive 
                ? 'bg-secondary text-white shadow-lg scale-110' 
                : isCompleted 
                  ? 'bg-primary text-white' 
                  : 'bg-white/20 text-white/60'
              }
            `}>
              {isCompleted ? <Check size={16} /> : step.number}
            </div>
            
            <div className={`flex-1 ${isActive ? 'text-white' : 'text-white/70'}`}>
              <h3 className="font-semibold text-sm">{step.title}</h3>
              <p className="text-xs text-white/60 mt-1">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
