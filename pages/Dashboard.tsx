import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Mail, Plus, Clock, Download, Trash2 } from "lucide-react";
import { useSession } from "@/lib/session";
import { format } from "date-fns";
import type { Document, Purchase } from "@shared/schema";

export default function Dashboard() {
  const { sessionId } = useSession();

  const { data: documentsData, isLoading: docsLoading } = useQuery({
    queryKey: ['/api/documents'],
    queryFn: async () => {
      const res = await fetch('/api/documents', {
        headers: { 'x-session-id': sessionId || '' }
      });
      return res.json();
    },
    enabled: !!sessionId,
  });

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

  const documents: Document[] = documentsData?.documents || [];
  const activePurchase: Purchase | null = purchaseData?.purchase || null;

  const resumes = documents.filter(d => d.type === 'resume');
  const coverLetters = documents.filter(d => d.type === 'cover-letter');

  const getCreditsDisplay = (credits: number) => {
    if (credits === -1) return 'Unlimited';
    return credits.toString();
  };

  return (
    <div className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
          <p className="mt-2 text-muted-foreground">
            Create and manage your resumes and cover letters
          </p>
        </div>

        {/* Active Plan */}
        {activePurchase ? (
          <Card className="mb-8 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="text-lg">Your Active Plan</CardTitle>
                  <CardDescription>
                    {activePurchase.planType === 'single' && 'Single Resume'}
                    {activePurchase.planType === 'pack5' && '5 Resume Pack'}
                    {activePurchase.planType === 'pack10' && '10+ Resume Pack'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{getCreditsDisplay(activePurchase.resumeCredits)}</div>
                    <div className="text-muted-foreground">Resumes left</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{getCreditsDisplay(activePurchase.coverLetterCredits)}</div>
                    <div className="text-muted-foreground">Cover letters left</div>
                  </div>
                  <div className="text-center flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Expires {format(new Date(activePurchase.expiresAt), 'dd MMM yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ) : (
          <Card className="mb-8 bg-muted/50">
            <CardContent className="py-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-semibold">No Active Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    Purchase a plan to create and download professional resumes
                  </p>
                </div>
                <Button asChild>
                  <Link href="/pricing" data-testid="link-get-started">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <Card className="hover-elevate">
            <Link href="/templates?type=resume">
              <CardContent className="flex items-center gap-4 py-6 cursor-pointer" data-testid="card-new-resume">
                <div className="p-3 bg-primary/10 rounded-md">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">New Resume</h3>
                  <p className="text-sm text-muted-foreground">Choose a template and create your resume</p>
                </div>
                <Plus className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Link>
          </Card>
          
          <Card className="hover-elevate">
            <Link href="/templates?type=cover-letter">
              <CardContent className="flex items-center gap-4 py-6 cursor-pointer" data-testid="card-new-cover-letter">
                <div className="p-3 bg-primary/10 rounded-md">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">New Cover Letter</h3>
                  <p className="text-sm text-muted-foreground">Choose a template and write your letter</p>
                </div>
                <Plus className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Documents List */}
        <div className="space-y-8">
          {/* Resumes */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resumes ({resumes.length})
            </h2>
            {resumes.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No resumes yet. Create your first resume to get started.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resumes.map((doc) => (
                  <Card key={doc.id} className="hover-elevate">
                    <Link href={`/editor/${doc.id}`}>
                      <CardContent className="py-4 cursor-pointer">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{doc.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Updated {format(new Date(doc.updatedAt!), 'dd MMM yyyy')}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {doc.templateId || 'No template'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Cover Letters */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Cover Letters ({coverLetters.length})
            </h2>
            {coverLetters.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No cover letters yet. Create one to accompany your resume.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {coverLetters.map((doc) => (
                  <Card key={doc.id} className="hover-elevate">
                    <Link href={`/cover-letter/${doc.id}`}>
                      <CardContent className="py-4 cursor-pointer">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{doc.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Updated {format(new Date(doc.updatedAt!), 'dd MMM yyyy')}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {doc.templateId || 'No template'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
