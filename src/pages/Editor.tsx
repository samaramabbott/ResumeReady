import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Save, Download, 
  FileText, User, Briefcase, GraduationCap, Award, Users, Lightbulb, Type 
} from "lucide-react";
import { useSession } from "@/lib/session";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { DocumentContent, ResumeSection } from "@shared/schema";

const sectionTypes = [
  { type: 'personal', label: 'Personal Details', icon: User },
  { type: 'summary', label: 'Professional Summary', icon: Lightbulb },
  { type: 'experience', label: 'Work Experience', icon: Briefcase },
  { type: 'education', label: 'Education', icon: GraduationCap },
  { type: 'skills', label: 'Skills', icon: Award },
  { type: 'certifications', label: 'Certifications', icon: Award },
  { type: 'references', label: 'References', icon: Users },
  { type: 'custom', label: 'Custom Section', icon: FileText },
];

const templateStyles = [
  { id: 'modern-blue', name: 'Modern Blue', color: 'bg-blue-500' },
  { id: 'classic-navy', name: 'Classic Navy', color: 'bg-navy-700' },
  { id: 'minimal-gray', name: 'Minimal Gray', color: 'bg-gray-500' },
  { id: 'bold-teal', name: 'Bold Teal', color: 'bg-teal-500' },
  { id: 'elegant-burgundy', name: 'Elegant Burgundy', color: 'bg-red-800' },
  { id: 'professional-green', name: 'Professional Green', color: 'bg-green-600' },
];

