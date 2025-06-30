
export interface Profile {
  uuid: string;
  auth_user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  position?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileData {
  auth_user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  position?: string;
}

export interface WizardFormData {
  /** Step 1 - Conta */
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  /** Step 2 - Organização */
  orgName: string;
  documentId: string;
  contactEmail: string;
  contactPhone: string;

  /** Step 3 - Plano */
  planId: string;
}
