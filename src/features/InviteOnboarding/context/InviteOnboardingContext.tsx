
import React, { createContext, useContext, useReducer, ReactNode } from 'react'
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

const InviteOnboardingContext = createContext<{
  state: InviteOnboardingState
  dispatch: React.Dispatch<InviteOnboardingAction>
} | null>(null)

export function InviteOnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(inviteOnboardingReducer, initialState)

  return (
    <InviteOnboardingContext.Provider value={{ state, dispatch }}>
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
