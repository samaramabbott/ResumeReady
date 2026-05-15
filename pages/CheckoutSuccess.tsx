import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, FileText, Mail } from "lucide-react";
import { useSession } from "@/lib/session";
import { apiRequest } from "@/lib/queryClient";

export default function CheckoutSuccess() {
  const search = useSearch();
  const { sessionId } = useSession();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const searchParams = new URLSearchParams(search);
  const checkoutSessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!checkoutSessionId || !sessionId) return;

      try {
        const response = await apiRequest("POST", "/api/checkout/verify", {
          checkoutSessionId,
          sessionId,
        });

        if (!response.ok) {
          throw new Error("Payment verification failed");
        }

        setStatus('success');
      } catch (error: any) {
        console.error("Verification error:", error);
        setStatus('error');
        setErrorMessage(error.message || "Something went wrong");
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [checkoutSessionId, sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="py-12 text-center">
            <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
            <h2 className="text-xl font-semibold mb-2">Processing your payment...</h2>
            <p className="text-muted-foreground">Please wait while we confirm your purchase.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="py-12 text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <span className="text-destructive text-2xl">!</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">{errorMessage}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/pricing">Try Again</Link>
              </Button>
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <Card className="max-w-lg w-full mx-4">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription className="text-base">
            Thank you for your purchase. You can now create and download professional resumes and cover letters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="hover-elevate">
              <Link href="/editor/new">
                <CardContent className="py-6 text-center cursor-pointer">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium">Create Resume</h3>
                  <p className="text-sm text-muted-foreground">Start building your resume</p>
                </CardContent>
              </Link>
            </Card>
            <Card className="hover-elevate">
              <Link href="/cover-letter/new">
                <CardContent className="py-6 text-center cursor-pointer">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium">Create Cover Letter</h3>
                  <p className="text-sm text-muted-foreground">Write a matching letter</p>
                </CardContent>
              </Link>
            </Card>
          </div>
          
          <div className="text-center pt-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard" data-testid="link-view-dashboard">View My Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
