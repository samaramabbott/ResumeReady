import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  resumeCount: number;
}

interface PricingCardProps {
  tier: PricingTier;
  onSelect: (id: string) => void;
}

export function PricingCard({ tier, onSelect }: PricingCardProps) {
  return (
    <Card className={`relative ${tier.isPopular ? "border-primary" : ""}`}>
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
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          variant={tier.isPopular ? "default" : "outline"}
          onClick={() => onSelect(tier.id)}
          data-testid={`button-select-tier-${tier.id}`}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
