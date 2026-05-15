import { useState, useRef, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Plus, Trash2, ArrowLeft, Loader2, Save, AlertCircle, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getLayoutComponent, type LayoutProps } from "@/templates/layouts";
import { themes, layouts, type TemplateTheme } from "@/templates/config";
import { useSession } from "@/lib/session";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ResumeData, Document } from "@shared/schema";

const fontStyles = [
  { id: 'default', name: 'Use Theme Font', fontFamily: '' },
  { id: 'inter', name: 'Inter (Modern)', fontFamily: "'Inter', sans-serif" },
  { id: 'times', name: 'Times New Roman (Classic)', fontFamily: "'Times New Roman', Georgia, serif" },
  { id: 'arial', name: 'Arial (Clean)', fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  { id: 'poppins', name: 'Poppins (Contemporary)', fontFamily: "'Poppins', sans-serif" },
  { id: 'playfair', name: 'Playfair Display (Elegant)', fontFamily: "'Playfair Display', Georgia, serif" },
  { id: 'roboto', name: 'Roboto (Versatile)', fontFamily: "'Roboto', sans-serif" },
  { id: 'lato', name: 'Lato (Friendly)', fontFamily: "'Lato', sans-serif" },
  { id: 'montserrat', name: 'Montserrat (Bold)', fontFamily: "'Montserrat', sans-serif" },
];

function parseTemplateId(templateId: string): { layoutId: string; themeId: string } {
  const parts = templateId.split("-");
  
  const layoutIds = layouts.map(l => l.id);
  const themeIds = themes.map(t => t.id);
  
  let foundLayoutId = "single-column";
  let foundThemeId = "blue";
  
  for (const layout of layoutIds) {
    const layoutParts = layout.split("-");
    for (let i = 1; i <= parts.length - layoutParts.length; i++) {
      const potentialLayout = parts.slice(i, i + layoutParts.length).join("-");
      if (potentialLayout === layout) {
        foundLayoutId = layout;
        break;
      }
    }
  }
  
  for (const theme of themeIds) {
    if (parts.includes(theme)) {
      foundThemeId = theme;
      break;
    }
  }
  
  return { layoutId: foundLayoutId, themeId: foundThemeId };
}

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const defaultResumeData: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  referees: [],
};