const fontStyles = [
  { id: 'inter', name: 'Inter (Modern)', fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  { id: 'times', name: 'Times New Roman (Classic)', fontFamily: "'Times New Roman', Georgia, serif" },
  { id: 'arial', name: 'Arial (Clean)', fontFamily: "'Helvetica Neue', Arial, sans-serif" },
  { id: 'poppins', name: 'Poppins (Contemporary)', fontFamily: "'Poppins', 'Segoe UI', sans-serif" },
  { id: 'playfair', name: 'Playfair Display (Elegant)', fontFamily: "'Playfair Display', Georgia, serif" },
  { id: 'roboto', name: 'Roboto (Versatile)', fontFamily: "'Roboto', 'Segoe UI', sans-serif" },
  { id: 'lato', name: 'Lato (Friendly)', fontFamily: "'Lato', 'Segoe UI', sans-serif" },
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function getDefaultSections(): ResumeSection[] {
  return [
    { id: generateId(), type: 'personal', title: 'Personal Details', content: '' },
    { id: generateId(), type: 'summary', title: 'Professional Summary', content: '' },
    { id: generateId(), type: 'experience', title: 'Work Experience', content: '', items: [] },
    { id: generateId(), type: 'education', title: 'Education', content: '', items: [] },
    { id: generateId(), type: 'skills', title: 'Skills', content: '' },
  ];
}

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { sessionId } = useSession();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("Untitled Resume");
  const [sections, setSections] = useState<ResumeSection[]>(getDefaultSections());
  const [selectedTemplate, setSelectedTemplate] = useState("modern-blue");
  const [showAddSection, setShowAddSection] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedFont, setSelectedFont] = useState("inter");

  const isNew = id === "new";
  const documentType = "resume";

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
      setSections(documentData.document.content?.sections || getDefaultSections());
      setSelectedTemplate(documentData.document.templateId || "modern-blue");
    }
  }, [documentData]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const content: DocumentContent = { sections };
      
      if (isNew) {
        const res = await apiRequest("POST", "/api/documents", {
          type: documentType,
          templateId: selectedTemplate,
          title,
          content,
        });
        return res.json();
      } else {
        const res = await apiRequest("PATCH", `/api/documents/${id}`, {
          title,
          content,
          templateId: selectedTemplate,
        });
        return res.json();
      }
    },
    onSuccess: (data) => {
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
      toast({ title: "Saved", description: "Your document has been saved." });
      
      if (isNew && data.document?.id) {
        navigate(`/editor/${data.document.id}`);
      }
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save document.", variant: "destructive" });
    },
  });

  const handleSectionChange = (sectionId: string, field: string, value: any) => {
    setSections(prev => prev.map(s => 
      s.id === sectionId ? { ...s, [field]: value } : s
    ));
    setHasChanges(true);
  };

  const addSection = (type: string) => {
    const sectionInfo = sectionTypes.find(s => s.type === type);
    const newSection: ResumeSection = {
      id: generateId(),
      type: type as ResumeSection['type'],
      title: type === 'custom' ? 'Custom Section' : sectionInfo?.label || 'Section',
      content: '',
      items: ['experience', 'education', 'certifications'].includes(type) ? [] : undefined,
    };
    setSections(prev => [...prev, newSection]);
    setShowAddSection(false);
    setHasChanges(true);
  };

  const removeSection = (sectionId: string) => {
    setSections(prev => prev.filter(s => s.id !== sectionId));
    setHasChanges(true);
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === sections.length - 1)) {
      return;
    }
    
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
    setHasChanges(true);
  };

  const addItem = (sectionId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId) {
        const newItems = [...(s.items || []), {
          id: generateId(),
          title: '',
          subtitle: '',
          date: '',
          description: '',
        }];
        return { ...s, items: newItems };
      }
      return s;
    }));
    setHasChanges(true);
  };

  const updateItem = (sectionId: string, itemId: string, field: string, value: string) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId && s.items) {
        const newItems = s.items.map(item => 
          item.id === itemId ? { ...item, [field]: value } : item
        );
        return { ...s, items: newItems };
      }
      return s;
    }));
    setHasChanges(true);
  };

  const removeItem = (sectionId: string, itemId: string) => {
    setSections(prev => prev.map(s => {
      if (s.id === sectionId && s.items) {
        return { ...s, items: s.items.filter(item => item.id !== itemId) };
      }
      return s;
    }));
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
    // Generate printable version
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const template = templateStyles.find(t => t.id === selectedTemplate);
    const fontFamily = fontStyles.find(f => f.id === selectedFont)?.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600&family=Poppins:wght@400;500;600&family=Roboto:wght@400;500;600&family=Lato:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: ${fontFamily}; margin: 40px; line-height: 1.6; }
          h1 { color: #1a365d; margin-bottom: 8px; }
          h2 { color: #2d3748; border-bottom: 2px solid #4a5568; padding-bottom: 4px; margin-top: 24px; }
          h3 { color: #4a5568; margin-bottom: 4px; }
          .section { margin-bottom: 20px; }
          .item { margin-bottom: 16px; padding-left: 16px; border-left: 3px solid #e2e8f0; }
          .item-header { display: flex; justify-content: space-between; }
          .date { color: #718096; font-size: 0.9em; }
          .subtitle { color: #4a5568; font-style: italic; }
          p { margin: 8px 0; white-space: pre-wrap; }
          @media print { body { margin: 20px; } }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${sections.map(section => `
          <div class="section">
            <h2>${section.title}</h2>
            ${section.content ? `<p>${section.content}</p>` : ''}
            ${section.items?.map(item => `
              <div class="item">
                <div class="item-header">
                  <h3>${item.title || ''}</h3>
                  <span class="date">${item.date || ''}</span>
                </div>
                ${item.subtitle ? `<p class="subtitle">${item.subtitle}</p>` : ''}
                ${item.description ? `<p>${item.description}</p>` : ''}
              </div>
            `).join('') || ''}
          </div>
        `).join('')}
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
            <Input
              value={title}
              onChange={(e) => { setTitle(e.target.value); setHasChanges(true); }}
              className="max-w-xs font-medium"
              data-testid="input-document-title"
            />
            {hasChanges && (
              <Badge variant="secondary" className="text-xs">Unsaved changes</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedTemplate} onValueChange={(v) => { setSelectedTemplate(v); setHasChanges(true); }}>
              <SelectTrigger className="w-40" data-testid="select-template">
                <SelectValue placeholder="Template" />
              </SelectTrigger>
              <SelectContent>
                {templateStyles.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedFont} onValueChange={(v) => { setSelectedFont(v); setHasChanges(true); }}>
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
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
              data-testid="button-save"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            
            <Button onClick={handleExport} data-testid="button-export">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sections</h2>
              <Button variant="outline" size="sm" onClick={() => setShowAddSection(true)} data-testid="button-add-section">
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>

            {sections.map((section, index) => {
              const SectionIcon = sectionTypes.find(s => s.type === section.type)?.icon || FileText;
              
              return (
                <Card key={section.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        <SectionIcon className="h-4 w-4 text-muted-foreground" />
                        <Input
                          value={section.title}
                          onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                          className="font-medium border-none p-0 h-auto focus-visible:ring-0"
                          data-testid={`input-section-title-${section.id}`}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveSection(section.id, 'up')}
                          disabled={index === 0}
                          data-testid={`button-move-up-${section.id}`}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveSection(section.id, 'down')}
                          disabled={index === sections.length - 1}
                          data-testid={`button-move-down-${section.id}`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSection(section.id)}
                          data-testid={`button-remove-${section.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Text content for simple sections */}
                    {!section.items && (
                      <Textarea
                        value={section.content}
                        onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                        placeholder={`Enter your ${section.title.toLowerCase()}...`}
                        className="min-h-[100px]"
                        data-testid={`textarea-section-${section.id}`}
                      />
                    )}

                    {/* Items for structured sections */}
                    {section.items && (
                      <div className="space-y-4">
                        {section.items.map((item) => (
                          <div key={item.id} className="p-3 bg-muted/50 rounded-md space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={item.title || ''}
                                  onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)}
                                  placeholder="Title / Position"
                                  data-testid={`input-item-title-${item.id}`}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <Input
                                    value={item.subtitle || ''}
                                    onChange={(e) => updateItem(section.id, item.id, 'subtitle', e.target.value)}
                                    placeholder="Company / Institution"
                                    data-testid={`input-item-subtitle-${item.id}`}
                                  />
                                  <Input
                                    value={item.date || ''}
                                    onChange={(e) => updateItem(section.id, item.id, 'date', e.target.value)}
                                    placeholder="Date Range"
                                    data-testid={`input-item-date-${item.id}`}
                                  />
                                </div>
                                <Textarea
                                  value={item.description || ''}
                                  onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)}
                                  placeholder="Description"
                                  className="min-h-[80px]"
                                  data-testid={`textarea-item-desc-${item.id}`}
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(section.id, item.id)}
                                data-testid={`button-remove-item-${item.id}`}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addItem(section.id)}
                          className="w-full"
                          data-testid={`button-add-item-${section.id}`}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Entry
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-120px)]">
            <Card className="h-full overflow-auto">
              <CardHeader className="border-b">
                <CardTitle className="text-sm">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 text-sm" style={{ fontFamily: fontStyles.find(f => f.id === selectedFont)?.fontFamily }}>
                  <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                  
                  {sections.map((section) => (
                    <div key={section.id} className="border-b pb-4 last:border-0">
                      <h2 className="font-semibold text-base mb-2 text-foreground border-b border-muted pb-1">
                        {section.title}
                      </h2>
                      
                      {section.content && (
                        <p className="text-muted-foreground whitespace-pre-wrap">{section.content}</p>
                      )}
                      
                      {section.items?.map((item) => (
                        <div key={item.id} className="mb-3 pl-3 border-l-2 border-muted">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{item.title || 'Untitled'}</h3>
                              {item.subtitle && (
                                <p className="text-muted-foreground italic">{item.subtitle}</p>
                              )}
                            </div>
                            {item.date && (
                              <span className="text-xs text-muted-foreground">{item.date}</span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-muted-foreground text-xs mt-1 whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Section Dialog */}
      <Dialog open={showAddSection} onOpenChange={setShowAddSection}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Section</DialogTitle>
            <DialogDescription>Choose a section type to add to your resume.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 py-4">
            {sectionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.type}
                  variant="outline"
                  className="justify-start gap-2 h-auto py-3"
                  onClick={() => addSection(type.type)}
                  data-testid={`button-add-${type.type}`}
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Resume</DialogTitle>
            <DialogDescription>
              Your resume will open in a new window ready for printing or saving as PDF.
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
