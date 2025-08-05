
import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import type { InviteOnboardingState, InviteOnboardingAction, UserFormData } from '../types/invite.types'

const initialState: InviteOnboardingState = {
  inviteId: null,
  inviteData: null,
  tenantData: null,
  userForm: {
    firstName: '',
    lastName: '',
    whatsappNumber: '',
  },
  currentStep: 0,
  isValidating: false,
  isSubmitting: false,
  error: null,
}

function inviteOnboardingReducer(
  state: InviteOnboardingState,
  action: InviteOnboardingAction
): InviteOnboardingState {
  switch (action.type) {
    case 'SET_INVITE_ID':
      return { ...state, inviteId: action.payload }
    case 'SET_INVITE_DATA':
      return { ...state, inviteData: action.payload }
    case 'SET_TENANT_DATA':
      return { ...state, tenantData: action.payload }
    case 'SET_USER_FORM':
      return { 
        ...state, 
        userForm: { ...state.userForm, ...action.payload } 
      }
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_VALIDATING':
      return { ...state, isValidating: action.payload }
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface InviteOnboardingContextType {
  state: InviteOnboardingState
  setInviteId: (id: string) => void
  setInviteData: (data: any) => void
  setTenantData: (data: any) => void
  updateUserForm: (data: Partial<UserFormData>) => void
  setCurrentStep: (step: number) => void
  setValidating: (validating: boolean) => void
  setSubmitting: (submitting: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const InviteOnboardingContext = createContext<InviteOnboardingContextType | undefined>(undefined)

export const InviteOnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(inviteOnboardingReducer, initialState)

  const setInviteId = useCallback((id: string) => {
    dispatch({ type: 'SET_INVITE_ID', payload: id })
  }, [])

  const setInviteData = useCallback((data: any) => {
    dispatch({ type: 'SET_INVITE_DATA', payload: data })
  }, [])

  const setTenantData = useCallback((data: any) => {
    dispatch({ type: 'SET_TENANT_DATA', payload: data })
  }, [])

  const updateUserForm = useCallback((data: Partial<UserFormData>) => {
    dispatch({ type: 'SET_USER_FORM', payload: data })
  }, [])

  const setCurrentStep = useCallback((step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step })
  }, [])

  const setValidating = useCallback((validating: boolean) => {
    dispatch({ type: 'SET_VALIDATING', payload: validating })
  }, [])

  const setSubmitting = useCallback((submitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: submitting })
  }, [])

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const value = useMemo(() => ({
    state,
    setInviteId,
    setInviteData,
    setTenantData,
    updateUserForm,
    setCurrentStep,
    setValidating,
    setSubmitting,
    setError,
    reset,
  }), [
    state,
    setInviteId,
    setInviteData,
    setTenantData,
    updateUserForm,
    setCurrentStep,
    setValidating,
    setSubmitting,
    setError,
    reset,
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
