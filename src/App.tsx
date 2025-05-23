
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { SYlVesterProvider } from "@/context/SYlVesterContext";
import FloatingSYlVester from "@/components/FloatingSYlVester";
import Index from "./pages/Index";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import NotFound from "./pages/NotFound";
import CareerMapPage from "./pages/CareerMapPage";
import InterviewsPage from "./pages/InterviewsPage";
import AIChatPage from "./pages/AIChatPage";
import UtvecklingssamtalPage from "./pages/UtvecklingssamtalPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import SYVDashboardPage from "./pages/SYVDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <UserProvider>
          <SYlVesterProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
              <Route path="/career-map" element={<CareerMapPage />} />
              <Route path="/interviews" element={<InterviewsPage />} />
              <Route path="/ai-chat" element={<AIChatPage />} />
              <Route path="/utvecklingssamtal" element={<UtvecklingssamtalPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/syv-dashboard" element={<SYVDashboardPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingSYlVester />
          </SYlVesterProvider>
        </UserProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
