// Template Generator - Creates 200+ templates from layouts and themes
import { themes, layouts, generateAllTemplates, getTheme, type GeneratedTemplate, type TemplateTheme } from "./config";
import { getLayoutComponent, type LayoutProps } from "./layouts";

// Sample data for previews - realistic Australian resume content
const sampleData: LayoutProps["data"] = {
  name: "Sarah Mitchell",
  title: "Senior Software Engineer",
  email: "sarah.mitchell@email.com",
  phone: "+61 412 345 678",
  location: "Sydney, NSW",
  summary: "Results-driven software engineer with 8+ years of experience developing scalable web applications and leading cross-functional teams. Proven track record of delivering high-impact projects that improved system performance by 40% and reduced operational costs.",
  experience: [
    { 
      title: "Senior Software Engineer", 
      company: "Commonwealth Bank Australia", 
      date: "Jan 2021 - Present"
    },
    { 
      title: "Software Developer", 
      company: "Atlassian", 
      date: "Mar 2018 - Dec 2020"
    },
    { 
      title: "Junior Developer", 
      company: "Canva", 
      date: "Feb 2016 - Feb 2018"
    },
  ],
  education: [
    { 
      degree: "Bachelor of Computer Science (Honours)", 
      school: "University of Sydney", 
      year: "2015"
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL", "Agile/Scrum"],
};

// Cover letter sample data - realistic Australian content
const coverLetterSampleData = {
  name: "Sarah Mitchell",
  title: "Senior Software Engineer",
  email: "sarah.mitchell@email.com",
  phone: "+61 412 345 678",
  location: "Sydney, NSW",
  date: "14 December 2024",
  recipient: {
    name: "Ms Jennifer Roberts",
    title: "Head of Engineering",
    company: "Canva",
    address: "110 Kippax Street, Surry Hills NSW 2010",
  },
  opening: "I am writing to apply for the Lead Software Engineer position at Canva, as advertised on your careers page. With over 8 years of experience in software development and a proven track record of leading high-performing engineering teams, I am confident I can make a significant contribution to your organisation.",
  body: "In my current role at Commonwealth Bank, I lead a team of engineers responsible for developing customer-facing applications used by over 2 million Australians. I successfully implemented performance optimisations that reduced page load times by 60%, directly improving customer satisfaction scores. My experience at Atlassian gave me deep expertise in building scalable SaaS products, where I contributed to features used by over 100,000 teams globally. I am particularly drawn to Canva's mission of empowering everyone to design, and I believe my technical expertise combined with my passion for user-centric development makes me an ideal candidate for this role.",
  closing: "I would welcome the opportunity to discuss how my experience and skills align with Canva's engineering goals. Thank you for considering my application. I look forward to hearing from you.",
};

// Create a preview component for a specific template
function createTemplatePreview(layoutId: string, theme: TemplateTheme) {
  const LayoutComponent = getLayoutComponent(layoutId);
  
  return function TemplatePreview() {
    return <LayoutComponent theme={theme} data={sampleData} />;
  };
}

// Cover Letter Layouts
function CoverLetterSingleColumn({ theme }: { theme: TemplateTheme }) {
  return (
    <div className="w-full h-full p-3 text-[6px] leading-tight overflow-hidden" style={{ backgroundColor: theme.background }}>
      <div className="mb-2">
        <div className="font-bold text-[9px]" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
        <div className="text-[6px]" style={{ color: theme.primary }}>{coverLetterSampleData.title}</div>
        <div className="text-[5px] mt-1" style={{ color: theme.textMuted }}>
          {coverLetterSampleData.email} | {coverLetterSampleData.phone}
        </div>
      </div>
      <div className="text-[5px] mb-2" style={{ color: theme.textMuted }}>{coverLetterSampleData.date}</div>
      <div className="text-[5px] mb-2" style={{ color: theme.textSecondary }}>
        <div>{coverLetterSampleData.recipient.name}</div>
        <div>{coverLetterSampleData.recipient.company}</div>
      </div>
      <div className="h-px my-2" style={{ backgroundColor: theme.border }} />
      <div className="space-y-2">
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.opening}</p>
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.body}</p>
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.closing}</p>
      </div>
      <div className="mt-3">
        <div style={{ color: theme.textSecondary }}>Sincerely,</div>
        <div className="font-medium mt-1" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
      </div>
    </div>
  );
}

