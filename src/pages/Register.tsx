
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { StepIndicator } from '@/components/register/StepIndicator';
import { PersonalDataStep } from '@/components/register/PersonalDataStep';
import { CompanyDataStep } from '@/components/register/CompanyDataStep';
import { InviteCollaboratorsStep } from '@/components/register/InviteCollaboratorsStep';
import { useFormValidation, emailPattern, phonePattern, passwordValidation } from '@/hooks/useFormValidation';
import { useTenantValidation } from '@/hooks/useTenantValidation';
import supabase from '@/utils/supabase/client';

interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Step 2
  tenantName: string;
  slug: string;
  domain: string;
}

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { checkUserHasTenant } = useTenantValidation();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    tenantName: '',
    slug: '',
    domain: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validation for Step 1
  const step1Fields = useMemo(() => [
    { name: 'firstName', value: formData.firstName, rules: { required: true, minLength: 2 } },
    { name: 'lastName', value: formData.lastName, rules: { required: true, minLength: 2 } },
    { name: 'email', value: formData.email, rules: { required: true, pattern: emailPattern } },
    { name: 'phone', value: formData.phone, rules: { pattern: phonePattern } },
    { name: 'password', value: formData.password, rules: { required: true, custom: passwordValidation } },
    { 
      name: 'confirmPassword', 
      value: formData.confirmPassword, 
      rules: { 
        required: true,
        custom: (value) => value !== formData.password ? 'Senhas não coincidem' : null
      }
    }
  ], [formData]);

  // Validation for Step 2
  const step2Fields = useMemo(() => [
    { name: 'tenantName', value: formData.tenantName, rules: { required: true, minLength: 2 } },
    { name: 'slug', value: formData.slug, rules: { required: true, minLength: 2 } }
  ], [formData]);

  const { errors: step1Errors, isValid: step1Valid } = useFormValidation(step1Fields);
  const { errors: step2Errors, isValid: step2Valid } = useFormValidation(step2Fields);

  const handleStep1Submit = async () => {
    if (!step1Valid) return;

    setLoading(true);
    try {
      const user = await signUp(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`,
        formData.firstName,
        formData.lastName,
        formData.phone
      );
      
      if (user?.id) {
        setUserId(user.id);
        
        // Check if user already has a tenant
        const hasTenant = await checkUserHasTenant(user.id);
        if (hasTenant) {
          alert('Você já possui uma empresa cadastrada');
          navigate('/dashboard');
          return;
        }

        setCompletedSteps(prev => [...prev, 1]);
        setCurrentStep(2);
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async () => {
    if (!step2Valid) return;

    setLoading(true);
    try {
      // Create tenant
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .insert([{
          slug: formData.slug,
          razao_social: formData.tenantName,
          nome_fantasia: formData.tenantName,
          contact_email: formData.email,
          email_domain: formData.domain || null,
          created_by: userId,
          cnpj: '00.000.000/0000-00', // Default CNPJ - will be updated later
          endereco_logradouro: 'A definir',
          endereco_bairro: 'A definir', 
          endereco_cidade: 'A definir',
          cep: '00000-000',
          state_id: (await supabase.from('brazilian_states').select('id').eq('code', 'SP').single()).data?.id,
          organizer_type_id: (await supabase.from('organizer_types').select('id').eq('code', 'empresa').single()).data?.id,
          primary_segment_id: (await supabase.from('business_segments').select('id').eq('code', 'outros').single()).data?.id,
          plan_id: (await supabase.from('subscription_plans').select('id').eq('code', 'trial').single()).data?.id,
          status_id: (await supabase.from('tenant_statuses').select('id').eq('code', 'ativo').single()).data?.id
        }])
        .select()
        .single();

      if (tenantError) throw tenantError;

      setCompletedSteps(prev => [...prev, 2]);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error creating tenant:', error);
      alert('Erro ao criar empresa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = () => {
    setCompletedSteps(prev => [...prev, 3]);
    alert('Cadastro realizado com sucesso! Bem-vindo ao Eventrix™');
    navigate('/dashboard');
  };

  const nextStep = () => {
    if (currentStep === 1) {
      handleStep1Submit();
    } else if (currentStep === 2) {
      handleStep2Submit();
    } else {
      handleFinalSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDataStep
            formData={formData}
            errors={step1Errors}
            onChange={updateFormData}
          />
        );
      case 2:
        return (
          <CompanyDataStep
            formData={formData}
            errors={step2Errors}
            onChange={updateFormData}
          />
        );
      case 3:
        return (
          <InviteCollaboratorsStep tenantSlug={formData.slug} />
        );
      default:
        return null;
    }
  };

  const getStepValid = () => {
    switch (currentStep) {
      case 1:
        return step1Valid;
      case 2:
        return step2Valid;
      case 3:
        return true; // Step 3 is always valid (optional invites)
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Sidebar */}
      <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-700 to-blue-400 text-white p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-black">EVENTRIX™</h1>
          </div>
          <div className="flex items-center gap-1 mb-4">
            <Zap size={12} className="text-white" />
            <span className="text-sm font-semibold text-white/90">Powered by LEGAL AI</span>
          </div>
          <p className="text-white/80 text-lg mb-8">Crie sua conta e comece seu teste gratuito</p>

          <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />
        </div>

        <div className="hidden md:block text-sm text-white/70 relative z-10">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-lg">
          <div className="bg-card p-8 rounded-lg border shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Criar <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Conta</span>
              </h2>
              <p className="text-muted-foreground">Passo {currentStep} de 3</p>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mt-4">
                ✨ 7 dias grátis
              </div>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-8 gap-4">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Voltar
                </Button>
              )}
              
              <div className="flex-1" />

              <Button 
                onClick={nextStep} 
                disabled={loading || !getStepValid()}
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                {loading ? 'Carregando...' : currentStep === 3 ? 'Finalizar' : 'Próximo'}
                {!loading && <ArrowRight size={16} />}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta? <a href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">Fazer login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
