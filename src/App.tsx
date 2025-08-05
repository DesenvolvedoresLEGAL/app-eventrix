
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EnterpriseOnboardWizardPage from '@/features/Onboarding/pages/EnterpriseOnboardWizard'
import { ToastProvider } from "@/components/ui/toast"
import { ToastViewport } from "@/components/ui/toast"
import AcceptInvitePage from '@/features/InviteOnboarding/pages/AcceptInvitePage'
import InviteExpiredPage from '@/features/InviteOnboarding/pages/InviteExpiredPage'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-background">
            <Router>
              <Routes>
                {/* Onboarding Route */}
                <Route path="/onboarding" element={<EnterpriseOnboardWizardPage />} />
                
                {/* Invite Onboarding Routes */}
                <Route path="/onboarding/invite" element={<AcceptInvitePage />} />
                <Route path="/onboarding/invite-expired" element={<InviteExpiredPage />} />
                
                {/* Default Route - Redirect to onboarding for now */}
                <Route path="/" element={<EnterpriseOnboardWizardPage />} />
              </Routes>
            </Router>
          </div>
          <ToastViewport />
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