export default function ResumeBuilder() {
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const templateId = params.get("template") || "resume-single-column-blue";
  const documentId = params.get("id");
  const { toast } = useToast();
  const { sessionId } = useSession();
  
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeTab, setActiveTab] = useState("personal");
  const [isExporting, setIsExporting] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [savedDocumentId, setSavedDocumentId] = useState<string | null>(documentId);
  const [creditError, setCreditError] = useState<{ code: string; message: string } | null>(null);
  const [selectedFont, setSelectedFont] = useState("default");
  const previewRef = useRef<HTMLDivElement>(null);

  const { layoutId, themeId } = parseTemplateId(templateId);

  const { data: purchaseData } = useQuery<{ purchase: { resumeCredits: number; expiresAt: string } | null }>({
    queryKey: ['/api/purchases/active'],
    enabled: !!sessionId,
  });

  const { data: documentData } = useQuery<{ document: Document }>({
    queryKey: ['/api/documents', documentId],
    enabled: !!documentId && !!sessionId,
  });

  useEffect(() => {
    if (documentData?.document?.content) {
      const content = documentData.document.content as unknown as ResumeData;
      setResumeData(content);
    }
  }, [documentData]);

  const saveMutation = useMutation({
    mutationFn: async (data: { isNew: boolean; resumeData: ResumeData }) => {
      if (!sessionId) throw new Error("No session");
      
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "x-session-id": sessionId,
      };

      if (data.isNew) {
        const res = await fetch("/api/documents", {
          method: "POST",
          headers,
          body: JSON.stringify({
            type: "resume",
            templateId,
            title: data.resumeData.name ? `${data.resumeData.name}'s Resume` : "Untitled Resume",
            content: data.resumeData,
          }),
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw { status: res.status, ...errorData };
        }
        return res.json();
      } else {
        const res = await fetch(`/api/documents/${savedDocumentId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            title: data.resumeData.name ? `${data.resumeData.name}'s Resume` : "Untitled Resume",
            content: data.resumeData,
            templateId,
          }),
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw { status: res.status, ...errorData };
        }
        return res.json();
      }
    },
    onSuccess: (result) => {
      setCreditError(null);
      if (result.document?.id) {
        setSavedDocumentId(result.document.id);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/purchases/active'] });
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      
      const creditsMsg = result.creditsRemaining !== undefined 
        ? result.creditsRemaining === -1 
          ? " (Unlimited credits remaining)"
          : ` (${result.creditsRemaining} credits remaining)`
        : "";
      
      toast({
        title: "Resume saved",
        description: `Your resume has been saved successfully.${creditsMsg}`,
      });
    },
    onError: (error: any) => {
      if (error.code === "NO_CREDITS" || error.code === "EXPIRED") {
        setCreditError({ code: error.code, message: error.message });
      } else {
        toast({
          title: "Save failed",
          description: error.message || "There was an error saving your resume.",
          variant: "destructive",
        });
      }
    },
  });

  const handleSave = () => {
    const isNew = !savedDocumentId;
    saveMutation.mutate({ isNew, resumeData });
  };

  const hasCredits = purchaseData?.purchase 
    ? (purchaseData.purchase.resumeCredits === -1 || purchaseData.purchase.resumeCredits > 0) 
      && new Date(purchaseData.purchase.expiresAt) > new Date()
    : false;
  
  const theme = themes.find((t: TemplateTheme) => t.id === themeId) || themes[0];
  const LayoutComponent = getLayoutComponent(layoutId);

  const updatePersonal = (field: keyof ResumeData, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: generateId(), title: "", company: "", date: "" }],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: generateId(), degree: "", school: "", year: "" }],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: generateId(), name: "", issuer: "", year: "" }],
    }));
  };

  const updateCertification = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id),
    }));
  };

  const addLanguage = () => {
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: generateId(), language: "", proficiency: "" }],
    }));
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id),
    }));
  };

  const addReferee = () => {
    setResumeData(prev => ({
      ...prev,
      referees: [...prev.referees, { id: generateId(), name: "", title: "", company: "", phone: "", email: "" }],
    }));
  };

  const updateReferee = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      referees: prev.referees.map(ref => 
        ref.id === id ? { ...ref, [field]: value } : ref
      ),
    }));
  };

  const removeReferee = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      referees: prev.referees.filter(ref => ref.id !== id),
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const getPreviewData = (): LayoutProps["data"] => {
    const firstEducation = resumeData.education[0];
    return {
      name: resumeData.name || "Your Name",
      title: resumeData.title || "Your Title",
      email: resumeData.email || "email@example.com",
      phone: resumeData.phone || "+61 400 000 000",
      location: resumeData.location || "Sydney, Australia",
      linkedin: resumeData.linkedin,
      portfolio: resumeData.portfolio,
      summary: resumeData.summary || "Your professional summary will appear here. Describe your experience, skills, and career goals.",
      experience: resumeData.experience.length > 0 
        ? resumeData.experience.map(exp => ({
            title: exp.title || "Position",
            company: exp.company || "Company",
            date: exp.date || "Date",
          }))
        : [
            { title: "Senior Developer", company: "Tech Company", date: "2020 - Present" },
            { title: "Developer", company: "Startup Inc", date: "2018 - 2020" },
          ],
      education: resumeData.education.length > 0
        ? resumeData.education.map(edu => ({
            degree: edu.degree || "Degree",
            school: edu.school || "Institution",
            year: edu.year || "Year",
          }))
        : [{ degree: "Bachelor of Science", school: "University Name", year: "2018" }],
      skills: resumeData.skills.length > 0 
        ? resumeData.skills 
        : ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
      certifications: resumeData.certifications.length > 0
        ? resumeData.certifications.map(cert => ({
            name: cert.name || "Certification",
            issuer: cert.issuer || "Issuer",
            year: cert.year || "Year",
          }))
        : [],
      languages: resumeData.languages.length > 0
        ? resumeData.languages.map(lang => ({
            language: lang.language || "Language",
            proficiency: lang.proficiency || "Proficiency",
          }))
        : [],
      referees: resumeData.referees.length > 0
        ? resumeData.referees.map(ref => ({
            name: ref.name || "Name",
            title: ref.title || "Title",
            company: ref.company || "Company",
            phone: ref.phone || "Phone",
            email: ref.email || "Email",
          }))
        : [],
    };
  };

  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    const isComplete = resumeData.name && resumeData.title && resumeData.email;
    if (!isComplete) {
      toast({
        title: "Please fill in required fields",
        description: "Name, title, and email are required to export your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const previewElement = previewRef.current.querySelector('[data-pdf-content]') as HTMLElement;
      if (!previewElement) {
        throw new Error("Preview element not found");
      }

      const originalTransform = previewElement.style.transform;
      const originalTransformOrigin = previewElement.style.transformOrigin;
      previewElement.style.transform = 'none';
      previewElement.style.transformOrigin = 'top left';

      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      previewElement.style.transform = originalTransform;
      previewElement.style.transformOrigin = originalTransformOrigin;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`);

      toast({
        title: "Resume downloaded",
        description: "Your resume has been saved as a PDF.",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/templates")} data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Resume Builder</h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedFont} onValueChange={setSelectedFont}>
              <SelectTrigger className="w-48" data-testid="select-font">
                <Type className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Font Style" />
              </SelectTrigger>
              <SelectContent>
                {fontStyles.map(f => (
                  <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={handleSave} 
              disabled={saveMutation.isPending || (!hasCredits && !savedDocumentId)}
              data-testid="button-save"
            >
              {saveMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {savedDocumentId ? "Save Changes" : "Save Draft"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {creditError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between gap-4 flex-wrap">
              <span>{creditError.message}</span>
              <Button variant="outline" size="sm" onClick={() => navigate("/pricing")} data-testid="button-go-to-pricing">
                View Plans
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {!hasCredits && !savedDocumentId && !creditError && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between gap-4 flex-wrap">
              <span>You need to purchase a plan to save your resume. You can still edit and preview your resume.</span>
              <Button variant="outline" size="sm" onClick={() => navigate("/pricing")} data-testid="button-get-plan">
                Get a Plan
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex flex-wrap gap-1 h-auto p-1">
                <TabsTrigger value="personal" data-testid="tab-personal">Personal</TabsTrigger>
                <TabsTrigger value="experience" data-testid="tab-experience">Experience</TabsTrigger>
                <TabsTrigger value="education" data-testid="tab-education">Education</TabsTrigger>
                <TabsTrigger value="skills" data-testid="tab-skills">Skills</TabsTrigger>
                <TabsTrigger value="certifications" data-testid="tab-certifications">Certifications</TabsTrigger>
                <TabsTrigger value="languages" data-testid="tab-languages">Languages</TabsTrigger>
                <TabsTrigger value="referees" data-testid="tab-referees">Referees</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={resumeData.name}
                          onChange={(e) => updatePersonal("name", e.target.value)}
                          placeholder="John Smith"
                          data-testid="input-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                          id="title"
                          value={resumeData.title}
                          onChange={(e) => updatePersonal("title", e.target.value)}
                          placeholder="Software Engineer"
                          data-testid="input-title"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.email}
                          onChange={(e) => updatePersonal("email", e.target.value)}
                          placeholder="john@example.com"
                          data-testid="input-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.phone}
                          onChange={(e) => updatePersonal("phone", e.target.value)}
                          placeholder="+61 400 000 000"
                          data-testid="input-phone"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.location}
                        onChange={(e) => updatePersonal("location", e.target.value)}
                        placeholder="Sydney, Australia"
                        data-testid="input-location"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn (optional)</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.linkedin || ""}
                          onChange={(e) => updatePersonal("linkedin", e.target.value)}
                          placeholder="au.linkedin.com/in/yourprofile"
                          data-testid="input-linkedin"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio/Website (optional)</Label>
                        <Input
                          id="portfolio"
                          value={resumeData.portfolio || ""}
                          onChange={(e) => updatePersonal("portfolio", e.target.value)}
                          placeholder="yourwebsite.com"
                          data-testid="input-portfolio"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.summary}
                        onChange={(e) => updatePersonal("summary", e.target.value)}
                        placeholder="Write a brief summary of your professional background..."
                        className="min-h-[120px]"
                        data-testid="textarea-summary"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                    <CardTitle className="text-base">Work Experience</CardTitle>
                    <Button variant="outline" size="sm" onClick={addExperience} data-testid="button-add-experience">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.experience.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        No experience added yet. Click "Add" to get started.
                      </p>
                    ) : (
                      resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className="p-4 border rounded-md space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-muted-foreground">Position {index + 1}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeExperience(exp.id)}
                              data-testid={`button-remove-exp-${index}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              value={exp.title}
                              onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                              placeholder="Job Title"
                              data-testid={`input-exp-title-${index}`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="Company Name"
                              data-testid={`input-exp-company-${index}`}
                            />
                            <Input
                              value={exp.date}
                              onChange={(e) => updateExperience(exp.id, "date", e.target.value)}
                              placeholder="2020 - Present"
                              data-testid={`input-exp-date-${index}`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                    <CardTitle className="text-base">Education</CardTitle>
                    <Button variant="outline" size="sm" onClick={addEducation} data-testid="button-add-education">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.education.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        No education added yet. Click "Add" to get started.
                      </p>
                    ) : (
                      resumeData.education.map((edu, index) => (
                        <div key={edu.id} className="p-4 border rounded-md space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-muted-foreground">Qualification {index + 1}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeEducation(edu.id)}
                              data-testid={`button-remove-edu-${index}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              placeholder="Degree / Qualification"
                              data-testid={`input-edu-degree-${index}`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={edu.school}
                              onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                              placeholder="Institution"
                              data-testid={`input-edu-school-${index}`}
                            />
                            <Input
                              value={edu.year}
                              onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                              placeholder="Year"
                              data-testid={`input-edu-year-${index}`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Enter a skill..."
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        data-testid="input-skill"
                      />
                      <Button variant="outline" onClick={addSkill} data-testid="button-add-skill">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {resumeData.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-muted rounded-md"
                          >
                            <span className="text-sm">{skill}</span>
                            <button
                              onClick={() => removeSkill(index)}
                              className="text-muted-foreground hover:text-destructive"
                              data-testid={`button-remove-skill-${index}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        No skills added yet. Type a skill and press Enter or click +.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                    <CardTitle className="text-base">Certifications & Licenses</CardTitle>
                    <Button variant="outline" size="sm" onClick={addCertification} data-testid="button-add-certification">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.certifications.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        No certifications added yet. Click "Add" to get started.
                      </p>
                    ) : (
                      resumeData.certifications.map((cert, index) => (
                        <div key={cert.id} className="p-4 border rounded-md space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-muted-foreground">Certification {index + 1}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCertification(cert.id)}
                              data-testid={`button-remove-cert-${index}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              value={cert.name}
                              onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                              placeholder="Certification Name"
                              data-testid={`input-cert-name-${index}`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={cert.issuer}
                              onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                              placeholder="Issuing Organization"
                              data-testid={`input-cert-issuer-${index}`}
                            />
                            <Input
                              value={cert.year}
                              onChange={(e) => updateCertification(cert.id, "year", e.target.value)}
                              placeholder="Year"
                              data-testid={`input-cert-year-${index}`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="languages" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                    <CardTitle className="text-base">Languages</CardTitle>
                    <Button variant="outline" size="sm" onClick={addLanguage} data-testid="button-add-language">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.languages.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        No languages added yet. Click "Add" to get started.
                      </p>
                    ) : (
                      resumeData.languages.map((lang, index) => (
                        <div key={lang.id} className="p-4 border rounded-md space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-muted-foreground">Language {index + 1}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeLanguage(lang.id)}
                              data-testid={`button-remove-lang-${index}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={lang.language}
                              onChange={(e) => updateLanguage(lang.id, "language", e.target.value)}
                              placeholder="Language"
                              data-testid={`input-lang-name-${index}`}
                            />
                            <Select
                              value={lang.proficiency}
                              onValueChange={(value) => updateLanguage(lang.id, "proficiency", value)}
                            >
                              <SelectTrigger data-testid={`select-lang-proficiency-${index}`}>
                                <SelectValue placeholder="Proficiency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Native">Native</SelectItem>
                                <SelectItem value="Fluent">Fluent</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Basic">Basic</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="referees" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                    <CardTitle className="text-base">Referees</CardTitle>
                    <Button variant="outline" size="sm" onClick={addReferee} data-testid="button-add-referee">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.referees.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        No referees added yet. Click "Add" to get started.
                      </p>
                    ) : (
                      resumeData.referees.map((ref, index) => (
                        <div key={ref.id} className="p-4 border rounded-md space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-muted-foreground">Referee {index + 1}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeReferee(ref.id)}
                              data-testid={`button-remove-ref-${index}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={ref.name}
                              onChange={(e) => updateReferee(ref.id, "name", e.target.value)}
                              placeholder="Full Name"
                              data-testid={`input-ref-name-${index}`}
                            />
                            <Input
                              value={ref.title}
                              onChange={(e) => updateReferee(ref.id, "title", e.target.value)}
                              placeholder="Job Title"
                              data-testid={`input-ref-title-${index}`}
                            />
                          </div>
                          <Input
                            value={ref.company}
                            onChange={(e) => updateReferee(ref.id, "company", e.target.value)}
                            placeholder="Company/Organization"
                            data-testid={`input-ref-company-${index}`}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              value={ref.phone}
                              onChange={(e) => updateReferee(ref.id, "phone", e.target.value)}
                              placeholder="Phone Number"
                              data-testid={`input-ref-phone-${index}`}
                            />
                            <Input
                              value={ref.email}
                              onChange={(e) => updateReferee(ref.id, "email", e.target.value)}
                              placeholder="Email Address"
                              data-testid={`input-ref-email-${index}`}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-120px)]" ref={previewRef}>
            <Card className="h-full overflow-hidden">
              <CardHeader className="border-b py-2">
                <CardTitle className="text-sm">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden bg-muted">
                <div className="w-full h-full flex items-start justify-center p-4 overflow-auto">
                  <div 
                    className="bg-white shadow-lg" 
                    style={{ width: "100%", maxWidth: "400px", aspectRatio: `${A4_WIDTH_PX}/${A4_HEIGHT_PX}` }}
                  >
                    <div 
                      data-pdf-content 
                      style={{ 
                        width: `${A4_WIDTH_PX}px`, 
                        height: `${A4_HEIGHT_PX}px`,
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                      }}
                    >
                      <div 
                        className="w-full h-full" 
                        style={{ 
                          backgroundColor: theme.background,
                        }}
                      >
                        <LayoutComponent 
                          theme={theme} 
                          data={getPreviewData()} 
                          noViewport 
                          customFont={selectedFont !== 'default' ? fontStyles.find(f => f.id === selectedFont)?.fontFamily : undefined}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
