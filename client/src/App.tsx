import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ExitIntentPopup from "@/components/exit-intent-popup";
import StickyMobileFooter from "@/components/sticky-mobile-footer";
import Home from "@/pages/home";
import MusicPage from "@/pages/music";
import VideosPage from "@/pages/videos";
import TourPage from "@/pages/tour";
import SocialPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import EPKPage from "@/pages/epk";
import FanClubPage from "@/pages/fan-club";
import MerchPage from "@/pages/merch";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";
import { initTracking, trackPageView } from "@/lib/tracking";

function PublicRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/music" component={MusicPage} />
      <Route path="/videos" component={VideosPage} />
      <Route path="/tour" component={TourPage} />
      <Route path="/social" component={SocialPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/epk" component={EPKPage} />
      <Route path="/fan-club" component={FanClubPage} />
      <Route path="/merch" component={MerchPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function PageViewTracker() {
  const [location] = useLocation();
  useEffect(() => {
    trackPageView(location);
  }, [location]);
  return null;
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-1">
        <PublicRouter />
      </main>
      <Footer />
      <div className="lg:hidden h-16" />
    </div>
  );
}

function App() {
  useEffect(() => {
    initTracking();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PageViewTracker />
          <Switch>
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin" component={AdminDashboard} />
            <Route>
              {() => (
                <>
                  <PublicLayout />
                  <StickyMobileFooter />
                  <ExitIntentPopup />
                </>
              )}
            </Route>
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
