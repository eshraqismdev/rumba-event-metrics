
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import AddData from "./pages/AddData";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AppShell } from "./components/layout/AppShell";
import { AuthGuard } from "./components/auth/AuthGuard";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  
  // Check if user is already authenticated
  useEffect(() => {
    // Just a small delay to ensure localStorage is checked
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <AuthGuard>
                <AppShell>
                  <Dashboard />
                </AppShell>
              </AuthGuard>
            } />
            
            <Route path="/add-event" element={
              <AuthGuard>
                <AppShell>
                  <AddEvent />
                </AppShell>
              </AuthGuard>
            } />
            
            <Route path="/add-data" element={
              <AuthGuard>
                <AppShell>
                  <AddData />
                </AppShell>
              </AuthGuard>
            } />
            
            <Route path="/reports" element={
              <AuthGuard>
                <AppShell>
                  <Reports />
                </AppShell>
              </AuthGuard>
            } />
            
            <Route path="/analytics" element={
              <AuthGuard>
                <AppShell>
                  <Analytics />
                </AppShell>
              </AuthGuard>
            } />
            
            <Route path="/settings" element={
              <AuthGuard>
                <AppShell>
                  <Settings />
                </AppShell>
              </AuthGuard>
            } />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
