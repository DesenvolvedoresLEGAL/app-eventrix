
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
  // Step 1 - Personal data
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Step 2 - Company data
  companyName: string;
  companySize: string;
  position: string;
  website: string;
  
  // Step 3 - Events data
  eventTypes: string;
  eventsPerYear: string;
  avgVisitors: string;
}
