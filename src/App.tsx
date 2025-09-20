import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/context/FixedAuthContext'
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Plans from "./pages/Plans";
import SimpleDashboard from "./pages/SimpleDashboard";
import Events from "./pages/Events";
import NewEvent from "./pages/NewEvent";
import Exhibitors from "./pages/Exhibitors";
import Visitors from "./pages/Visitors";
import Staff from "./pages/Staff";
import Suppliers from "./pages/Suppliers";
// import Permissions from "./pages/Permissions"; // Removido temporariamente
import Lectures from "./pages/Lectures";
import Tracks from "./pages/Tracks";
import Activities from "./pages/Activities";
import Venues from "./pages/Venues";
import Checklist from "./pages/Checklist";
import CheckIn from "./pages/CheckIn";
import AccessHistory from "./pages/AccessHistory";
import TeamTasks from "./pages/TeamTasks";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import AnalyticsNPS from "./pages/AnalyticsNPS";
import AnalyticsEngagement from "./pages/AnalyticsEngagement";
import AnalyticsHeatmap from "./pages/AnalyticsHeatmap";
import Heatmap from "./pages/Heatmap";
import HeatmapAI from "./pages/HeatmapAI";
import Marketing from "./pages/Marketing";
import MarketingEmail from "./pages/MarketingEmail";
import MarketingContent from "./pages/MarketingContent";
import MarketingAds from "./pages/MarketingAds";
import MarketingPages from "./pages/MarketingPages";
import CommunicationHumanGPT from "./pages/CommunicationHumanGPT";
import CommunicationLinkAI from "./pages/CommunicationLinkAI";
// New Pages
import BillingOverview from "./pages/BillingOverview";
import TicketSales from "./pages/TicketSales";
import PaymentGateway from "./pages/PaymentGateway";
import FinancialReports from "./pages/FinancialReports";
import BillingIntegration from "./pages/BillingIntegration";
import CaexOverview from "./pages/CaexOverview";
import Sponsors from "./pages/Sponsors";
import ExhibitorManual from "./pages/ExhibitorManual";
import Contracts from "./pages/Contracts";
import VirtualStands from "./pages/VirtualStands";
import Marketplace365 from "./pages/Marketplace365";
import RoiDashboard from "./pages/RoiDashboard";
import AgendaOverview from "./pages/AgendaOverview";
import LinkAIOverview from "./pages/LinkAIOverview";
import IntelligentNetworking from "./pages/IntelligentNetworking";
import AIRecommendations from "./pages/AIRecommendations";
import ConnectionAnalytics from "./pages/ConnectionAnalytics";
import SmartMatching from "./pages/SmartMatching";
import NetworkingInsights from "./pages/NetworkingInsights";
import AccessOverview from "./pages/AccessOverview";
import HybridOverview from "./pages/HybridOverview";
import StreamingPlatform from "./pages/StreamingPlatform";
import VirtualParticipation from "./pages/VirtualParticipation";
import HybridInteractions from "./pages/HybridInteractions";
import Transcriptions from "./pages/Transcriptions";
import CommunicationNotifications from "./pages/CommunicationNotifications";
import Finance from "./pages/Finance";
import DynamicPricing from "./pages/DynamicPricing";
import LiveOps from "./pages/LiveOps";
import APIManagement from "./pages/APIManagement";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Marketplace from "./pages/Marketplace";
import AIValidator from "./pages/AIValidator";
import LegalAI from "./pages/LegalAI";
import Landing from "./pages/Landing";
import ModernOnboarding from "./pages/ModernOnboarding";
import PlanSelection from "./pages/PlanSelection";
import TenantOnboarding from "./pages/TenantOnboarding";
import UserOnboarding from "./pages/UserOnboarding";
import TenantDashboard from "./pages/TenantDashboard";
import Registration from "./pages/Registration";
// import Unauthorized from "./pages/Unauthorized"; // Removido temporariamente
import Teste from "./pages/Test";
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/welcome" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/data-test" element={<Teste />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/plan-selection" element={<PlanSelection />} />
            <Route path="/tenant-onboarding" element={<TenantOnboarding />} />
            <Route path="/user-onboarding" element={<UserOnboarding />} />
            <Route path="/tenant-dashboard" element={<TenantDashboard />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/unauthorized" element={<NotFound />} />
            <Route path="/onboarding" element={<ModernOnboarding />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<SimpleDashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/new-event" element={<NewEvent />} />
            <Route path="/exhibitors" element={<Exhibitors />} />
            <Route path="/visitors" element={<Visitors />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/suppliers" element={<Suppliers />} />
            {/* <Route path="/permissions" element={<Permissions />} /> */}
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/access-history" element={<AccessHistory />} />
            <Route path="/team-tasks" element={<TeamTasks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/nps" element={<AnalyticsNPS />} />
            <Route path="/analytics/engagement" element={<AnalyticsEngagement />} />
            <Route path="/analytics/heatmap" element={<AnalyticsHeatmap />} />
            <Route path="/heatmap" element={<Heatmap />} />
            <Route path="/heatmap-ai" element={<HeatmapAI />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/marketing/email" element={<MarketingEmail />} />
            <Route path="/marketing/content" element={<MarketingContent />} />
            <Route path="/marketing/ads" element={<MarketingAds />} />
            <Route path="/marketing/pages" element={<MarketingPages />} />
            <Route path="/communication/humangpt" element={<CommunicationHumanGPT />} />
            <Route path="/communication/linkai" element={<CommunicationLinkAI />} />
            <Route path="/communication/notifications" element={<CommunicationNotifications />} />
            
            {/* Bilheteria Routes */}
            <Route path="/billing/overview" element={<BillingOverview />} />
            <Route path="/ticket-sales" element={<TicketSales />} />
            <Route path="/payment-gateway" element={<PaymentGateway />} />
            <Route path="/financial-reports" element={<FinancialReports />} />
            <Route path="/billing-integration" element={<BillingIntegration />} />
            
            {/* CAEX Routes */}
            <Route path="/caex/overview" element={<CaexOverview />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/exhibitor-manual" element={<ExhibitorManual />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/virtual-stands" element={<VirtualStands />} />
            <Route path="/marketplace365" element={<Marketplace365/>} />
            <Route path="/roi-dashboard" element={<RoiDashboard />} />
            
            {/* Agenda Routes */}
            <Route path="/agenda/overview" element={<AgendaOverview />} />
            
            {/* LinkAI Routes */}
            <Route path="/linkai/overview" element={<LinkAIOverview />} />
            <Route path="/intelligent-networking" element={<IntelligentNetworking />} />
            <Route path="/ai-recommendations" element={<AIRecommendations />} />
            <Route path="/connection-analytics" element={<ConnectionAnalytics />} />
            <Route path="/smart-matching" element={<SmartMatching />} />
            <Route path="/networking-insights" element={<NetworkingInsights />} />
            
            {/* Credenciamento Routes */}
            <Route path="/access/overview" element={<AccessOverview />} />
            
            {/* Experiência Híbrida Routes */}
            <Route path="/hybrid/overview" element={<HybridOverview />} />
            <Route path="/streaming-platform" element={<StreamingPlatform />} />
            <Route path="/virtual-participation" element={<VirtualParticipation />} />
            <Route path="/hybrid-interactions" element={<HybridInteractions />} />
            <Route path="/transcriptions" element={<Transcriptions />} />
            
            <Route path="/finance" element={<Finance />} />
            <Route path="/dynamic-pricing" element={<DynamicPricing />} />
            <Route path="/live-ops" element={<LiveOps />} />
            <Route path="/api-management" element={<APIManagement />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/ai-validator" element={<AIValidator />} />
            <Route path="/legal-ai" element={<LegalAI />} />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;