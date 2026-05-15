import { Lock, Eye, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComponentType } from "react";

export interface Template {
  id: string;
  name: string;
  category: string;
  industry?: string;
  thumbnail: string;
  isPremium?: boolean;
  PreviewComponent?: ComponentType<{ name?: string }>;
}

interface TemplateCardProps {
  template: Template;
  onPreview: (id: string) => void;
  onSelect: (id: string) => void;
}

export function TemplateCard({ template, onPreview, onSelect }: TemplateCardProps) {
  const PreviewComponent = template.PreviewComponent;
  
  return (
    <Card 
      className="group overflow-visible relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      data-testid={`card-template-${template.id}`}
    >
      <div className="aspect-[1/1.414] relative overflow-hidden rounded-t-md bg-white dark:bg-slate-50">
        {PreviewComponent ? (
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full">
              <PreviewComponent name={template.name} />
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm"
            style={{
              background: `linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--accent)) 100%)`,
            }}
          >
            <div className="text-center p-4">
              <div className="font-medium text-foreground">{template.name}</div>
              <div className="text-xs mt-1">{template.category}</div>
            </div>
          </div>
        )}
        {template.isPremium && (
          <Badge 
            className="absolute top-2 right-2 z-10"
            variant="secondary"
          >
            <Lock className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-end pb-4 gap-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onPreview(template.id)}
              className="gap-1"
              data-testid={`button-preview-${template.id}`}
            >
              <Eye className="h-3 w-3" />
              Preview
            </Button>
            <Button
              size="sm"
              onClick={() => onSelect(template.id)}
              className="gap-1"
              data-testid={`button-select-${template.id}`}
            >
              <Check className="h-3 w-3" />
              Use Template
            </Button>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <h3 className="font-semibold text-sm truncate" data-testid={`text-template-name-${template.id}`}>
          {template.name}
        </h3>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs font-normal">
            {template.category}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
