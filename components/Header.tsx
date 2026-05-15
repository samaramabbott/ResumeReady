import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, FileText, Briefcase, HelpCircle, DollarSign, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "./AuthDialog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { name: "Resume Builder", href: "/templates", icon: FileText },
  { name: "Resources", href: "/resources", icon: HelpCircle },
  { name: "Job Search", href: "/job-search", icon: Briefcase },
  { name: "Pricing", href: "/pricing", icon: DollarSign },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({ title: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" data-testid="link-home">
              <span className="flex items-center gap-2 font-semibold text-xl">
                <FileText className="h-6 w-6 text-primary" />
                <span className="hidden sm:inline">ResumeReady</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={location === item.href ? "secondary" : "ghost"}
                    className="gap-2"
                    data-testid={`link-nav-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {!isLoading && (
                isAuthenticated ? (
                  <div className="hidden sm:flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl || undefined} />
                      <AvatarFallback>{user?.firstName?.[0] || user?.email?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hidden sm:flex" 
                    onClick={() => setAuthDialogOpen(true)}
                    data-testid="button-login"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )
              )}
              <Link href="/templates">
                <Button data-testid="button-get-started" className="hidden sm:flex">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={location === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
                <Link href="/templates">
                  <Button className="w-full mt-2" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Button>
                </Link>
                {!isLoading && (
                  isAuthenticated ? (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2" 
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2" 
                      onClick={() => { setAuthDialogOpen(true); setMobileMenuOpen(false); }}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  )
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
}
