import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Search, FileText, Mail, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GroupedTemplateCard } from "@/components/GroupedTemplateCard";
import { useSession } from "@/lib/session";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  generateGroupedResumeTemplates, 
  generateGroupedCoverLetterTemplates, 
  getTemplateCounts,
  createPreviewWithTheme,
  type GroupedTemplate
} from "@/templates/TemplateGenerator";

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

const resumeTemplates = generateGroupedResumeTemplates();
const coverLetterTemplates = generateGroupedCoverLetterTemplates();
const templateCounts = getTemplateCounts();

const pricingOptions = [
  { id: "single", name: "Single Resume", description: "1 Resume + 1 Cover Letter", price: 14.99 },
  { id: "pack5", name: "5 Resume Pack", description: "5 Resumes + 5 Cover Letters", price: 29.99, isPopular: true },
  { id: "pack10", name: "10+ Resume Pack", description: "Unlimited Resumes & Cover Letters", price: 49.99 },
];

export default function Templates() {
  const [activeTab, setActiveTab] = useState("resumes");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewLayout, setPreviewLayout] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const [, navigate] = useLocation();
  const { sessionId, isLoading: sessionLoading } = useSession();
  const { toast } = useToast();

  const { data: productsData } = useQuery<{ products: StripeProduct[] }>({
    queryKey: ["/api/products"],
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const templates = activeTab === "resumes" ? resumeTemplates : coverLetterTemplates;

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.layoutName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.layoutDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [templates, searchQuery]);

  const handlePreview = (layoutId: string, themeId: string) => {
    setPreviewLayout(layoutId);
    setPreviewTheme(themeId);
  };

  const handleSelect = (layoutId: string, themeId: string) => {
    const templateId = `${activeTab === "cover-letters" ? "cover-letter" : "resume"}-${layoutId}-${themeId}`;
    if (activeTab === "cover-letters") {
      navigate(`/cover-letter/new?template=${encodeURIComponent(templateId)}`);
    } else {
      navigate(`/builder?template=${encodeURIComponent(templateId)}`);
    }
  };

  const getPriceIdForPlan = (planId: string): string | null => {
    if (!productsData?.products) return null;
    
    const productNameMap: Record<string, string> = {
      single: "Single Resume",
      pack5: "5 Resume Pack",
      pack10: "10+ Resume Pack",
    };
    
    const product = productsData.products.find(
      p => p.name === productNameMap[planId]
    );
    
    return product?.prices?.[0]?.id || null;
  };

  const handleProceedToPayment = async () => {
    if (!selectedPlan) {
      toast({
        title: "Select a plan",
        description: "Please choose a pricing plan to continue.",
        variant: "destructive",
      });
      return;
    }

    if (sessionLoading || !sessionId) {
      toast({
        title: "Please wait",
        description: "Setting up your session...",
        variant: "destructive",
      });
      return;
    }

    const priceId = getPriceIdForPlan(selectedPlan);
    if (!priceId) {
      toast({
        title: "Error",
        description: "Unable to process payment. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setLoadingCheckout(true);

    try {
      const response = await apiRequest("POST", "/api/checkout", {
        priceId,
        planType: selectedPlan,
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
      setLoadingCheckout(false);
    }
  };

  const PreviewComponent = previewLayout && previewTheme 
    ? createPreviewWithTheme(previewLayout, previewTheme, activeTab === "resumes" ? "resume" : "cover-letter")
    : null;

  const previewTemplateData = previewLayout 
    ? templates.find(t => t.layoutId === previewLayout)
    : null;

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Choose Your Perfect Template
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of {templateCounts.total}+ professionally designed templates. 
            Choose a layout and pick your preferred color scheme.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="resumes" className="gap-2" data-testid="tab-resumes">
              <FileText className="h-4 w-4" />
              Resumes
            </TabsTrigger>
            <TabsTrigger value="cover-letters" className="gap-2" data-testid="tab-cover-letters">
              <Mail className="h-4 w-4" />
              Cover Letters
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md mx-auto md:mx-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search layouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-templates"
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredTemplates.length} layout{filteredTemplates.length !== 1 ? 's' : ''} available with {templates[0]?.colorOptions.length || 0} color options each
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <GroupedTemplateCard
              key={template.layoutId}
              template={template}
              onPreview={handlePreview}
              onSelect={handleSelect}
              type={activeTab === "resumes" ? "resume" : "cover-letter"}
            />
          ))}
        </div>

        <Dialog open={!!(previewLayout && previewTheme)} onOpenChange={() => { setPreviewLayout(null); setPreviewTheme(null); }}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{previewTemplateData?.layoutName}</DialogTitle>
              <DialogDescription>
                {previewTemplateData?.layoutDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-[1/1.414] bg-muted rounded-md overflow-hidden relative">
              {PreviewComponent ? (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-[200%] h-[200%] origin-top-left scale-50">
                    <PreviewComponent />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">{previewTemplateData?.layoutName}</p>
                    <p className="text-muted-foreground">{previewTemplateData?.layoutDescription}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setPreviewLayout(null); setPreviewTheme(null); }}>
                Close
              </Button>
              <Button 
                onClick={() => previewLayout && previewTheme && handleSelect(previewLayout, previewTheme)} 
                data-testid="button-use-template"
              >
                Use This Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Your Plan</DialogTitle>
              <DialogDescription>
                Select a pricing plan to continue with your selected template.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {pricingOptions.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 border rounded-md hover-elevate cursor-pointer relative ${
                    selectedPlan === option.id ? "border-primary bg-primary/5" : ""
                  } ${option.isPopular ? "border-primary" : ""}`}
                  onClick={() => setSelectedPlan(option.id)}
                  data-testid={`plan-option-${option.id}`}
                >
                  {option.isPopular && (
                    <Badge className="absolute -top-2 right-4">Popular</Badge>
                  )}
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <h3 className="font-medium">{option.name}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <span className="text-xl font-bold whitespace-nowrap">${option.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleProceedToPayment}
                disabled={!selectedPlan || loadingCheckout}
                data-testid="button-proceed-payment"
              >
                {loadingCheckout ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Continue to Payment"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
