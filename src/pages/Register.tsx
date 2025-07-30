
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useTenantValidation } from '@/hooks/useTenantValidation';
import StepIndicator from '@/components/register/StepIndicator';
import PersonalDataStep from '@/components/register/PersonalDataStep';
import CompanyDataStep from '@/components/register/CompanyDataStep';
import InviteCollaboratorsStep from '@/components/register/InviteCollaboratorsStep';
import supabase from '@/utils/supabase/client';

interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface CompanyData {
  tenantName: string;
  slug: string;
  domain: string;
}

interface Collaborator {
  id: string;
  email: string;
  role: string;
  invited: boolean;
}

/**
 * Componente principal do wizard de registro em 3 passos
 * Segue o design da imagem fornecida com gradiente azul e cores do Eventrix™
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { validateField, formatPhone, generateSlug } = useFormValidation();
  const { checkSlugAvailability, isCheckingSlug } = useTenantValidation();

  // Estados do wizard
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Estados dos dados
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [companyData, setCompanyData] = useState<CompanyData>({
    tenantName: '',
    slug: '',
    domain: ''
  });

  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [isSendingInvites, setIsSendingInvites] = useState(false);

  // Estados de validação
  const [personalErrors, setPersonalErrors] = useState<Record<string, string[]>>({});
  const [companyErrors, setCompanyErrors] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

  // Estados de usuário criado
  const [createdUserId, setCreatedUserId] = useState<string | null>(null);

  const steps = useMemo(() => [
    { number: 1, title: 'Dados Pessoais', description: 'Informações básicas' },
    { number: 2, title: 'Empresa', description: 'Configuração da organização' },
    { number: 3, title: 'Convites', description: 'Adicionar colaboradores' }
  ], []);

  /**
   * Atualiza dados pessoais e aplica formatação quando necessário
   */
  const handlePersonalDataChange = useCallback((field: keyof PersonalData, value: string) => {
    let formattedValue = value;
    
    if (field === 'phone') {
      formattedValue = formatPhone(value);
    }
    
    setPersonalData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Limpar erros do campo quando usuário começar a digitar
    if (personalErrors[field]) {
      setPersonalErrors(prev => ({ ...prev, [field]: [] }));
    }
  }, [formatPhone, personalErrors]);

  /**
   * Atualiza dados da empresa e gera slug automaticamente
   */
  const handleCompanyDataChange = useCallback((field: keyof CompanyData, value: string) => {
    setCompanyData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Gerar slug automaticamente quando o nome da empresa mudar
      if (field === 'tenantName') {
        newData.slug = generateSlug(value);
      }
      
      return newData;
    });
    
    // Limpar erros do campo
    if (companyErrors[field]) {
      setCompanyErrors(prev => ({ ...prev, [field]: [] }));
    }
  }, [generateSlug, companyErrors]);

  /**
   * Verifica disponibilidade do slug quando ele muda
   */
  useEffect(() => {
    const checkSlug = async () => {
      if (companyData.slug.length >= 3) {
        const available = await checkSlugAvailability(companyData.slug);
        setSlugAvailable(available);
      } else {
        setSlugAvailable(null);
      }
    };

    const timeoutId = setTimeout(checkSlug, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [companyData.slug, checkSlugAvailability]);

  /**
   * Valida dados do passo 1
   */
  const validatePersonalData = useCallback((): boolean => {
    const errors: Record<string, string[]> = {};

    const firstNameValidation = validateField(personalData.firstName, { required: true, minLength: 2 });
    if (!firstNameValidation.isValid) errors.firstName = firstNameValidation.errors;

    const lastNameValidation = validateField(personalData.lastName, { required: true, minLength: 2 });
    if (!lastNameValidation.isValid) errors.lastName = lastNameValidation.errors;

    const emailValidation = validateField(personalData.email, { required: true, email: true });
    if (!emailValidation.isValid) errors.email = emailValidation.errors;

    if (personalData.phone) {
      const phoneValidation = validateField(personalData.phone, { phone: true });
      if (!phoneValidation.isValid) errors.phone = phoneValidation.errors;
    }

    const passwordValidation = validateField(personalData.password, { required: true, password: true });
    if (!passwordValidation.isValid) errors.password = passwordValidation.errors;

    if (personalData.password !== personalData.confirmPassword) {
      errors.confirmPassword = ['As senhas não coincidem'];
    }

    setPersonalErrors(errors);
    return Object.keys(errors).length === 0;
  }, [personalData, validateField]);

  /**
   * Valida dados do passo 2
   */
  const validateCompanyData = useCallback((): boolean => {
    const errors: Record<string, string[]> = {};

    const tenantNameValidation = validateField(companyData.tenantName, { required: true, minLength: 3 });
    if (!tenantNameValidation.isValid) errors.tenantName = tenantNameValidation.errors;

    const slugValidation = validateField(companyData.slug, { required: true, minLength: 3 });
    if (!slugValidation.isValid) errors.slug = slugValidation.errors;

    if (slugAvailable === false) {
      errors.slug = ['Este identificador já está em uso'];
    }

    setCompanyErrors(errors);
    return Object.keys(errors).length === 0 && slugAvailable === true;
  }, [companyData, validateField, slugAvailable]);

  /**
   * Avança para o próximo passo
   */
  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (validatePersonalData()) {
        setIsLoading(true);
        try {
          const userData = await signUp(
            personalData.email,
            personalData.password,
            `${personalData.firstName} ${personalData.lastName}`,
            personalData.firstName,
            personalData.lastName,
            personalData.phone || undefined
          );
          
          if (userData?.id) {
            setCreatedUserId(userData.id);
            setCompletedSteps(prev => [...prev, 1]);
            setCurrentStep(2);
          }
        } catch (error) {
          console.error('Erro ao criar usuário:', error);
          alert('Erro ao criar conta. Tente novamente.');
        } finally {
          setIsLoading(false);
        }
      }
    } else if (currentStep === 2) {
      if (validateCompanyData() && createdUserId) {
        setIsLoading(true);
        try {
          // Criar tenant com todos os campos obrigatórios
          const { error } = await supabase.from('tenants').insert({
            slug: companyData.slug,
            cnpj: '00.000.000/0000-00', // Valor temporário - será preenchido depois
            razao_social: companyData.tenantName,
            nome_fantasia: companyData.tenantName,
            contact_email: personalData.email,
            email_domain: companyData.domain || null,
            created_by: createdUserId,
            organizer_type_id: '00000000-0000-0000-0000-000000000001', // Valor padrão
            primary_segment_id: '00000000-0000-0000-0000-000000000001', // Valor padrão
            state_id: '00000000-0000-0000-0000-000000000001', // Valor padrão
            plan_id: '00000000-0000-0000-0000-000000000001', // Valor padrão
            status_id: '00000000-0000-0000-0000-000000000001', // Valor padrão
            // Campos de endereço obrigatórios - valores temporários
            endereco_logradouro: 'A definir',
            endereco_bairro: 'A definir',
            endereco_cidade: 'A definir',
            cep: '00000-000'
          });

          if (error) {
            console.error('Erro ao criar tenant:', error);
            alert('Erro ao criar empresa. Tente novamente.');
            return;
          }

          setCompletedSteps(prev => [...prev, 2]);
          setCurrentStep(3);
        } catch (error) {
          console.error('Erro ao criar tenant:', error);
          alert('Erro ao criar empresa. Tente novamente.');
        } finally {
          setIsLoading(false);
        }
      }
    } else if (currentStep === 3) {
      // Finalizar processo
      setCompletedSteps(prev => [...prev, 3]);
      navigate('/dashboard');
    }
  };

  /**
   * Volta para o passo anterior
   */
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Adiciona colaborador à lista
   */
  const handleAddCollaborator = () => {
    if (newCollaboratorEmail.trim() && !collaborators.find(c => c.email === newCollaboratorEmail)) {
      const newCollaborator: Collaborator = {
        id: Date.now().toString(),
        email: newCollaboratorEmail,
        role: 'member',
        invited: false
      };
      setCollaborators(prev => [...prev, newCollaborator]);
      setNewCollaboratorEmail('');
    }
  };

  /**
   * Remove colaborador da lista
   */
  const handleRemoveCollaborator = (id: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== id));
  };

  /**
   * Envia convites por magic link
   */
  const handleSendInvites = async () => {
    setIsSendingInvites(true);
    const pendingCollaborators = collaborators.filter(c => !c.invited);
    
    for (const collaborator of pendingCollaborators) {
      try {
        await supabase.auth.signInWithOtp({ 
          email: collaborator.email,
          options: {
            data: {
              tenant_slug: companyData.slug,
              invited_by: personalData.email,
              role: 'member'
            }
          }
        });
        
        // Marcar como enviado
        setCollaborators(prev => 
          prev.map(c => c.id === collaborator.id ? { ...c, invited: true } : c)
        );
      } catch (error) {
        console.error('Erro ao enviar convite para', collaborator.email, error);
      }
    }
    
    setIsSendingInvites(false);
  };

  /**
   * Toggle visibility da senha
   */
  const handleTogglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  /**
   * Renderiza o passo atual
   */
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDataStep
            data={personalData}
            errors={personalErrors}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            onDataChange={handlePersonalDataChange}
            onTogglePasswordVisibility={handleTogglePasswordVisibility}
          />
        );
      case 2:
        return (
          <CompanyDataStep
            data={companyData}
            errors={companyErrors}
            slugAvailable={slugAvailable}
            isCheckingSlug={isCheckingSlug}
            onDataChange={handleCompanyDataChange}
          />
        );
      case 3:
        return (
          <InviteCollaboratorsStep
            collaborators={collaborators}
            newCollaboratorEmail={newCollaboratorEmail}
            onNewEmailChange={setNewCollaboratorEmail}
            onAddCollaborator={handleAddCollaborator}
            onRemoveCollaborator={handleRemoveCollaborator}
            onSendInvites={handleSendInvites}
            isSendingInvites={isSendingInvites}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar com gradiente azul - baseado na imagem */}
      <div className="w-full md:w-2/5 bg-gradient-to-br from-primary via-primary-dark to-primary text-white p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-pulse-light"></div>
        <div className="absolute bottom-20 left-0 w-24 h-24 bg-secondary/20 rounded-full -ml-12"></div>
        
        <div className="relative z-10">
          {/* Header da marca */}
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-4xl font-black">EVENTRIX™</h1>
          </div>
          <div className="flex items-center gap-1 mb-8">
            <Zap size={12} className="text-secondary" />
            <span className="text-sm font-semibold text-white/90">Powered by LEGAL AI</span>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Criar sua conta</h2>
            <p className="text-white/80 text-lg mb-8">Configure sua organização em poucos passos</p>
          </div>

          {/* Indicador de passos */}
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        {/* Footer */}
        <div className="hidden md:block text-sm text-white/70 relative z-10">
          &copy; {new Date().getFullYear()} Eventrix™. Todos os direitos reservados.
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-2xl">
          <div className="bg-card rounded-2xl shadow-card border p-8">
            {/* Conteúdo do passo atual */}
            {renderCurrentStep()}

            {/* Botões de navegação */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <div>
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Voltar
                  </Button>
                )}
              </div>

              <div className="flex gap-4">
                {currentStep === 3 && (
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    disabled={isLoading}
                  >
                    Pular convites
                  </Button>
                )}
                
                <Button
                  onClick={handleNextStep}
                  disabled={isLoading || (currentStep === 2 && slugAvailable !== true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {currentStep === 1 ? 'Criando...' : currentStep === 2 ? 'Salvando...' : 'Finalizando...'}
                    </>
                  ) : (
                    <>
                      {currentStep === 3 ? 'Finalizar' : 'Próximo'}
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Link para login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <a 
                  href="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Fazer login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
