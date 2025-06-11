
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "@/context/AuthContext";
import Dashboard from "./components/layout/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import NewEvent from "./pages/NewEvent";
import Lectures from "./pages/Lectures";
import Visitors from "./pages/Visitors";
import Staff from "./pages/Staff";
import Venues from "./pages/Venues";
import Tracks from "./pages/Tracks";
import Activities from "./pages/Activities";
import Exhibitors from "./pages/Exhibitors";
import Suppliers from "./pages/Suppliers";
import Checklist from "./pages/Checklist";
import TeamTasks from "./pages/TeamTasks";
import CheckIn from "./pages/CheckIn";
import Registration from "./pages/Registration";
import AccessHistory from "./pages/AccessHistory";
import MarketingAds from "./pages/MarketingAds";
import MarketingContent from "./pages/MarketingContent";
import MarketingEmail from "./pages/MarketingEmail";
import MarketingPages from "./pages/MarketingPages";
import CommunicationHumanGPT from "./pages/CommunicationHumanGPT";
import CommunicationNotifications from "./pages/CommunicationNotifications";
import Analytics from "./pages/Analytics";
import AnalyticsEngagement from "./pages/AnalyticsEngagement";
import Reports from "./pages/Reports";
import APIManagement from "./pages/APIManagement";
import Integrations from "./pages/Integrations";
import AIValidator from "./pages/AIValidator";
import Heatmap from "./pages/Heatmap";
import DynamicPricing from "./pages/DynamicPricing";
import LegalAI from "./pages/LegalAI";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Permissions from "./pages/Permissions";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthContextProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/plans" element={<Plans />} />
                
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/new" element={<NewEvent />} />
                <Route path="/lectures" element={<Lectures />} />
                <Route path="/visitors" element={<Visitors />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/venues" element={<Venues />} />
                <Route path="/tracks" element={<Tracks />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/exhibitors" element={<Exhibitors />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/permissions" element={<Permissions />} />
                
                <Route path="/checklist" element={<Checklist />} />
                <Route path="/team-tasks" element={<TeamTasks />} />
                <Route path="/supplier-tasks" element={<Navigate to="/suppliers" replace />} />
                
                <Route path="/checkin" element={<CheckIn />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/access-history" element={<AccessHistory />} />
                
                <Route path="/marketing/ads" element={<MarketingAds />} />
                <Route path="/marketing/content" element={<MarketingContent />} />
                <Route path="/marketing/email" element={<MarketingEmail />} />
                <Route path="/marketing/pages" element={<MarketingPages />} />
                
                <Route path="/communication/humangpt" element={<CommunicationHumanGPT />} />
                <Route path="/communication/notifications" element={<CommunicationNotifications />} />
                
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/analytics/engagement" element={<AnalyticsEngagement />} />
                <Route path="/reports" element={<Reports />} />
                
                <Route path="/api-management" element={<APIManagement />} />
                <Route path="/integrations" element={<Integrations />} />
                
                <Route path="/ai-validator" element={<AIValidator />} />
                <Route path="/heatmap" element={<Heatmap />} />
                <Route path="/dynamic-pricing" element={<DynamicPricing />} />
                <Route path="/legal-ai" element={<LegalAI />} />
                
                <Route path="/settings/*" element={<Settings />} />
                <Route path="/help/*" element={<Help />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
