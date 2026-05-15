interface TemplatePreviewProps {
  name?: string;
  variant?: string;
}

const sampleData = {
  name: "Sarah Mitchell",
  title: "Senior Software Engineer",
  email: "sarah.mitchell@email.com",
  phone: "+61 412 345 678",
  date: "14 December 2024",
  company: "Innovation Corp",
  hiringManager: "Hiring Manager",
  opening: "I am writing to express my interest in the Software Engineer position at Innovation Corp.",
  body: "With over 8 years of experience developing scalable web applications, I am confident in my ability to contribute to your team's success.",
  closing: "I look forward to the opportunity to discuss how my skills and experience align with your needs.",
};

export function ModernBlueCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="bg-blue-600 text-white p-2 -m-3 mb-3">
        <div className="font-bold text-[10px]">{sampleData.name}</div>
        <div className="text-[6px] opacity-80 mt-0.5">{sampleData.email} | {sampleData.phone}</div>
      </div>
      <div className="mt-3 text-gray-500 text-[5px]">{sampleData.date}</div>
      <div className="mt-2 mb-2">
        <div className="font-medium text-gray-800">{sampleData.company}</div>
        <div className="text-gray-500">Dear {sampleData.hiringManager},</div>
      </div>
      <div className="space-y-1.5 text-gray-600">
        <p>{sampleData.opening}</p>
        <p>{sampleData.body}</p>
        <p>{sampleData.closing}</p>
      </div>
      <div className="mt-3">
        <div className="text-gray-600">Sincerely,</div>
        <div className="font-medium text-blue-600 mt-1">{sampleData.name}</div>
      </div>
    </div>
  );
}

export function ClassicNavyCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="text-center border-b-2 border-slate-700 pb-2 mb-3">
        <div className="font-serif font-bold text-[10px] text-slate-800">{sampleData.name}</div>
        <div className="text-[5px] text-slate-500 mt-1">{sampleData.email} | {sampleData.phone}</div>
      </div>
      <div className="text-right text-gray-500 text-[5px] mb-2">{sampleData.date}</div>
      <div className="mb-3">
        <div className="font-medium text-slate-700">{sampleData.company}</div>
        <div className="text-slate-600 mt-1">Dear {sampleData.hiringManager},</div>
      </div>
      <div className="space-y-1.5 text-slate-600 text-justify">
        <p>{sampleData.opening}</p>
        <p>{sampleData.body}</p>
        <p>{sampleData.closing}</p>
      </div>
      <div className="mt-4">
        <div className="text-slate-600">Yours faithfully,</div>
        <div className="font-serif font-medium text-slate-800 mt-2">{sampleData.name}</div>
      </div>
    </div>
  );
}

export function MinimalGrayCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="mb-3">
        <div className="font-light text-[11px] text-gray-900">{sampleData.name}</div>
        <div className="text-[5px] text-gray-400 mt-0.5">{sampleData.email} | {sampleData.phone}</div>
      </div>
      <div className="h-px bg-gray-200 my-2" />
      <div className="text-[5px] text-gray-400 mb-2">{sampleData.date}</div>
      <div className="text-gray-600 mb-2">Dear {sampleData.hiringManager},</div>
      <div className="space-y-1.5 text-gray-600">
        <p>{sampleData.opening}</p>
        <p>{sampleData.body}</p>
        <p>{sampleData.closing}</p>
      </div>
      <div className="h-px bg-gray-200 my-3" />
      <div className="text-gray-500">Best regards,</div>
      <div className="font-light text-gray-800 mt-1">{sampleData.name}</div>
    </div>
  );
}

export function BoldTealCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white text-[6px] leading-tight overflow-hidden flex">
      <div className="w-1/4 bg-teal-600 text-white p-2">
        <div className="font-bold text-[8px]">{sampleData.name.split(' ')[0]}</div>
        <div className="font-bold text-[8px]">{sampleData.name.split(' ')[1]}</div>
        <div className="mt-3 text-[4px] space-y-1 opacity-80">
          <div>{sampleData.email}</div>
          <div>{sampleData.phone}</div>
        </div>
      </div>
      <div className="flex-1 p-2">
        <div className="text-gray-400 text-[5px] mb-2">{sampleData.date}</div>
        <div className="mb-2">
          <div className="font-medium text-gray-700">{sampleData.company}</div>
          <div className="text-teal-600">Dear {sampleData.hiringManager},</div>
        </div>
        <div className="space-y-1.5 text-gray-600">
          <p>{sampleData.opening}</p>
          <p>{sampleData.body}</p>
          <p>{sampleData.closing}</p>
        </div>
        <div className="mt-3">
          <div className="text-gray-500">Kind regards,</div>
          <div className="font-bold text-teal-600 mt-1">{sampleData.name}</div>
        </div>
      </div>
    </div>
  );
}

export function ElegantBurgundyCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="text-center mb-3">
        <div className="font-serif text-[10px] text-red-900 tracking-wide">{sampleData.name}</div>
        <div className="flex justify-center gap-1 mt-1">
          <div className="w-6 h-px bg-red-300" />
          <div className="w-1 h-1 rounded-full bg-red-400 -mt-px" />
          <div className="w-6 h-px bg-red-300" />
        </div>
        <div className="text-[5px] text-gray-500 mt-1">{sampleData.email} | {sampleData.phone}</div>
      </div>
      <div className="text-right text-[5px] text-gray-400 mb-2">{sampleData.date}</div>
      <div className="mb-2 text-center">
        <div className="text-red-800 italic">Dear {sampleData.hiringManager},</div>
      </div>
      <div className="space-y-1.5 text-gray-600 text-center">
        <p>{sampleData.opening}</p>
        <p>{sampleData.body}</p>
        <p>{sampleData.closing}</p>
      </div>
      <div className="mt-4 text-center">
        <div className="text-gray-500">With warm regards,</div>
        <div className="font-serif text-red-900 mt-1">{sampleData.name}</div>
      </div>
    </div>
  );
}

export function ProfessionalGreenCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="flex items-start gap-2 mb-3 pb-2 border-b-2 border-green-600">
        <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-[8px]">
          {sampleData.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-bold text-[9px] text-gray-800">{sampleData.name}</div>
          <div className="text-[5px] text-gray-500">{sampleData.email}</div>
        </div>
      </div>
      <div className="text-[5px] text-gray-400 mb-2">{sampleData.date}</div>
      <div className="mb-2">
        <div className="font-medium text-gray-700">{sampleData.company}</div>
        <div className="text-green-700 mt-1">Dear {sampleData.hiringManager},</div>
      </div>
      <div className="space-y-1.5 text-gray-600 pl-2 border-l-2 border-green-200">
        <p>{sampleData.opening}</p>
        <p>{sampleData.body}</p>
        <p>{sampleData.closing}</p>
      </div>
      <div className="mt-3">
        <div className="text-gray-500">Best regards,</div>
        <div className="font-medium text-green-700 mt-1">{sampleData.name}</div>
      </div>
    </div>
  );
}

export function CreativeOrangeCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 p-3 text-[6px] leading-tight overflow-hidden">
      <div className="relative mb-3">
        <div className="absolute -left-1 -top-1 w-8 h-8 bg-orange-400 rounded-full opacity-20" />
        <div className="relative">
          <div className="font-bold text-[10px] text-orange-600">{sampleData.name}</div>
          <div className="text-[5px] text-gray-500">{sampleData.email} | {sampleData.phone}</div>
        </div>
      </div>
      <div className="bg-white/60 rounded p-2 mb-2">
        <div className="text-[5px] text-gray-400 mb-1">{sampleData.date}</div>
        <div className="text-orange-600 font-medium">Dear {sampleData.hiringManager},</div>
      </div>
      <div className="space-y-1.5 text-gray-600">
        <p>{sampleData.opening}</p>
        <p>{sampleData.body}</p>
        <p>{sampleData.closing}</p>
      </div>
      <div className="mt-3 bg-white/60 rounded p-2 inline-block">
        <div className="text-gray-500">Warm regards,</div>
        <div className="font-bold text-orange-600">{sampleData.name}</div>
      </div>
    </div>
  );
}

export function ExecutivePurpleCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white text-[6px] leading-tight overflow-hidden">
      <div className="bg-purple-900 text-white p-2 mb-2">
        <div className="flex justify-between items-center">
          <div className="font-bold text-[9px]">{sampleData.name}</div>
          <div className="text-right text-[4px] text-purple-200">
            <div>{sampleData.email}</div>
            <div>{sampleData.phone}</div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="text-[5px] text-gray-400 mb-2">{sampleData.date}</div>
        <div className="mb-2">
          <div className="font-medium text-purple-900">{sampleData.company}</div>
          <div className="text-gray-600 mt-1">Dear {sampleData.hiringManager},</div>
        </div>
        <div className="space-y-1.5 text-gray-600">
          <p>{sampleData.opening}</p>
          <p>{sampleData.body}</p>
          <p>{sampleData.closing}</p>
        </div>
        <div className="mt-3 border-t border-purple-200 pt-2">
          <div className="text-gray-500">Respectfully,</div>
          <div className="font-medium text-purple-900 mt-1">{sampleData.name}</div>
        </div>
      </div>
    </div>
  );
}

export function FreshMintCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="flex gap-2 mb-2">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-[10px]">
          {sampleData.name[0]}
        </div>
        <div>
          <div className="font-bold text-[9px] text-gray-800">{sampleData.name}</div>
          <div className="text-[5px] text-gray-400">{sampleData.email}</div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded mb-2" />
      <div className="text-[5px] text-gray-400 mb-2">{sampleData.date}</div>
      <div className="mb-2">
        <div className="text-emerald-600">Dear {sampleData.hiringManager},</div>
      </div>
      <div className="space-y-1.5 text-gray-600">
        <p>{sampleData.opening}</p>
        <p>{sampleData.body}</p>
        <p>{sampleData.closing}</p>
      </div>
      <div className="mt-3">
        <div className="text-gray-500">All the best,</div>
        <div className="font-medium text-emerald-700 mt-1">{sampleData.name}</div>
      </div>
    </div>
  );
}

export function SimpleBlackCoverPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden font-mono">
      <div className="border-b-2 border-black pb-1 mb-2">
        <div className="font-bold text-[10px]">{sampleData.name.toUpperCase()}</div>
        <div className="text-[5px]">{sampleData.email} / {sampleData.phone}</div>
      </div>
      <div className="text-[5px] text-gray-500 mb-2">{sampleData.date}</div>
      <div className="mb-2">
        <div className="font-bold">{sampleData.company}</div>
        <div className="mt-1">Dear {sampleData.hiringManager},</div>
      </div>
      <div className="space-y-1.5 text-gray-700">
        <p>{sampleData.opening}</p>
        <p>{sampleData.body}</p>
        <p>{sampleData.closing}</p>
      </div>
      <div className="mt-4">
        <div>---</div>
        <div className="font-bold mt-1">{sampleData.name}</div>
      </div>
    </div>
  );
}

export const coverLetterTemplates = [
  { id: "modern-blue", name: "Modern Blue", category: "Professional", component: ModernBlueCoverPreview },
  { id: "classic-navy", name: "Classic Navy", category: "Professional", component: ClassicNavyCoverPreview },
  { id: "minimal-gray", name: "Minimal Gray", category: "Entry Level", component: MinimalGrayCoverPreview },
  { id: "bold-teal", name: "Bold Teal", category: "Creative", component: BoldTealCoverPreview },
  { id: "elegant-burgundy", name: "Elegant Burgundy", category: "Professional", component: ElegantBurgundyCoverPreview },
  { id: "professional-green", name: "Professional Green", category: "Professional", component: ProfessionalGreenCoverPreview },
  { id: "creative-orange", name: "Creative Orange", category: "Creative", component: CreativeOrangeCoverPreview },
  { id: "executive-purple", name: "Executive Purple", category: "Professional", component: ExecutivePurpleCoverPreview },
  { id: "fresh-mint", name: "Fresh Mint", category: "Entry Level", component: FreshMintCoverPreview },
  { id: "simple-black", name: "Simple Black", category: "Entry Level", component: SimpleBlackCoverPreview },
];

export function getCoverLetterTemplatePreview(templateId: string) {
  return coverLetterTemplates.find(t => t.id === templateId)?.component || ModernBlueCoverPreview;
}
