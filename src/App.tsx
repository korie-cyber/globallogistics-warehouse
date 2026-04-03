import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import InboundPage from "@/pages/InboundPage";
import OutboundPage from "@/pages/OutboundPage";
import AssistantPage from "@/pages/AssistantPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/inbound" element={<InboundPage />} />
                  <Route path="/outbound" element={<OutboundPage />} />
                  <Route path="/assistant" element={<AssistantPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DashboardLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
