import { Link } from "wouter";
import { FileText } from "lucide-react";

const footerLinks = {
  "Resume Builder": [
    { name: "Templates", href: "/templates" },
    { name: "Cover Letters", href: "/templates?type=cover-letter" },
    { name: "Pricing", href: "/pricing" },
  ],
  "Job Search": [
    { name: "Job Boards", href: "/job-search" },
    { name: "Resources", href: "/resources" },
  ],
  Legal: [
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Disclaimer", href: "/legal/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <FileText className="h-5 w-5 text-primary" />
              ResumeReady
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Helping Australians build professional resumes and find career opportunities. 
              Free resources for job seekers at all career levels.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              <p className="font-medium text-foreground">Designed by Samara Mabbott</p>
              <p>Bachelor of Psychological Services | 15+ Years in Career Pathways</p>
            </div>
            <div className="text-center md:text-right">
              <p className="font-medium text-foreground">ResumeReady Australia</p>
              <p>The Mabbott Method</p>
              <p className="mt-1">All sales final except as required by Australian Consumer Law.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
