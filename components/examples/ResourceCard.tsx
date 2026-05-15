import { ResourceCard, type Resource } from "../ResourceCard";

const mockResource: Resource = {
  id: "centrelink",
  name: "Services Australia (Centrelink)",
  description: "Access government payments, support services, and employment assistance programs.",
  website: "https://www.servicesaustralia.gov.au",
  phone: "132 850",
  category: "Government Services",
};

export default function ResourceCardExample() {
  return (
    <div className="w-96">
      <ResourceCard resource={mockResource} />
    </div>
  );
}
