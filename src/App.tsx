
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Contacts from "./components/layout/Contacts";
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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Header />
          <AnimatePresence mode="wait">
            <main className="pt-16 md:pt-20 bg-background min-h-screen">
              <Routes>
                <Route path="/" element={
                  <div className="fb-layout">
                    <Sidebar />
                    <div className="fb-content">
                      <Index />
                    </div>
                    <Contacts />
                  </div>
                } />
                <Route path="/community" element={
                  <div className="fb-layout">
                    <Sidebar />
                    <div className="fb-content">
                      <Community />
                    </div>
                    <Contacts />
                  </div>
                } />
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
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
