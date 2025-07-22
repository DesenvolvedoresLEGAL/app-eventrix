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
import LiveOps from "./pages/LiveOps";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<NewEvent />} />
          <Route path="/exhibitors" element={<Exhibitors />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/team-tasks" element={<TeamTasks />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/access-history" element={<AccessHistory />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/marketing/ads" element={<MarketingAds />} />
          <Route path="/marketing/content" element={<MarketingContent />} />
          <Route path="/marketing/email" element={<MarketingEmail />} />
          <Route path="/marketing/pages" element={<MarketingPages />} />
          <Route path="/communication/humangpt" element={<CommunicationHumanGPT />} />
          <Route path="/communication/linkai" element={<CommunicationLinkAI />} />
          <Route path="/communication/notifications" element={<CommunicationNotifications />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics/nps" element={<AnalyticsNPS />} />
          <Route path="/analytics/heatmap" element={<AnalyticsHeatmap />} />
          <Route path="/analytics/engagement" element={<AnalyticsEngagement />} />
          <Route path="/integrations" element={<Marketplace />} />
          <Route path="/api-management" element={<APIManagement />} />
          <Route path="/ai-validator" element={<AIValidator />} />
          <Route path="/heatmap" element={<HeatmapAI />} />
          <Route path="/dynamic-pricing" element={<DynamicPricing />} />
          <Route path="/legal-ai" element={<LegalAI />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
