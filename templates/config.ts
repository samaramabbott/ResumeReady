// Template Configuration - Registries for layouts, themes, and categories

export interface TemplateTheme {
  id: string;
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  background: string;
  backgroundAlt: string;
  fontHeading: string;
  fontBody: string;
  style: "modern" | "classic" | "elegant" | "creative" | "minimal";
}

export interface TemplateLayout {
  id: string;
  name: string;
  description: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
}

export interface GeneratedTemplate {
  id: string;
  name: string;
  category: string;
  layout: string;
  theme: string;
  isPremium: boolean;
}

// Layout Registry - 13 distinct layouts
export const layouts: TemplateLayout[] = [
  { id: "single-column", name: "Single Column", description: "Clean, traditional single-column layout" },
  { id: "sidebar-left", name: "Left Sidebar", description: "Sidebar on the left with main content on right" },
  { id: "sidebar-right", name: "Right Sidebar", description: "Sidebar on the right with main content on left" },
  { id: "split-header", name: "Split Header", description: "Bold header section with split content below" },
  { id: "two-column", name: "Two Column", description: "Equal two-column layout for balanced presentation" },
  { id: "minimal", name: "Minimal", description: "Ultra-clean minimal design with maximum whitespace" },
  { id: "timeline", name: "Timeline", description: "Experience displayed as a vertical timeline with dots" },
  { id: "compact", name: "Compact", description: "Dense layout for maximum content in limited space" },
  { id: "executive", name: "Executive", description: "Large header design for senior professionals" },
  { id: "metro", name: "Metro", description: "Modern card-based tile design" },
  { id: "boxed", name: "Boxed", description: "Content organized in distinct bordered sections" },
  { id: "accent-bar", name: "Accent Bar", description: "Colored accent bars highlighting each section" },
  { id: "profile-band", name: "Profile Band", description: "Wide skills band at the top with profile info" },
];

