import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { QueryClient } from 'react-query'
import EnterpriseOnboardWizardPage from '@/features/Onboarding/pages/EnterpriseOnboardWizard'
import { ToastProvider } from "@/components/ui/toast"
import { ToastViewport } from "@/components/ui/toast"
import LoginPage from '@/components/auth/LoginPage'
import ResetPasswordPage from '@/components/auth/ResetPasswordPage'
import UpdatePasswordPage from '@/components/auth/UpdatePasswordPage'
import PlansPage from '@/components/auth/PlansPage'
import DashboardPage from '@/components/auth/DashboardPage'
import InviteOnboardingPage from '@/components/auth/InviteOnboardingPage'
import AcceptInvitePage from '@/features/InviteOnboarding/pages/AcceptInvitePage'
import InviteExpiredPage from '@/features/InviteOnboarding/pages/InviteExpiredPage'

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-background">
            <Router>
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/update-password" element={<UpdatePasswordPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/invite" element={<InviteOnboardingPage />} />

                {/* Onboarding Route */}
                <Route path="/onboarding" element={<EnterpriseOnboardWizardPage />} />
                
                {/* Invite Onboarding Routes */}
                <Route path="/onboarding/invite" element={<AcceptInvitePage />} />
                <Route path="/onboarding/invite-expired" element={<InviteExpiredPage />} />
                
                {/* Default Route */}
                <Route path="/" element={<LoginPage />} />
              </Routes>
            </Router>
          </div>
          <ToastViewport />
        </ToastProvider>
      </AuthProvider>
    </QueryClient>
  )
}

export default App
