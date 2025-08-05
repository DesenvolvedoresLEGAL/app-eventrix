
export interface InviteData {
  id: string
  email: string
  role: string
  tenant_id: string
  status: 'pending' | 'accepted' | 'expired' | 'revoked'
  expires_at: string
  created_by: string
  created_at: string
}

export interface TenantData {
  id: string
  slug: string
  razao_social: string
  nome_fantasia: string
  primary_color: string
  secondary_color: string
  logo_url?: string
  contact_email: string
}

export interface UserFormData {
  firstName: string
  lastName: string
  whatsappNumber?: string
}

export interface InviteOnboardingState {
  inviteId: string | null
  inviteData: InviteData | null
  tenantData: TenantData | null
  userForm: UserFormData
  currentStep: number
  isValidating: boolean
  isSubmitting: boolean
  error: string | null
}

export type InviteOnboardingAction =
  | { type: 'SET_INVITE_ID'; payload: string }
  | { type: 'SET_INVITE_DATA'; payload: InviteData }
  | { type: 'SET_TENANT_DATA'; payload: TenantData }
  | { type: 'SET_USER_FORM'; payload: Partial<UserFormData> }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_VALIDATING'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' }
