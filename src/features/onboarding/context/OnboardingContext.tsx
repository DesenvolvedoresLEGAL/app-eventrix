import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { OnboardingStep, TenantData, OnboardingContextType } from '../types';
import { stepValidations, validateStep } from '../utils/stepValidations';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('dados_empresa');
  const [tenantData, setTenantData] = useState<Partial<TenantData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadTenantData();
    }
  }, [user]);

  const loadTenantData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading tenant data:', error);
        setError('Erro ao carregar dados do tenant');
        return;
      }
      
      if (data) {
        setTenantData(data);
        setCurrentStep(data.onboarding_current_step || 'dados_empresa');
      }
    } catch (err) {
      console.error('Error loading tenant data:', err);
      setError('Erro ao carregar dados do tenant');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const saveTenantData = useCallback(async () => {
    if (!user || !tenantData.slug) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const dataToSave = {
        ...tenantData,
        user_id: user.id,
        onboarding_current_step: currentStep,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('tenants')
        .upsert(dataToSave, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error('Error saving tenant data:', error);
        setError('Erro ao salvar dados do tenant');
        throw error;
      }
    } catch (err) {
      console.error('Error saving tenant data:', err);
      setError('Erro ao salvar dados do tenant');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, tenantData, currentStep]);

  const updateTenantData = useCallback((data: Partial<TenantData>) => {
    setTenantData(prev => ({ ...prev, ...data }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    return validateStep(currentStep, tenantData);
  }, [currentStep, tenantData]);

  const nextStep = useCallback(async () => {
    if (!validateCurrentStep()) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      await saveTenantData();
      
      const steps: OnboardingStep[] = [
        'dados_empresa', 'endereco', 'contato', 'plano', 
        'identidade_visual', 'configuracoes', 'finalizado'
      ];
      
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      }
    } catch (err) {
      console.error('Error proceeding to next step:', err);
    }
  }, [currentStep, validateCurrentStep, saveTenantData]);

  const prevStep = useCallback(() => {
    const steps: OnboardingStep[] = [
      'dados_empresa', 'endereco', 'contato', 'plano', 
      'identidade_visual', 'configuracoes', 'finalizado'
    ];
    
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep]);

  const goToStep = useCallback(async (step: OnboardingStep) => {
    if (!canProceedToStep(step)) {
      setError('Você deve completar as etapas anteriores primeiro');
      return;
    }
    
    if (validateCurrentStep()) {
      try {
        await saveTenantData();
        setCurrentStep(step);
      } catch (err) {
        console.error('Error saving before step change:', err);
      }
    }
  }, [validateCurrentStep, saveTenantData]);

  const getStepProgress = useCallback(() => {
    const steps: OnboardingStep[] = [
      'dados_empresa', 'endereco', 'contato', 'plano', 
      'identidade_visual', 'configuracoes', 'finalizado'
    ];
    
    const currentIndex = steps.indexOf(currentStep);
    return Math.round(((currentIndex + 1) / steps.length) * 100);
  }, [currentStep]);

  const isStepCompleted = useCallback((step: OnboardingStep) => {
    return validateStep(step, tenantData);
  }, [tenantData]);

  const canProceedToStep = useCallback((step: OnboardingStep) => {
    const steps: OnboardingStep[] = [
      'dados_empresa', 'endereco', 'contato', 'plano', 
      'identidade_visual', 'configuracoes', 'finalizado'
    ];
    
    const targetIndex = steps.indexOf(step);
    const currentIndex = steps.indexOf(currentStep);
    
    if (targetIndex <= currentIndex) return true;
    
    for (let i = 0; i < targetIndex; i++) {
      if (!isStepCompleted(steps[i])) {
        return false;
      }
    }
    
    return true;
  }, [currentStep, isStepCompleted]);

  const completeOnboarding = useCallback(async () => {
    if (!validateCurrentStep()) {
      setError('Por favor, complete todas as etapas obrigatórias');
      return;
    }
    
    try {
      const completedData = {
        ...tenantData,
        onboarding_completed: true,
        onboarding_current_step: 'finalizado' as OnboardingStep
      };
      
      setTenantData(completedData);
      setCurrentStep('finalizado');
      await saveTenantData();
    } catch (err) {
      console.error('Error completing onboarding:', err);
      setError('Erro ao finalizar onboarding');
    }
  }, [validateCurrentStep, tenantData, saveTenantData]);

  const contextValue = useMemo(() => ({
    currentStep,
    tenantData,
    loading,
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
    currentStep, tenantData, loading, error,
    nextStep, prevStep, goToStep, updateTenantData, saveTenantData,
    validateCurrentStep, getStepProgress, isStepCompleted, canProceedToStep, completeOnboarding
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
