import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client'
import { Tables, TablesInsert } from '@/utils/supabase/types'
import { signUp } from '@/services/authService'

// Supabase table type aliases
export type BrazilianState = Tables<'brazilian_states'>;
export type BusinessSegment = Tables<'business_segments'>;
export type OrganizerType = Tables<'organizer_types'>;
export type SubscriptionPlan = Tables<'subscription_plans'>;
export type TenantInsert = TablesInsert<'tenants'>;
export type ProfileInsert = TablesInsert<'profiles'>;

export interface FormData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  cnaePrincipal: string;
  segmentoId: string;
  organizerTypeId: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  website: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  estadoId: string;
  cidade: string;
}

interface OnboardingContextValue {
  currentStep: number;
  isSubmitting: boolean;
  states: BrazilianState[];
  segments: BusinessSegment[];
  organizerTypes: OrganizerType[];
  plans: SubscriptionPlan[];
  formData: FormData;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (field: keyof FormData, value: string) => void;
  submit: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState<BrazilianState[]>([]);
  const [segments, setSegments] = useState<BusinessSegment[]>([]);
  const [organizerTypes, setOrganizerTypes] = useState<OrganizerType[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [defaultPlanId, setDefaultPlanId] = useState<string>();
  const [defaultStatusId, setDefaultStatusId] = useState<string>();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    password: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    cnaePrincipal: '',
    segmentoId: '',
    organizerTypeId: '',
    contactEmail: '',
    phone: '',
    whatsapp: '',
    website: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    estadoId: '',
    cidade: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: statesData } = await supabase
          .from('brazilian_states')
          .select('*')
          .eq('is_active', true)
          .order('name');
        if (statesData) setStates(statesData);

        const { data: segmentsData } = await supabase
          .from('business_segments')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');
        if (segmentsData) setSegments(segmentsData);

        const { data: organizerData } = await supabase
          .from('organizer_types')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');
        if (organizerData) setOrganizerTypes(organizerData);

        const { data: plansData } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('is_active', true)
          .order('price_monthly', {ascending: true});
        if (plansData) {
          setPlans(plansData);
          const trialPlan = plansData.filter(p => p.code === 'trial' || p.code === 'free');
          if (trialPlan) setDefaultPlanId(trialPlan[0].id);
        }

        const { data: statusData } = await supabase
          .from('tenant_statuses')
          .select('id')
          .eq('code', 'ativo')
          .single();
        if (statusData) setDefaultStatusId(statusData.id);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = (razaoSocial: string): string => {
    return razaoSocial
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(step => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(step => step - 1);
    }
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      console.log(`FORM DATA: ${JSON.stringify(formData)}`)

      const user = await signUp(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`,
        formData.firstName,
        formData.lastName,
        formData.whatsapp || undefined
      )

      const slug = generateSlug(formData.razaoSocial);

      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 30);

      const tenantData: TenantInsert = {
        slug,
        cnpj: formData.cnpj,
        razao_social: formData.razaoSocial,
        nome_fantasia: formData.nomeFantasia || null,
        inscricao_estadual: formData.inscricaoEstadual || null,
        cnae_principal: formData.cnaePrincipal || null,
        organizer_type_id: formData.organizerTypeId,
        primary_segment_id: formData.segmentoId,
        email_domain: formData.contactEmail.split('@')[1] || null,
        status_id: defaultStatusId,
        plan_id: defaultPlanId,
        trial_ends_at: trialEndsAt.toISOString(),
        contact_email: formData.contactEmail,
        contact_phone: formData.phone || null,
        whatsapp_number: formData.whatsapp || null,
        website_url: formData.website || null,
        endereco_logradouro: formData.logradouro,
        endereco_numero: formData.numero || null,
        endereco_complemento: formData.complemento || null,
        endereco_bairro: formData.bairro,
        endereco_cidade: formData.cidade,
        state_id: formData.estadoId,
        cep: formData.cep,
        created_by: user?.id || null,
        onboarding_current_step: 'dados_empresa',
        lgpd_acceptance_date: new Date().toISOString(),
        primary_color: '#4D2BFB',
        secondary_color: '#03F9FF',
        font_family: 'Neue Haas Unica',
        timezone: 'America/Sao_Paulo',
        locale: 'pt-BR',
        payment_method: 'pix',
        domain_validated: false,
        current_events_count: 0,
        current_admins_count: 0,
        max_events_allowed: 1,
        max_admins_allowed: 1,
        max_visitors_allowed: 100,
        max_exhibitors_allowed: 10,
        onboarding_completed: false,
        setup_wizard_completed: false,
        first_event_created: false,
        features_enabled: {},
        integrations_config: {},
        data_retention_months: 24,
        optante_simples_nacional: false,
        total_events_created: 0,
        total_revenue_brl: 0,
      };

      const { data: tenantResult, error: tenantError } = await supabase
        .from('tenants')
        .insert([tenantData])
        .select()
        .single();
        
      if (tenantError) throw tenantError;

      if (tenantResult) {
        await supabase.from('tenants').insert([tenantData]);
      }

      alert('Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isSubmitting,
        states,
        segments,
        organizerTypes,
        plans,
        formData,
        nextStep,
        prevStep,
        updateFormData,
        submit,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;
