import { useState } from "react";
import { Search, ExternalLink, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const jobBoardCategories = ["All", "General", "Government", "Industry-Specific", "Graduate", "Disability"];

// todo: remove mock functionality
const jobBoards = [
  // General Job Boards
  {
    id: "seek",
    name: "SEEK",
    description: "Australia's largest employment marketplace with thousands of jobs across all industries.",
    website: "https://www.seek.com.au",
    category: "General",
    isFree: true,
  },
  {
    id: "indeed",
    name: "Indeed",
    description: "Global job search engine aggregating listings from company websites and job boards.",
    website: "https://au.indeed.com",
    category: "General",
    isFree: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn Jobs",
    description: "Professional networking platform with job listings and direct employer connections.",
    website: "https://au.linkedin.com/jobs",
    category: "General",
    isFree: true,
  },
  {
    id: "jora",
    name: "Jora",
    description: "Job search engine that aggregates listings from multiple Australian job sites.",
    website: "https://au.jora.com",
    category: "General",
    isFree: true,
  },
  {
    id: "adzuna",
    name: "Adzuna",
    description: "Search engine for job ads that includes salary estimates and market insights.",
    website: "https://www.adzuna.com.au",
    category: "General",
    isFree: true,
  },
  {
    id: "careerone",
    name: "CareerOne",
    description: "Australian job board with career advice and resume building tools.",
    website: "https://www.careerone.com.au",
    category: "General",
    isFree: true,
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    description: "Job listings with company reviews, salary data, and interview experiences.",
    website: "https://www.glassdoor.com.au",
    category: "General",
    isFree: true,
  },
  
  // Government
  {
    id: "workforce-australia",
    name: "Workforce Australia",
    description: "Government job search platform with access to training and support services.",
    website: "https://www.workforceaustralia.gov.au/individuals/jobs",
    category: "Government",
    isFree: true,
  },
  {
    id: "apsjobs",
    name: "APS Jobs",
    description: "Australian Public Service job listings across all federal government departments.",
    website: "https://www.apsjobs.gov.au",
    category: "Government",
    isFree: true,
  },
  {
    id: "vic-jobs",
    name: "careers.vic.gov.au",
    description: "Victorian Government job opportunities across all departments and agencies.",
    website: "https://careers.vic.gov.au",
    category: "Government",
    isFree: true,
  },
  {
    id: "nsw-jobs",
    name: "I Work for NSW",
    description: "New South Wales Government jobs including public sector roles.",
    website: "https://iworkfor.nsw.gov.au",
    category: "Government",
    isFree: true,
  },
  {
    id: "qld-jobs",
    name: "Smart Jobs Queensland",
    description: "Queensland Government employment opportunities and career pathways.",
    website: "https://smartjobs.qld.gov.au",
    category: "Government",
    isFree: true,
  },
  {
    id: "wa-jobs",
    name: "WA Government Jobs",
    description: "Western Australian Government job vacancies.",
    website: "https://www.wa.gov.au/service/human-resource-management/recruitment/find-job-the-wa-government",
    category: "Government",
    isFree: true,
  },
  {
    id: "sa-jobs",
    name: "I Work for SA",
    description: "South Australian Government employment portal.",
    website: "https://iworkfor.sa.gov.au",
    category: "Government",
    isFree: true,
  },

  // Industry-Specific
  {
    id: "ethical-jobs",
    name: "Ethical Jobs",
    description: "Jobs in not-for-profit, charity, community, and sustainable organisations.",
    website: "https://www.ethicaljobs.com.au",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "probono",
    name: "Pro Bono Australia",
    description: "Non-profit sector job listings and volunteering opportunities.",
    website: "https://probonoaustralia.niceboard.co/post",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "healthcareer",
    name: "Health Careers Victoria",
    description: "Healthcare and medical job listings in Victoria.",
    website: "https://www.health.vic.gov.au/careers",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "teach-nsw",
    name: "Teach NSW",
    description: "Teaching positions in New South Wales schools.",
    website: "https://education.nsw.gov.au/teach-nsw",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "hospitality",
    name: "Hospo World",
    description: "Hospitality and tourism jobs across Australia.",
    website: "https://www.hospoworld.com",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "spotjobs",
    name: "SpotJobs",
    description: "Part-time, casual, and entry-level positions for local workers.",
    website: "https://www.spotjobs.com",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "mining",
    name: "Mining People",
    description: "Mining, resources, and energy sector job opportunities.",
    website: "https://www.miningpeople.com.au",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "farm-work",
    name: "Agri Labour Australia",
    description: "Seasonal farm work and harvest jobs across Australia.",
    website: "https://www.agrilabour.com.au/candidates/current-positions/",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "sidekicker",
    name: "Sidekicker",
    description: "Hospitality and events staffing jobs.",
    website: "https://sidekicker.com/industries/hospitality",
    category: "Industry-Specific",
    isFree: true,
  },
  {
    id: "careers-council",
    name: "Careers at Council",
    description: "Local council and government job opportunities across Australia.",
    website: "https://www.careersatcouncil.com.au",
    category: "Government",
    isFree: true,
  },

  // Graduate
  {
    id: "gradconnection",
    name: "GradConnection",
    description: "Graduate programs, internships, and entry-level positions.",
    website: "https://au.gradconnection.com",
    category: "Graduate",
    isFree: true,
  },

  // Disability
  {
    id: "jobaccess",
    name: "JobAccess",
    description: "Information and resources for job seekers with disability.",
    website: "https://www.jobaccess.gov.au",
    category: "Disability",
    isFree: true,
  },
];

export default function JobSearch() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBoards = jobBoards.filter((board) => {
    const matchesCategory = selectedCategory === "All" || board.category === selectedCategory;
    const matchesSearch =
      board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Australian Job Search Websites
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive directory of job boards and employment websites in Australia. 
            All sites are free to use for job seekers.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search job boards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-boards"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {jobBoardCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredBoards.length} job search websites
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBoards.map((board) => (
            <Card key={board.id} className="hover-elevate">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{board.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    {board.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm">{board.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 w-full"
                  onClick={() => window.open(board.website, "_blank")}
                  data-testid={`button-visit-${board.id}`}
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Local Jobs Tip */}
        <div className="mt-8 bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Looking for local jobs?</h3>
          <p className="text-sm text-muted-foreground">
            Check your local council website for job opportunities in your area. Many councils have their own jobs boards 
            with positions that may not be listed on major job sites. Your local JobLink or LGA (Local Government Area) 
            office often maintains a local jobs board as well.
          </p>
        </div>

        {/* Tips Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Job Search Tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Set Up Job Alerts</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Most job boards let you set up email alerts for new jobs matching your criteria. 
                This way you'll be among the first to apply when new positions are posted.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apply to Multiple Sites</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Different employers use different job boards. Register on several sites to 
                maximise your exposure to available opportunities.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Keep Your Profile Updated</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Many employers search job board databases for candidates. Keep your resume 
                and profile current to improve your chances of being found.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
