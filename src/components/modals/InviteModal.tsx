import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import supabase from '@/utils/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Database } from '@/utils/supabase/types'

const inviteSchema = z.object({
  email: z.string().email('Email inválido'),
})

type InviteForm = z.infer<typeof inviteSchema>;

const INVITATIONS_TABLE = 'invitations' as unknown as keyof Database['public']['Tables']

interface InvitationInsert {
  email: string
  token: string
  role: string
  tenant_id: string
  invited_by: string
  expires_at: string
}

const InviteModal: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InviteForm>({ resolver: zodResolver(inviteSchema) })
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { profile, tenant } = useAuth()
  const { toast } = useToast()

  const inviteUser = async (email: string) => {
    if (!tenant?.id || !profile?.id) {
      toast({
        title: 'Erro',
        description: 'Informações de usuário ou tenant indisponíveis.',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    try {
      const { data: existing, error: existingError } = await supabase
        .from<{ id: string }>(INVITATIONS_TABLE)
        .select('id')
        .eq('tenant_id', tenant.id)
        .eq('email', email)
        .eq('status', 'pending')
        .maybeSingle()

      if (existingError) throw existingError
      if (existing) {
        toast({
          title: 'Convite já enviado',
          description: 'Este e-mail já possui um convite pendente.',
          variant: 'destructive'
        })
        return
      }

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('id')
        .eq('code', 'member')
        .single()

      if (roleError || !roleData) throw roleError || new Error('Cargo padrão não encontrado.')

      const token = crypto.randomUUID()
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

      const { error: insertError } = await supabase
        .from<InvitationInsert>(INVITATIONS_TABLE)
        .insert({
          email,
          token,
          role: roleData.id,
          tenant_id: tenant.id,
          invited_by: profile.id,
          expires_at: expiresAt
        })

      if (insertError) throw insertError

      const redirectTo = `${window.location.origin}/invite/accept?invite_id=${token}`

      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo }
      })

      if (authError) throw authError

      toast({
        title: 'Convite enviado',
        description: `Um link de acesso foi enviado para ${email}.`
      })

      reset()
      setOpen(false)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Tente novamente mais tarde.'
      console.error(err)
      toast({
        title: 'Erro ao enviar convite',
        description: message,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (data: InviteForm) => inviteUser(data.email)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Convidar usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Enviar Convite</DialogTitle>
          </DialogHeader>
          <div>
            <label htmlFor="invite" className="block text-sm font-medium mb-1">Email</label>
            <Input id="invite" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                'Enviar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal
