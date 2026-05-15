import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProvider } from "@/lib/session";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Templates from "@/pages/Templates";
import Pricing from "@/pages/Pricing";
import Resources from "@/pages/Resources";
import JobSearch from "@/pages/JobSearch";
import Dashboard from "@/pages/Dashboard";
import Editor from "@/pages/Editor";
import CoverLetterEditor from "@/pages/CoverLetterEditor";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import ResumeBuilder from "@/pages/ResumeBuilder";
import TermsOfService from "@/pages/legal/TermsOfService";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import Disclaimer from "@/pages/legal/Disclaimer";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/templates" component={Templates} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/resources" component={Resources} />
      <Route path="/job-search" component={JobSearch} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/editor/:id" component={Editor} />
      <Route path="/cover-letter/:id" component={CoverLetterEditor} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/builder" component={ResumeBuilder} />
      <Route path="/legal/terms" component={TermsOfService} />
      <Route path="/legal/privacy" component={PrivacyPolicy} />
      <Route path="/legal/disclaimer" component={Disclaimer} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <SessionProvider>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