function CoverLetterSidebarLeft({ theme }: { theme: TemplateTheme }) {
  return (
    <div className="w-full h-full text-[6px] leading-tight overflow-hidden flex" style={{ backgroundColor: theme.background }}>
      <div className="w-1/4 p-2" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="font-bold text-[8px]">{coverLetterSampleData.name.split(' ')[0]}</div>
        <div className="font-bold text-[8px]">{coverLetterSampleData.name.split(' ')[1]}</div>
        <div className="text-[5px] opacity-80 mt-2">{coverLetterSampleData.title}</div>
        <div className="mt-3 text-[5px] opacity-80 space-y-0.5">
          <div>{coverLetterSampleData.email}</div>
          <div>{coverLetterSampleData.phone}</div>
          <div>{coverLetterSampleData.location}</div>
        </div>
      </div>
      <div className="flex-1 p-2">
        <div className="text-[5px] mb-1" style={{ color: theme.textMuted }}>{coverLetterSampleData.date}</div>
        <div className="text-[5px] mb-2" style={{ color: theme.textSecondary }}>
          <div>{coverLetterSampleData.recipient.name}</div>
          <div>{coverLetterSampleData.recipient.company}</div>
        </div>
        <div className="space-y-1.5">
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.opening}</p>
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.body}</p>
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.closing}</p>
        </div>
        <div className="mt-2">
          <div style={{ color: theme.textSecondary }}>Sincerely,</div>
          <div className="font-medium" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
        </div>
      </div>
    </div>
  );
}

function CoverLetterSidebarRight({ theme }: { theme: TemplateTheme }) {
  return (
    <div className="w-full h-full text-[6px] leading-tight overflow-hidden flex" style={{ backgroundColor: theme.background }}>
      <div className="flex-1 p-2">
        <div className="font-bold text-[9px] mb-0.5" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
        <div className="text-[5px] mb-2" style={{ color: theme.textMuted }}>{coverLetterSampleData.date}</div>
        <div className="text-[5px] mb-2" style={{ color: theme.textSecondary }}>
          Dear {coverLetterSampleData.recipient.name},
        </div>
        <div className="space-y-1.5">
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.opening}</p>
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.body}</p>
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.closing}</p>
        </div>
        <div className="mt-2">
          <div style={{ color: theme.textSecondary }}>Sincerely,</div>
          <div className="font-medium" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
        </div>
      </div>
      <div className="w-1/4 p-2" style={{ backgroundColor: theme.primaryLight }}>
        <div className="text-[5px] uppercase tracking-wider mb-1" style={{ color: theme.primary }}>Contact</div>
        <div className="text-[5px] space-y-0.5" style={{ color: theme.textSecondary }}>
          <div>{coverLetterSampleData.email}</div>
          <div>{coverLetterSampleData.phone}</div>
          <div>{coverLetterSampleData.location}</div>
        </div>
        <div className="mt-3">
          <div className="text-[5px] uppercase tracking-wider mb-1" style={{ color: theme.primary }}>To</div>
          <div className="text-[5px]" style={{ color: theme.textSecondary }}>
            <div>{coverLetterSampleData.recipient.company}</div>
            <div>{coverLetterSampleData.recipient.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverLetterSplitHeader({ theme }: { theme: TemplateTheme }) {
  return (
    <div className="w-full h-full text-[6px] leading-tight overflow-hidden" style={{ backgroundColor: theme.background }}>
      <div className="p-2" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="flex justify-between items-end gap-2">
          <div>
            <div className="font-bold text-[9px]">{coverLetterSampleData.name}</div>
            <div className="text-[6px] opacity-80">{coverLetterSampleData.title}</div>
          </div>
          <div className="text-right text-[5px] opacity-80">
            <div>{coverLetterSampleData.email}</div>
            <div>{coverLetterSampleData.phone}</div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-between text-[5px] mb-2">
          <div style={{ color: theme.textSecondary }}>
            <div>{coverLetterSampleData.recipient.name}</div>
            <div>{coverLetterSampleData.recipient.company}</div>
          </div>
          <div style={{ color: theme.textMuted }}>{coverLetterSampleData.date}</div>
        </div>
        <div className="space-y-1.5">
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.opening}</p>
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.body}</p>
          <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.closing}</p>
        </div>
        <div className="mt-2">
          <div style={{ color: theme.textSecondary }}>Sincerely,</div>
          <div className="font-medium" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
        </div>
      </div>
    </div>
  );
}

