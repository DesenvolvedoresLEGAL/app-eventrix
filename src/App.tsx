import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import PrivateRoute from '@/components/PrivateRoute'
import RoleBasedRoute from '@/components/RoleBasedRoute'

// Fallback de carregamento para lazy routes
const FullPageSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-foreground mb-2">Carregando...</h2>
      <p className="text-muted-foreground">Aguarde um momento</p>
    </div>
  </div>
)

// Páginas públicas (lazy)
const IndexPage = lazy(() => import('@/pages/Index'))
const LoginPage = lazy(() => import('@/pages/Login'))
const RegisterPage = lazy(() => import('@/pages/Register'))
const ResetPasswordPage = lazy(() => import('@/pages/ResetPassword'))
const PlansPage = lazy(() => import('@/pages/Plans'))
const TenantOnboardingPage = lazy(() => import('@/pages/TenantOnboarding'))
const UserOnboardingPage = lazy(() => import('@/pages/UserOnboarding'))
const InviteAcceptPage = lazy(() => import('@/features/InviteOnboarding/pages/InviteAcceptPage'))
const AccessDeniedPage = lazy(() => import('@/pages/AccessDenied'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))

// Páginas privadas (lazy)
const DashboardPage = lazy(() => import('@/pages/Dashboard'))
const EventsPage = lazy(() => import('@/pages/Events'))
const NewEventPage = lazy(() => import('@/pages/NewEvent'))
const StaffPage = lazy(() => import('@/pages/Staff'))
const SuppliersPage = lazy(() => import('@/pages/Suppliers'))
const VisitorsPage = lazy(() => import('@/pages/Visitors'))
const FinancePage = lazy(() => import('@/pages/Finance'))
const MarketingPage = lazy(() => import('@/pages/Marketing'))
const SettingsPage = lazy(() => import('@/pages/Settings'))
const PermissionsPage = lazy(() => import('@/pages/Permissions'))

// Outras páginas privadas (lazy) comuns no projeto
const ActivitiesPage = lazy(() => import('@/pages/Activities'))
const AnalyticsPage = lazy(() => import('@/pages/Analytics'))
const AnalyticsEngagementPage = lazy(() => import('@/pages/AnalyticsEngagement'))
const AnalyticsNPSPage = lazy(() => import('@/pages/AnalyticsNPS'))
const CheckInPage = lazy(() => import('@/pages/CheckIn'))
const ChecklistPage = lazy(() => import('@/pages/Checklist'))
const IntegrationsPage = lazy(() => import('@/pages/Integrations'))
const LecturesPage = lazy(() => import('@/pages/Lectures'))
const LiveOpsPage = lazy(() => import('@/pages/LiveOps'))
const ReportsPage = lazy(() => import('@/pages/Reports'))
const TeamTasksPage = lazy(() => import('@/pages/TeamTasks'))
const TracksPage = lazy(() => import('@/pages/Tracks'))
const VenuesPage = lazy(() => import('@/pages/Venues'))
const APIManagementPage = lazy(() => import('@/pages/APIManagement'))
const AIValidatorPage = lazy(() => import('@/pages/AIValidator'))
const DynamicPricingPage = lazy(() => import('@/pages/DynamicPricing'))
const LegalAIPage = lazy(() => import('@/pages/LegalAI'))
const HeatmapPage = lazy(() => import('@/pages/Heatmap'))
const HeatmapAIPage = lazy(() => import('@/pages/HeatmapAI'))
const AccessHistoryPage = lazy(() => import('@/pages/AccessHistory'))
const RegistrationPage = lazy(() => import('@/pages/Registration'))
const CommunicationHumanGPTPage = lazy(() => import('@/pages/CommunicationHumanGPT'))
const CommunicationLinkAIPage = lazy(() => import('@/pages/CommunicationLinkAI'))
const CommunicationNotificationsPage = lazy(() => import('@/pages/CommunicationNotifications'))
const ExhibitorsPage = lazy(() => import('@/pages/Exhibitors'))
const PlanSelectionPage = lazy(() => import('@/pages/PlanSelection'))
const MarketplacePage = lazy(() => import('@/pages/Marketplace'))
const TenantDashboardPage = lazy(() => import('@/pages/TenantDashboard'))
const MarketingAdsPage = lazy(() => import('@/pages/MarketingAds'))
const MarketingContentPage = lazy(() => import('@/pages/MarketingContent'))
const MarketingEmailPage = lazy(() => import('@/pages/MarketingEmail'))
const MarketingPagesPage = lazy(() => import('@/pages/MarketingPages'))

