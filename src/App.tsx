
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Statistics from "./pages/Statistics";
import RecoveryDynamics from "./pages/RecoveryDynamics";
import MakeABedCampaign from "./pages/MakeABedCampaign";
import Intake from "./pages/Intake";
import SuccessStory from "./pages/SuccessStory";
import HelpLoved from "./pages/HelpLoved";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/recovery-dynamics" element={<RecoveryDynamics />} />
          <Route path="/make-a-bed-campaign" element={<MakeABedCampaign />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/helploved" element={<HelpLoved />} />
          <Route path="/success-story/:id" element={<SuccessStory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