function CoverLetterTwoColumn({ theme }: { theme: TemplateTheme }) {
  return (
    <div className="w-full h-full p-3 text-[6px] leading-tight overflow-hidden" style={{ backgroundColor: theme.background }}>
      <div className="text-center border-b-2 pb-2 mb-2" style={{ borderColor: theme.primary }}>
        <div className="font-bold text-[10px]" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
        <div className="text-[6px]" style={{ color: theme.primary }}>{coverLetterSampleData.title}</div>
        <div className="flex justify-center gap-2 mt-1 text-[5px] flex-wrap" style={{ color: theme.textMuted }}>
          <span>{coverLetterSampleData.email}</span>
          <span>{coverLetterSampleData.phone}</span>
        </div>
      </div>
      <div className="flex gap-2 text-[5px] mb-2">
        <div className="flex-1" style={{ color: theme.textSecondary }}>
          <div>{coverLetterSampleData.recipient.name}</div>
          <div>{coverLetterSampleData.recipient.company}</div>
        </div>
        <div style={{ color: theme.textMuted }}>{coverLetterSampleData.date}</div>
      </div>
      <div className="space-y-1.5">
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.opening}</p>
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.body}</p>
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.closing}</p>
      </div>
      <div className="mt-2">
        <div style={{ color: theme.textSecondary }}>Sincerely,</div>
        <div className="font-medium" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
      </div>
    </div>
  );
}

function CoverLetterMinimal({ theme }: { theme: TemplateTheme }) {
  return (
    <div className="w-full h-full p-3 text-[6px] leading-tight overflow-hidden font-light" style={{ backgroundColor: theme.background }}>
      <div className="mb-2">
        <div className="font-normal text-[11px]" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
        <div className="text-[5px]" style={{ color: theme.textMuted }}>{coverLetterSampleData.email} | {coverLetterSampleData.phone}</div>
      </div>
      <div className="h-px my-2" style={{ backgroundColor: theme.border }} />
      <div className="text-[5px] mb-2" style={{ color: theme.textMuted }}>{coverLetterSampleData.date}</div>
      <div className="text-[5px] mb-2" style={{ color: theme.textSecondary }}>
        {coverLetterSampleData.recipient.name}, {coverLetterSampleData.recipient.company}
      </div>
      <div className="space-y-1.5">
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.opening}</p>
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.body}</p>
        <p style={{ color: theme.textSecondary }}>{coverLetterSampleData.closing}</p>
      </div>
      <div className="h-px my-2" style={{ backgroundColor: theme.border }} />
      <div className="font-medium" style={{ color: theme.textPrimary }}>{coverLetterSampleData.name}</div>
    </div>
  );
}

// Cover letter layout registry
const coverLetterLayouts: Record<string, React.FC<{ theme: TemplateTheme }>> = {
  "single-column": CoverLetterSingleColumn,
  "sidebar-left": CoverLetterSidebarLeft,
  "sidebar-right": CoverLetterSidebarRight,
  "split-header": CoverLetterSplitHeader,
  "two-column": CoverLetterTwoColumn,
  "minimal": CoverLetterMinimal,
};

// Create a cover letter preview component
function createCoverLetterPreview(layoutId: string, theme: TemplateTheme) {
  const LayoutComponent = coverLetterLayouts[layoutId] || CoverLetterSingleColumn;
  
  return function CoverLetterPreview() {
    return <LayoutComponent theme={theme} />;
  };
}

