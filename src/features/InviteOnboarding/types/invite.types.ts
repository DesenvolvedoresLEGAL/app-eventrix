
export interface InviteData {
  id: string
  email: string
  role: 'owner' | 'admin' | 'manager' | 'staff'
  status: 'pending' | 'accepted' | 'expired' | 'revoked'
  invited_by: string
  tenant_id: string
  token: string
  expires_at: string
  created_at: string
  accepted_at?: string
}

export interface UserFormData {
  firstName: string
  lastName: string
  fullName: string
  profilePhoto?: string
}

export interface InviteOnboardingState {
  inviteId: string | null
  inviteData: InviteData | null
  tenantData: any | null // TODO: Use proper Tenant type from AuthContext
  userForm: UserFormData
  currentStep: number
  isValidating: boolean
  isSubmitting: boolean
  error: string | null
}
