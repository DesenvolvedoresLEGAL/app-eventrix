import supabase from '@/utils/supabase/client'

export interface SignUpData {
  email: string
  password: string
  fullName: string
  firstName: string
  lastName: string
  whatsapp?: string
}

export async function signUp(data: SignUpData) {
  const { email, password, fullName, firstName, lastName, whatsapp } = data

  // emailRedirectTo é OBRIGATÓRIO
  const redirectUrl = `${window.location.origin}/`

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        email: email,
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
        whatsapp_number: whatsapp ?? null,
      },
    },
  })

  if (error) throw error
  return authData.user
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ 
    email: email.trim().toLowerCase(), 
    password 
  })
  
  if (error) throw error
  return data.user
}

export async function sendMagicLink(email: string) {
  const redirectUrl = `${window.location.origin}/`
  
  const { error } = await supabase.auth.signInWithOtp({ 
    email: email.trim().toLowerCase(),
    options: {
      emailRedirectTo: redirectUrl
    }
  })
  
  if (error) throw error
}

export async function resetPassword(email: string) {
  const redirectUrl = `${window.location.origin}/reset-password`
  
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    {
      redirectTo: redirectUrl,
    }
  )
  
  if (error) throw error
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: password
  })
  
  if (error) throw error
  return data.user
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
