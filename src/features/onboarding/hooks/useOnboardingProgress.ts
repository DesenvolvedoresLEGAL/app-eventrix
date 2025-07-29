
import { useMemo } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import { ONBOARDING_STEPS } from '../utils/stepValidations';

export const useOnboardingProgress = () => {
  const { 
    currentStep, 
    tenantData, 
    isStepCompleted, 
    canProceedToStep,
    getStepProgress 
  } = useOnboarding();

  const stepInfo = useMemo(() => {
    return ONBOARDING_STEPS.map((step, index) => ({
      step,
      index,
      isActive: step === currentStep,
      isCompleted: isStepCompleted(step),
      canProceed: canProceedToStep(step),
      title: getStepTitle(step),
      description: getStepDescription(step)
    }));
  }, [currentStep, isStepCompleted, canProceedToStep]);

  const progress = useMemo(() => ({
    percentage: getStepProgress(),
    currentStepIndex: ONBOARDING_STEPS.indexOf(currentStep),
    totalSteps: ONBOARDING_STEPS.length,
    completedSteps: stepInfo.filter(s => s.isCompleted).length
  }), [getStepProgress, currentStep, stepInfo]);

  return {
    stepInfo,
    progress,
    isOnboardingComplete: tenantData.onboarding_completed || false
  };
};

const getStepTitle = (step: string): string => {
  const titles = {
    dados_empresa: 'Dados da Empresa',
    endereco: 'Endereço',
    contato: 'Contato',
    plano: 'Plano de Assinatura',
    identidade_visual: 'Identidade Visual',
    configuracoes: 'Configurações',
    finalizado: 'Finalizado'
  };
  
  return titles[step as keyof typeof titles] || step;
};

const getStepDescription = (step: string): string => {
  const descriptions = {
    dados_empresa: 'Informações básicas da sua empresa',
    endereco: 'Localização e endereço completo',
    contato: 'Dados de contato e comunicação',
    plano: 'Escolha seu plano de assinatura',
    identidade_visual: 'Personalize a aparência da plataforma',
    configuracoes: 'Configurações gerais do sistema',
    finalizado: 'Onboarding concluído com sucesso'
  };
  
  return descriptions[step as keyof typeof descriptions] || '';
};
