import { PricingCard, type PricingTier } from "../PricingCard";

const mockTier: PricingTier = {
  id: "single",
  name: "Single Resume",
  price: 14.99,
  description: "Perfect for one-time use",
  resumeCount: 1,
  features: [
    "1 Resume download",
    "1 Cover letter",
    "All 200+ templates",
    "PDF export",
    "7-day access to edit",
  ],
};

export default function PricingCardExample() {
  return (
    <div className="w-80">
      <PricingCard tier={mockTier} onSelect={(id) => console.log("Selected:", id)} />
    </div>
  );
}
