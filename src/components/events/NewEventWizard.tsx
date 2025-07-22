
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BasicInfoStep from './wizard-steps/BasicInfoStep';
import LocationStep from './wizard-steps/LocationStep';
import VisualIdentityStep from './wizard-steps/VisualIdentityStep';
import OrganizersStep from './wizard-steps/OrganizersStep';
import AdvancedOptionsStep from './wizard-steps/AdvancedOptionsStep';
import ReviewStep from './wizard-steps/ReviewStep';

interface EventFormData {
  // Basic Info
  name: string;
  description: string;
  category: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  website: string;
  
  // Location
  address: string;
  city: string;
  state: string;
  country: string;
  venueName: string;
  totalArea: string;
  capacity: string;
  accessibility: boolean;
  accessibilityInfo: string;
  
  // Visual Identity
  logo: File | null;
  banner: File | null;
  primaryColor: string;
  secondaryColor: string;
  fontStyle: string;
  
  // Organizers
  organizerName: string;
  primaryEmail: string;
  phone: string;
  company: string;
  teamMembers: Array<{ name: string; email: string; role: string }>;
  
  // Advanced Options
  publicRegistration: boolean;
  isHybrid: boolean;
  streamingPlatform: string;
  specialRequirements: string;
  lgpdAccepted: boolean;
  termsAccepted: boolean;
}

const initialFormData: EventFormData = {
  name: '',
  description: '',
  category: '',
  startDate: null,
  endDate: null,
  startTime: '',
  endTime: '',
  website: '',
  address: '',
  city: '',
  state: '',
  country: 'Brasil',
  venueName: '',
  totalArea: '',
  capacity: '',
  accessibility: false,
  accessibilityInfo: '',
  logo: null,
  banner: null,
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  fontStyle: 'modern',
  organizerName: '',
  primaryEmail: '',
  phone: '',
  company: '',
  teamMembers: [],
  publicRegistration: true,
  isHybrid: false,
  streamingPlatform: '',
  specialRequirements: '',
  lgpdAccepted: false,
  termsAccepted: false,
};

const steps = [
  { id: 1, title: 'Informações Básicas', description: 'Dados fundamentais do evento' },
  { id: 2, title: 'Local & Estrutura', description: 'Localização e infraestrutura' },
  { id: 3, title: 'Identidade Visual', description: 'Logo, cores e estilo' },
  { id: 4, title: 'Organizadores', description: 'Equipe responsável' },
  { id: 5, title: 'Opções Avançadas', description: 'Configurações finais' },
  { id: 6, title: 'Revisão', description: 'Confirme os dados' },
];

const NewEventWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();

  const updateFormData = (data: Partial<EventFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.description && formData.category && formData.startDate && formData.endDate);
      case 2:
        return !!(formData.address && formData.city && formData.state);
      case 3:
        return !!(formData.logo);
      case 4:
        return !!(formData.organizerName && formData.primaryEmail);
      case 5:
        return !!(formData.lgpdAccepted && formData.termsAccepted);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    setIsDraft(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Rascunho salvo",
      description: "Suas informações foram salvas com sucesso.",
    });
    
    setIsLoading(false);
  };

  const handleCreateEvent = async () => {
    if (!validateStep(5)) {
      toast({
        title: "Erro na validação",
        description: "Por favor, verifique todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Evento criado com sucesso!",
      description: "Seu evento foi cadastrado e está pronto para configuração.",
    });
    
    setIsLoading(false);
    // Here you would redirect to the event dashboard
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep data={formData} updateData={updateFormData} />;
      case 2:
        return <LocationStep data={formData} updateData={updateFormData} />;
      case 3:
        return <VisualIdentityStep data={formData} updateData={updateFormData} />;
      case 4:
        return <OrganizersStep data={formData} updateData={updateFormData} />;
      case 5:
        return <AdvancedOptionsStep data={formData} updateData={updateFormData} />;
      case 6:
        return <ReviewStep data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Criar Novo Evento</h1>
        <p className="text-muted-foreground">Configure seu evento em alguns passos simples</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">{steps[currentStep - 1].title}</h2>
            <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Passo {currentStep} de {steps.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        
        {/* Step indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step.id}
              </div>
              <div className="text-xs text-center mt-1 max-w-20">
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-card rounded-lg border p-6 mb-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save size={16} />
            {isDraft ? 'Rascunho Salvo' : 'Salvar Rascunho'}
          </Button>
        </div>

        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Voltar
            </Button>
          )}
          
          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              Próximo
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleCreateEvent}
              disabled={isLoading}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Criando...' : 'Criar Evento'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewEventWizard;
