import { ExternalLink, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Resource {
  id: string;
  name: string;
  description: string;
  website?: string;
  phone?: string;
  category: string;
}

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{resource.name}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {resource.website && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(resource.website, "_blank")}
              data-testid={`button-visit-${resource.id}`}
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </Button>
          )}
          {resource.phone && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => window.open(`tel:${resource.phone}`, "_self")}
              data-testid={`button-call-${resource.id}`}
            >
              <Phone className="h-4 w-4" />
              {resource.phone}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
