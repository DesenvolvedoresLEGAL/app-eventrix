
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { 
  OnboardingStep, 
  TenantData, 
  OnboardingContextType 
} from '../types';
import { 
  ONBOARDING_STEPS, 
  validateStep, 
  getNextStep, 
  getPreviousStep, 
  getStepIndex 
} from '../utils/stepValidations';

type TenantRow = Database['public']['Tables']['tenants']['Row'];

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, session, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('dados_empresa');
  const [tenantData, setTenantData] = useState<Partial<TenantData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tenant data when user is authenticated
  const fetchTenantData = useCallback(async () => {
    if (!user || !session) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('contact_email', user.email)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error fetching tenant data:', error);
        setError('Erro ao carregar dados do tenant');
        return;
      }
      
      if (data) {
        setTenantData(data);
        setCurrentStep(data.onboarding_current_step as OnboardingStep);
      } else {
        // New user, set default data
        setTenantData({
          contact_email: user.email || '',
          onboarding_current_step: 'dados_empresa',
          onboarding_completed: false,
          setup_wizard_completed: false,
          first_event_created: false
        });
      }
    } catch (err) {
      console.error('Error in fetchTenantData:', err);
      setError('Erro inesperado ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [user, session]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchTenantData();
    }
  }, [authLoading, user, fetchTenantData]);

  const updateTenantData = useCallback((data: Partial<TenantData>) => {
    setTenantData(prev => ({ ...prev, ...data }));
    setError(null);
  }, []);

  const saveTenantData = useCallback(async () => {
    if (!user || !tenantData.contact_email) {
      setError('Dados insuficientes para salvar');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dataToSave = {
        ...tenantData,
        onboarding_current_step: currentStep,
        updated_at: new Date().toISOString()
      };

      if (tenantData.id) {
        // Update existing tenant
        const { error } = await supabase
          .from('tenants')
          .update(dataToSave)
          .eq('id', tenantData.id);

        if (error) {
          console.error('Error updating tenant:', error);
          setError('Erro ao atualizar dados');
          return;
        }
      } else {
        // Create new tenant
        const { data, error } = await supabase
          .from('tenants')
          .insert([dataToSave])
          .select()
          .single();

        if (error) {
          console.error('Error creating tenant:', error);
          setError('Erro ao criar tenant');
          return;
        }

        if (data) {
          setTenantData(prev => ({ ...prev, id: data.id }));
        }
      }
    } catch (err) {
      console.error('Error in saveTenantData:', err);
      setError('Erro inesperado ao salvar');
    } finally {
      setLoading(false);
    }
  }, [user, tenantData, currentStep]);

  const validateCurrentStep = useCallback(() => {
    return validateStep(currentStep, tenantData);
  }, [currentStep, tenantData]);

  const nextStep = useCallback(async () => {
    if (!validateCurrentStep()) {
      setError('Preencha todos os campos obrigatórios antes de continuar');
      return;
    }

    const next = getNextStep(currentStep);
    if (!next) return;

    // Save current progress before moving to next step
    await saveTenantData();
    
    if (!error) {
      setCurrentStep(next);
    }
  }, [currentStep, validateCurrentStep, saveTenantData, error]);

  const prevStep = useCallback(() => {
    const prev = getPreviousStep(currentStep);
    if (prev) {
      setCurrentStep(prev);
      setError(null);
    }
  }, [currentStep]);

  const goToStep = useCallback(async (step: OnboardingStep) => {
    const targetIndex = getStepIndex(step);
    const currentIndex = getStepIndex(currentStep);
    
    // Can only go to completed steps or the next immediate step
    if (targetIndex > currentIndex + 1) {
      // Check if all intermediate steps are valid
      for (let i = 0; i <= targetIndex; i++) {
        const stepToCheck = ONBOARDING_STEPS[i];
        if (!validateStep(stepToCheck, tenantData)) {
          setError(`Complete a etapa ${stepToCheck} antes de continuar`);
          return;
        }
      }
    }
    
    // Save current progress
    if (targetIndex > currentIndex) {
      await saveTenantData();
      if (error) return;
    }
    
    setCurrentStep(step);
    setError(null);
  }, [currentStep, tenantData, saveTenantData, error]);

  const getStepProgress = useCallback(() => {
    const completedSteps = ONBOARDING_STEPS.filter(step => 
      validateStep(step, tenantData)
    ).length;
    return (completedSteps / ONBOARDING_STEPS.length) * 100;
  }, [tenantData]);

  const isStepCompleted = useCallback((step: OnboardingStep) => {
    return validateStep(step, tenantData);
  }, [tenantData]);

  const canProceedToStep = useCallback((step: OnboardingStep) => {
    const targetIndex = getStepIndex(step);
    const currentIndex = getStepIndex(currentStep);
    
    if (targetIndex <= currentIndex) return true;
    
    // Check all previous steps are completed
    for (let i = 0; i < targetIndex; i++) {
      if (!validateStep(ONBOARDING_STEPS[i], tenantData)) {
        return false;
      }
    }
    
    return true;
  }, [currentStep, tenantData]);

  const completeOnboarding = useCallback(async () => {
    // Validate all steps
    const allStepsValid = ONBOARDING_STEPS.slice(0, -1).every(step => 
      validateStep(step, tenantData)
    );
    
    if (!allStepsValid) {
      setError('Complete todas as etapas antes de finalizar');
      return;
    }
    
    const finalData = {
      ...tenantData,
      onboarding_completed: true,
      setup_wizard_completed: true,
      onboarding_current_step: 'finalizado' as OnboardingStep
    };
    
    updateTenantData(finalData);
    setCurrentStep('finalizado');
    await saveTenantData();
  }, [tenantData, updateTenantData, saveTenantData]);

  const contextValue = useMemo(() => ({
    currentStep,
    tenantData,
    loading: loading || authLoading,
    error,
    nextStep,
    prevStep,
    goToStep,
    updateTenantData,
    saveTenantData,
    validateCurrentStep,
    getStepProgress,
    isStepCompleted,
    canProceedToStep,
    completeOnboarding
  }), [
    currentStep,
    tenantData,
    loading,
    authLoading,
    error,
    nextStep,
    prevStep,
    goToStep,
    updateTenantData,
    saveTenantData,
    validateCurrentStep,
    getStepProgress,
    isStepCompleted,
    canProceedToStep,
    completeOnboarding
  ]);

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
