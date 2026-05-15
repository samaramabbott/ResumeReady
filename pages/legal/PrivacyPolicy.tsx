import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function PrivacyPolicy() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Privacy Policy</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground">Last Updated: December 2024</p>

          <h2>1. Introduction</h2>
          <p>
            ResumeReady Australia ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our resume and cover letter building service.
          </p>

          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <p>When you use our Service, you may provide:</p>
          <ul>
            <li>Personal details for your resume (name, contact information, work history, education, skills)</li>
            <li>Payment information (processed securely through Stripe)</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <p>We automatically collect:</p>
          <ul>
            <li>Session identifiers to maintain your work across visits</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on our Service</li>
            <li>Device information</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our Service</li>
            <li>Process your purchases and manage your credits</li>
            <li>Save your resume and cover letter drafts</li>
            <li>Improve our templates and user experience</li>
            <li>Respond to your inquiries</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Data Storage and Security</h2>
          <p>
            Your data is stored securely using industry-standard encryption and security practices. Resume and cover letter content is stored in our secure database and associated with your anonymous session.
          </p>
          <p>
            We retain your document data for as long as your session remains active or until you delete your documents. Inactive sessions may be purged after an extended period.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Stripe:</strong> For secure payment processing. Stripe's privacy policy governs how they handle your payment information.</li>
          </ul>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes.
          </p>

          <h2>6. Cookies and Tracking</h2>
          <p>
            We use essential cookies to maintain your session and provide core functionality. We may use analytics cookies to understand how visitors interact with our Service. You can control cookie settings through your browser.
          </p>

          <h2>7. Your Rights</h2>
          <p>Under Australian Privacy Principles, you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>8. Children's Privacy</h2>
          <p>
            Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> contactresumeready@gmail.com
          </p>
          <p>
            We will respond to privacy-related requests within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
