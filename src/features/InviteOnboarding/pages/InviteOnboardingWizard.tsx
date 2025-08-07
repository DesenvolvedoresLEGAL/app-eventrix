import React from 'react'
import { Routes, Route } from 'react-router-dom'
import InviteAcceptPage from './InviteAcceptPage'
import InviteExpiredPage from './InviteExpiredPage'
import { InviteOnboardingProvider } from '../context/InviteOnboardingContext'
import { Zap } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@features/auth'

const InviteOnboardingWizard: React.FC = () => {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <InviteOnboardingProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<InviteAcceptPage />} />
          <Route path="/expired" element={<InviteExpiredPage />} />
        </Routes>
      </div>
    </InviteOnboardingProvider>
  )
}

export default InviteOnboardingWizard
