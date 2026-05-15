import { useState, useEffect } from "react";
import { useParams, useLocation, useSearch } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Save, Download, Mail, Type } from "lucide-react";
import { useSession } from "@/lib/session";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { themes, layouts } from "@/templates/config";
import type { DocumentContent } from "@shared/schema";

const templateStyles = themes.map(t => ({ id: t.id, name: t.name }));

const fontStyles = [
  { id: 'inter', name: 'Inter (Modern)', fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  { id: 'times', name: 'Times New Roman (Classic)', fontFamily: "'Times New Roman', Georgia, serif" },
  { id: 'arial', name: 'Arial (Clean)', fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  { id: 'poppins', name: 'Poppins (Contemporary)', fontFamily: "'Poppins', 'Segoe UI', sans-serif" },
  { id: 'playfair', name: 'Playfair Display (Elegant)', fontFamily: "'Playfair Display', Georgia, serif" },
  { id: 'source-sans', name: 'Source Sans Pro (Professional)', fontFamily: "'Source Sans Pro', 'Segoe UI', sans-serif" },
  { id: 'roboto', name: 'Roboto (Versatile)', fontFamily: "'Roboto', 'Segoe UI', sans-serif" },
  { id: 'lato', name: 'Lato (Friendly)', fontFamily: "'Lato', 'Segoe UI', sans-serif" },
];

function getTemplateColors(themeId: string) {
  const theme = themes.find(t => t.id === themeId);
  if (!theme) {
    const defaultTheme = themes[0];
    return {
      primaryColor: defaultTheme.primary,
      secondaryColor: defaultTheme.accent,
      accentColor: defaultTheme.primaryLight,
    };
  }
  return {
    primaryColor: theme.primary,
    secondaryColor: theme.accent,
    accentColor: theme.primaryLight,
  };
}

function getFontFamily(fontId: string) {
  const font = fontStyles.find(f => f.id === fontId);
  return font?.fontFamily || fontStyles[0].fontFamily;
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

interface CoverLetterContent {
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  jobTitle: string;
  date: string;
  greeting: string;
  opening: string;
  body: string;
  closing: string;
  signature: string;
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  yourAddress: string;
}

function getDefaultContent(): CoverLetterContent {
  return {
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    companyAddress: '',
    jobTitle: '',
    date: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }),
    greeting: 'Dear Hiring Manager,',
    opening: '',
    body: '',
    closing: 'I would welcome the opportunity to discuss how my skills and experience align with your needs. Thank you for considering my application.',
    signature: 'Kind regards,',
    yourName: '',
    yourEmail: '',
    yourPhone: '',
    yourAddress: '',
  };
}

function parseTemplateFromUrl(templateId: string | null): { layoutId: string; themeId: string } {
  if (!templateId) return { layoutId: "single-column", themeId: themes[0].id };
  const parts = templateId.split("-");
  const layoutIds = layouts.map(l => l.id);
  const themeIds = themes.map(t => t.id);
  let foundLayoutId = "single-column";
  let foundThemeId = themes[0].id;
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

export default function CoverLetterEditor() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const urlTemplate = params.get("template");
  const { sessionId } = useSession();
  const { toast } = useToast();
  
  const initialTemplate = parseTemplateFromUrl(urlTemplate);
  const [title, setTitle] = useState("Untitled Cover Letter");
  const [content, setContent] = useState<CoverLetterContent>(getDefaultContent());
  const [selectedLayout, setSelectedLayout] = useState(initialTemplate.layoutId);
  const [selectedTheme, setSelectedTheme] = useState(initialTemplate.themeId);
  const [selectedFont, setSelectedFont] = useState("inter");
  const [hasChanges, setHasChanges] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const isNew = id === "new";

  // Fetch existing document
  const { data: documentData, isLoading } = useQuery<{ document: any }>({
    queryKey: ['/api/documents', id],
    enabled: !isNew && !!id,
  });

  // Fetch active purchase
  const { data: purchaseData } = useQuery({
    queryKey: ['/api/purchases/active'],
    queryFn: async () => {
      const res = await fetch('/api/purchases/active', {
        headers: { 'x-session-id': sessionId || '' }
      });
      return res.json();
    },
    enabled: !!sessionId,
  });

  const hasActivePurchase = !!purchaseData?.purchase;

  useEffect(() => {
    if (documentData?.document) {
      setTitle(documentData.document.title);
      const docContent = documentData.document.content as any;
      if (docContent?.coverLetter) {
        setContent(docContent.coverLetter);
      }
      const parsed = parseTemplateFromUrl(documentData.document.templateId);
      setSelectedLayout(parsed.layoutId);
      setSelectedTheme(parsed.themeId);
    }
  }, [documentData]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const docContent: DocumentContent = { 
        sections: [],
        coverLetter: content as any,
      } as any;
      
      const fullTemplateId = `cover-letter-${selectedLayout}-${selectedTheme}`;
      if (isNew) {
        const res = await apiRequest("POST", "/api/documents", {
          type: 'cover-letter',
          templateId: fullTemplateId,
          title,
          content: docContent,
        });
        return res.json();
      } else {
        const res = await apiRequest("PATCH", `/api/documents/${id}`, {
          title,
          content: docContent,
          templateId: fullTemplateId,
        });
        return res.json();
      }
    },
    onSuccess: (data) => {
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({ title: "Saved", description: "Your cover letter has been saved." });
      
      if (isNew && data.document?.id) {
        navigate(`/cover-letter/${data.document.id}`);
      }
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save document.", variant: "destructive" });
    },
  });

  const handleChange = (field: keyof CoverLetterContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleExport = () => {
    if (!hasActivePurchase) {
      navigate('/pricing');
      return;
    }
    setShowExportDialog(true);
  };

  const performExport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const colors = getTemplateColors(selectedTheme);
    const fontFamily = getFontFamily(selectedFont);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600&family=Poppins:wght@400;500;600&family=Source+Sans+Pro:wght@400;600&family=Roboto:wght@400;500;600&family=Lato:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { 
            font-family: ${fontFamily}; 
            margin: 60px; 
            line-height: 1.8; 
            max-width: 700px; 
            color: #1f2937;
          }
          .header { margin-bottom: 30px; }
          .sender-info { 
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid ${colors.primaryColor};
          }
          .sender-info strong {
            color: ${colors.primaryColor};
            font-size: 1.2em;
          }
          .sender-info .contact {
            color: ${colors.secondaryColor};
            font-size: 0.9em;
          }
          .recipient-info { margin-bottom: 20px; }
          .date { 
            margin-bottom: 20px;
            color: ${colors.secondaryColor};
          }
          .greeting { 
            margin-bottom: 15px;
            color: ${colors.primaryColor};
            font-weight: 500;
          }
          .body-text { margin-bottom: 15px; white-space: pre-wrap; }
          .closing { margin-bottom: 30px; }
          .signature { 
            margin-bottom: 5px;
            color: ${colors.secondaryColor};
          }
          .name { 
            font-weight: bold;
            color: ${colors.primaryColor};
          }
          .job-ref {
            margin-bottom: 15px;
            font-weight: 500;
            color: ${colors.primaryColor};
            padding: 8px 12px;
            background-color: ${colors.accentColor};
            display: inline-block;
            border-radius: 4px;
          }
          @media print { 
            body { margin: 40px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="sender-info">
            <strong>${content.yourName}</strong><br>
            <span class="contact">
              ${content.yourAddress ? content.yourAddress + '<br>' : ''}
              ${[content.yourEmail, content.yourPhone].filter(Boolean).join(' | ')}
            </span>
          </div>
          <div class="date">${content.date}</div>
          <div class="recipient-info">
            ${content.recipientName ? content.recipientName + '<br>' : ''}
            ${content.recipientTitle ? content.recipientTitle + '<br>' : ''}
            ${content.companyName}<br>
            ${content.companyAddress}
          </div>
          ${content.jobTitle ? `<div class="job-ref">Re: Application for ${content.jobTitle}</div>` : ''}
        </div>
        <div class="greeting">${content.greeting}</div>
        <div class="body-text">${content.opening}</div>
        <div class="body-text">${content.body}</div>
        <div class="body-text">${content.closing}</div>
        <div class="closing">${content.signature}</div>
        <div class="name">${content.yourName}</div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
    setShowExportDialog(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <Input
              value={title}
              onChange={(e) => { setTitle(e.target.value); setHasChanges(true); }}
              className="max-w-xs font-medium"
              data-testid="input-cover-letter-title"
            />
            {hasChanges && (
              <Badge variant="secondary" className="text-xs">Unsaved changes</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedLayout} onValueChange={(v) => { setSelectedLayout(v); setHasChanges(true); }}>
              <SelectTrigger className="w-36" data-testid="select-layout">
                <SelectValue placeholder="Layout" />
              </SelectTrigger>
              <SelectContent>
                {layouts.map(l => (
                  <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTheme} onValueChange={(v) => { setSelectedTheme(v); setHasChanges(true); }}>
              <SelectTrigger className="w-40" data-testid="select-template">
                <SelectValue placeholder="Color Theme" />
              </SelectTrigger>
              <SelectContent>
                {templateStyles.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedFont} onValueChange={(v) => { setSelectedFont(v); setHasChanges(true); }}>
              <SelectTrigger className="w-52" data-testid="select-font">
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
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
              data-testid="button-save"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={content.yourName}
                  onChange={(e) => handleChange('yourName', e.target.value)}
                  placeholder="Your Full Name"
                  data-testid="input-your-name"
                />
                <Input
                  value={content.yourEmail}
                  onChange={(e) => handleChange('yourEmail', e.target.value)}
                  placeholder="Your Email"
                  data-testid="input-your-email"
                />
                <Input
                  value={content.yourPhone}
                  onChange={(e) => handleChange('yourPhone', e.target.value)}
                  placeholder="Your Phone"
                  data-testid="input-your-phone"
                />
                <Input
                  value={content.yourAddress}
                  onChange={(e) => handleChange('yourAddress', e.target.value)}
                  placeholder="Your Address (optional)"
                  data-testid="input-your-address"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recipient Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={content.recipientName}
                  onChange={(e) => handleChange('recipientName', e.target.value)}
                  placeholder="Hiring Manager Name (if known)"
                  data-testid="input-recipient-name"
                />
                <Input
                  value={content.recipientTitle}
                  onChange={(e) => handleChange('recipientTitle', e.target.value)}
                  placeholder="Their Title (e.g., HR Manager)"
                  data-testid="input-recipient-title"
                />
                <Input
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  placeholder="Company Name"
                  data-testid="input-company-name"
                />
                <Input
                  value={content.companyAddress}
                  onChange={(e) => handleChange('companyAddress', e.target.value)}
                  placeholder="Company Address"
                  data-testid="input-company-address"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Position Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={content.jobTitle}
                  onChange={(e) => handleChange('jobTitle', e.target.value)}
                  placeholder="Job Title You're Applying For (e.g., Marketing Manager)"
                  data-testid="input-job-title"
                />
                <Input
                  value={content.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  placeholder="Date"
                  data-testid="input-date"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Letter Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={content.greeting}
                  onChange={(e) => handleChange('greeting', e.target.value)}
                  placeholder="Greeting (e.g., Dear Hiring Manager,)"
                  data-testid="input-greeting"
                />
                <Textarea
                  value={content.opening}
                  onChange={(e) => handleChange('opening', e.target.value)}
                  placeholder="Opening paragraph - Why you're writing and what position you're applying for"
                  className="min-h-[100px]"
                  data-testid="textarea-opening"
                />
                <Textarea
                  value={content.body}
                  onChange={(e) => handleChange('body', e.target.value)}
                  placeholder="Body paragraphs - Your relevant skills, experience, and why you're a great fit"
                  className="min-h-[200px]"
                  data-testid="textarea-body"
                />
                <Textarea
                  value={content.closing}
                  onChange={(e) => handleChange('closing', e.target.value)}
                  placeholder="Closing paragraph - Call to action and thank you"
                  className="min-h-[80px]"
                  data-testid="textarea-closing"
                />
                <Input
                  value={content.signature}
                  onChange={(e) => handleChange('signature', e.target.value)}
                  placeholder="Signature line (e.g., Kind regards,)"
                  data-testid="input-signature"
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-120px)]">
            <Card className="h-full overflow-auto">
              <CardHeader className="border-b">
                <CardTitle className="text-sm">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {(() => {
                  const previewColors = getTemplateColors(selectedTheme);
                  const previewFont = getFontFamily(selectedFont);
                  return (
                    <div className="space-y-4 text-sm leading-relaxed" style={{ fontFamily: previewFont }}>
                      {/* Sender Info */}
                      <div className="mb-6 pb-3" style={{ borderBottom: `2px solid ${previewColors.primaryColor}` }}>
                        {content.yourName && (
                          <div className="font-semibold text-base" style={{ color: previewColors.primaryColor }}>
                            {content.yourName}
                          </div>
                        )}
                        <div style={{ color: previewColors.secondaryColor }} className="text-xs">
                          {content.yourAddress && <div>{content.yourAddress}</div>}
                          {[content.yourEmail, content.yourPhone].filter(Boolean).join(' | ')}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="mb-4" style={{ color: previewColors.secondaryColor }}>{content.date}</div>

                      {/* Recipient Info */}
                      <div className="mb-6">
                        {content.recipientName && <div>{content.recipientName}</div>}
                        {content.recipientTitle && <div>{content.recipientTitle}</div>}
                        {content.companyName && <div>{content.companyName}</div>}
                        {content.companyAddress && <div className="text-muted-foreground">{content.companyAddress}</div>}
                      </div>

                      {/* Job Title */}
                      {content.jobTitle && (
                        <div 
                          className="mb-4 font-medium inline-block px-2 py-1 rounded"
                          style={{ color: previewColors.primaryColor, backgroundColor: previewColors.accentColor }}
                        >
                          Re: Application for {content.jobTitle}
                        </div>
                      )}

                      {/* Letter Body */}
                      <div className="mb-4 font-medium" style={{ color: previewColors.primaryColor }}>{content.greeting}</div>
                      {content.opening && <p className="whitespace-pre-wrap mb-4">{content.opening}</p>}
                      {content.body && <p className="whitespace-pre-wrap mb-4">{content.body}</p>}
                      {content.closing && <p className="whitespace-pre-wrap mb-6">{content.closing}</p>}
                      
                      {/* Signature */}
                      <div className="mb-1" style={{ color: previewColors.secondaryColor }}>{content.signature}</div>
                      <div className="font-semibold" style={{ color: previewColors.primaryColor }}>{content.yourName}</div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Cover Letter</DialogTitle>
            <DialogDescription>
              Your cover letter will open in a new window ready for printing or saving as PDF.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>Cancel</Button>
            <Button onClick={performExport} data-testid="button-confirm-export">
              <Download className="h-4 w-4 mr-2" />
              Export Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
