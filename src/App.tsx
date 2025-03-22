
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import Community from "./pages/Community";
import Marketplace from "./pages/Marketplace";
import SkillsExchange from "./pages/SkillsExchange";
import Microjobs from "./pages/Microjobs";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Chat from "./pages/Chat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <AnimatePresence mode="wait">
          <main className="pt-16 md:pt-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/community" element={<Community />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/skills-exchange" element={<SkillsExchange />} />
              <Route path="/microjobs" element={<Microjobs />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/chat/:id?" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </AnimatePresence>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
