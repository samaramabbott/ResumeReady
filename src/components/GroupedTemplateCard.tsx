import { useState, useMemo } from "react";
import { Lock, Eye, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { GroupedTemplate } from "@/templates/TemplateGenerator";
import { createPreviewWithTheme } from "@/templates/TemplateGenerator";

interface GroupedTemplateCardProps {
  template: GroupedTemplate;
  onPreview: (layoutId: string, themeId: string) => void;
  onSelect: (layoutId: string, themeId: string) => void;
  type: "resume" | "cover-letter";
}

export function GroupedTemplateCard({ template, onPreview, onSelect, type }: GroupedTemplateCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = template.colorOptions[selectedColorIndex];
  
  const PreviewComponent = useMemo(() => {
    return createPreviewWithTheme(template.layoutId, selectedColor.themeId, type);
  }, [template.layoutId, selectedColor.themeId, type]);
  
  return (
    <Card 
      className="group overflow-visible relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      data-testid={`card-template-${template.layoutId}`}
    >
      <div className="aspect-[1/1.414] relative overflow-hidden rounded-t-md bg-white dark:bg-slate-50">
        {PreviewComponent ? (
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full">
              <PreviewComponent />
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
              <div className="font-medium text-foreground">{template.layoutName}</div>
              <div className="text-xs mt-1">{template.layoutDescription}</div>
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
              onClick={() => onPreview(template.layoutId, selectedColor.themeId)}
              className="gap-1"
              data-testid={`button-preview-${template.layoutId}`}
            >
              <Eye className="h-3 w-3" />
              Preview
            </Button>
            <Button
              size="sm"
              onClick={() => onSelect(template.layoutId, selectedColor.themeId)}
              className="gap-1"
              data-testid={`button-select-${template.layoutId}`}
            >
              <Check className="h-3 w-3" />
              Use Template
            </Button>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm truncate" data-testid={`text-template-name-${template.layoutId}`}>
          {template.layoutName}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {template.layoutDescription}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {template.colorOptions.map((color, index) => (
            <Tooltip key={color.themeId}>
              <TooltipTrigger asChild>
                <button
                  className={`w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${
                    selectedColorIndex === index 
                      ? "border-foreground ring-2 ring-offset-1 ring-foreground/20" 
                      : "border-transparent hover:border-muted-foreground/50"
                  }`}
                  style={{ backgroundColor: color.primaryColor }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIndex(index);
                  }}
                  data-testid={`color-dot-${template.layoutId}-${color.themeId}`}
                />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {color.themeName}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </Card>
  );
}
