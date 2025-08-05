
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { InviteData, UserFormData, InviteOnboardingState } from '../types/invite.types'
import { Tenant } from '@/context/AuthContext'

interface InviteOnboardingContextValue extends InviteOnboardingState {
  setInviteId: (id: string | null) => void
  setInviteData: (data: InviteData | null) => void
  setTenantData: (data: Tenant | null) => void
  updateUserForm: (field: keyof UserFormData, value: string) => void
  setCurrentStep: (step: number) => void
  setIsValidating: (loading: boolean) => void
  setIsSubmitting: (submitting: boolean) => void
  setError: (error: string | null) => void
  resetState: () => void
}

const InviteOnboardingContext = createContext<InviteOnboardingContextValue | undefined>(undefined)

const initialUserForm: UserFormData = {
  firstName: '',
  lastName: '',
  fullName: '',
  profilePhoto: undefined
}

const initialState: InviteOnboardingState = {
  inviteId: null,
  inviteData: null,
  tenantData: null,
  userForm: initialUserForm,
  currentStep: 1,
  isValidating: false,
  isSubmitting: false,
  error: null
}

export const InviteOnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<InviteOnboardingState>(initialState)

  const setInviteId = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, inviteId: id }))
  }, [])

  const setInviteData = useCallback((data: InviteData | null) => {
    setState(prev => ({ ...prev, inviteData: data }))
  }, [])

  const setTenantData = useCallback((data: Tenant | null) => {
    setState(prev => ({ ...prev, tenantData: data }))
  }, [])

  const updateUserForm = useCallback((field: keyof UserFormData, value: string) => {
    setState(prev => ({
      ...prev,
      userForm: { ...prev.userForm, [field]: value }
    }))
  }, [])

  const setCurrentStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: step }))
  }, [])

  const setIsValidating = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, isValidating: loading }))
  }, [])

  const setIsSubmitting = useCallback((submitting: boolean) => {
    setState(prev => ({ ...prev, isSubmitting: submitting }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }))
  }, [])

  const resetState = useCallback(() => {
    setState(initialState)
  }, [])

  const value = useMemo(() => ({
    ...state,
    setInviteId,
    setInviteData,
    setTenantData,
    updateUserForm,
    setCurrentStep,
    setIsValidating,
    setIsSubmitting,
    setError,
    resetState
  }), [
    state,
    setInviteId,
    setInviteData,
    setTenantData,
    updateUserForm,
    setCurrentStep,
    setIsValidating,
    setIsSubmitting,
    setError,
    resetState
  ])

  return (
    <InviteOnboardingContext.Provider value={value}>
      {children}
    </InviteOnboardingContext.Provider>
  )
}

export const useInviteOnboarding = () => {
  const context = useContext(InviteOnboardingContext)
  if (!context) {
    throw new Error('useInviteOnboarding must be used within InviteOnboardingProvider')
  }
  return context
}
