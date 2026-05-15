import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/session";
import { apiRequest } from "@/lib/queryClient";

interface StripeProduct {
  id: string;
  name: string;
  description: string;
  metadata: Record<string, string>;
  prices: Array<{
    id: string;
    unit_amount: number;
    currency: string;
  }>;
}

const pricingTiers = [
  {
    id: "single",
    name: "Single Resume",
    price: 14.99,
    description: "Perfect for one-time applications",
    resumeCount: 1,
    features: [
      "1 Resume download (PDF)",
      "1 Matching cover letter",
      "Access to all 200+ templates",
      "7-day editing access",
      "Email support",
    ],
  },
  {
    id: "pack5",
    name: "5 Resume Pack",
    price: 29.99,
    description: "Great for active job seekers",
    resumeCount: 5,
    isPopular: true,
    features: [
      "5 Resume downloads (PDF)",
      "5 Matching cover letters",
      "Access to all 200+ templates",
      "30-day editing access",
      "Priority email support",
      "Resume review checklist",
    ],
  },
  {
    id: "pack10",
    name: "10+ Resume Pack",
    price: 49.99,
    description: "Best value for serious job hunters",
    resumeCount: -1,
    features: [
      "Unlimited resume downloads",
      "Unlimited cover letters",
      "Access to all 200+ templates",
      "90-day editing access",
      "Priority support",
      "Resume review checklist",
      "Interview preparation guide",
    ],
  },
];

const faqs = [
  {
    question: "Can I change my template after I start?",
    answer: "Yes! You can switch between any of our 200+ templates at any time during your editing access period. Your content will be automatically transferred to the new template.",
  },
  {
    question: "What file formats can I download?",
    answer: "All resumes and cover letters are available as PDF downloads, which is the most widely accepted format by employers and recruitment systems.",
  },
  {
    question: "Is my information secure?",
    answer: "Absolutely. We use industry-standard encryption to protect your personal information. Your data is never shared with third parties.",
  },
];

export default function Pricing() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const { sessionId, isLoading: sessionLoading } = useSession();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: productsData, isLoading: productsLoading } = useQuery<{ products: StripeProduct[] }>({
    queryKey: ["/api/products"],
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const getPriceIdForTier = (tierId: string): string | null => {
    if (!productsData?.products) return null;
    
    // Map tier IDs to Stripe product IDs
    const productIdMap: Record<string, string> = {
      single: "prod_TbKJJeGdrFthyV",
    };
    
    // Fallback to name matching for products not yet mapped
    const productNameMap: Record<string, string> = {
      single: "Single Resume",
      pack5: "5 Resume Pack",
      pack10: "10+ Resume Pack",
    };
    
    // First try to find by product ID
    let product = productsData.products.find(
      p => p.id === productIdMap[tierId]
    );
    
    // Fallback to name matching if product ID not found
    if (!product) {
      product = productsData.products.find(
        p => p.name === productNameMap[tierId]
      );
    }
    
    return product?.prices?.[0]?.id || null;
  };

  const handleSelectTier = async (tierId: string) => {
    if (sessionLoading || !sessionId) {
      toast({
        title: "Please wait",
        description: "Setting up your session...",
      });
      return;
    }

    if (productsLoading || !productsData?.products?.length) {
      toast({
        title: "Loading",
        description: "Please wait while we load pricing information...",
      });
      return;
    }

    const priceId = getPriceIdForTier(tierId);
    if (!priceId) {
      toast({
        title: "Error",
        description: "Unable to process payment. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setLoadingTier(tierId);

    try {
      const response = await apiRequest("POST", "/api/checkout", {
        priceId,
        planType: tierId,
        sessionId,
      });
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your job search needs. All plans include access to our complete template library.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-16">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative ${tier.isPopular ? "border-primary" : ""}`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="px-3">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground ml-1">AUD</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={tier.isPopular ? "default" : "outline"}
                  onClick={() => handleSelectTier(tier.id)}
                  disabled={loadingTier === tier.id}
                  data-testid={`button-select-tier-${tier.id}`}
                >
                  {loadingTier === tier.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-8 text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Free Career Resources</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Not ready to buy? Our comprehensive job search guides, employment services directory, 
            and interview tips are completely free to access.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => navigate("/resources")} data-testid="button-free-resume-guide">
              Resume Writing Guide
            </Button>
            <Button variant="outline" onClick={() => navigate("/job-search")} data-testid="button-free-job-search">
              Job Search Resources
            </Button>
            <Button variant="outline" onClick={() => navigate("/resources")} data-testid="button-free-interview-tips">
              Interview Tips
            </Button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left" data-testid={`accordion-faq-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
