import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Disclaimer() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Disclaimer</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground">Last Updated: December 2024</p>

          <h2>1. General Information</h2>
          <p>
            The information and tools provided by ResumeReady Australia are for general informational and educational purposes only. While we strive to provide helpful resources for Australian job seekers, the content on our website should not be considered as professional career counselling, legal, or employment advice.
          </p>

          <h2>2. No Guarantee of Employment</h2>
          <p>
            ResumeReady Australia provides templates and tools to help you create professional resumes and cover letters. However, we make no guarantees or representations regarding:
          </p>
          <ul>
            <li>Employment outcomes or job offers</li>
            <li>Interview invitations</li>
            <li>Career advancement</li>
            <li>The effectiveness of any particular resume format or content</li>
          </ul>
          <p>
            Success in job applications depends on many factors beyond the quality of your resume, including market conditions, your qualifications, interview performance, and employer preferences.
          </p>

          <h2>3. User Responsibility</h2>
          <p>
            You are solely responsible for:
          </p>
          <ul>
            <li>The accuracy and truthfulness of information in your resume and cover letter</li>
            <li>Ensuring your resume content complies with applicable laws and regulations</li>
            <li>Verifying that your resume meets specific employer or industry requirements</li>
            <li>Keeping your personal information secure</li>
          </ul>

          <h2>4. Professional Services Disclaimer</h2>
          <p>
            ResumeReady Australia is a resume building tool and resource platform. We do not provide:
          </p>
          <ul>
            <li>Professional resume writing services</li>
            <li>Career counselling or coaching</li>
            <li>Employment placement services</li>
            <li>Legal advice regarding employment matters</li>
          </ul>
          <p>
            If you require personalised career guidance, we recommend consulting with a qualified career counsellor or employment professional.
          </p>

          <h2>5. Template and Content Accuracy</h2>
          <p>
            While we make every effort to ensure our templates and resources are current and professionally designed, we cannot guarantee that all information is complete, accurate, or up-to-date with the latest industry standards or employer expectations.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites or resources. These links are provided for convenience only. We do not endorse and are not responsible for the content, products, or services offered by third parties.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by Australian law, ResumeReady Australia disclaims all liability for any loss or damage arising from your use of our Service, including but not limited to:
          </p>
          <ul>
            <li>Lost employment opportunities</li>
            <li>Financial losses</li>
            <li>Data loss or corruption</li>
            <li>Any indirect or consequential damages</li>
          </ul>

          <h2>8. About the Creator</h2>
          <p>
            ResumeReady Australia was designed by <strong>Samara Mabbott</strong>, who holds a Bachelor of Psychological Services and brings over 15 years of experience in the career pathways industry. This platform combines professional expertise in career development with modern technology to provide practical, accessible tools for Australian job seekers.
          </p>

          <h2>9. Changes to This Disclaimer</h2>
          <p>
            We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting to our website.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about this Disclaimer, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> contactresumeready@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
