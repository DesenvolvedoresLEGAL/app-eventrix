import supabase from '@/utils/supabase/client'

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  firstName: string,
  lastName: string,
  whatsapp?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
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
  return data.user
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.user
}

export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw error
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
