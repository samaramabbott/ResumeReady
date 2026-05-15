import { Link } from "wouter";
import { FileText, Users, Briefcase, BookOpen, ArrowRight, Star } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "200+ Professional Templates",
    description: "Choose from our extensive library of templates designed for every career level and industry.",
  },
  {
    icon: Users,
    title: "Made for Everyone",
    description: "Whether you're starting out, returning to work, or changing careers, we've got you covered.",
  },
  {
    icon: Briefcase,
    title: "Australian Job Resources",
    description: "Access comprehensive guides to employment services, workplace rights, and job search websites.",
  },
  {
    icon: BookOpen,
    title: "Expert Career Guides",
    description: "Learn how to write winning resumes, cover letters, and ace your interviews.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Career Changer",
    quote: "After 15 years in retail, I needed help transitioning to office work. The templates and guides made it so easy!",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Recent Graduate",
    quote: "As a first-time job seeker, I had no idea where to start. This platform gave me everything I needed.",
    rating: 5,
  },
  {
    name: "Michelle T.",
    role: "Returning Parent",
    quote: "After taking time off to raise my kids, I felt lost. The targeted resources for parents were incredibly helpful.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From professional resume templates to comprehensive job search resources, 
              we're here to support your career journey every step of the way.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Success Stories from Real Australians
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands who have built their careers with our help.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* todo: remove mock functionality */}
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-4 pt-4 border-t">
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Start Your Career Journey?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your professional resume in minutes. Browse our free resources to prepare for your job search.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/templates">
              <Button size="lg" className="gap-2" data-testid="button-cta-templates">
                Browse Templates
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" data-testid="button-cta-resources">
                Explore Free Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
