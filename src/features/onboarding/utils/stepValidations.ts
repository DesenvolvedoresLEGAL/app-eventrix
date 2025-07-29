
import { OnboardingStep, TenantData, StepValidation } from '../types';

export const ONBOARDING_STEPS: OnboardingStep[] = [
  'dados_empresa',
  'endereco',
  'contato',
  'plano',
  'identidade_visual',
  'configuracoes',
  'finalizado'
];

export const STEP_VALIDATIONS: StepValidation[] = [
  {
    step: 'dados_empresa',
    required_fields: ['slug', 'cnpj', 'razao_social', 'organizer_type_id', 'primary_segment_id'],
    validator: (data) => {
      if (!data.cnpj) return false;
      // Validação básica de CNPJ (apenas formato)
      const cnpjClean = data.cnpj.replace(/[^\d]/g, '');
      return cnpjClean.length === 14;
    }
  },
  {
    step: 'endereco',
    required_fields: ['endereco_logradouro', 'endereco_bairro', 'endereco_cidade', 'cep', 'state_id'],
    validator: (data) => {
      if (!data.cep) return false;
      // Validação básica de CEP
      const cepClean = data.cep.replace(/[^\d]/g, '');
      return cepClean.length === 8;
    }
  },
  {
    step: 'contato',
    required_fields: ['contact_email'],
    validator: (data) => {
      if (!data.contact_email) return false;
      // Validação básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(data.contact_email);
    }
  },
  {
    step: 'plano',
    required_fields: ['plan_id']
  },
  {
    step: 'identidade_visual',
    required_fields: []
  },
  {
    step: 'configuracoes',
    required_fields: []
  }
];

export const validateStep = (step: OnboardingStep, data: Partial<TenantData>): boolean => {
  const validation = STEP_VALIDATIONS.find(v => v.step === step);
  if (!validation) return true;
  
  // Check required fields
  for (const field of validation.required_fields) {
    if (!data[field]) {
      return false;
    }
  }
  
  // Run custom validator if present
  if (validation.validator) {
    return validation.validator(data);
  }
  
  return true;
};

export const getStepIndex = (step: OnboardingStep): number => {
  return ONBOARDING_STEPS.indexOf(step);
};

export const getNextStep = (currentStep: OnboardingStep): OnboardingStep | null => {
  const currentIndex = getStepIndex(currentStep);
  if (currentIndex === -1 || currentIndex === ONBOARDING_STEPS.length - 1) {
    return null;
  }
  return ONBOARDING_STEPS[currentIndex + 1];
};

export const getPreviousStep = (currentStep: OnboardingStep): OnboardingStep | null => {
  const currentIndex = getStepIndex(currentStep);
  if (currentIndex <= 0) {
    return null;
  }
  return ONBOARDING_STEPS[currentIndex - 1];
};
