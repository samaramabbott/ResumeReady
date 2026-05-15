import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function TermsOfService() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Terms of Service</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground">Last Updated: December 2024</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using ResumeReady Australia ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            ResumeReady Australia provides online resume and cover letter creation tools, templates, and career resources designed to assist Australian job seekers in their employment journey. Our services are informational and educational in nature.
          </p>

          <h2>3. User Accounts and Sessions</h2>
          <p>
            Our Service uses anonymous session-based identification. You are responsible for maintaining the confidentiality of your session and for all activities that occur under your session. You agree to use the Service only for lawful purposes.
          </p>

          <h2>4. Payments and Credits</h2>
          <p>
            The Service operates on a credit-based system. When you purchase credits, you receive the right to create and download a specified number of documents within the validity period of your purchase.
          </p>
          <ul>
            <li>Single Resume: 1 credit, valid for 7 days</li>
            <li>5-Pack: 5 credits, valid for 30 days</li>
            <li>10-Pack: Unlimited credits, valid for 90 days</li>
          </ul>
          <p>
            Credits expire at the end of the validity period and cannot be transferred or extended.
          </p>

          <h2 id="refund-policy">5. Refund Policy</h2>
          <p className="font-semibold">
            Due to the digital nature of our products and the immediate access granted upon purchase, we generally do not offer refunds, exchanges, or credits for purchases made through our Service.
          </p>
          <p>
            By completing a purchase, you acknowledge and agree that:
          </p>
          <ul>
            <li>You have read and understood this refund policy</li>
            <li>Digital products cannot be "returned" once access is granted</li>
            <li>All sales are considered final except as required by law</li>
          </ul>
          <p>
            <strong>Australian Consumer Law:</strong> Nothing in this policy excludes, restricts, or modifies any consumer rights under the Australian Consumer Law that cannot be excluded, restricted, or modified by agreement. If the Australian Consumer Law applies to your purchase, you may be entitled to a remedy for a major failure or compensation for any other reasonably foreseeable loss or damage. You are also entitled to have the goods repaired or replaced if the goods fail to be of acceptable quality and the failure does not amount to a major failure.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All templates, designs, content, and materials provided through the Service are the property of ResumeReady Australia and are protected by copyright and intellectual property laws. You are granted a limited, non-exclusive license to use downloaded documents for your personal job-seeking purposes only.
          </p>
          <p>
            You may not resell, redistribute, or commercially exploit any templates or materials from our Service.
          </p>

          <h2>7. User Content</h2>
          <p>
            You retain ownership of the personal information and content you input into your resumes and cover letters. You are solely responsible for the accuracy, legality, and appropriateness of the content you create using our Service.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            ResumeReady Australia provides tools and templates to assist with resume creation but does not guarantee employment outcomes. The Service is provided "as is" without warranties of any kind.
          </p>
          <p>
            To the maximum extent permitted by law, ResumeReady Australia shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
          </p>

          <h2>9. Modifications to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We may also modify these Terms of Service at any time. Continued use of the Service after changes constitutes acceptance of the modified terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms of Service are governed by the laws of Australia. Any disputes arising from these terms or your use of the Service shall be resolved in the courts of Australia.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> contactresumeready@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
