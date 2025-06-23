
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, Loader2 } from 'lucide-react';
import { useEditEvent } from '@/hooks/useEditEvent';
import { Skeleton } from '@/components/ui/skeleton';

// Importar os steps do wizard existente
import BasicInfoStep from './wizard-steps/BasicInfoStep';
import LocationStep from './wizard-steps/LocationStep';
import VisualIdentityStep from './wizard-steps/VisualIdentityStep';
import OrganizersStep from './wizard-steps/OrganizersStep';
import AdvancedOptionsStep from './wizard-steps/AdvancedOptionsStep';
import ReviewStep from './wizard-steps/ReviewStep';

interface EditEventWizardProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const STEPS = [
  { id: 1, title: 'Informações Básicas', component: BasicInfoStep },
  { id: 2, title: 'Local & Estrutura', component: LocationStep },
  { id: 3, title: 'Identidade Visual', component: VisualIdentityStep },
  { id: 4, title: 'Organizadores', component: OrganizersStep },
  { id: 5, title: 'Opções Avançadas', component: AdvancedOptionsStep },
  { id: 6, title: 'Revisão', component: ReviewStep },
];

const EditEventWizard: React.FC<EditEventWizardProps> = ({
  eventId,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    event,
    formData,
    isLoadingEvent,
    eventError,
    isSaving,
    updateFormData,
    saveChanges,
    hasEvent,
    isReady
  } = useEditEvent(eventId);

  const currentStepData = STEPS.find(step => step.id === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleStepClick = useCallback((stepId: number) => {
    setCurrentStep(stepId);
  }, []);

  const handleSave = useCallback(async () => {
    const success = await saveChanges();
    if (success) {
      onSuccess?.();
      onClose();
    }
  }, [saveChanges, onSuccess, onClose]);

  const handleClose = useCallback(() => {
    setCurrentStep(1);
    onClose();
  }, [onClose]);

  // Validação básica para permitir navegação
  const canProceedToNext = useCallback(() => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.description && formData.category && 
               formData.startDate && formData.endDate;
      case 2:
        return formData.address && formData.city && formData.state;
      case 3:
        return formData.logo;
      case 4:
        return formData.organizerName && formData.primaryEmail;
      case 5:
        return formData.lgpdAccepted && formData.termsAccepted;
      default:
        return true;
    }
  }, [currentStep, formData]);

  // Loading state
  if (isLoadingEvent) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Carregando evento...</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Error state
  if (eventError) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Erro ao carregar evento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <p className="text-sm text-muted-foreground">
              {eventError instanceof Error ? eventError.message : 'Erro desconhecido'}
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Event not found
  if (!hasEvent && !isLoadingEvent) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Evento não encontrado</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <p className="text-sm text-muted-foreground">
              O evento solicitado não foi encontrado ou você não tem permissão para editá-lo.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Evento: {event?.name}</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentStep === step.id
                    ? 'bg-primary text-primary-foreground'
                    : currentStep > step.id
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === step.id
                    ? 'bg-primary-foreground text-primary'
                    : currentStep > step.id
                    ? 'bg-green-600 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.id}
                </div>
                <span className="hidden md:block">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 p-6">
          {isReady && CurrentStepComponent && (
            <CurrentStepComponent 
              data={formData} 
              updateData={updateFormData}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="border-t pt-4 px-6 pb-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="flex gap-2">
              {currentStep === STEPS.length ? (
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="min-w-[120px]"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventWizard;
