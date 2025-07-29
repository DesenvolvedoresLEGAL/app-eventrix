import React from 'react';
import { ChevronRight, Building2, User, MapPin, Phone, Check, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { OnboardingProvider, useOnboarding } from '../context/OnboardingContext';

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


const EnterpriseOnboardWizard: React.FC = () => {
  const {
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
  } = useOnboarding();

  const handleNext = () => {
    if (currentStep < 5) {
      nextStep();
    } else {
      submit();
    }
  };

  const handlePrev = () => {
    prevStep();
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
                Primeiro Nome *
              </label>
              <Input
                type="text"
                id="first-name"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                required
                placeholder="Fulano"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Este será seu email de acesso ao sistema</p>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Último Nome *
              </label>
              <Input
                type="text"
                id="last-name"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                required
                placeholder="De Tal"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Este será seu email de acesso ao sistema</p>
            </div>
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

const EnterpriseOnboardWizardPage: React.FC = () => (
  <OnboardingProvider>
    <EnterpriseOnboardWizard />
  </OnboardingProvider>
);

export default EnterpriseOnboardWizardPage;