import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/diverse_australian_workers_collaborating.png";

const benefits = [
  "200+ professional templates",
  "Australian job market focused",
  "Free career resources",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Diverse Australian workers collaborating"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 lg:py-40 md:px-8">
        <div className="max-w-2xl">
          <p className="text-2xl font-bold text-white mb-2">
            Resume Ready
          </p>
          <p className="text-sm font-medium text-primary/90 uppercase tracking-wider mb-4">
            The Mabbott Method
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Your Career Journey Starts Here
          </h1>
          <p className="mt-6 text-lg text-gray-200 md:text-xl leading-relaxed">
            Create professional resumes and cover letters with our easy-to-use builder. 
            Plus, access free Australian job search resources, employment services guides, 
            and expert career advice.
          </p>

          <ul className="mt-8 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-gray-100">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/templates">
              <Button size="lg" className="gap-2" data-testid="button-hero-start">
                Build Your Resume
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 backdrop-blur-sm"
                data-testid="button-hero-resources"
              >
                Explore Free Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