// Theme Registry - 18 color palettes with varied fonts and styles
export const themes: TemplateTheme[] = [
  {
    id: "blue",
    name: "Modern Blue",
    primary: "rgb(37, 99, 235)",
    primaryLight: "rgb(219, 234, 254)",
    primaryDark: "rgb(30, 64, 175)",
    accent: "rgb(59, 130, 246)",
    textPrimary: "rgb(15, 23, 42)",
    textSecondary: "rgb(71, 85, 105)",
    textMuted: "rgb(148, 163, 184)",
    border: "rgb(226, 232, 240)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(248, 250, 252)",
    fontHeading: "'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    style: "modern",
  },
  {
    id: "navy",
    name: "Classic Navy",
    primary: "rgb(30, 58, 138)",
    primaryLight: "rgb(219, 234, 254)",
    primaryDark: "rgb(23, 37, 84)",
    accent: "rgb(59, 130, 246)",
    textPrimary: "rgb(15, 23, 42)",
    textSecondary: "rgb(51, 65, 85)",
    textMuted: "rgb(100, 116, 139)",
    border: "rgb(203, 213, 225)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(241, 245, 249)",
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Merriweather', serif",
    style: "classic",
  },
  {
    id: "teal",
    name: "Bold Teal",
    primary: "rgb(13, 148, 136)",
    primaryLight: "rgb(204, 251, 241)",
    primaryDark: "rgb(17, 94, 89)",
    accent: "rgb(20, 184, 166)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(75, 85, 99)",
    textMuted: "rgb(156, 163, 175)",
    border: "rgb(229, 231, 235)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(240, 253, 250)",
    fontHeading: "'Poppins', sans-serif",
    fontBody: "'Open Sans', sans-serif",
    style: "modern",
  },
  {
    id: "green",
    name: "Professional Green",
    primary: "rgb(22, 163, 74)",
    primaryLight: "rgb(220, 252, 231)",
    primaryDark: "rgb(21, 128, 61)",
    accent: "rgb(34, 197, 94)",
    textPrimary: "rgb(20, 30, 30)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(209, 213, 219)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(240, 253, 244)",
    fontHeading: "'Roboto', sans-serif",
    fontBody: "'Roboto', sans-serif",
    style: "modern",
  },
  {
    id: "purple",
    name: "Executive Purple",
    primary: "rgb(88, 28, 135)",
    primaryLight: "rgb(243, 232, 255)",
    primaryDark: "rgb(59, 7, 100)",
    accent: "rgb(147, 51, 234)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(229, 231, 235)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(250, 245, 255)",
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Lora', serif",
    style: "elegant",
  },
  {
    id: "orange",
    name: "Creative Orange",
    primary: "rgb(234, 88, 12)",
    primaryLight: "rgb(255, 237, 213)",
    primaryDark: "rgb(194, 65, 12)",
    accent: "rgb(251, 146, 60)",
    textPrimary: "rgb(28, 25, 23)",
    textSecondary: "rgb(68, 64, 60)",
    textMuted: "rgb(120, 113, 108)",
    border: "rgb(231, 229, 228)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(255, 247, 237)",
    fontHeading: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Plus Jakarta Sans', sans-serif",
    style: "creative",
  },
  {
    id: "burgundy",
    name: "Elegant Burgundy",
    primary: "rgb(127, 29, 29)",
    primaryLight: "rgb(254, 226, 226)",
    primaryDark: "rgb(69, 10, 10)",
    accent: "rgb(185, 28, 28)",
    textPrimary: "rgb(28, 25, 23)",
    textSecondary: "rgb(68, 64, 60)",
    textMuted: "rgb(120, 113, 108)",
    border: "rgb(231, 229, 228)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(254, 242, 242)",
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Merriweather', serif",
    style: "elegant",
  },
  {
    id: "gray",
    name: "Minimal Gray",
    primary: "rgb(75, 85, 99)",
    primaryLight: "rgb(243, 244, 246)",
    primaryDark: "rgb(31, 41, 55)",
    accent: "rgb(107, 114, 128)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(75, 85, 99)",
    textMuted: "rgb(156, 163, 175)",
    border: "rgb(229, 231, 235)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(249, 250, 251)",
    fontHeading: "'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    style: "minimal",
  },
  {
    id: "black",
    name: "Simple Black",
    primary: "rgb(0, 0, 0)",
    primaryLight: "rgb(243, 244, 246)",
    primaryDark: "rgb(0, 0, 0)",
    accent: "rgb(55, 65, 81)",
    textPrimary: "rgb(0, 0, 0)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(209, 213, 219)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(249, 250, 251)",
    fontHeading: "'Roboto', sans-serif",
    fontBody: "'Open Sans', sans-serif",
    style: "minimal",
  },
  {
    id: "mint",
    name: "Fresh Mint",
    primary: "rgb(5, 150, 105)",
    primaryLight: "rgb(209, 250, 229)",
    primaryDark: "rgb(4, 120, 87)",
    accent: "rgb(16, 185, 129)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(209, 250, 229)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(236, 253, 245)",
    fontHeading: "'Montserrat', sans-serif",
    fontBody: "'Open Sans', sans-serif",
    style: "modern",
  },
  {
    id: "coral",
    name: "Warm Coral",
    primary: "rgb(239, 68, 68)",
    primaryLight: "rgb(254, 226, 226)",
    primaryDark: "rgb(185, 28, 28)",
    accent: "rgb(248, 113, 113)",
    textPrimary: "rgb(28, 25, 23)",
    textSecondary: "rgb(68, 64, 60)",
    textMuted: "rgb(120, 113, 108)",
    border: "rgb(231, 229, 228)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(255, 241, 242)",
    fontHeading: "'Poppins', sans-serif",
    fontBody: "'Poppins', sans-serif",
    style: "creative",
  },
  {
    id: "indigo",
    name: "Deep Indigo",
    primary: "rgb(79, 70, 229)",
    primaryLight: "rgb(224, 231, 255)",
    primaryDark: "rgb(55, 48, 163)",
    accent: "rgb(129, 140, 248)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(224, 231, 255)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(238, 242, 255)",
    fontHeading: "'Montserrat', sans-serif",
    fontBody: "'Inter', sans-serif",
    style: "modern",
  },
  {
    id: "slate",
    name: "Modern Slate",
    primary: "rgb(71, 85, 105)",
    primaryLight: "rgb(241, 245, 249)",
    primaryDark: "rgb(30, 41, 59)",
    accent: "rgb(100, 116, 139)",
    textPrimary: "rgb(15, 23, 42)",
    textSecondary: "rgb(51, 65, 85)",
    textMuted: "rgb(148, 163, 184)",
    border: "rgb(226, 232, 240)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(248, 250, 252)",
    fontHeading: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Inter', sans-serif",
    style: "minimal",
  },
  {
    id: "rose",
    name: "Soft Rose",
    primary: "rgb(190, 18, 60)",
    primaryLight: "rgb(255, 228, 230)",
    primaryDark: "rgb(136, 19, 55)",
    accent: "rgb(244, 63, 94)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(254, 205, 211)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(255, 241, 242)",
    fontHeading: "'Lora', serif",
    fontBody: "'Open Sans', sans-serif",
    style: "elegant",
  },
  {
    id: "amber",
    name: "Golden Amber",
    primary: "rgb(180, 83, 9)",
    primaryLight: "rgb(254, 243, 199)",
    primaryDark: "rgb(146, 64, 14)",
    accent: "rgb(245, 158, 11)",
    textPrimary: "rgb(28, 25, 23)",
    textSecondary: "rgb(68, 64, 60)",
    textMuted: "rgb(120, 113, 108)",
    border: "rgb(253, 230, 138)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(255, 251, 235)",
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Roboto', sans-serif",
    style: "classic",
  },
  {
    id: "cyan",
    name: "Bright Cyan",
    primary: "rgb(8, 145, 178)",
    primaryLight: "rgb(207, 250, 254)",
    primaryDark: "rgb(14, 116, 144)",
    accent: "rgb(6, 182, 212)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(165, 243, 252)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(236, 254, 255)",
    fontHeading: "'Poppins', sans-serif",
    fontBody: "'Open Sans', sans-serif",
    style: "modern",
  },
  {
    id: "emerald",
    name: "Rich Emerald",
    primary: "rgb(4, 120, 87)",
    primaryLight: "rgb(209, 250, 229)",
    primaryDark: "rgb(6, 78, 59)",
    accent: "rgb(16, 185, 129)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(167, 243, 208)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(236, 253, 245)",
    fontHeading: "'Merriweather', serif",
    fontBody: "'Lora', serif",
    style: "classic",
  },
  {
    id: "violet",
    name: "Royal Violet",
    primary: "rgb(109, 40, 217)",
    primaryLight: "rgb(237, 233, 254)",
    primaryDark: "rgb(76, 29, 149)",
    accent: "rgb(139, 92, 246)",
    textPrimary: "rgb(17, 24, 39)",
    textSecondary: "rgb(55, 65, 81)",
    textMuted: "rgb(107, 114, 128)",
    border: "rgb(221, 214, 254)",
    background: "rgb(255, 255, 255)",
    backgroundAlt: "rgb(245, 243, 255)",
    fontHeading: "'Plus Jakarta Sans', sans-serif",
    fontBody: "'Poppins', sans-serif",
    style: "creative",
  },
];

// Category Registry - Career stages and industries
export const categories: TemplateCategory[] = [
  { id: "entry-level", name: "Entry Level", description: "For new graduates and first-time job seekers" },
  { id: "career-change", name: "Career Change", description: "For professionals transitioning to new fields" },
  { id: "professional", name: "Professional", description: "For experienced professionals" },
  { id: "creative", name: "Creative", description: "For creative industries and roles" },
  { id: "healthcare", name: "Healthcare", description: "For medical and healthcare professionals" },
  { id: "technology", name: "Technology", description: "For IT and tech industry roles" },
  { id: "trades", name: "Trades", description: "For skilled trades and manual labor" },
  { id: "education", name: "Education", description: "For teachers and education professionals" },
  { id: "retail-service", name: "Retail & Service", description: "For retail and customer service roles" },
  { id: "long-term-unemployed", name: "Long-term Unemployed", description: "For returning to workforce after extended break" },
];

// Mapping of which layout-theme combos work best for each category
export const categoryLayoutPreferences: Record<string, string[]> = {
  "entry-level": ["single-column", "minimal", "two-column", "compact"],
  "career-change": ["sidebar-left", "split-header", "single-column", "timeline"],
  "professional": ["sidebar-left", "sidebar-right", "split-header", "executive"],
  "creative": ["two-column", "sidebar-right", "split-header", "metro", "accent-bar"],
  "healthcare": ["single-column", "sidebar-left", "minimal", "boxed"],
  "technology": ["sidebar-left", "two-column", "minimal", "metro", "timeline"],
  "trades": ["single-column", "minimal", "sidebar-left", "compact"],
  "education": ["single-column", "sidebar-left", "split-header", "timeline"],
  "retail-service": ["minimal", "single-column", "two-column", "profile-band"],
  "long-term-unemployed": ["single-column", "minimal", "sidebar-left", "compact"],
};

export const categoryThemePreferences: Record<string, string[]> = {
  "entry-level": ["blue", "mint", "gray", "slate", "cyan"],
  "career-change": ["navy", "teal", "green", "indigo", "emerald"],
  "professional": ["navy", "gray", "slate", "black", "burgundy"],
  "creative": ["orange", "coral", "violet", "rose", "amber"],
  "healthcare": ["blue", "teal", "green", "mint", "cyan"],
  "technology": ["blue", "indigo", "slate", "cyan", "purple"],
  "trades": ["gray", "green", "slate", "black", "navy"],
  "education": ["navy", "burgundy", "green", "blue", "purple"],
  "retail-service": ["mint", "coral", "orange", "teal", "amber"],
  "long-term-unemployed": ["blue", "green", "gray", "navy", "slate"],
};

// Generate template name from parts
export function generateTemplateName(layoutId: string, themeId: string): string {
  const layout = layouts.find(l => l.id === layoutId);
  const theme = themes.find(t => t.id === themeId);
  return `${theme?.name || themeId} ${layout?.name || layoutId}`;
}

// Generate all template combinations
export function generateAllTemplates(type: "resume" | "cover-letter"): GeneratedTemplate[] {
  const templates: GeneratedTemplate[] = [];
  let idCounter = 1;

  // Generate base templates: each layout x each theme = 108 templates
  for (const layout of layouts) {
    for (const theme of themes) {
      // Assign to most appropriate category based on theme/layout combo
      const category = determineCategory(layout.id, theme.id);
      
      templates.push({
        id: `${type}-${layout.id}-${theme.id}`,
        name: generateTemplateName(layout.id, theme.id),
        category,
        layout: layout.id,
        theme: theme.id,
        isPremium: false,
      });
      idCounter++;
    }
  }

  // Add category-specific variants with premium styling
  for (const cat of categories) {
    const preferredLayouts = categoryLayoutPreferences[cat.id] || layouts.slice(0, 3).map(l => l.id);
    const preferredThemes = categoryThemePreferences[cat.id] || themes.slice(0, 5).map(t => t.id);

    // Create 2 featured templates per category
    for (let i = 0; i < 2; i++) {
      const layout = preferredLayouts[i % preferredLayouts.length];
      const theme = preferredThemes[i % preferredThemes.length];
      const existingId = `${type}-${layout}-${theme}`;
      
      // Only add if not already a base template
      if (!templates.find(t => t.id === existingId && t.category === cat.name)) {
        templates.push({
          id: `${type}-${layout}-${theme}-${cat.id}`,
          name: `${generateTemplateName(layout, theme)} - ${cat.name}`,
          category: cat.name,
          layout,
          theme,
          isPremium: false,
        });
      }
    }
  }

  return templates;
}

// Determine most appropriate category based on layout and theme
function determineCategory(layoutId: string, themeId: string): string {
  // Map certain combinations to categories
  const creativeThemes = ["orange", "coral", "violet", "rose", "amber"];
  const professionalThemes = ["navy", "gray", "slate", "black", "burgundy"];
  const techThemes = ["blue", "indigo", "cyan", "purple"];
  const healthcareThemes = ["teal", "green", "mint", "emerald"];

  if (creativeThemes.includes(themeId) && ["two-column", "sidebar-right"].includes(layoutId)) {
    return "Creative";
  }
  if (professionalThemes.includes(themeId) && ["sidebar-left", "split-header"].includes(layoutId)) {
    return "Professional";
  }
  if (techThemes.includes(themeId) && ["sidebar-left", "two-column", "minimal"].includes(layoutId)) {
    return "Technology";
  }
  if (healthcareThemes.includes(themeId) && ["single-column", "sidebar-left"].includes(layoutId)) {
    return "Healthcare";
  }
  if (layoutId === "minimal" && ["gray", "black", "slate"].includes(themeId)) {
    return "Entry Level";
  }
  
  return "Professional";
}

// Get theme by ID
export function getTheme(themeId: string): TemplateTheme | undefined {
  return themes.find(t => t.id === themeId);
}

// Get layout by ID
export function getLayout(layoutId: string): TemplateLayout | undefined {
  return layouts.find(l => l.id === layoutId);
}
