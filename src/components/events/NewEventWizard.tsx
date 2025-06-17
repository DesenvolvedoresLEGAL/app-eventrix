import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { useFileUpload } from '@/hooks/useFileUpload';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();
  const { uploadFile, isUploading } = useFileUpload();

  // Font style mapping to match database ENUMs
  const mapFontStyle = (fontStyle: string) => {
    const fontMapping: Record<string, string> = {
      'modern': 'sans-serif',
      'classic': 'serif',
      'elegant': 'script',
      'tech': 'monospace'
    };
    return fontMapping[fontStyle] || 'sans-serif';
  };

  // Event category mapping
  const mapCategory = (category: string) => {
    const validCategories = ['fair', 'congress', 'symposium', 'festival', 'other'];
    return validCategories.includes(category.toLowerCase()) ? category.toLowerCase() : 'other';
  };

  // Helper function to safely convert time fields
  const sanitizeTimeField = (timeValue: string): string | null => {
    if (!timeValue || timeValue.trim() === '') {
      return null;
    }
    return timeValue;
  };

  // Reset all form states to initial values
  const resetFormState = () => {
    console.log('🔄 Resetting form state to initial values');
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsDraft(false);
    setIsLoading(false);
    setIsProcessing(false);
  };

  // Helper function to safely handle file uploads with proper error handling
  const safeUploadFile = async (file: File, bucket: string, folder: string): Promise<string | null> => {
    try {
      console.log(`📤 Attempting to upload ${folder}:`, file.name);
      const url = await uploadFile(file, bucket, folder);
      
      if (url) {
        console.log(`✅ ${folder} upload successful:`, url);
      } else {
        console.warn(`⚠️ ${folder} upload returned null`);
      }
      
      return url;
      
    } catch (error: any) {
      console.error(`❌ ${folder} upload failed:`, error);
      toast({
        title: `Erro no upload do ${folder}`,
        description: `Falha ao fazer upload do ${folder}. O evento será criado sem este arquivo.`,
        variant: "default",
      });
      return null;
    }
  };

  const createEventMutation = useMutation({
    mutationFn: async (eventData: any) => {
      console.log('🚀 Starting event creation with payload:', eventData);
      
      // Insert event
      const { data: eventResult, error: eventError } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (eventError) {
        console.error('❌ Event creation failed:', eventError);
        throw eventError;
      }

      console.log('✅ Event created successfully:', eventResult);

      // Insert organizer
      if (formData.organizerName && formData.primaryEmail) {
        console.log('📝 Creating organizer...');
        const { error: organizerError } = await supabase
          .from('event_organizers')
          .insert({
            event_id: eventResult.id,
            full_name: formData.organizerName,
            main_email: formData.primaryEmail,
            phone_whatsapp: formData.phone || null,
            company: formData.company || null,
          });

        if (organizerError) {
          console.error('❌ Organizer creation failed:', organizerError);
          throw organizerError;
        }
        console.log('✅ Organizer created successfully');
      }

      // Insert team members
      if (formData.teamMembers.length > 0) {
        console.log('👥 Creating team members...');
        const teamInserts = formData.teamMembers.map(member => ({
          event_id: eventResult.id,
          name: member.name,
          email: member.email,
          role: member.role,
        }));

        const { error: teamError } = await supabase
          .from('event_team')
          .insert(teamInserts);

        if (teamError) {
          console.error('❌ Team creation failed:', teamError);
          throw teamError;
        }
        console.log('✅ Team created successfully');
      }

      return eventResult;
    },
  });

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
    // Prevent multiple simultaneous operations
    if (isProcessing || isLoading || isUploading) {
      console.log('⚠️ Operation already in progress, skipping draft save');
      return;
    }

    console.log('💾 Starting draft save process...');
    setIsLoading(true);
    setIsProcessing(true);
    setIsDraft(true);
    
    try {
      // Upload files if present with proper error handling
      let logoUrl = null;
      let bannerUrl = null;

      if (formData.logo) {
        logoUrl = await safeUploadFile(formData.logo, 'event-logos', 'logos');
      }

      if (formData.banner) {
        bannerUrl = await safeUploadFile(formData.banner, 'event-banners', 'banners');
      }

      const eventPayload = {
        tenant_id: '00000000-0000-0000-0000-000000000000',
        name: formData.name || 'Rascunho',
        short_description: formData.description || null,
        category: formData.category ? mapCategory(formData.category) : null,
        start_date: formData.startDate?.toISOString().split('T')[0] || null,
        end_date: formData.endDate?.toISOString().split('T')[0] || null,
        start_time: sanitizeTimeField(formData.startTime),
        end_time: sanitizeTimeField(formData.endTime),
        official_website: formData.website || null,
        full_address: formData.address || null,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        venue_name: formData.venueName || null,
        total_area: formData.totalArea ? parseFloat(formData.totalArea) : null,
        estimated_capacity: formData.capacity ? parseInt(formData.capacity) : null,
        has_accessibility: formData.accessibility,
        logo_url: logoUrl,
        banner_url: bannerUrl,
        primary_color: formData.primaryColor || null,
        secondary_color: formData.secondaryColor || null,
        font_style: formData.fontStyle ? mapFontStyle(formData.fontStyle) : null,
        status: 'upcoming',
        is_public_registration: formData.publicRegistration,
        has_online_broadcast: formData.isHybrid,
        broadcast_platform: formData.isHybrid ? formData.streamingPlatform : null,
        notes: formData.specialRequirements || null,
        accepted_lgpd: formData.lgpdAccepted,
        accepted_eventrix_terms: formData.termsAccepted,
      };

      console.log('📋 Draft payload:', JSON.stringify(eventPayload, null, 2));
      
      await createEventMutation.mutateAsync(eventPayload);
      
      toast({
        title: "Rascunho salvo",
        description: "Suas informações foram salvas com sucesso.",
      });
      
    } catch (error: any) {
      console.error('❌ Draft save failed:', error);
      toast({
        title: "Erro ao salvar rascunho",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    } finally {
      console.log('🏁 Draft save process completed, resetting states');
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const handleCreateEvent = async () => {
    // Prevent multiple simultaneous operations
    if (isProcessing || isLoading || isUploading) {
      console.log('⚠️ Event creation already in progress, preventing duplicate operation');
      return;
    }

    if (!validateStep(5)) {
      toast({
        title: "Erro na validação",
        description: "Por favor, verifique todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    console.log('🎯 Starting final event creation process...');
    setIsLoading(true);
    setIsProcessing(true);
    
    try {
      console.log('📊 Form data before processing:', {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        hasLogo: !!formData.logo,
        hasBanner: !!formData.banner
      });
      
      // Upload files if present with proper error handling
      let logoUrl = null;
      let bannerUrl = null;

      if (formData.logo) {
        logoUrl = await safeUploadFile(formData.logo, 'event-logos', 'logos');
      }

      if (formData.banner) {
        bannerUrl = await safeUploadFile(formData.banner, 'event-banners', 'banners');
      }

      console.log('📤 Upload results:', { logoUrl, bannerUrl });

      const eventPayload = {
        tenant_id: '00000000-0000-0000-0000-000000000000',
        name: formData.name,
        short_description: formData.description,
        category: mapCategory(formData.category),
        start_date: formData.startDate?.toISOString().split('T')[0],
        end_date: formData.endDate?.toISOString().split('T')[0],
        start_time: sanitizeTimeField(formData.startTime),
        end_time: sanitizeTimeField(formData.endTime),
        official_website: formData.website || null,
        full_address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        venue_name: formData.venueName || null,
        total_area: formData.totalArea ? parseFloat(formData.totalArea) : null,
        estimated_capacity: formData.capacity ? parseInt(formData.capacity) : null,
        has_accessibility: formData.accessibility,
        logo_url: logoUrl,
        banner_url: bannerUrl,
        primary_color: formData.primaryColor,
        secondary_color: formData.secondaryColor,
        font_style: mapFontStyle(formData.fontStyle),
        status: 'upcoming',
        is_public_registration: formData.publicRegistration,
        has_online_broadcast: formData.isHybrid,
        broadcast_platform: formData.isHybrid ? formData.streamingPlatform : null,
        notes: formData.specialRequirements || null,
        accepted_lgpd: formData.lgpdAccepted,
        accepted_eventrix_terms: formData.termsAccepted,
      };

      console.log('📋 Final payload before sending:', JSON.stringify(eventPayload, null, 2));

      await createEventMutation.mutateAsync(eventPayload);
      
      toast({
        title: "Evento criado com sucesso!",
        description: "Seu evento foi cadastrado e está pronto para configuração.",
      });
      
      // Reset form completely after successful creation
      console.log('✅ Event created successfully, resetting form');
      resetFormState();
      
    } catch (error: any) {
      console.error('❌ Event creation failed:', error);
      toast({
        title: "Erro ao criar evento",
        description: error.message || "Erro inesperado ao criar o evento",
        variant: "destructive",
      });
    } finally {
      console.log('🏁 Event creation process completed, resetting states');
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;
  const isOperationInProgress = isLoading || isUploading || isProcessing;

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
            disabled={isOperationInProgress}
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
              disabled={isOperationInProgress}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Voltar
            </Button>
          )}
          
          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              disabled={isOperationInProgress}
              className="flex items-center gap-2"
            >
              Próximo
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleCreateEvent}
              disabled={isOperationInProgress}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              {isOperationInProgress ? 'Criando...' : 'Criar Evento'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewEventWizard;
