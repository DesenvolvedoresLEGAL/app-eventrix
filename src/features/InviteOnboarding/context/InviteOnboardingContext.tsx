
import React, { createContext, useContext, useReducer, ReactNode, useMemo, useCallback } from 'react'
import { InviteOnboardingState, InviteOnboardingAction } from '../types/invite.types'

const initialState: InviteOnboardingState = {
  token: null,
  invite: null,
  tenant: null,
  formData: {
    firstName: '',
    lastName: '',
    fullName: '',
    acceptsTerms: false,
  },
  currentStep: 1,
  isLoading: false,
  error: null,
  isValidating: false,
  isAccepting: false,
}

function inviteOnboardingReducer(
  state: InviteOnboardingState,
  action: InviteOnboardingAction
): InviteOnboardingState {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    case 'SET_INVITE':
      return { ...state, invite: action.payload }
    case 'SET_TENANT':
      return { ...state, tenant: action.payload }
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      }
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_VALIDATING':
      return { ...state, isValidating: action.payload }
    case 'SET_ACCEPTING':
      return { ...state, isAccepting: action.payload }
    case 'RESET_STATE':
      return initialState
    default:
      return state
  }
}

interface InviteOnboardingContextValue {
  state: InviteOnboardingState
  dispatch: React.Dispatch<InviteOnboardingAction>
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  validateCurrentStep: () => boolean
  canProceed: boolean
  updateFormData: <K extends keyof InviteOnboardingState['formData']>(
    field: K,
    value: InviteOnboardingState['formData'][K]
  ) => void
}

const InviteOnboardingContext = createContext<InviteOnboardingContextValue | null>(null)

export function InviteOnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(inviteOnboardingReducer, initialState)

  const validateCurrentStep = useCallback((): boolean => {
    switch (state.currentStep) {
      case 1: // Validação do convite
        return !!(state.invite && !state.error && !state.isValidating)
      case 2: // Completar perfil
        return !!(
          state.formData.firstName.trim() &&
          state.formData.lastName.trim() &&
          state.formData.acceptsTerms
        )
      case 3: // Sucesso
        return true
      default:
        return false
    }
  }, [state.currentStep, state.invite, state.error, state.isValidating, state.formData])

  const canProceed = useMemo(() => validateCurrentStep(), [validateCurrentStep])

  const nextStep = useCallback(() => {
    if (canProceed && state.currentStep < 3) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 })
    }
  }, [canProceed, state.currentStep])

  const prevStep = useCallback(() => {
    if (state.currentStep > 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep - 1 })
    }
  }, [state.currentStep])

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 3) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: step })
    }
  }, [])

  const updateFormData = useCallback(
    <K extends keyof InviteOnboardingState['formData']>(
      field: K,
      value: InviteOnboardingState['formData'][K]
    ) => {
      dispatch({
        type: 'SET_FORM_DATA',
        payload: { [field]: value }
      })

      // Auto-gerar nome completo
      if (field === 'firstName' || field === 'lastName') {
        const firstName =
          field === 'firstName' ? (value as string) : state.formData.firstName
        const lastName =
          field === 'lastName' ? (value as string) : state.formData.lastName
        const fullName = `${firstName} ${lastName}`.trim()

        dispatch({
          type: 'SET_FORM_DATA',
          payload: { fullName }
        })
      }
    },
    [state.formData.firstName, state.formData.lastName]
  )

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    nextStep,
    prevStep,
    goToStep,
    validateCurrentStep,
    canProceed,
    updateFormData,
  }), [state, nextStep, prevStep, goToStep, validateCurrentStep, canProceed, updateFormData])

  return (
    <InviteOnboardingContext.Provider value={contextValue}>
      {children}
    </InviteOnboardingContext.Provider>
  )
}

export function useInviteOnboarding() {
  const context = useContext(InviteOnboardingContext)
  if (!context) {
    throw new Error('useInviteOnboarding must be used within InviteOnboardingProvider')
  }
  return context
}
