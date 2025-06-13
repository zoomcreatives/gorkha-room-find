
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import LoginForm from "./components/auth/LoginForm";
import ModernSearcherDashboard from "./pages/ModernSearcherDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Redirect to appropriate dashboard based on user role
  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'searcher':
        return '/searcher';
      case 'owner':
        return '/owner';
      case 'admin':
        return '/admin';
      default:
        return '/searcher';
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={getDashboardRoute()} replace />} />
      
      <Route 
        path="/searcher" 
        element={
          <ProtectedRoute requiredRole="searcher">
            <ModernSearcherDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/owner" 
        element={
          <ProtectedRoute requiredRole="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="roomspace-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
