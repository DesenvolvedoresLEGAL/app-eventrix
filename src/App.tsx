import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Unauthorized from './pages/Unauthorized';
import { AuthProvider } from './context/AuthContext';
import RoleBasedRoute from './components/RoleBasedRoute';
import { Permission } from './utils/permissions';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/data-test" element={<Teste />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/onboarding/user" element={<UserOnboarding />} />
            <Route path="/onboarding/tenant" element={<TenantOnboarding />} />
            <Route path="/onboarding/plan" element={<PlanSelectionPage />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <RoleBasedRoute requiredPermission={Permission.DASHBOARD_VIEW}>
                  <Dashboard />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/tenant-dashboard" 
              element={
                <RoleBasedRoute requiredPermission={Permission.DASHBOARD_VIEW}>
                  <TenantDashboard />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/events" 
              element={
                <RoleBasedRoute requiredPermission={Permission.EVENTS_VIEW}>
                  <Events />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/events/new" 
              element={
                <RoleBasedRoute requiredPermission={Permission.EVENTS_CREATE}>
                  <NewEvent />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/exhibitors" 
              element={
                <RoleBasedRoute requiredPermission={Permission.EXHIBITORS_VIEW}>
                  <Exhibitors />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/visitors" 
              element={
                <RoleBasedRoute requiredPermission={Permission.VISITORS_VIEW}>
                  <Visitors />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/staff" 
              element={
                <RoleBasedRoute requiredPermission={Permission.STAFF_VIEW}>
                  <Staff />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/suppliers" 
              element={
                <RoleBasedRoute requiredPermission={Permission.SUPPLIERS_VIEW}>
                  <Suppliers />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/permissions" 
              element={
                <RoleBasedRoute requiredPermission={Permission.SETTINGS_PERMISSIONS_MANAGE}>
                  <Permissions />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/lectures" 
              element={
                <RoleBasedRoute requiredPermission={Permission.LECTURES_VIEW}>
                  <Lectures />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/tracks" 
              element={
                <RoleBasedRoute requiredPermission={Permission.TRACKS_VIEW}>
                  <Tracks />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/activities" 
              element={
                <RoleBasedRoute requiredPermission={Permission.ACTIVITIES_VIEW}>
                  <Activities />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/venues" 
              element={
                <RoleBasedRoute requiredPermission={Permission.VENUES_VIEW}>
                  <Venues />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/checklist" 
              element={
                <RoleBasedRoute requiredPermission={Permission.CHECKLIST_VIEW}>
                  <Checklist />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/team-tasks" 
              element={
                <RoleBasedRoute requiredPermission={Permission.TEAM_TASKS_VIEW}>
                  <TeamTasks />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/registration" 
              element={
                <RoleBasedRoute requiredPermission={Permission.REGISTRATION_VIEW}>
                  <Registration />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/checkin" 
              element={
                <RoleBasedRoute requiredPermission={Permission.CHECKIN_VIEW}>
                  <CheckIn />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/access-history" 
              element={
                <RoleBasedRoute requiredPermission={Permission.ACCESS_HISTORY_VIEW}>
                  <AccessHistory />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/marketing" 
              element={
                <RoleBasedRoute requiredPermission={Permission.MARKETING_ADS_VIEW}>
                  <Marketing />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/marketing/ads" 
              element={
                <RoleBasedRoute requiredPermission={Permission.MARKETING_ADS_MANAGE}>
                  <MarketingAds />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/marketing/content" 
              element={
                <RoleBasedRoute requiredPermission={Permission.MARKETING_CONTENT_MANAGE}>
                  <MarketingContent />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/marketing/email" 
              element={
                <RoleBasedRoute requiredPermission={Permission.MARKETING_EMAIL_MANAGE}>
                  <MarketingEmail />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/marketing/pages" 
              element={
                <RoleBasedRoute requiredPermission={Permission.MARKETING_PAGES_MANAGE}>
                  <MarketingPages />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/communication/humangpt" 
              element={
                <RoleBasedRoute requiredPermission={Permission.COMMUNICATION_NOTIFICATIONS_VIEW}>
                  <CommunicationHumanGPT />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/communication/linkai" 
              element={
                <RoleBasedRoute requiredPermission={Permission.COMMUNICATION_NOTIFICATIONS_VIEW}>
                  <CommunicationLinkAI />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/communication/notifications" 
              element={
                <RoleBasedRoute requiredPermission={Permission.COMMUNICATION_NOTIFICATIONS_MANAGE}>
                  <CommunicationNotifications />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <RoleBasedRoute requiredPermission={Permission.ANALYTICS_VIEW}>
                  <Analytics />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <RoleBasedRoute requiredPermission={Permission.REPORTS_VIEW}>
                  <Reports />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/analytics/nps" 
              element={
                <RoleBasedRoute requiredPermission={Permission.ANALYTICS_VIEW}>
                  <AnalyticsNPS />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/analytics/heatmap" 
              element={
                <RoleBasedRoute requiredPermission={Permission.ANALYTICS_VIEW}>
                  <AnalyticsHeatmap />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/analytics/engagement" 
              element={
                <RoleBasedRoute requiredPermission={Permission.ANALYTICS_ENGAGEMENT_VIEW}>
                  <AnalyticsEngagement />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/integrations" 
              element={
                <RoleBasedRoute requiredPermission={Permission.INTEGRATIONS_VIEW}>
                  <Marketplace />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/api-management" 
              element={
                <RoleBasedRoute requiredPermission={Permission.API_MANAGEMENT_VIEW}>
                  <APIManagement />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/ai-validator" 
              element={
                <RoleBasedRoute requiredPermission={Permission.DASHBOARD_VIEW}>
                  <AIValidator />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/heatmap" 
              element={
                <RoleBasedRoute requiredPermission={Permission.ANALYTICS_VIEW}>
                  <HeatmapAI />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/dynamic-pricing" 
              element={
                <RoleBasedRoute requiredPermission={Permission.DASHBOARD_VIEW}>
                  <DynamicPricing />
                </RoleBasedRoute>
              } 
            />
            <Route 
              path="/legal-ai" 
              element={
                <RoleBasedRoute requiredPermission={Permission.DASHBOARD_VIEW}>
                  <LegalAI />
                </RoleBasedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
