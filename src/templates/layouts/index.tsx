// Layout Primitives for Template Generation
import { type TemplateTheme } from "../config";
import { useRef, useState, useEffect } from "react";

export interface LayoutProps {
  theme: TemplateTheme;
  data: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
    summary: string;
    experience: Array<{ title: string; company: string; date: string }>;
    education: Array<{ degree: string; school: string; year: string }>;
    skills: string[];
    certifications?: Array<{ name: string; issuer: string; year: string }>;
    languages?: Array<{ language: string; proficiency: string }>;
    referees?: Array<{ name: string; title: string; company: string; phone: string; email: string }>;
  };
  noViewport?: boolean;
  customFont?: string;
}

// A4 dimensions in pixels at 96 DPI
const A4_WIDTH_PX = 794; // 210mm at 96 DPI
const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI

// Preview Viewport - Wrapper that scales a full-size document to fit the container
export function PreviewViewport({ children, fontFamily }: { children: React.ReactNode; fontFamily?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const scaleX = containerWidth / A4_WIDTH_PX;
        const scaleY = containerHeight / A4_HEIGHT_PX;
        setScale(Math.min(scaleX, scaleY));
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden relative">
      <div 
        className="absolute top-0 left-1/2 origin-top"
        style={{
          width: `${A4_WIDTH_PX}px`,
          height: `${A4_HEIGHT_PX}px`,
          transform: `translateX(-50%) scale(${scale})`,
          fontFamily: fontFamily || "'Inter', sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Single Column Layout - Traditional top-to-bottom
export function SingleColumnLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full p-8 text-sm leading-relaxed" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="p-6 -m-8 mb-6" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="font-bold text-3xl" style={{ fontFamily: theme.fontHeading }}>{data.name}</div>
        <div className="text-lg opacity-90 mt-1" style={{ fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="flex gap-6 mt-3 text-sm opacity-80 flex-wrap">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </div>
      <div className="mt-8">
        <div className="font-bold pb-2 mb-3 border-b-2 text-lg uppercase tracking-wide" style={{ color: theme.primary, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Professional Summary</div>
        <p className="text-base leading-relaxed" style={{ color: theme.textSecondary }}>{data.summary}</p>
      </div>
      <div className="mt-6">
        <div className="font-bold pb-2 mb-3 border-b-2 text-lg uppercase tracking-wide" style={{ color: theme.primary, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Work Experience</div>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="font-semibold text-base" style={{ color: theme.textPrimary }}>{exp.title}</div>
            <div className="flex justify-between gap-2 text-sm" style={{ color: theme.textMuted }}>
              <span>{exp.company}</span>
              <span>{exp.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="font-bold pb-2 mb-3 border-b-2 text-lg uppercase tracking-wide" style={{ color: theme.primary, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Education</div>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-3">
            <div className="text-base" style={{ color: theme.textPrimary }}>{edu.degree}</div>
            <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school} - {edu.year}</div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="font-bold pb-2 mb-3 border-b-2 text-lg uppercase tracking-wide" style={{ color: theme.primary, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Skills</div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>{skill}</span>
          ))}
        </div>
      </div>
      {data.certifications && data.certifications.length > 0 && (
        <div className="mt-6">
          <div className="font-bold pb-2 mb-3 border-b-2 text-lg uppercase tracking-wide" style={{ color: theme.primary, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Certifications</div>
          {data.certifications.map((cert, i) => (
            <div key={i} className="mb-2">
              <div className="text-base" style={{ color: theme.textPrimary }}>{cert.name}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{cert.issuer} - {cert.year}</div>
            </div>
          ))}
        </div>
      )}
      {data.languages && data.languages.length > 0 && (
        <div className="mt-6">
          <div className="font-bold pb-2 mb-3 border-b-2 text-lg uppercase tracking-wide" style={{ color: theme.primary, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Languages</div>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, i) => (
              <div key={i} className="text-sm">
                <span style={{ color: theme.textPrimary }}>{lang.language}</span>
                <span style={{ color: theme.textMuted }}> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.referees && data.referees.length > 0 && (
        <div className="mt-6">
          <div className="font-bold pb-2 mb-3 border-b-2 text-lg uppercase tracking-wide" style={{ color: theme.primary, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Referees</div>
          <div className="grid grid-cols-2 gap-4">
            {data.referees.map((ref, i) => (
              <div key={i} className="text-sm">
                <div className="font-semibold" style={{ color: theme.textPrimary }}>{ref.name}</div>
                <div style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                <div style={{ color: theme.textMuted }}>{ref.phone}</div>
                <div style={{ color: theme.textMuted }}>{ref.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Left Sidebar Layout - Sidebar on left with main content on right
export function SidebarLeftLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full text-sm leading-relaxed flex" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="w-1/3 p-6" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="font-bold text-2xl" style={{ fontFamily: theme.fontHeading }}>{data.name.split(' ')[0]}</div>
        <div className="font-bold text-2xl" style={{ fontFamily: theme.fontHeading }}>{data.name.split(' ')[1] || ''}</div>
        <div className="text-base opacity-80 mt-2" style={{ fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="mt-8">
          <div className="text-sm uppercase tracking-wider opacity-70 mb-2" style={{ fontFamily: theme.fontHeading }}>Contact</div>
          <div className="text-sm space-y-2">
            <div>{data.email}</div>
            <div>{data.phone}</div>
            <div>{data.location}</div>
          </div>
        </div>
        <div className="mt-8">
          <div className="text-sm uppercase tracking-wider opacity-70 mb-2" style={{ fontFamily: theme.fontHeading }}>Skills</div>
          <div className="space-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-sm">{skill}</div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div className="text-sm uppercase tracking-wider opacity-70 mb-2" style={{ fontFamily: theme.fontHeading }}>Education</div>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="text-sm">{edu.degree}</div>
              <div className="text-xs opacity-80">{edu.school}</div>
              <div className="text-xs opacity-80">{edu.year}</div>
            </div>
          ))}
        </div>
        {data.languages && data.languages.length > 0 && (
          <div className="mt-8">
            <div className="text-sm uppercase tracking-wider opacity-70 mb-2" style={{ fontFamily: theme.fontHeading }}>Languages</div>
            {data.languages.map((lang, i) => (
              <div key={i} className="text-sm">{lang.language} - {lang.proficiency}</div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="font-bold text-lg mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>About Me</div>
          <p className="text-base leading-relaxed" style={{ color: theme.textSecondary }}>{data.summary}</p>
        </div>
        <div>
          <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Work Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="font-semibold text-base" style={{ color: theme.textPrimary }}>{exp.title}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{exp.company} | {exp.date}</div>
            </div>
          ))}
        </div>
        {data.certifications && data.certifications.length > 0 && (
          <div className="mt-6">
            <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Certifications</div>
            {data.certifications.map((cert, i) => (
              <div key={i} className="mb-2">
                <div className="text-base" style={{ color: theme.textPrimary }}>{cert.name}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{cert.issuer} - {cert.year}</div>
              </div>
            ))}
          </div>
        )}
        {data.referees && data.referees.length > 0 && (
          <div className="mt-6">
            <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Referees</div>
            {data.referees.map((ref, i) => (
              <div key={i} className="mb-3">
                <div className="font-semibold text-sm" style={{ color: theme.textPrimary }}>{ref.name}</div>
                <div className="text-xs" style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                <div className="text-xs" style={{ color: theme.textMuted }}>{ref.phone} | {ref.email}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Right Sidebar Layout - Sidebar on right with main content on left
export function SidebarRightLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full text-sm leading-relaxed flex" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="font-bold text-3xl" style={{ color: theme.textPrimary, fontFamily: theme.fontHeading }}>{data.name}</div>
          <div className="text-lg mt-1" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>{data.title}</div>
        </div>
        <div className="mb-6">
          <div className="font-bold text-lg mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Professional Summary</div>
          <p className="text-base leading-relaxed" style={{ color: theme.textSecondary }}>{data.summary}</p>
        </div>
        <div>
          <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Work Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="font-semibold text-base" style={{ color: theme.textPrimary }}>{exp.title}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{exp.company} | {exp.date}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 p-6" style={{ backgroundColor: theme.primaryLight }}>
        <div className="mb-6">
          <div className="text-sm uppercase tracking-wider mb-2 font-semibold" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Contact</div>
          <div className="text-sm space-y-2" style={{ color: theme.textSecondary }}>
            <div>{data.email}</div>
            <div>{data.phone}</div>
            <div>{data.location}</div>
          </div>
        </div>
        <div className="mb-6">
          <div className="text-sm uppercase tracking-wider mb-2 font-semibold" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Skills</div>
          <div className="space-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-sm" style={{ color: theme.textSecondary }}>{skill}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm uppercase tracking-wider mb-2 font-semibold" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Education</div>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="text-sm" style={{ color: theme.textSecondary }}>{edu.degree}</div>
              <div className="text-xs" style={{ color: theme.textMuted }}>{edu.school}</div>
              <div className="text-xs" style={{ color: theme.textMuted }}>{edu.year}</div>
            </div>
          ))}
        </div>
        {data.languages && data.languages.length > 0 && (
          <div className="mt-6">
            <div className="text-sm uppercase tracking-wider mb-2 font-semibold" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Languages</div>
            {data.languages.map((lang, i) => (
              <div key={i} className="text-sm" style={{ color: theme.textSecondary }}>{lang.language} - {lang.proficiency}</div>
            ))}
          </div>
        )}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mt-6">
            <div className="text-sm uppercase tracking-wider mb-2 font-semibold" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Certifications</div>
            {data.certifications.map((cert, i) => (
              <div key={i} className="mb-2">
                <div className="text-sm" style={{ color: theme.textSecondary }}>{cert.name}</div>
                <div className="text-xs" style={{ color: theme.textMuted }}>{cert.issuer} - {cert.year}</div>
              </div>
            ))}
          </div>
        )}
        {data.referees && data.referees.length > 0 && (
          <div className="mt-6">
            <div className="text-sm uppercase tracking-wider mb-2 font-semibold" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Referees</div>
            {data.referees.map((ref, i) => (
              <div key={i} className="mb-2">
                <div className="text-sm font-medium" style={{ color: theme.textSecondary }}>{ref.name}</div>
                <div className="text-xs" style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                <div className="text-xs" style={{ color: theme.textMuted }}>{ref.email}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Split Header Layout - Bold header with split content below
export function SplitHeaderLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full text-sm leading-relaxed" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="p-6" style={{ backgroundColor: theme.primary, color: "white" }}>
        <div className="flex justify-between items-end gap-4">
          <div>
            <div className="font-bold text-3xl" style={{ fontFamily: theme.fontHeading }}>{data.name}</div>
            <div className="text-lg opacity-80 mt-1" style={{ fontFamily: theme.fontHeading }}>{data.title}</div>
          </div>
          <div className="text-right text-sm opacity-80">
            <div>{data.email}</div>
            <div>{data.phone}</div>
            <div>{data.location}</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <div className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-3 text-lg" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Professional Summary</div>
          <p className="text-base leading-relaxed" style={{ color: theme.textSecondary }}>{data.summary}</p>
        </div>
        <div className="mb-6">
          <div className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-3 text-lg" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Work Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3 flex justify-between gap-2">
              <div>
                <span className="font-semibold" style={{ color: theme.textPrimary }}>{exp.title}</span>
                <span style={{ color: theme.textMuted }}> - {exp.company}</span>
              </div>
              <span className="text-sm" style={{ color: theme.primary }}>{exp.date}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-3 text-base" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="text-base" style={{ color: theme.textSecondary }}>{edu.degree}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school} - {edu.year}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-3 text-base" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="text-sm px-2 py-1 rounded" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
        {((data.certifications?.length ?? 0) > 0 || (data.languages?.length ?? 0) > 0) && (
          <div className="grid grid-cols-2 gap-6 mt-6">
            {data.certifications && data.certifications.length > 0 && (
              <div>
                <div className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-3 text-base" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Certifications</div>
                {data.certifications.map((cert, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-sm" style={{ color: theme.textSecondary }}>{cert.name}</div>
                    <div className="text-xs" style={{ color: theme.textMuted }}>{cert.issuer} - {cert.year}</div>
                  </div>
                ))}
              </div>
            )}
            {data.languages && data.languages.length > 0 && (
              <div>
                <div className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-3 text-base" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Languages</div>
                {data.languages.map((lang, i) => (
                  <div key={i} className="text-sm" style={{ color: theme.textSecondary }}>{lang.language} - {lang.proficiency}</div>
                ))}
              </div>
            )}
          </div>
        )}
        {data.referees && data.referees.length > 0 && (
          <div className="mt-6">
            <div className="font-bold uppercase tracking-wider border-b-2 pb-2 mb-3 text-base" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Referees</div>
            <div className="grid grid-cols-2 gap-4">
              {data.referees.map((ref, i) => (
                <div key={i} className="text-sm">
                  <div className="font-semibold" style={{ color: theme.textPrimary }}>{ref.name}</div>
                  <div style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                  <div style={{ color: theme.textMuted }}>{ref.phone} | {ref.email}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Two Column Layout - Equal columns for balanced presentation
export function TwoColumnLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full p-8 text-sm leading-relaxed" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="text-center border-b-4 pb-4 mb-6" style={{ borderColor: theme.primary }}>
        <div className="font-bold text-3xl" style={{ color: theme.textPrimary, fontFamily: theme.fontHeading }}>{data.name}</div>
        <div className="text-lg tracking-wide mt-1" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="flex justify-center gap-6 mt-3 text-sm flex-wrap" style={{ color: theme.textMuted }}>
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-center text-base leading-relaxed" style={{ color: theme.textSecondary }}>{data.summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="font-bold uppercase tracking-widest mb-3 text-base" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Work Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4 border-l-4 pl-3" style={{ borderColor: theme.primaryLight }}>
              <div className="font-semibold text-base" style={{ color: theme.textPrimary }}>{exp.title}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{exp.company}</div>
              <div className="text-xs" style={{ color: theme.textMuted }}>{exp.date}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="font-bold uppercase tracking-widest mb-3 text-base" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Education</div>
          {data.education.map((edu, i) => (
            <div key={i} className="border-l-4 pl-3 mb-4" style={{ borderColor: theme.primaryLight }}>
              <div className="text-base" style={{ color: theme.textSecondary }}>{edu.degree}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school}</div>
              <div className="text-xs" style={{ color: theme.textMuted }}>{edu.year}</div>
            </div>
          ))}
          <div className="font-bold uppercase tracking-widest mb-3 text-base" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Skills</div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>{skill}</span>
            ))}
          </div>
          {data.certifications && data.certifications.length > 0 && (
            <>
              <div className="font-bold uppercase tracking-widest mt-6 mb-3 text-base" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Certifications</div>
              {data.certifications.map((cert, i) => (
                <div key={i} className="border-l-4 pl-3 mb-2" style={{ borderColor: theme.primaryLight }}>
                  <div className="text-sm" style={{ color: theme.textSecondary }}>{cert.name}</div>
                  <div className="text-xs" style={{ color: theme.textMuted }}>{cert.issuer} - {cert.year}</div>
                </div>
              ))}
            </>
          )}
          {data.referees && data.referees.length > 0 && (
            <>
              <div className="font-bold uppercase tracking-widest mt-6 mb-3 text-base" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Referees</div>
              {data.referees.map((ref, i) => (
                <div key={i} className="border-l-4 pl-3 mb-2" style={{ borderColor: theme.primaryLight }}>
                  <div className="text-sm font-medium" style={{ color: theme.textSecondary }}>{ref.name}</div>
                  <div className="text-xs" style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                  <div className="text-xs" style={{ color: theme.textMuted }}>{ref.email}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
  
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Minimal Layout - Ultra-clean with maximum whitespace
export function MinimalLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full p-10 text-sm leading-relaxed font-light" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="mb-6">
        <div className="font-normal text-4xl" style={{ color: theme.textPrimary, fontFamily: theme.fontHeading }}>{data.name}</div>
        <div className="text-xl mt-1" style={{ color: theme.textMuted, fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="text-sm mt-2" style={{ color: theme.textMuted }}>{data.email} | {data.phone} | {data.location}</div>
      </div>
      <div className="h-px my-6" style={{ backgroundColor: theme.border }} />
      <p className="mb-6 text-base leading-relaxed" style={{ color: theme.textSecondary }}>{data.summary}</p>
      <div className="h-px my-6" style={{ backgroundColor: theme.border }} />
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="text-lg uppercase tracking-widest mb-4 font-medium" style={{ color: theme.textMuted, fontFamily: theme.fontHeading }}>Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="font-medium text-base" style={{ color: theme.textPrimary }}>{exp.title}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{exp.company}</div>
              <div className="text-xs" style={{ color: theme.textMuted }}>{exp.date}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-lg uppercase tracking-widest mb-4 font-medium" style={{ color: theme.textMuted, fontFamily: theme.fontHeading }}>Skills</div>
          {data.skills.map((skill, i) => (
            <div key={i} className="text-base mb-1" style={{ color: theme.textSecondary }}>{skill}</div>
          ))}
          <div className="text-lg uppercase tracking-widest mt-6 mb-4 font-medium" style={{ color: theme.textMuted, fontFamily: theme.fontHeading }}>Education</div>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="text-base" style={{ color: theme.textSecondary }}>{edu.degree}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school} - {edu.year}</div>
            </div>
          ))}
          {data.languages && data.languages.length > 0 && (
            <>
              <div className="text-lg uppercase tracking-widest mt-6 mb-4 font-medium" style={{ color: theme.textMuted, fontFamily: theme.fontHeading }}>Languages</div>
              {data.languages.map((lang, i) => (
                <div key={i} className="text-base mb-1" style={{ color: theme.textSecondary }}>{lang.language} - {lang.proficiency}</div>
              ))}
            </>
          )}
          {data.referees && data.referees.length > 0 && (
            <>
              <div className="text-lg uppercase tracking-widest mt-6 mb-4 font-medium" style={{ color: theme.textMuted, fontFamily: theme.fontHeading }}>Referees</div>
              {data.referees.map((ref, i) => (
                <div key={i} className="mb-3">
                  <div className="text-base font-medium" style={{ color: theme.textSecondary }}>{ref.name}</div>
                  <div className="text-sm" style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                  <div className="text-xs" style={{ color: theme.textMuted }}>{ref.phone} | {ref.email}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
  
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Timeline Layout - Experience displayed as vertical timeline
export function TimelineLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full p-8 text-sm leading-relaxed" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="text-center mb-6">
        <div className="font-bold text-3xl" style={{ color: theme.textPrimary, fontFamily: theme.fontHeading }}>{data.name}</div>
        <div className="text-lg mt-1" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="flex justify-center gap-4 mt-3 text-sm flex-wrap" style={{ color: theme.textMuted }}>
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-center text-base leading-relaxed" style={{ color: theme.textSecondary }}>{data.summary}</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="font-bold text-lg mb-4" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Experience</div>
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-0.5" style={{ backgroundColor: theme.primaryLight }} />
            {data.experience.map((exp, i) => (
              <div key={i} className="relative mb-5">
                <div className="absolute -left-4 top-1 w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }} />
                <div className="font-semibold text-base" style={{ color: theme.textPrimary }}>{exp.title}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{exp.company}</div>
                <div className="text-xs" style={{ color: theme.primary }}>{exp.date}</div>
              </div>
            ))}
          </div>
          <div className="font-bold text-lg mt-6 mb-4" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Education</div>
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-0.5" style={{ backgroundColor: theme.primaryLight }} />
            {data.education.map((edu, i) => (
              <div key={i} className="relative mb-4">
                <div className="absolute -left-4 top-1 w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
                <div className="text-base" style={{ color: theme.textPrimary }}>{edu.degree}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school}</div>
                <div className="text-xs" style={{ color: theme.primary }}>{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Skills</div>
          <div className="space-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-sm px-3 py-1 rounded" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>{skill}</div>
            ))}
          </div>
          {data.languages && data.languages.length > 0 && (
            <>
              <div className="font-bold text-lg mt-6 mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Languages</div>
              {data.languages.map((lang, i) => (
                <div key={i} className="text-sm mb-1" style={{ color: theme.textSecondary }}>{lang.language} - {lang.proficiency}</div>
              ))}
            </>
          )}
          {data.certifications && data.certifications.length > 0 && (
            <>
              <div className="font-bold text-lg mt-6 mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Certifications</div>
              {data.certifications.map((cert, i) => (
                <div key={i} className="mb-2">
                  <div className="text-sm" style={{ color: theme.textSecondary }}>{cert.name}</div>
                  <div className="text-xs" style={{ color: theme.textMuted }}>{cert.issuer}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {data.referees && data.referees.length > 0 && (
        <div className="mt-6 pt-4 border-t" style={{ borderColor: theme.border }}>
          <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Referees</div>
          <div className="grid grid-cols-2 gap-4">
            {data.referees.map((ref, i) => (
              <div key={i} className="text-sm">
                <div className="font-semibold" style={{ color: theme.textPrimary }}>{ref.name}</div>
                <div style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                <div style={{ color: theme.textMuted }}>{ref.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Compact Layout - Dense layout for maximum content
export function CompactLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full p-6 text-xs leading-snug" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="flex justify-between items-start border-b-2 pb-3 mb-4" style={{ borderColor: theme.primary }}>
        <div>
          <div className="font-bold text-2xl" style={{ color: theme.textPrimary, fontFamily: theme.fontHeading }}>{data.name}</div>
          <div className="text-base" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>{data.title}</div>
        </div>
        <div className="text-right text-xs" style={{ color: theme.textMuted }}>
          <div>{data.email}</div>
          <div>{data.phone}</div>
          <div>{data.location}</div>
        </div>
      </div>
      <p className="mb-4 text-sm" style={{ color: theme.textSecondary }}>{data.summary}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <div className="font-semibold text-sm" style={{ color: theme.textPrimary }}>{exp.title}</div>
              <div className="flex justify-between gap-1" style={{ color: theme.textMuted }}>
                <span>{exp.company}</span>
                <span className="text-xs">{exp.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Education</div>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <div className="text-sm" style={{ color: theme.textPrimary }}>{edu.degree}</div>
              <div className="flex justify-between gap-1" style={{ color: theme.textMuted }}>
                <span>{edu.school}</span>
                <span>{edu.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Skills</div>
        <div className="flex flex-wrap gap-1">
          {data.skills.map((skill, i) => (
            <span key={i} className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>{skill}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <div className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Certifications</div>
            {data.certifications.map((cert, i) => (
              <div key={i} className="mb-1 text-xs" style={{ color: theme.textSecondary }}>{cert.name}</div>
            ))}
          </div>
        )}
        {data.languages && data.languages.length > 0 && (
          <div>
            <div className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Languages</div>
            {data.languages.map((lang, i) => (
              <div key={i} className="text-xs" style={{ color: theme.textSecondary }}>{lang.language}</div>
            ))}
          </div>
        )}
        {data.referees && data.referees.length > 0 && (
          <div>
            <div className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Referees</div>
            {data.referees.slice(0, 2).map((ref, i) => (
              <div key={i} className="mb-1">
                <div className="text-xs font-medium" style={{ color: theme.textSecondary }}>{ref.name}</div>
                <div className="text-xs" style={{ color: theme.textMuted }}>{ref.email}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Executive Layout - Large header for senior professionals
export function ExecutiveLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full text-sm leading-relaxed" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="p-8" style={{ backgroundColor: theme.primary }}>
        <div className="font-bold text-4xl text-white" style={{ fontFamily: theme.fontHeading }}>{data.name}</div>
        <div className="text-xl text-white opacity-90 mt-2" style={{ fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="mt-4 text-sm text-white opacity-80">
          {data.email} | {data.phone} | {data.location}
        </div>
        <div className="mt-4 text-base text-white opacity-90 leading-relaxed">{data.summary}</div>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="font-bold text-xl mb-4" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Professional Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-5 pl-4 border-l-4" style={{ borderColor: theme.primary }}>
                <div className="font-semibold text-lg" style={{ color: theme.textPrimary }}>{exp.title}</div>
                <div className="flex justify-between gap-2">
                  <span style={{ color: theme.textSecondary }}>{exp.company}</span>
                  <span className="font-medium" style={{ color: theme.primary }}>{exp.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="font-bold text-lg mb-3" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="font-medium" style={{ color: theme.textPrimary }}>{edu.degree}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school}</div>
                <div className="text-sm" style={{ color: theme.primary }}>{edu.year}</div>
              </div>
            ))}
            <div className="font-bold text-lg mt-6 mb-3" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Core Competencies</div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>{skill}</span>
              ))}
            </div>
            {data.certifications && data.certifications.length > 0 && (
              <>
                <div className="font-bold text-lg mt-6 mb-3" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Certifications</div>
                {data.certifications.map((cert, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-sm" style={{ color: theme.textSecondary }}>{cert.name}</div>
                    <div className="text-xs" style={{ color: theme.textMuted }}>{cert.issuer} ({cert.year})</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {data.referees && data.referees.length > 0 && (
          <div className="mt-6 pt-4 border-t" style={{ borderColor: theme.border }}>
            <div className="font-bold text-lg mb-3" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>References</div>
            <div className="grid grid-cols-2 gap-4">
              {data.referees.map((ref, i) => (
                <div key={i}>
                  <div className="font-medium" style={{ color: theme.textPrimary }}>{ref.name}</div>
                  <div className="text-sm" style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                  <div className="text-sm" style={{ color: theme.textMuted }}>{ref.phone} | {ref.email}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Metro Layout - Modern card-based tiles
export function MetroLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full p-6 text-sm leading-relaxed" style={{ backgroundColor: theme.backgroundAlt, fontFamily }}>
      <div className="p-5 rounded-lg mb-4" style={{ backgroundColor: theme.primary }}>
        <div className="font-bold text-3xl text-white" style={{ fontFamily: theme.fontHeading }}>{data.name}</div>
        <div className="text-lg text-white opacity-80 mt-1" style={{ fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="flex gap-4 mt-3 text-sm text-white opacity-70 flex-wrap">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </div>
      <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: theme.background }}>
        <p className="text-base" style={{ color: theme.textSecondary }}>{data.summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background }}>
          <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3 pb-3 border-b last:border-b-0" style={{ borderColor: theme.border }}>
              <div className="font-semibold" style={{ color: theme.textPrimary }}>{exp.title}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{exp.company} | {exp.date}</div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background }}>
            <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div style={{ color: theme.textPrimary }}>{edu.degree}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school} - {edu.year}</div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background }}>
            <div className="font-bold text-lg mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {((data.certifications?.length ?? 0) > 0 || (data.languages?.length ?? 0) > 0 || (data.referees?.length ?? 0) > 0) && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {data.certifications && data.certifications.length > 0 && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: theme.background }}>
              <div className="font-bold text-sm mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Certifications</div>
              {data.certifications.map((cert, i) => (
                <div key={i} className="text-xs mb-1" style={{ color: theme.textSecondary }}>{cert.name}</div>
              ))}
            </div>
          )}
          {data.languages && data.languages.length > 0 && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: theme.background }}>
              <div className="font-bold text-sm mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Languages</div>
              {data.languages.map((lang, i) => (
                <div key={i} className="text-xs" style={{ color: theme.textSecondary }}>{lang.language}</div>
              ))}
            </div>
          )}
          {data.referees && data.referees.length > 0 && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: theme.background }}>
              <div className="font-bold text-sm mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Referees</div>
              {data.referees.slice(0, 2).map((ref, i) => (
                <div key={i} className="text-xs mb-1" style={{ color: theme.textSecondary }}>{ref.name}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Boxed Layout - Distinct bordered sections
export function BoxedLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full p-8 text-sm leading-relaxed" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="border-2 p-4 mb-4" style={{ borderColor: theme.primary }}>
        <div className="font-bold text-3xl" style={{ color: theme.textPrimary, fontFamily: theme.fontHeading }}>{data.name}</div>
        <div className="text-lg" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="flex gap-6 mt-2 text-sm flex-wrap" style={{ color: theme.textMuted }}>
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </div>
      <div className="border p-4 mb-4" style={{ borderColor: theme.border }}>
        <div className="font-bold uppercase text-sm tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Summary</div>
        <p className="text-base" style={{ color: theme.textSecondary }}>{data.summary}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4" style={{ borderColor: theme.border }}>
          <div className="font-bold uppercase text-sm tracking-wider mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="font-semibold" style={{ color: theme.textPrimary }}>{exp.title}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{exp.company}</div>
              <div className="text-xs" style={{ color: theme.primary }}>{exp.date}</div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="border p-4" style={{ borderColor: theme.border }}>
            <div className="font-bold uppercase text-sm tracking-wider mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div style={{ color: theme.textPrimary }}>{edu.degree}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school} - {edu.year}</div>
              </div>
            ))}
          </div>
          <div className="border p-4" style={{ borderColor: theme.border }}>
            <div className="font-bold uppercase text-sm tracking-wider mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Skills</div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 border text-xs" style={{ borderColor: theme.primary, color: theme.primary }}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {((data.certifications?.length ?? 0) > 0 || (data.languages?.length ?? 0) > 0) && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.certifications && data.certifications.length > 0 && (
            <div className="border p-4" style={{ borderColor: theme.border }}>
              <div className="font-bold uppercase text-sm tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Certifications</div>
              {data.certifications.map((cert, i) => (
                <div key={i} className="mb-1 text-sm" style={{ color: theme.textSecondary }}>{cert.name} - {cert.year}</div>
              ))}
            </div>
          )}
          {data.languages && data.languages.length > 0 && (
            <div className="border p-4" style={{ borderColor: theme.border }}>
              <div className="font-bold uppercase text-sm tracking-wider mb-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Languages</div>
              {data.languages.map((lang, i) => (
                <div key={i} className="text-sm" style={{ color: theme.textSecondary }}>{lang.language} - {lang.proficiency}</div>
              ))}
            </div>
          )}
        </div>
      )}
      {data.referees && data.referees.length > 0 && (
        <div className="border p-4 mt-4" style={{ borderColor: theme.border }}>
          <div className="font-bold uppercase text-sm tracking-wider mb-3" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>Referees</div>
          <div className="grid grid-cols-2 gap-4">
            {data.referees.map((ref, i) => (
              <div key={i}>
                <div className="font-medium" style={{ color: theme.textPrimary }}>{ref.name}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{ref.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Accent Bar Layout - Colored accent bars for sections
export function AccentBarLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full p-8 text-sm leading-relaxed" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="mb-6">
        <div className="font-bold text-3xl" style={{ color: theme.textPrimary, fontFamily: theme.fontHeading }}>{data.name}</div>
        <div className="h-1 w-24 mt-2" style={{ backgroundColor: theme.primary }} />
        <div className="text-lg mt-2" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>{data.title}</div>
        <div className="flex gap-6 mt-3 text-sm flex-wrap" style={{ color: theme.textMuted }}>
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-6 w-1" style={{ backgroundColor: theme.primary }} />
          <span className="font-bold uppercase tracking-wider" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>About</span>
        </div>
        <p className="text-base pl-4" style={{ color: theme.textSecondary }}>{data.summary}</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-6 w-1" style={{ backgroundColor: theme.primary }} />
            <span className="font-bold uppercase tracking-wider" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Experience</span>
          </div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4 pl-4">
              <div className="font-semibold text-base" style={{ color: theme.textPrimary }}>{exp.title}</div>
              <div className="flex justify-between gap-2 text-sm" style={{ color: theme.textMuted }}>
                <span>{exp.company}</span>
                <span style={{ color: theme.primary }}>{exp.date}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 mb-3 mt-6">
            <div className="h-6 w-1" style={{ backgroundColor: theme.accent }} />
            <span className="font-bold uppercase tracking-wider" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Education</span>
          </div>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3 pl-4">
              <div className="text-base" style={{ color: theme.textPrimary }}>{edu.degree}</div>
              <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school} - {edu.year}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-6 w-1" style={{ backgroundColor: theme.primary }} />
            <span className="font-bold uppercase tracking-wider" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Skills</span>
          </div>
          <div className="pl-4 space-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-sm px-3 py-1 rounded" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>{skill}</div>
            ))}
          </div>
          {data.certifications && data.certifications.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-3 mt-6">
                <div className="h-6 w-1" style={{ backgroundColor: theme.accent }} />
                <span className="font-bold uppercase tracking-wider" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Certifications</span>
              </div>
              <div className="pl-4">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-sm" style={{ color: theme.textSecondary }}>{cert.name}</div>
                    <div className="text-xs" style={{ color: theme.textMuted }}>{cert.issuer}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {data.languages && data.languages.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-3 mt-6">
                <div className="h-6 w-1" style={{ backgroundColor: theme.accent }} />
                <span className="font-bold uppercase tracking-wider" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Languages</span>
              </div>
              <div className="pl-4">
                {data.languages.map((lang, i) => (
                  <div key={i} className="text-sm" style={{ color: theme.textSecondary }}>{lang.language} - {lang.proficiency}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {data.referees && data.referees.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-6 w-1" style={{ backgroundColor: theme.primary }} />
            <span className="font-bold uppercase tracking-wider" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Referees</span>
          </div>
          <div className="grid grid-cols-2 gap-4 pl-4">
            {data.referees.map((ref, i) => (
              <div key={i}>
                <div className="font-medium" style={{ color: theme.textPrimary }}>{ref.name}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{ref.email}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Profile Band Layout - Wide skills band at top
export function ProfileBandLayout({ theme, data, noViewport, customFont }: LayoutProps) {
  const fontFamily = customFont || theme.fontBody;
  const content = (
    <div className="w-full h-full text-sm leading-relaxed" style={{ backgroundColor: theme.background, fontFamily }}>
      <div className="p-6" style={{ backgroundColor: theme.primaryLight }}>
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="font-bold text-3xl" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>{data.name}</div>
            <div className="text-lg" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>{data.title}</div>
          </div>
          <div className="text-right text-sm" style={{ color: theme.textMuted }}>
            <div>{data.email}</div>
            <div>{data.phone}</div>
            <div>{data.location}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {data.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: theme.primary, color: "white" }}>{skill}</span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <p className="text-base leading-relaxed" style={{ color: theme.textSecondary }}>{data.summary}</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="font-bold text-lg mb-3 pb-2 border-b-2" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold text-base" style={{ color: theme.textPrimary }}>{exp.title}</div>
                <div className="flex justify-between gap-2 text-sm" style={{ color: theme.textMuted }}>
                  <span>{exp.company}</span>
                  <span style={{ color: theme.primary }}>{exp.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="font-bold text-lg mb-3 pb-2 border-b-2" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Education</div>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div style={{ color: theme.textPrimary }}>{edu.degree}</div>
                <div className="text-sm" style={{ color: theme.textMuted }}>{edu.school}</div>
                <div className="text-xs" style={{ color: theme.primary }}>{edu.year}</div>
              </div>
            ))}
            {data.certifications && data.certifications.length > 0 && (
              <>
                <div className="font-bold text-lg mb-3 pb-2 border-b-2 mt-6" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Certifications</div>
                {data.certifications.map((cert, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-sm" style={{ color: theme.textSecondary }}>{cert.name}</div>
                    <div className="text-xs" style={{ color: theme.textMuted }}>{cert.issuer} ({cert.year})</div>
                  </div>
                ))}
              </>
            )}
            {data.languages && data.languages.length > 0 && (
              <>
                <div className="font-bold text-lg mb-3 pb-2 border-b-2 mt-6" style={{ color: theme.primaryDark, borderColor: theme.primaryLight, fontFamily: theme.fontHeading }}>Languages</div>
                {data.languages.map((lang, i) => (
                  <div key={i} className="text-sm mb-1" style={{ color: theme.textSecondary }}>{lang.language} - {lang.proficiency}</div>
                ))}
              </>
            )}
          </div>
        </div>
        {data.referees && data.referees.length > 0 && (
          <div className="mt-6 pt-4 border-t" style={{ borderColor: theme.border }}>
            <div className="font-bold text-lg mb-3" style={{ color: theme.primaryDark, fontFamily: theme.fontHeading }}>Referees</div>
            <div className="grid grid-cols-2 gap-4">
              {data.referees.map((ref, i) => (
                <div key={i}>
                  <div className="font-medium" style={{ color: theme.textPrimary }}>{ref.name}</div>
                  <div className="text-sm" style={{ color: theme.textMuted }}>{ref.title}, {ref.company}</div>
                  <div className="text-sm" style={{ color: theme.textMuted }}>{ref.phone} | {ref.email}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  if (noViewport) return content;
  return <PreviewViewport fontFamily={fontFamily}>{content}</PreviewViewport>;
}

// Layout registry map
export const layoutComponents: Record<string, React.FC<LayoutProps>> = {
  "single-column": SingleColumnLayout,
  "sidebar-left": SidebarLeftLayout,
  "sidebar-right": SidebarRightLayout,
  "split-header": SplitHeaderLayout,
  "two-column": TwoColumnLayout,
  "minimal": MinimalLayout,
  "timeline": TimelineLayout,
  "compact": CompactLayout,
  "executive": ExecutiveLayout,
  "metro": MetroLayout,
  "boxed": BoxedLayout,
  "accent-bar": AccentBarLayout,
  "profile-band": ProfileBandLayout,
};

// Get layout component by ID
export function getLayoutComponent(layoutId: string): React.FC<LayoutProps> {
  return layoutComponents[layoutId] || SingleColumnLayout;
}
