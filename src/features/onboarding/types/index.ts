
export type OnboardingStep = 
  | 'dados_empresa' 
  | 'endereco' 
  | 'contato' 
  | 'plano' 
  | 'identidade_visual' 
  | 'configuracoes' 
  | 'finalizado';

export interface TenantData {
  id?: string;
  slug: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia?: string;
  contact_email: string;
  contact_phone?: string;
  whatsapp_number?: string;
  website_url?: string;
  endereco_logradouro: string;
  endereco_numero?: string;
  endereco_complemento?: string;
  endereco_bairro: string;
  endereco_cidade: string;
  cep: string;
  state_id: string;
  organizer_type_id: string;
  primary_segment_id: string;
  plan_id: string;
  onboarding_current_step: OnboardingStep;
  onboarding_completed: boolean;
  setup_wizard_completed: boolean;
  first_event_created: boolean;
}

export interface OnboardingContextType {
  currentStep: OnboardingStep;
  tenantData: Partial<TenantData>;
  loading: boolean;
  error: string | null;
  
  // Navigation
  nextStep: () => Promise<void>;
  prevStep: () => void;
  goToStep: (step: OnboardingStep) => Promise<void>;
  
  // Data management
  updateTenantData: (data: Partial<TenantData>) => void;
  saveTenantData: () => Promise<void>;
  validateCurrentStep: () => boolean;
  
  // Progress
  getStepProgress: () => number;
  isStepCompleted: (step: OnboardingStep) => boolean;
  canProceedToStep: (step: OnboardingStep) => boolean;
  
  // Completion
  completeOnboarding: () => Promise<void>;
}

export interface StepValidation {
  step: OnboardingStep;
  required_fields: (keyof TenantData)[];
  validator?: (data: Partial<TenantData>) => boolean;
}
