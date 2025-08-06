
export interface InviteData {
  id: string
  tenant_id: string
  email: string
  role: string
  token: string
  status: 'pending' | 'accepted' | 'revoked' | 'expired'
  expires_at: string
  invited_by: string | null
  created_at: string | null
  accepted_at?: string | null
}

export interface TenantBranding {
  id: string
  nome_fantasia: string
  razao_social: string
  logo_url?: string
  primary_color: string
  secondary_color: string
  font_family: string
}

export interface InviteAcceptFormData {
  firstName: string
  lastName: string
  fullName: string
  avatar?: File
  acceptsTerms: boolean
}

export interface InviteOnboardingState {
  token: string | null
  invite: InviteData | null
  tenant: TenantBranding | null
  formData: InviteAcceptFormData
  currentStep: number
  isLoading: boolean
  error: string | null
  isValidating: boolean
  isAccepting: boolean
}

export type InviteOnboardingAction =
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_INVITE'; payload: InviteData }
  | { type: 'SET_TENANT'; payload: TenantBranding }
  | { type: 'SET_FORM_DATA'; payload: Partial<InviteAcceptFormData> }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_VALIDATING'; payload: boolean }
  | { type: 'SET_ACCEPTING'; payload: boolean }
  | { type: 'RESET_STATE' }
