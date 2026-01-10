import { lazy, Suspense } from "react";
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
import { SubscriptionGate } from "@/components/app/SubscriptionGate";
import { AdminProtectedRoute } from "@/components/admin/AdminProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
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
import NotFound from "./pages/NotFound";
import InteractiveBackground from "./components/InteractiveBackground";

// Lazy load admin pages for better initial bundle size
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminFeatureRequests = lazy(() => import("./pages/admin/AdminFeatureRequests"));
const AdminProblemReports = lazy(() => import("./pages/admin/AdminProblemReports"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

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
            <Route path="/pricing" element={<Pricing />} />
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
                <SubscriptionGate>
                  <DashboardLayout />
                </SubscriptionGate>
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="history" element={<CurveHistory />} />
              <Route path="features" element={<FeatureRequests />} />
              <Route path="account" element={<Account />} />
            </Route>

            {/* Admin Routes - Lazy loaded with Suspense */}
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }>
              <Route index element={<Suspense fallback={<AdminPageLoader />}><AdminDashboard /></Suspense>} />
              <Route path="users" element={<Suspense fallback={<AdminPageLoader />}><AdminUsers /></Suspense>} />
              <Route path="features" element={<Suspense fallback={<AdminPageLoader />}><AdminFeatureRequests /></Suspense>} />
              <Route path="problems" element={<Suspense fallback={<AdminPageLoader />}><AdminProblemReports /></Suspense>} />
              <Route path="settings" element={<Suspense fallback={<AdminPageLoader />}><AdminSettings /></Suspense>} />
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
