
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/app/ProtectedRoute";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import TermsOfService from "./pages/TermsOfService";
import ReviewsGallery from "./pages/ReviewsGallery";
import Backend from "./pages/Backend";
import Auth from "./pages/Auth";
import AuthVerify from "./pages/AuthVerify";
import AuthResetPassword from "./pages/AuthResetPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import InteractiveBackground from "./components/InteractiveBackground";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <InteractiveBackground />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/reviews" element={<ReviewsGallery />} />
            <Route path="/backend" element={<Backend />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/verify" element={<AuthVerify />} />
            <Route path="/auth/reset-password" element={<AuthResetPassword />} />
            
            {/* Protected App Routes */}
            <Route path="/app" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
