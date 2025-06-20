
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import LoginForm from "./components/auth/LoginForm";
import HomePage from "./pages/HomePage";
import ModernSearcherDashboard from "./pages/ModernSearcherDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AllRoomsPage from "./pages/AllRoomsPage";
import RoomDetailedPage from "./pages/RoomDetailedPage";
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

  return (
    <Routes>
      {/* Home page shows hero section and featured rooms */}
      <Route path="/" element={<HomePage />} />
      
      {/* Login page */}
      <Route path="/login" element={<LoginForm />} />
      
      {/* Searcher Dashboard Routes */}
      <Route 
        path="/searcher" 
        element={
          <ProtectedRoute requiredRole="searcher">
            <ModernSearcherDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/searcher-dashboard" 
        element={
          <ProtectedRoute requiredRole="searcher">
            <ModernSearcherDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Owner Dashboard Routes */}
      <Route 
        path="/owner" 
        element={
          <ProtectedRoute requiredRole="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/owner-dashboard" 
        element={
          <ProtectedRoute requiredRole="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/owner-dashboard/analytics" 
        element={
          <ProtectedRoute requiredRole="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin Dashboard Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/admin-dashboard/users" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/admin-dashboard/analytics" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Public Routes */}
      <Route path="/all-rooms" element={<AllRoomsPage />} />
      <Route path="/room-detailed/:roomId" element={<RoomDetailedPage />} />
      <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl">Settings Page</h1></div>} />
      <Route path="/help" element={<div className="p-8"><h1 className="text-2xl">Help & Support</h1></div>} />
      
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