// Template interface for generated templates
export interface TemplateWithPreview {
  id: string;
  name: string;
  category: string;
  isPremium: boolean;
  component: React.FC;
}

// Generate all resume templates with preview components
export function generateResumeTemplates(): TemplateWithPreview[] {
  const generatedTemplates = generateAllTemplates("resume");
  
  return generatedTemplates.map((template) => {
    const theme = getTheme(template.theme);
    if (!theme) {
      return {
        id: template.id,
        name: template.name,
        category: template.category,
        isPremium: template.isPremium,
        component: createTemplatePreview("single-column", themes[0]),
      };
    }
    
    return {
      id: template.id,
      name: template.name,
      category: template.category,
      isPremium: template.isPremium,
      component: createTemplatePreview(template.layout, theme),
    };
  });
}

// Generate all cover letter templates with preview components
export function generateCoverLetterTemplates(): TemplateWithPreview[] {
  const generatedTemplates = generateAllTemplates("cover-letter");
  
  return generatedTemplates.map((template) => {
    const theme = getTheme(template.theme);
    if (!theme) {
      return {
        id: template.id,
        name: template.name,
        category: template.category,
        isPremium: template.isPremium,
        component: createCoverLetterPreview("single-column", themes[0]),
      };
    }
    
    return {
      id: template.id,
      name: template.name,
      category: template.category,
      isPremium: template.isPremium,
      component: createCoverLetterPreview(template.layout, theme),
    };
  });
}

// Get template counts for display
export function getTemplateCounts() {
  const resumeCount = generateAllTemplates("resume").length;
  const coverLetterCount = generateAllTemplates("cover-letter").length;
  return {
    resumes: resumeCount,
    coverLetters: coverLetterCount,
    total: resumeCount + coverLetterCount,
  };
}

// Interface for grouped templates (one per layout with color options)
export interface GroupedTemplate {
  layoutId: string;
  layoutName: string;
  layoutDescription: string;
  category: string;
  isPremium: boolean;
  colorOptions: Array<{
    themeId: string;
    themeName: string;
    primaryColor: string;
    templateId: string;
  }>;
  previewComponent: React.FC;
}

// Generate grouped resume templates (one per layout type)
export function generateGroupedResumeTemplates(): GroupedTemplate[] {
  return layouts.map((layout) => {
    const colorOptions = themes.map((theme) => ({
      themeId: theme.id,
      themeName: theme.name,
      primaryColor: theme.primary,
      templateId: `resume-${layout.id}-${theme.id}`,
    }));

    const defaultTheme = themes[0];
    
    return {
      layoutId: layout.id,
      layoutName: layout.name,
      layoutDescription: layout.description,
      category: "Professional",
      isPremium: false,
      colorOptions,
      previewComponent: createTemplatePreview(layout.id, defaultTheme),
    };
  });
}

// Cover letter layout IDs that have unique designs
const coverLetterLayoutIds = Object.keys(coverLetterLayouts);

// Generate grouped cover letter templates (one per layout type)
export function generateGroupedCoverLetterTemplates(): GroupedTemplate[] {
  // Only include layouts that have cover letter versions
  const coverLetterLayoutsList = layouts.filter(l => coverLetterLayoutIds.includes(l.id));
  
  return coverLetterLayoutsList.map((layout) => {
    const colorOptions = themes.map((theme) => ({
      themeId: theme.id,
      themeName: theme.name,
      primaryColor: theme.primary,
      templateId: `cover-letter-${layout.id}-${theme.id}`,
    }));

    const defaultTheme = themes[0];
    
    return {
      layoutId: layout.id,
      layoutName: layout.name,
      layoutDescription: layout.description,
      category: "Professional",
      isPremium: false,
      colorOptions,
      previewComponent: createCoverLetterPreview(layout.id, defaultTheme),
    };
  });
}

// Create preview component for a specific layout with a specific theme
export function createPreviewWithTheme(layoutId: string, themeId: string, type: "resume" | "cover-letter"): React.FC {
  const theme = getTheme(themeId) || themes[0];
  if (type === "resume") {
    return createTemplatePreview(layoutId, theme);
  }
  return createCoverLetterPreview(layoutId, theme);
}
