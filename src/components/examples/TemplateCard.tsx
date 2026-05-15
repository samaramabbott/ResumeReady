import { TemplateCard, type Template } from "../TemplateCard";

const mockTemplate: Template = {
  id: "1",
  name: "Modern Professional",
  category: "Entry Level",
  industry: "Technology",
  thumbnail: "",
  isPremium: false,
};

export default function TemplateCardExample() {
  return (
    <div className="w-64">
      <TemplateCard
        template={mockTemplate}
        onPreview={(id) => console.log("Preview:", id)}
        onSelect={(id) => console.log("Select:", id)}
      />
    </div>
  );
}
