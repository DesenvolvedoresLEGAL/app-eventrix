
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Plans from "./pages/Plans";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import NewEvent from "./pages/NewEvent";
import Exhibitors from "./pages/Exhibitors";
import Visitors from "./pages/Visitors";
import Staff from "./pages/Staff";
import Suppliers from "./pages/Suppliers";
import Permissions from "./pages/Permissions";
import Lectures from "./pages/Lectures";
import Tracks from "./pages/Tracks";
import Activities from "./pages/Activities";
import Venues from "./pages/Venues";
import Checklist from "./pages/Checklist";
import TeamTasks from "./pages/TeamTasks";
import Registration from "./pages/Registration";
import CheckIn from "./pages/CheckIn";
import AccessHistory from "./pages/AccessHistory";
import Marketing from "./pages/Marketing";
import MarketingAds from "./pages/MarketingAds";
import MarketingContent from "./pages/MarketingContent";
import MarketingEmail from "./pages/MarketingEmail";
import MarketingPages from "./pages/MarketingPages";
import CommunicationHumanGPT from "./pages/CommunicationHumanGPT";
import CommunicationLinkAI from "./pages/CommunicationLinkAI";
import CommunicationNotifications from "./pages/CommunicationNotifications";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import AnalyticsNPS from "./pages/AnalyticsNPS";
import AnalyticsHeatmap from "./pages/AnalyticsHeatmap";
import AnalyticsEngagement from "./pages/AnalyticsEngagement";
import Marketplace from "./pages/Marketplace";
import APIManagement from "./pages/APIManagement";
import AIValidator from "./pages/AIValidator";
import HeatmapAI from "./pages/HeatmapAI";
import DynamicPricing from "./pages/DynamicPricing";
import LegalAI from "./pages/LegalAI";
import UserOnboarding from "./pages/UserOnboarding";
import TenantOnboarding from "./pages/TenantOnboarding";
import TenantDashboard from "./pages/TenantDashboard";
import PlanSelectionPage from "./pages/PlanSelection";
import Teste from './pages/Test';
import AccessDenied from "./pages/AccessDenied";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* TODO(auth-guard): Wrap all non-public routes with PrivateRoute/RouteGuard */}
        <Routes>
          {/* TODO(auth-guard): '/' is private; enforce auth via PrivateRoute */}
          <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
          {/* TODO(auth-guard): Public route */}
          <Route path="/login" element={<Login />} />
          {/* TODO(auth-guard): Public route */}
          <Route path="/register" element={<Register />} />
          {/* TODO(auth-guard): Private route */}
          <Route path="/reset-password" element={<PrivateRoute><ResetPassword /></PrivateRoute>} />
          {/* TODO(auth-guard): Private route */}
          <Route path="/data-test" element={<PrivateRoute><Teste /></PrivateRoute>} />
          {/* TODO(auth-guard): Public route */}
          <Route path="/plans" element={<Plans />} />
          {/* TODO(auth-guard): Private routes (onboarding) */}
          <Route path="/onboarding/user" element={<PrivateRoute><UserOnboarding /></PrivateRoute>} />
          <Route path="/onboarding/tenant" element={<PrivateRoute><TenantOnboarding /></PrivateRoute>} />
          <Route path="/onboarding/plan" element={<PrivateRoute><PlanSelectionPage /></PrivateRoute>} />
          
          {/* Dashboard - acessível para roles principais */}
          <Route
            path="/dashboard"
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer', 'event_manager', 'coordinator', 'viewer']}>
                <Dashboard />
              </RoleBasedRoute>
            }
          />
          
          {/* Tenant Dashboard - mantém PrivateRoute simples */}
          <Route path="/tenant-dashboard" element={<PrivateRoute><TenantDashboard /></PrivateRoute>} />
          
          {/* Eventos - diferentes permissões por rota */}
          <Route 
            path="/events" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Events />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/events/new" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager']} requiredPermission="manage_events">
                <NewEvent />
              </RoleBasedRoute>
            }
          />
          
          {/* Usuários e Participantes */}
          <Route 
            path="/exhibitors" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Exhibitors />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/visitors" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Visitors />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/suppliers" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Suppliers />
              </RoleBasedRoute>
            }
          />
          
          {/* Rotas Administrativas - acesso restrito */}
          <Route 
            path="/staff" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Staff />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/permissions" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer']} requiredPermission="manage_permissions">
                <Permissions />
              </RoleBasedRoute>
            }
          />
          
          {/* Programação e Agenda */}
          <Route 
            path="/lectures" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Lectures />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/tracks" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Tracks />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/activities" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Activities />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/venues" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Venues />
              </RoleBasedRoute>
            }
          />
          
          {/* Tarefas */}
          <Route 
            path="/checklist" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Checklist />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/team-tasks" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <TeamTasks />
              </RoleBasedRoute>
            }
          />
          
          {/* Credenciamento */}
          <Route 
            path="/registration" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']}>
                <Registration />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/checkin" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'event_manager', 'coordinator', 'viewer']} requiredPermission="manage_checkin">
                <CheckIn />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/access-history" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer']} requiredPermission="view_access_history">
                <AccessHistory />
              </RoleBasedRoute>
            }
          />
          
          {/* Marketing - torna rota principal privada (login requerido) */}
          <Route path="/marketing" element={<PrivateRoute><Marketing /></PrivateRoute>} />
          <Route 
            path="/marketing/ads" 
            element={
              <RoleBasedRoute allowedRoles={['owner']}>
                <MarketingAds />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/marketing/content" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'content_editor']} requiredPermission="manage_content">
                <MarketingContent />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/marketing/email" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'content_editor']} requiredPermission="manage_emails">
                <MarketingEmail />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/marketing/pages" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'content_editor']} requiredPermission="manage_marketing_pages">
                <MarketingPages />
              </RoleBasedRoute>
            }
          />
          
          {/* Comunicação */}
          <Route 
            path="/communication/humangpt" 
            element={
              <RoleBasedRoute allowedRoles={['owner']}>
                <CommunicationHumanGPT />
              </RoleBasedRoute>
            }
          />
          <Route path="/communication/linkai" element={<PrivateRoute><CommunicationLinkAI /></PrivateRoute>} />
          <Route 
            path="/communication/notifications" 
            element={
              <RoleBasedRoute allowedRoles={['owner']}>
                <CommunicationNotifications />
              </RoleBasedRoute>
            }
          />
          
          {/* Analytics e Relatórios - acesso financeiro */}
          <Route 
            path="/analytics" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer', 'finance', 'viewer']} requiredPermission="view_analytics">
                <Analytics />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/reports" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer', 'finance', 'viewer']} requiredPermission="view_reports">
                <Reports />
              </RoleBasedRoute>
            }
          />
          <Route path="/analytics/nps" element={<PrivateRoute><AnalyticsNPS /></PrivateRoute>} />
          <Route path="/analytics/heatmap" element={<PrivateRoute><AnalyticsHeatmap /></PrivateRoute>} />
          <Route 
            path="/analytics/engagement" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer', 'finance', 'viewer']} requiredPermission="view_analytics">
                <AnalyticsEngagement />
              </RoleBasedRoute>
            }
          />
          
          {/* Integrações - acesso técnico */}
          <Route 
            path="/integrations" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer']} requiredPermission="manage_integrations">
                <Marketplace />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/api-management" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer']} requiredPermission="manage_apis">
                <APIManagement />
              </RoleBasedRoute>
            }
          />
          
          {/* IA e Ferramentas Avançadas - acesso técnico/financeiro */}
          <Route 
            path="/ai-validator" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer']} requiredPermission="manage_ai_tools">
                <AIValidator />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/heatmap" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer']} requiredPermission="manage_ai_tools">
                <HeatmapAI />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/dynamic-pricing" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer', 'finance']} requiredPermission="manage_dynamic_pricing">
                <DynamicPricing />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/legal-ai" 
            element={
              <RoleBasedRoute allowedRoles={['owner', 'developer']} requiredPermission="manage_ai_tools">
                <LegalAI />
              </RoleBasedRoute>
            }
          />
          
          {/* Página de acesso negado - privada */}
          <Route path="/access-denied" element={<PrivateRoute><AccessDenied /></PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
