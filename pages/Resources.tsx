import { useState } from "react";
import { 
  FileText, 
  Mail, 
  Users, 
  Briefcase, 
  Scale, 
  DollarSign, 
  Shield, 
  Phone,
  ExternalLink,
  ChevronRight,
  BookOpen,
  MessageSquare,
  ClipboardList,
  UserCheck,
  Baby,
  Clock,
  GraduationCap,
  Globe,
  Heart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const categories = [
  { id: "guides", label: "How-To Guides", icon: BookOpen },
  { id: "services", label: "Employment Services", icon: Briefcase },
  { id: "rights", label: "Workplace Rights", icon: Scale },
  { id: "tax", label: "Tax & Super", icon: DollarSign },
  { id: "targeted", label: "For Specific Groups", icon: Users },
  { id: "applying", label: "How to Apply", icon: ClipboardList },
];

const resumeGuide = [
  {
    title: "1. Contact Information",
    content: "Include your full name, phone number, email address, and suburb/city (no need for full address). Use a professional email address.",
  },
  {
    title: "2. Professional Summary",
    content: "Write 2-3 sentences highlighting your key skills and experience. Tailor this to each job you apply for. Focus on what you can offer the employer.",
  },
  {
    title: "3. Skills Section",
    content: "List 6-10 relevant skills. Include both technical skills (software, equipment) and soft skills (communication, teamwork). Match skills from the job advertisement.",
  },
  {
    title: "4. Work Experience",
    content: "List jobs in reverse order (most recent first). Include job title, company name, dates, and 3-5 bullet points describing your achievements. Use action verbs like 'managed', 'created', 'improved'.",
  },
  {
    title: "5. Education & Training",
    content: "Include qualifications, certifications, and relevant training. List the institution name, qualification, and year completed.",
  },
  {
    title: "6. References",
    content: "You can write 'References available on request' or include 2-3 professional references with their permission.",
  },
];

const coverLetterGuide = [
  {
    title: "Opening Paragraph",
    content: "State the position you're applying for and where you found it. Show enthusiasm and briefly mention why you're interested in this role.",
  },
  {
    title: "Body Paragraphs",
    content: "Connect your experience and skills to the job requirements. Give specific examples of achievements. Explain why you're a good fit for the company.",
  },
  {
    title: "Closing Paragraph",
    content: "Restate your interest, thank them for considering your application, and include a call to action (e.g., 'I look forward to discussing this opportunity').",
  },
];

const kscGuide = [
  {
    title: "What are Key Selection Criteria?",
    content: "Key Selection Criteria (KSC) are specific requirements listed in government and some private sector job ads. You need to address each criterion with a written response showing how you meet it.",
  },
  {
    title: "STAR Method",
    content: "Use the STAR method: Situation (describe the context), Task (what was required), Action (what you did), Result (the outcome). This provides clear, structured responses.",
  },
  {
    title: "Tips for Success",
    content: "Address every criterion separately. Use specific examples from your experience. Keep responses focused (usually 150-300 words each). Quantify results where possible.",
  },
];

const interviewTips = [
  {
    title: "Before the Interview",
    tips: [
      "Research the company - their values, products/services, recent news",
      "Review the job description and prepare examples for common questions",
      "Plan your outfit - dress one level above the job's dress code",
      "Prepare questions to ask the interviewer",
      "Know the location and plan to arrive 10-15 minutes early",
    ],
  },
  {
    title: "During the Interview",
    tips: [
      "Greet everyone with a smile and firm handshake",
      "Maintain good eye contact and positive body language",
      "Listen carefully to each question before answering",
      "Use specific examples from your experience (STAR method)",
      "Ask thoughtful questions about the role and company",
    ],
  },
  {
    title: "After the Interview",
    tips: [
      "Send a thank-you email within 24 hours",
      "Reiterate your interest in the position",
      "Follow up if you haven't heard back after a week",
      "Reflect on what went well and areas to improve",
    ],
  },
];

const employmentServices = [
  {
    name: "Services Australia (Centrelink)",
    description: "Access JobSeeker Payment, Youth Allowance, and other income support while looking for work.",
    phone: "132 850",
    website: "https://www.servicesaustralia.gov.au",
    findProvider: null,
    category: "Government",
  },
  {
    name: "Workforce Australia",
    description: "Government employment services including job search tools, training, and provider support.",
    phone: "1800 805 260",
    website: "https://www.workforceaustralia.gov.au",
    findProvider: "https://www.workforceaustralia.gov.au/individuals/coaching/providers/",
    category: "Government",
  },
  {
    name: "Inclusive Employment Australia",
    description: "Specialised support for job seekers with disability, injury, or health condition. Replaced Disability Employment Services from 1 November 2025.",
    phone: "1800 805 260",
    website: "https://www.dss.gov.au/inclusive-employment",
    findProvider: "https://www.workforceaustralia.gov.au/individuals/coaching/providers/?programs=disability",
    category: "Disability",
  },
  {
    name: "Parent Pathways",
    description: "Pre-employment program for parents with young children to prepare for work or study. Previously known as ParentsNext.",
    phone: "1800 805 260",
    website: "https://www.dewr.gov.au/parent-pathways",
    findProvider: "https://www.workforceaustralia.gov.au/individuals/coaching/providers/?programs=parents",
    category: "Parents",
  },
  {
    name: "Transition to Work",
    description: "Intensive support for young people aged 15-24 to find and keep a job.",
    phone: "1800 805 260",
    website: "https://www.dewr.gov.au/transition-work",
    findProvider: "https://www.workforceaustralia.gov.au/individuals/coaching/providers/?programs=ttw",
    category: "Youth",
  },
  {
    name: "Career Transition Assistance",
    description: "Program for mature age job seekers (45+) to build skills and confidence.",
    phone: "1800 805 260",
    website: "https://www.dewr.gov.au/career-transition-assistance",
    findProvider: "https://www.workforceaustralia.gov.au/individuals/coaching/providers/?programs=cta",
    category: "Mature Age",
  },
  {
    name: "Self-Employment Assistance",
    description: "Support for job seekers wanting to start their own business, including training and mentoring.",
    phone: "1800 805 260",
    website: "https://www.dewr.gov.au/self-employment-assistance",
    findProvider: "https://www.workforceaustralia.gov.au/individuals/coaching/providers/?programs=sea",
    category: "Self-Employment",
  },
  {
    name: "Workforce Australia Online",
    description: "Online employment services for job seekers in remote areas or those who prefer digital support.",
    phone: "1800 805 260",
    website: "https://www.workforceaustralia.gov.au/individuals/services/online",
    findProvider: null,
    category: "Remote",
  },
];

const workplaceRights = [
  {
    name: "Fair Work Ombudsman",
    description: "Information about pay rates, leave entitlements, workplace rights and obligations.",
    phone: "13 13 94",
    website: "https://www.fairwork.gov.au",
    topics: ["Minimum wage", "Leave entitlements", "Unfair dismissal", "Workplace bullying"],
  },
  {
    name: "Fair Work Commission",
    description: "Australia's national workplace relations tribunal. Handles unfair dismissal claims.",
    phone: "1300 799 675",
    website: "https://www.fwc.gov.au",
    topics: ["Unfair dismissal", "General protections", "Enterprise agreements"],
  },
  {
    name: "Safe Work Australia",
    description: "Information about workplace health and safety rights and responsibilities.",
    phone: "1300 551 832",
    website: "https://www.safeworkaustralia.gov.au",
    topics: ["WHS rights", "Hazard reporting", "Workers compensation"],
  },
  {
    name: "Victorian WorkCover Authority",
    description: "Workers compensation and injury claims in Victoria.",
    phone: "1800 136 089",
    website: "https://www.worksafe.vic.gov.au",
    topics: ["Injury claims", "Return to work", "Workplace safety"],
  },
];

const taxInfo = [
  {
    title: "Tax File Number (TFN)",
    content: "You need a TFN to work in Australia. Apply online through the ATO website if you don't have one. Your employer will ask for your TFN when you start work.",
    link: "https://www.ato.gov.au/individuals/tax-file-number/",
  },
  {
    title: "Income Tax",
    content: "Tax is automatically taken from your wages (PAYG). The tax-free threshold is $18,200 per year. Lodge your tax return each year by 31 October (or later through a tax agent).",
    link: "https://www.ato.gov.au/individuals/",
  },
  {
    title: "Superannuation",
    content: "Your employer must pay 11% of your wages into a super fund. You can choose your own fund or use your employer's default fund. You can find lost super through myGov.",
    link: "https://www.ato.gov.au/super/",
  },
  {
    title: "myGov Account",
    content: "Link your myGov account to the ATO to lodge tax returns, track super, and manage tax affairs online.",
    link: "https://my.gov.au/",
  },
];

const targetedGroups = [
  {
    id: "parents",
    title: "Parents Returning to Work",
    icon: Baby,
    programs: ["Parent Pathways", "Workforce Australia", "Family Tax Benefit"],
    tips: [
      "Highlight transferable skills from parenting (organisation, multitasking, problem-solving)",
      "Consider part-time or flexible work arrangements",
      "Update skills through free online courses",
      "Network through school and community groups",
    ],
    resources: [
      { name: "Parent Pathways", url: "https://www.dewr.gov.au/parent-pathways" },
      { name: "Family Tax Benefit", url: "https://www.servicesaustralia.gov.au/family-tax-benefit" },
      { name: "Find Child Care", url: "https://www.startingblocks.gov.au/find-child-care" },
      { name: "Child Care Subsidy", url: "https://www.servicesaustralia.gov.au/child-care-subsidy" },
    ],
  },
  {
    id: "mature",
    title: "Workers Aged 45+",
    icon: Clock,
    programs: ["Career Transition Assistance", "Restart Wage Subsidy"],
    tips: [
      "Emphasise your experience and reliability",
      "Show you're tech-savvy and adaptable to change",
      "Consider updating qualifications or getting new certifications",
      "Network through industry associations and LinkedIn",
    ],
    resources: [
      { name: "Career Transition Assistance", url: "https://www.dewr.gov.au/career-transition-assistance" },
    ],
  },
  {
    id: "unemployed",
    title: "Long-term Unemployed",
    icon: UserCheck,
    programs: ["Workforce Australia", "Wage Subsidies", "Work for the Dole"],
    tips: [
      "Focus on volunteer work and community involvement",
      "Explain gaps honestly but briefly",
      "Emphasise your motivation and readiness to work",
      "Consider work experience or volunteering to rebuild confidence",
    ],
    resources: [
      { name: "Workforce Australia", url: "https://www.workforceaustralia.gov.au" },
    ],
  },
  {
    id: "youth",
    title: "School Leavers & Young Job Seekers",
    icon: GraduationCap,
    programs: ["Transition to Work", "Youth Allowance"],
    tips: [
      "Include school achievements, volunteering, and casual work",
      "Highlight soft skills like teamwork and communication",
      "Consider apprenticeships or traineeships",
      "Get experience through volunteering or work experience",
    ],
    resources: [
      { name: "Transition to Work", url: "https://www.dewr.gov.au/transition-work" },
      { name: "Australian Apprenticeships", url: "https://www.australianapprenticeships.gov.au" },
    ],
  },
  {
    id: "migrants",
    title: "Migrants & Refugees",
    icon: Globe,
    programs: ["Skills Assessment", "Adult Migrant English Program", "Settlement Services"],
    tips: [
      "Get overseas qualifications assessed through relevant bodies",
      "Improve English skills through free AMEP classes",
      "Seek help from settlement services in your area",
      "Join professional networks for migrants in your field",
    ],
    resources: [
      { name: "Adult Migrant English Program", url: "https://immi.homeaffairs.gov.au/settling-in-australia/amep/find-a-class/providers-and-locations" },
      { name: "SEE Program", url: "https://www.dewr.gov.au/skills-education-and-employment/see-providers" },
    ],
  },
  {
    id: "volunteering",
    title: "Work Experience & Volunteering",
    icon: Heart,
    programs: [],
    tips: [
      "Volunteering builds skills and shows commitment",
      "Use volunteer experience on your resume just like paid work",
      "Great way to fill gaps and try different industries",
      "Can lead to paid employment or references",
    ],
    resources: [
      { name: "Volunteering Australia", url: "https://www.volunteeringaustralia.org" },
      { name: "GoVolunteer", url: "https://govolunteer.com.au" },
      { name: "SEEK Volunteer", url: "https://www.volunteer.com.au" },
    ],
  },
];

const applyingOnline = [
  {
    title: "Create Job Search Profiles",
    steps: [
      "Set up profiles on major job sites (SEEK, Indeed, LinkedIn)",
      "Use a professional email address",
      "Upload your resume and keep it updated",
      "Set up job alerts for roles you're interested in",
    ],
  },
  {
    title: "Applying Through Job Sites",
    steps: [
      "Read the entire job ad carefully",
      "Click 'Apply' or 'Apply Now' button",
      "Fill in all required fields accurately",
      "Upload your resume and cover letter (tailored to the job)",
      "Review before submitting",
    ],
  },
  {
    title: "Following Up",
    steps: [
      "Save job details and application dates",
      "Follow up after 1-2 weeks if you haven't heard back",
      "Check your email (including spam folder) regularly",
      "Be patient - hiring can take several weeks",
    ],
  },
];

const applyingInPerson = [
  {
    title: "Before You Go",
    steps: [
      "Research the business and check if they're hiring",
      "Prepare copies of your resume (5-10 copies)",
      "Dress neatly and professionally",
      "Plan what you'll say to introduce yourself",
      "Bring a pen and notepad",
    ],
  },
  {
    title: "When You Arrive",
    steps: [
      "Greet staff politely and smile",
      "Ask if there's a manager or hiring person you can speak with",
      "Introduce yourself and say you're looking for work",
      "Hand over your resume and briefly mention your experience",
      "Ask about the best way to follow up",
    ],
  },
  {
    title: "What to Say",
    content: "Hi, my name is [Name]. I'm looking for work in [type of role] and I was wondering if you have any positions available. I've brought my resume - would you be able to pass it on to the hiring manager?",
  },
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState("guides");

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Free Career Resources
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about job searching in Australia. 
            From writing your resume to understanding workplace rights.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-center mb-8">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-testid={`tab-${cat.id}`}
              >
                <cat.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{cat.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* How-To Guides */}
          <TabsContent value="guides" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Resume Guide */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>How to Write a Resume</CardTitle>
                      <CardDescription>Step-by-step guide for Australian job seekers</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {resumeGuide.map((item, index) => (
                      <AccordionItem key={index} value={`resume-${index}`}>
                        <AccordionTrigger className="text-left text-sm" data-testid={`accordion-resume-${index}`}>
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Cover Letter Guide */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>How to Write a Cover Letter</CardTitle>
                      <CardDescription>Make a great first impression</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {coverLetterGuide.map((item, index) => (
                      <AccordionItem key={index} value={`cover-${index}`}>
                        <AccordionTrigger className="text-left text-sm" data-testid={`accordion-cover-${index}`}>
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* KSC Guide */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <ClipboardList className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Key Selection Criteria (KSC)</CardTitle>
                      <CardDescription>For government job applications</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {kscGuide.map((item, index) => (
                      <AccordionItem key={index} value={`ksc-${index}`}>
                        <AccordionTrigger className="text-left text-sm" data-testid={`accordion-ksc-${index}`}>
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Interview Tips */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Interview Tips</CardTitle>
                      <CardDescription>Prepare to impress</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {interviewTips.map((section, index) => (
                      <AccordionItem key={index} value={`interview-${index}`}>
                        <AccordionTrigger className="text-left text-sm" data-testid={`accordion-interview-${index}`}>
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {section.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employment Services */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {employmentServices.map((service, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{service.category}</Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(service.website, "_blank")}
                        data-testid={`button-visit-${service.name.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Website
                      </Button>
                      {service.findProvider && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => window.open(service.findProvider, "_blank")}
                          data-testid={`button-provider-${service.name.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          <Users className="h-4 w-4" />
                          Find a Provider
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(`tel:${service.phone}`, "_self")}
                      >
                        <Phone className="h-4 w-4" />
                        {service.phone}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workplace Rights */}
          <TabsContent value="rights" className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Know Your Rights
              </h2>
              <p className="text-muted-foreground">
                All workers in Australia have legal rights, including minimum pay rates, leave entitlements, 
                and protection from unfair treatment. These resources will help you understand and protect your rights.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {workplaceRights.map((org, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{org.name}</CardTitle>
                    <CardDescription>{org.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {org.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(org.website, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Website
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(`tel:${org.phone}`, "_self")}
                      >
                        <Phone className="h-4 w-4" />
                        {org.phone}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tax & Super */}
          <TabsContent value="tax" className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Tax & Superannuation Basics
              </h2>
              <p className="text-muted-foreground">
                Understanding tax and super is important when you start working. 
                Here's what you need to know as an Australian worker.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {taxInfo.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => window.open(item.link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  ATO Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">Phone:</span>
                  <Button variant="ghost" size="sm" onClick={() => window.open("tel:132861", "_self")}>
                    13 28 61 (Individual enquiries)
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">Website:</span>
                  <Button variant="ghost" size="sm" onClick={() => window.open("https://www.ato.gov.au", "_blank")} className="gap-2">
                    www.ato.gov.au
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Targeted Groups */}
          <TabsContent value="targeted" className="space-y-6">
            <Tabs defaultValue="parents" className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start mb-6">
                {targetedGroups.map((group) => (
                  <TabsTrigger
                    key={group.id}
                    value={group.id}
                    className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <group.icon className="h-4 w-4" />
                    <span className="hidden md:inline">{group.title.split(' ').slice(0, 2).join(' ')}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {targetedGroups.map((group) => (
                <TabsContent key={group.id} value={group.id}>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <group.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{group.title}</CardTitle>
                          {group.programs.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {group.programs.map((program, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {program}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Tips for Success</h4>
                        <ul className="space-y-2">
                          {group.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ChevronRight className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Helpful Resources</h4>
                        <div className="flex flex-wrap gap-2">
                          {group.resources.map((resource, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={() => window.open(resource.url, "_blank")}
                            >
                              {resource.name}
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          {/* How to Apply */}
          <TabsContent value="applying" className="space-y-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Online Applications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Applying Online</CardTitle>
                      <CardDescription>Most jobs are applied for online these days</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {applyingOnline.map((section, index) => (
                      <AccordionItem key={index} value={`online-${index}`}>
                        <AccordionTrigger className="text-left text-sm">
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {section.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary flex-shrink-0">
                                  {stepIndex + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* In-Person Applications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Applying In Person</CardTitle>
                      <CardDescription>Great for retail, hospitality, and trades</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {applyingInPerson.map((section, index) => (
                      <AccordionItem key={index} value={`inperson-${index}`}>
                        <AccordionTrigger className="text-left text-sm">
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          {"steps" in section && section.steps ? (
                            <ul className="space-y-2">
                              {section.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary flex-shrink-0">
                                    {stepIndex + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="bg-muted/50 p-4 rounded-md text-sm italic text-muted-foreground">
                              "{section.content}"
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
