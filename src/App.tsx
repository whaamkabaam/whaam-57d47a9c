import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Redirect legacy routes to /studio
const LegacyRedirect = () => <Navigate to="/studio" replace />;
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/app/ProtectedRoute";
import { DashboardLayout } from "@/components/app/DashboardLayout";
import { AdminProtectedRoute } from "@/components/admin/AdminProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import TermsOfService from "./pages/TermsOfService";
import ReviewsGallery from "./pages/ReviewsGallery";
import Backend from "./pages/Backend";
import Auth from "./pages/Auth";
import AuthVerify from "./pages/AuthVerify";
import AuthResetPassword from "./pages/AuthResetPassword";
import DashboardHome from "./pages/app/DashboardHome";
import CurveHistory from "./pages/app/CurveHistory";
import Account from "./pages/app/Account";
import FeatureRequests from "./pages/app/FeatureRequests";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFeatureRequests from "./pages/admin/AdminFeatureRequests";
import AdminProblemReports from "./pages/admin/AdminProblemReports";
import AdminSettings from "./pages/admin/AdminSettings";
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
            
            {/* Protected Studio Routes */}
            <Route path="/studio" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="history" element={<CurveHistory />} />
              <Route path="features" element={<FeatureRequests />} />
              <Route path="account" element={<Account />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="features" element={<AdminFeatureRequests />} />
              <Route path="problems" element={<AdminProblemReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* Legacy redirects: /dashboard, /app -> /studio */}
            <Route path="/dashboard" element={<LegacyRedirect />} />
            <Route path="/dashboard/*" element={<LegacyRedirect />} />
            <Route path="/app" element={<LegacyRedirect />} />
            <Route path="/app/*" element={<LegacyRedirect />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
