import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const inviteSchema = z.object({
  email: z.string().email('Email inválido'),
})

interface InviteForm extends z.infer<typeof inviteSchema> {}

const InviteModal: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InviteForm>({ resolver: zodResolver(inviteSchema) })

  const onSubmit = (data: InviteForm) => {
    console.log('Convidar', data)
    reset()
  }

  return (
    <Dialog>
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
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Enviar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal
