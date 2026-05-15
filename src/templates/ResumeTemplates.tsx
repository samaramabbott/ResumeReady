interface TemplatePreviewProps {
  name?: string;
  variant?: string;
}

const sampleData = {
  name: "Sarah Mitchell",
  title: "Senior Software Engineer",
  email: "sarah.mitchell@email.com",
  phone: "+61 412 345 678",
  location: "Sydney, NSW",
  summary: "Experienced software engineer with 8+ years developing scalable web applications.",
  experience: [
    { title: "Senior Developer", company: "Tech Corp", date: "2020 - Present" },
    { title: "Developer", company: "StartupXYZ", date: "2018 - 2020" },
  ],
  education: { degree: "BSc Computer Science", school: "University of Sydney", year: "2016" },
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
};

export function ModernBluePreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="bg-blue-600 text-white p-2 -m-3 mb-2">
        <div className="font-bold text-[10px]">{sampleData.name}</div>
        <div className="text-[7px] opacity-90">{sampleData.title}</div>
        <div className="flex gap-2 mt-1 text-[5px] opacity-80">
          <span>{sampleData.email}</span>
          <span>{sampleData.phone}</span>
        </div>
      </div>
      <div className="mt-3">
        <div className="font-bold text-blue-600 border-b border-blue-200 pb-0.5 mb-1">Summary</div>
        <p className="text-gray-600">{sampleData.summary}</p>
      </div>
      <div className="mt-2">
        <div className="font-bold text-blue-600 border-b border-blue-200 pb-0.5 mb-1">Experience</div>
        {sampleData.experience.map((exp, i) => (
          <div key={i} className="mb-1">
            <div className="font-semibold text-gray-800">{exp.title}</div>
            <div className="text-gray-500 flex justify-between">
              <span>{exp.company}</span>
              <span>{exp.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="font-bold text-blue-600 border-b border-blue-200 pb-0.5 mb-1">Skills</div>
        <div className="flex flex-wrap gap-1">
          {sampleData.skills.slice(0, 4).map((skill, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 px-1 rounded text-[5px]">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClassicNavyPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="text-center border-b-2 border-slate-700 pb-2 mb-2">
        <div className="font-serif font-bold text-[11px] text-slate-800">{sampleData.name}</div>
        <div className="text-[7px] text-slate-600 tracking-wide">{sampleData.title}</div>
        <div className="flex justify-center gap-3 mt-1 text-[5px] text-slate-500">
          <span>{sampleData.email}</span>
          <span>{sampleData.phone}</span>
          <span>{sampleData.location}</span>
        </div>
      </div>
      <div className="mt-2">
        <div className="font-serif font-bold text-slate-800 uppercase text-[7px] tracking-wider mb-1">Professional Summary</div>
        <p className="text-slate-600 italic">{sampleData.summary}</p>
      </div>
      <div className="mt-2">
        <div className="font-serif font-bold text-slate-800 uppercase text-[7px] tracking-wider mb-1">Work Experience</div>
        {sampleData.experience.map((exp, i) => (
          <div key={i} className="mb-1 pl-2 border-l-2 border-slate-300">
            <div className="font-semibold text-slate-700">{exp.title}</div>
            <div className="text-slate-500">{exp.company} | {exp.date}</div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="font-serif font-bold text-slate-800 uppercase text-[7px] tracking-wider mb-1">Education</div>
        <div className="text-slate-600">{sampleData.education.degree}</div>
        <div className="text-slate-500">{sampleData.education.school}, {sampleData.education.year}</div>
      </div>
    </div>
  );
}

export function MinimalGrayPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="mb-3">
        <div className="font-light text-[12px] text-gray-900">{sampleData.name}</div>
        <div className="text-[7px] text-gray-500">{sampleData.title}</div>
        <div className="text-[5px] text-gray-400 mt-1">{sampleData.email} | {sampleData.phone}</div>
      </div>
      <div className="h-px bg-gray-200 my-2" />
      <p className="text-gray-600 mb-3">{sampleData.summary}</p>
      <div className="h-px bg-gray-200 my-2" />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-[7px] text-gray-400 uppercase tracking-widest mb-1">Experience</div>
          {sampleData.experience.map((exp, i) => (
            <div key={i} className="mb-1">
              <div className="font-medium text-gray-800">{exp.title}</div>
              <div className="text-gray-500">{exp.company}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[7px] text-gray-400 uppercase tracking-widest mb-1">Skills</div>
          {sampleData.skills.slice(0, 4).map((skill, i) => (
            <div key={i} className="text-gray-700">{skill}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BoldTealPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white text-[6px] leading-tight overflow-hidden flex">
      <div className="w-1/3 bg-teal-600 text-white p-2">
        <div className="font-bold text-[9px]">{sampleData.name.split(' ')[0]}</div>
        <div className="font-bold text-[9px]">{sampleData.name.split(' ')[1]}</div>
        <div className="text-[6px] opacity-80 mt-1">{sampleData.title}</div>
        <div className="mt-3">
          <div className="text-[5px] uppercase tracking-wider opacity-70">Contact</div>
          <div className="text-[5px] mt-1 space-y-0.5">
            <div>{sampleData.email}</div>
            <div>{sampleData.phone}</div>
            <div>{sampleData.location}</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-[5px] uppercase tracking-wider opacity-70">Skills</div>
          <div className="mt-1 space-y-0.5">
            {sampleData.skills.slice(0, 4).map((skill, i) => (
              <div key={i} className="text-[5px]">{skill}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 p-2">
        <div className="mb-2">
          <div className="font-bold text-teal-600 text-[7px] mb-0.5">About Me</div>
          <p className="text-gray-600">{sampleData.summary}</p>
        </div>
        <div>
          <div className="font-bold text-teal-600 text-[7px] mb-0.5">Experience</div>
          {sampleData.experience.map((exp, i) => (
            <div key={i} className="mb-1">
              <div className="font-semibold text-gray-800">{exp.title}</div>
              <div className="text-gray-500">{exp.company} | {exp.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ElegantBurgundyPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="text-center mb-3">
        <div className="font-serif text-[11px] text-red-900 tracking-wide">{sampleData.name}</div>
        <div className="text-[6px] text-red-800 uppercase tracking-[0.2em]">{sampleData.title}</div>
        <div className="flex justify-center gap-1 mt-1">
          <div className="w-8 h-px bg-red-300" />
          <div className="w-1 h-1 rounded-full bg-red-400 -mt-px" />
          <div className="w-8 h-px bg-red-300" />
        </div>
      </div>
      <div className="text-center text-[5px] text-gray-500 mb-2">
        {sampleData.email} | {sampleData.phone} | {sampleData.location}
      </div>
      <div className="mb-2">
        <div className="text-[6px] text-red-800 uppercase tracking-widest text-center mb-1">Profile</div>
        <p className="text-gray-600 text-center">{sampleData.summary}</p>
      </div>
      <div className="mb-2">
        <div className="text-[6px] text-red-800 uppercase tracking-widest text-center mb-1">Experience</div>
        {sampleData.experience.map((exp, i) => (
          <div key={i} className="text-center mb-1">
            <div className="font-medium text-gray-800">{exp.title}</div>
            <div className="text-gray-500">{exp.company}, {exp.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfessionalGreenPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="flex items-start gap-2 mb-2 pb-2 border-b-2 border-green-600">
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-[10px]">
          {sampleData.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-bold text-[10px] text-gray-800">{sampleData.name}</div>
          <div className="text-[7px] text-green-600">{sampleData.title}</div>
          <div className="text-[5px] text-gray-500 mt-0.5">{sampleData.email}</div>
        </div>
      </div>
      <div className="mb-2">
        <div className="font-bold text-green-700 text-[7px] flex items-center gap-1 mb-0.5">
          <div className="w-1 h-3 bg-green-600" />
          Summary
        </div>
        <p className="text-gray-600 pl-2">{sampleData.summary}</p>
      </div>
      <div className="mb-2">
        <div className="font-bold text-green-700 text-[7px] flex items-center gap-1 mb-0.5">
          <div className="w-1 h-3 bg-green-600" />
          Experience
        </div>
        {sampleData.experience.map((exp, i) => (
          <div key={i} className="pl-2 mb-1">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">{exp.title}</span>
              <span className="text-gray-400">{exp.date}</span>
            </div>
            <div className="text-gray-500">{exp.company}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreativeOrangePreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 p-3 text-[6px] leading-tight overflow-hidden">
      <div className="relative mb-3">
        <div className="absolute -left-1 -top-1 w-12 h-12 bg-orange-400 rounded-full opacity-20" />
        <div className="relative">
          <div className="font-bold text-[11px] text-orange-600">{sampleData.name}</div>
          <div className="text-[7px] text-gray-600">{sampleData.title}</div>
        </div>
      </div>
      <div className="flex gap-2 text-[5px] text-gray-500 mb-2">
        <span className="px-1 py-0.5 bg-orange-100 rounded">{sampleData.email}</span>
        <span className="px-1 py-0.5 bg-orange-100 rounded">{sampleData.phone}</span>
      </div>
      <div className="bg-white/60 rounded p-2 mb-2">
        <p className="text-gray-700">{sampleData.summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/60 rounded p-1">
          <div className="font-bold text-orange-600 text-[6px] mb-1">Experience</div>
          {sampleData.experience.map((exp, i) => (
            <div key={i} className="text-[5px] mb-0.5">
              <div className="font-medium">{exp.title}</div>
              <div className="text-gray-500">{exp.company}</div>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded p-1">
          <div className="font-bold text-orange-600 text-[6px] mb-1">Skills</div>
          <div className="flex flex-wrap gap-0.5">
            {sampleData.skills.slice(0, 4).map((skill, i) => (
              <span key={i} className="text-[5px] px-1 bg-orange-200 text-orange-800 rounded">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExecutivePurplePreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white text-[6px] leading-tight overflow-hidden">
      <div className="bg-purple-900 text-white p-2 -mx-0 mb-2">
        <div className="flex justify-between items-end">
          <div>
            <div className="font-bold text-[10px]">{sampleData.name}</div>
            <div className="text-[7px] text-purple-200">{sampleData.title}</div>
          </div>
          <div className="text-right text-[5px] text-purple-200">
            <div>{sampleData.email}</div>
            <div>{sampleData.phone}</div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="mb-2">
          <div className="font-bold text-purple-900 text-[7px] uppercase tracking-wider border-b border-purple-200 pb-0.5 mb-1">Executive Summary</div>
          <p className="text-gray-600">{sampleData.summary}</p>
        </div>
        <div className="mb-2">
          <div className="font-bold text-purple-900 text-[7px] uppercase tracking-wider border-b border-purple-200 pb-0.5 mb-1">Professional Experience</div>
          {sampleData.experience.map((exp, i) => (
            <div key={i} className="mb-1 flex justify-between">
              <div>
                <span className="font-semibold text-gray-800">{exp.title}</span>
                <span className="text-gray-500"> - {exp.company}</span>
              </div>
              <span className="text-purple-600">{exp.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FreshMintPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden">
      <div className="flex gap-2 mb-2">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-[12px]">
          {sampleData.name[0]}
        </div>
        <div>
          <div className="font-bold text-[10px] text-gray-800">{sampleData.name}</div>
          <div className="text-[7px] text-emerald-600">{sampleData.title}</div>
          <div className="text-[5px] text-gray-400">{sampleData.location}</div>
        </div>
      </div>
      <div className="flex gap-2 text-[5px] text-gray-500 mb-2">
        <span>{sampleData.email}</span>
        <span>{sampleData.phone}</span>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded mb-2" />
      <p className="text-gray-600 mb-2">{sampleData.summary}</p>
      <div className="space-y-2">
        <div>
          <div className="font-bold text-emerald-700 text-[7px] mb-0.5">Experience</div>
          {sampleData.experience.map((exp, i) => (
            <div key={i} className="flex justify-between mb-0.5">
              <div>
                <span className="font-medium">{exp.title}</span>
                <span className="text-gray-400"> at {exp.company}</span>
              </div>
              <span className="text-emerald-600">{exp.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SimpleBlackPreview({ name }: TemplatePreviewProps) {
  return (
    <div className="w-full h-full bg-white p-3 text-[6px] leading-tight overflow-hidden font-mono">
      <div className="border-b-2 border-black pb-1 mb-2">
        <div className="font-bold text-[11px]">{sampleData.name.toUpperCase()}</div>
        <div className="text-[7px]">{sampleData.title}</div>
      </div>
      <div className="text-[5px] mb-2">{sampleData.email} / {sampleData.phone} / {sampleData.location}</div>
      <div className="mb-2">
        <div className="font-bold text-[7px] uppercase mb-0.5">About</div>
        <p className="text-gray-700">{sampleData.summary}</p>
      </div>
      <div className="mb-2">
        <div className="font-bold text-[7px] uppercase mb-0.5">Work</div>
        {sampleData.experience.map((exp, i) => (
          <div key={i} className="mb-1">
            <div>{exp.title} @ {exp.company}</div>
            <div className="text-gray-500">{exp.date}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="font-bold text-[7px] uppercase mb-0.5">Skills</div>
        <div className="text-gray-700">{sampleData.skills.join(" / ")}</div>
      </div>
    </div>
  );
}

export const resumeTemplates = [
  { id: "modern-blue", name: "Modern Blue", category: "Professional", component: ModernBluePreview },
  { id: "classic-navy", name: "Classic Navy", category: "Professional", component: ClassicNavyPreview },
  { id: "minimal-gray", name: "Minimal Gray", category: "Entry Level", component: MinimalGrayPreview },
  { id: "bold-teal", name: "Bold Teal", category: "Creative", component: BoldTealPreview },
  { id: "elegant-burgundy", name: "Elegant Burgundy", category: "Professional", component: ElegantBurgundyPreview },
  { id: "professional-green", name: "Professional Green", category: "Professional", component: ProfessionalGreenPreview },
  { id: "creative-orange", name: "Creative Orange", category: "Creative", component: CreativeOrangePreview },
  { id: "executive-purple", name: "Executive Purple", category: "Professional", component: ExecutivePurplePreview },
  { id: "fresh-mint", name: "Fresh Mint", category: "Entry Level", component: FreshMintPreview },
  { id: "simple-black", name: "Simple Black", category: "Entry Level", component: SimpleBlackPreview },
];

export function getResumeTemplatePreview(templateId: string) {
  return resumeTemplates.find(t => t.id === templateId)?.component || ModernBluePreview;
}
