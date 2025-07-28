import React, { useState, useEffect } from 'react';
import { ChevronRight, Building2, User, MapPin, Phone, Check, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import supabase from '@/utils/supabase/client';
import { Tables, TablesInsert } from '@/utils/supabase/types';

// Type aliases for better readability
type BrazilianState = Tables<"brazilian_states">;
type BusinessSegment = Tables<"business_segments">;
type OrganizerType = Tables<"organizer_types">;
type SubscriptionPlan = Tables<"subscription_plans">;
type TenantStatus = Tables<"tenant_statuses">;
type TenantInsert = TablesInsert<"tenants">;

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  title: string;
  icon: React.ReactNode;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, currentStep, title, icon }) => {
  const isActive = currentStep === step;
  const isCompleted = currentStep > step;

  return (
    <div className="flex items-center">
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            isActive ? "bg-primary text-primary-foreground shadow-lg scale-110" : "",
            isCompleted ? "bg-green-500 text-white" : "",
            !isActive && !isCompleted ? "bg-gray-200 text-gray-500" : ""
          )}
        >
          {isCompleted ? <Check className="w-6 h-6" /> : icon}
        </div>
        <span className={cn(
          "absolute -bottom-6 text-xs font-medium whitespace-nowrap",
          isActive ? "text-primary" : "text-gray-500"
        )}>
          {title}
        </span>
      </div>
      {step < 5 && (
        <ChevronRight className={cn(
          "w-6 h-6 mx-6",
          currentStep > step ? "text-green-500" : "text-gray-300"
        )} />
      )}
    </div>
  );
};

interface FormData {
  // User data
  email: string;
  password: string;
  
  // Company basic info
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  cnaePrincipal: string;
  segmentoId: string;
  organizerTypeId: string;
  
  // Contact info
  contactEmail: string;
  phone: string;
  whatsapp: string;
  website: string;
  
  // Location
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  estadoId: string;
  cidade: string;
}

const EnterpriseOnboardWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState<BrazilianState[]>([]);
  const [segments, setSegments] = useState<BusinessSegment[]>([]);
  const [organizerTypes, setOrganizerTypes] = useState<OrganizerType[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [defaultPlanId, setDefaultPlanId] = useState<string>('00ace61e-0853-4254-be82-b888e91ce3c4');
  const [defaultStatusId, setDefaultStatusId] = useState<string>('cbfa8c27-aa51-4a64-9e71-3d068728d9f5');
  
  const [formData, setFormData] = useState<FormData>({
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

  // Load all necessary data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load states
        const { data: statesData } = await supabase
          .from('brazilian_states')
          .select('*')
          .eq('is_active', true)
          .order('name');
        if (statesData) setStates(statesData);

        // Load business segments
        const { data: segmentsData } = await supabase
          .from('business_segments')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');
        if (segmentsData) setSegments(segmentsData);

        // Load organizer types
        const { data: organizerData } = await supabase
          .from('organizer_types')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');
        if (organizerData) setOrganizerTypes(organizerData);

        // Load subscription plans
        const { data: plansData } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');
        if (plansData) {
          setPlans(plansData);
          // Set default plan (usually the free/trial plan)
          const trialPlan = plansData.find(p => p.code === 'trial' || p.code === 'free');
          if (trialPlan) setDefaultPlanId(trialPlan.id);
        }

        // Load default status (active)
        const { data: statusData } = await supabase
          .from('tenant_statuses')
          .select('id')
          .eq('code', 'active')
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
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .substring(0, 50); // Max 50 chars
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

    //   if (authError) throw authError;

      // Generate slug from razao social
      const slug = generateSlug(formData.razaoSocial);

      // Calculate trial end date (30 days from now)
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 30);

      // Create tenant record with proper types
      const tenantData: TenantInsert = {
        slug: slug,
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
        created_by: authData.user.id,
        onboarding_current_step: 'dados_empresa',
        lgpd_acceptance_date: new Date().toISOString(),
        // Default values as per DDL
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
        total_revenue_brl: 0
      };

      const { data: tenantResult, error: tenantError } = await supabase
        .from('tenants')
        .insert([tenantData])
        .select()
        .single();

      if (tenantError) throw tenantError;

      // Create user-tenant association if you have a tenant_users table
      if (tenantResult) {
        // This assumes you have a tenant_users table
        await supabase
          .from('tenants')
          .insert([tenantData]);
      }

      alert('Cadastro realizado com sucesso! Verifique seu email para confirmar a conta.');
      // Redirect to login or dashboard
      window.location.href = '/login';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 9);
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 15);
  };

  const steps = [
    { number: 1, title: 'Usuário', icon: <User className="w-6 h-6" /> },
    { number: 2, title: 'Dados da Empresa', icon: <Building2 className="w-6 h-6" /> },
    { number: 3, title: 'Documentos', icon: <FileText className="w-6 h-6" /> },
    { number: 4, title: 'Contato', icon: <Phone className="w-6 h-6" /> },
    { number: 5, title: 'Localização', icon: <MapPin className="w-6 h-6" /> }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
                placeholder="empresa@email.com"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Este será seu email de acesso ao sistema</p>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                required
                placeholder="Mínimo 6 caracteres"
                className="w-full"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="razao-social" className="block text-sm font-medium text-gray-700 mb-1">
                Razão Social *
              </label>
              <Input
                type="text"
                id="razao-social"
                value={formData.razaoSocial}
                onChange={(e) => updateFormData('razaoSocial', e.target.value)}
                required
                placeholder="Nome oficial da empresa"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="nome-fantasia" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Fantasia
              </label>
              <Input
                type="text"
                id="nome-fantasia"
                value={formData.nomeFantasia}
                onChange={(e) => updateFormData('nomeFantasia', e.target.value)}
                placeholder="Nome comercial (opcional)"
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="segmento" className="block text-sm font-medium text-gray-700 mb-1">
                  Segmento *
                </label>
                <select
                  id="segmento"
                  value={formData.segmentoId}
                  onChange={(e) => updateFormData('segmentoId', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Selecione o segmento</option>
                  {segments.map((segment) => (
                    <option key={segment.id} value={segment.id}>
                      {segment.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="organizer-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Organizador *
                </label>
                <select
                  id="organizer-type"
                  value={formData.organizerTypeId}
                  onChange={(e) => updateFormData('organizerTypeId', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  {organizerTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                CNPJ *
              </label>
              <Input
                type="text"
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => updateFormData('cnpj', formatCNPJ(e.target.value))}
                required
                placeholder="00.000.000/0000-00"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="inscricao-estadual" className="block text-sm font-medium text-gray-700 mb-1">
                Inscrição Estadual
              </label>
              <Input
                type="text"
                id="inscricao-estadual"
                value={formData.inscricaoEstadual}
                onChange={(e) => updateFormData('inscricaoEstadual', e.target.value)}
                placeholder="Número da IE (opcional)"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="cnae-principal" className="block text-sm font-medium text-gray-700 mb-1">
                CNAE Principal
              </label>
              <Input
                type="text"
                id="cnae-principal"
                value={formData.cnaePrincipal}
                onChange={(e) => updateFormData('cnaePrincipal', e.target.value)}
                placeholder="0000-0/00"
                maxLength={10}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Código Nacional de Atividade Econômica</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contato *
              </label>
              <Input
                type="email"
                id="contact-email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData('contactEmail', e.target.value)}
                required
                placeholder="contato@empresa.com"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone de Contato
              </label>
              <Input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', formatPhone(e.target.value))}
                placeholder="(00) 0000-0000"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp
              </label>
              <Input
                type="text"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => updateFormData('whatsapp', formatPhone(e.target.value))}
                placeholder="(00) 00000-0000"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <Input
                type="url"
                id="website"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                placeholder="https://www.empresa.com.br"
                className="w-full"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">
                CEP *
              </label>
              <Input
                type="text"
                id="cep"
                value={formData.cep}
                onChange={(e) => updateFormData('cep', formatCEP(e.target.value))}
                required
                placeholder="00000-000"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="logradouro" className="block text-sm font-medium text-gray-700 mb-1">
                Logradouro *
              </label>
              <Input
                type="text"
                id="logradouro"
                value={formData.logradouro}
                onChange={(e) => updateFormData('logradouro', e.target.value)}
                required
                placeholder="Rua, Avenida, etc."
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">
                  Número
                </label>
                <Input
                  type="text"
                  id="numero"
                  value={formData.numero}
                  onChange={(e) => updateFormData('numero', e.target.value)}
                  placeholder="123"
                  className="w-full"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="complemento" className="block text-sm font-medium text-gray-700 mb-1">
                  Complemento
                </label>
                <Input
                  type="text"
                  id="complemento"
                  value={formData.complemento}
                  onChange={(e) => updateFormData('complemento', e.target.value)}
                  placeholder="Sala, andar, bloco, etc."
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="bairro" className="block text-sm font-medium text-gray-700 mb-1">
                Bairro *
              </label>
              <Input
                type="text"
                id="bairro"
                value={formData.bairro}
                onChange={(e) => updateFormData('bairro', e.target.value)}
                required
                placeholder="Nome do bairro"
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade *
                </label>
                <Input
                  type="text"
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => updateFormData('cidade', e.target.value)}
                  required
                  placeholder="Nome da cidade"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado *
                </label>
                <select
                  id="estado"
                  value={formData.estadoId}
                  onChange={(e) => updateFormData('estadoId', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Selecione o estado</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cadastro de Empresa</h1>
          <p className="text-gray-600">Complete todos os passos para criar sua conta empresarial</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center items-center mb-12 px-8">
          {steps.map((step) => (
            <StepIndicator
              key={step.number}
              step={step.number}
              currentStep={currentStep}
              title={step.title}
              icon={step.icon}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-xl p-8 transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Passo {currentStep} de {steps.length}: {steps[currentStep - 1].title}
            </h2>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  currentStep === 5 ? 'Finalizar Cadastro' : 'Próximo'
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Summary (visible in last step) */}
        {currentStep === 5 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Resumo do Cadastro</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Razão Social:</p>
                <p className="font-medium">{formData.razaoSocial}</p>
              </div>
              <div>
                <p className="text-gray-600">CNPJ:</p>
                <p className="font-medium">{formData.cnpj}</p>
              </div>
              <div>
                <p className="text-gray-600">Telefone:</p>
                <p className="font-medium">{formData.phone || formData.whatsapp || 'Não informado'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Endereço:</p>
                <p className="font-medium">
                  {formData.logradouro}{formData.numero ? `, ${formData.numero}` : ''} - {formData.bairro}, {formData.cidade}/{states.find(s => s.id === formData.estadoId)?.code || ''}
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded">
              <p className="text-green-800 text-sm">
                ✓ Você terá 30 dias de teste grátis para experimentar todas as funcionalidades da plataforma
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterpriseOnboardWizard;