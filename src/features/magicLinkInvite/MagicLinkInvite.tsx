import React, { useState } from 'react'
import InputField from '../common/InputField'
import { Button } from '@/components/ui/button'

/**
 * Geração de link mágico para convidar usuários
 */
export interface MagicLinkInviteProps {
  onGenerate?: (email: string) => void
}

const MagicLinkInvite: React.FC<MagicLinkInviteProps> = ({ onGenerate }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Email inválido')
      return
    }
    setError('')
    onGenerate?.(email)
    console.log('Gerar link mágico para', email)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <InputField
        id="magic-email"
        label="Email do Convidado"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={error}
        required
      />
      <Button type="submit" className="w-full">
        Gerar link mágico
      </Button>
    </form>
  )
}

export default MagicLinkInvite