// Observação: Nosso sistema atual usa RoleBasedRoute com requiredPermission (singular) e/ou allowedRoles.
// Como o enum Permission não existe neste projeto, mapeamos usando strings e allowedRoles conforme a config centralizada.

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullPageSpinner />}> 
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/onboarding/tenant" element={<TenantOnboardingPage />} />
          <Route path="/onboarding/user" element={<UserOnboardingPage />} />
          <Route path="/invite/accept" element={<InviteAcceptPage />} />
          <Route path="/unauthorized" element={<AccessDeniedPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Rotas privadas: layout autenticado via PrivateRoute */}
          <Route
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <RoleBasedRoute requiredPermission="view_dashboard">
                  <DashboardPage />
                </RoleBasedRoute>
              }
            />

            {/* Eventos */}
            <Route
              path="/events"
              element={
                <RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "developer", "viewer"]}>
                  <EventsPage />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/events/new"
              element={
                <RoleBasedRoute requiredPermission="manage_events" allowedRoles={["owner", "event_manager"]}>
                  <NewEventPage />
                </RoleBasedRoute>
              }
            />

            {/* Pessoas e parceiros */}
            <Route
              path="/staff"
              element={
                <RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}>
                  <StaffPage />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/suppliers"
              element={
                <RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}>
                  <SuppliersPage />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/visitors"
              element={
                <RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}>
                  <VisitorsPage />
                </RoleBasedRoute>
              }
            />

            {/* Finanças e marketing */}
            <Route
              path="/finance"
              element={
                <RoleBasedRoute allowedRoles={["owner", "developer", "finance"]}>
                  <FinancePage />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/marketing"
              element={
                <RoleBasedRoute allowedRoles={["owner", "content_editor"]}>
                  <MarketingPage />
                </RoleBasedRoute>
              }
            />

            {/* Configurações e permissões */}
            <Route
              path="/settings"
              element={
                <RoleBasedRoute requiredPermission="manage_settings" allowedRoles={["owner", "developer"]}>
                  <SettingsPage />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/permissions"
              element={
                <RoleBasedRoute requiredPermission="manage_permissions" allowedRoles={["owner", "developer"]}>
                  <PermissionsPage />
                </RoleBasedRoute>
              }
            />

            {/* Outras áreas da aplicação */}
            <Route path="/activities" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><ActivitiesPage /></RoleBasedRoute>} />
            <Route path="/lectures" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><LecturesPage /></RoleBasedRoute>} />
            <Route path="/venues" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><VenuesPage /></RoleBasedRoute>} />
            <Route path="/tracks" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><TracksPage /></RoleBasedRoute>} />
            <Route path="/checklist" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><ChecklistPage /></RoleBasedRoute>} />
            <Route path="/team-tasks" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><TeamTasksPage /></RoleBasedRoute>} />
            <Route path="/checkin" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><CheckInPage /></RoleBasedRoute>} />
            <Route path="/registration" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><RegistrationPage /></RoleBasedRoute>} />
            <Route path="/access-history" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><AccessHistoryPage /></RoleBasedRoute>} />

            {/* Analytics e relatórios */}
            <Route path="/analytics" element={<RoleBasedRoute allowedRoles={["owner", "developer", "finance", "viewer"]}><AnalyticsPage /></RoleBasedRoute>} />
            <Route path="/analytics/engagement" element={<RoleBasedRoute allowedRoles={["owner", "developer", "finance", "viewer"]}><AnalyticsEngagementPage /></RoleBasedRoute>} />
            <Route path="/analytics/nps" element={<RoleBasedRoute allowedRoles={["owner", "developer", "finance", "viewer"]}><AnalyticsNPSPage /></RoleBasedRoute>} />
            <Route path="/reports" element={<RoleBasedRoute allowedRoles={["owner", "developer", "finance", "viewer"]}><ReportsPage /></RoleBasedRoute>} />

            {/* Integrações / APIs */}
            <Route path="/integrations" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><IntegrationsPage /></RoleBasedRoute>} />
            <Route path="/api-management" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><APIManagementPage /></RoleBasedRoute>} />

            {/* IA e recursos avançados */}
            <Route path="/ai-validator" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><AIValidatorPage /></RoleBasedRoute>} />
            <Route path="/dynamic-pricing" element={<RoleBasedRoute allowedRoles={["owner", "developer", "finance"]}><DynamicPricingPage /></RoleBasedRoute>} />
            <Route path="/legal-ai" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><LegalAIPage /></RoleBasedRoute>} />
            <Route path="/heatmap" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><HeatmapPage /></RoleBasedRoute>} />
            <Route path="/heatmap-ai" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><HeatmapAIPage /></RoleBasedRoute>} />

            {/* Comunicação */}
            <Route path="/communication/humangpt" element={<RoleBasedRoute allowedRoles={["owner"]}><CommunicationHumanGPTPage /></RoleBasedRoute>} />
            <Route path="/communication/linkai" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><CommunicationLinkAIPage /></RoleBasedRoute>} />
            <Route path="/communication/notifications" element={<RoleBasedRoute allowedRoles={["owner"]}><CommunicationNotificationsPage /></RoleBasedRoute>} />

            {/* Outras */}
            <Route path="/exhibitors" element={<RoleBasedRoute allowedRoles={["owner", "event_manager", "coordinator", "viewer"]}><ExhibitorsPage /></RoleBasedRoute>} />
            <Route path="/plan-selection" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><PlanSelectionPage /></RoleBasedRoute>} />
            <Route path="/marketplace" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><MarketplacePage /></RoleBasedRoute>} />
            <Route path="/tenant-dashboard" element={<RoleBasedRoute allowedRoles={["owner", "developer"]}><TenantDashboardPage /></RoleBasedRoute>} />

            {/* Redirecionamento padrão da área autenticada */}
            <Route index element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
