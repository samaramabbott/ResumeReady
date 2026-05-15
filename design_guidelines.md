# Design Guidelines: Australian Job Seeker Platform & Resume Builder

## Design Approach

**Selected Approach:** Design System (Material Design-inspired with Productivity Tool refinements)

**Justification:** This is a utility-focused, information-dense application requiring efficiency, learnability, and accessibility for users with varying technical experience. The platform combines a complex resume builder tool with extensive educational resources, making systematic consistency essential.

**Key References:** Canva (editing interface), Notion (content organization), Google Docs (document creation), with Material Design principles for component behavior.

**Core Principles:**
- Clarity over cleverness - every interaction must be immediately understandable
- Progressive disclosure - reveal complexity only when needed
- Accessible language and visual hierarchy for diverse user base
- Trustworthy, professional aesthetic that builds confidence

## Typography

**Font Families:**
- Primary: Inter (headings, UI elements, buttons)
- Secondary: System font stack (body text, form inputs for maximum readability)

**Scale:**
- Hero headings: text-4xl to text-5xl, font-bold
- Section headings: text-2xl to text-3xl, font-semibold
- Subsection headings: text-xl, font-semibold
- Body text: text-base (16px), font-normal, leading-relaxed
- UI labels: text-sm, font-medium
- Helper text: text-xs to text-sm, font-normal

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16 (e.g., p-4, m-8, gap-6)

**Grid Structure:**
- Main navigation sidebar: Fixed width 280px (hidden on mobile, slide-out drawer)
- Content area: max-w-7xl with responsive padding (px-4 md:px-8 lg:px-12)
- Resume editor: Two-column layout (editor left 60%, live preview right 40% on desktop; stacked on mobile)
- Template gallery: Grid 1-2-3-4 columns (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- Resource sections: Single column max-w-4xl for readability

**Section Spacing:** py-12 to py-16 for major sections

## Component Library

**Navigation:**
- Top navigation bar: Logo left, user account/pricing right, sticky positioning
- Left sidebar navigation: Collapsible sections (Resume Builder, Templates, Resources, Support), active state highlighting
- Breadcrumbs for deep navigation within Resources section

**Resume Builder Interface:**
- Template selection modal: Full-screen overlay, filterable grid with category chips
- Editor toolbar: Fixed top bar with formatting controls (bold, italic, lists, alignment), section management
- Section cards: Draggable handles, expand/collapse, add/remove buttons
- Live preview pane: Real-time rendering, zoom controls, page navigation for multi-page resumes
- Save/export controls: Floating action button bottom-right, clear status indicators

**Template Cards:**
- Thumbnail preview with hover effect (slight scale, shadow increase)
- Template name and category badge
- "Preview Full" and "Use Template" buttons (revealed on hover)
- Lock icon for unpaid templates with blur effect on preview

**Payment Tiers:**
- Three pricing cards: Single Resume, 5-Pack, 10+ Pack
- Feature comparison list with checkmarks
- Prominent "Most Popular" badge on middle tier
- Clear CTAs, pricing displayed prominently

**Resource Organization:**
- Accordion sections for collapsible content categories
- Icon-based navigation (work rights icon, tax icon, job search icon)
- Quick reference cards: Service name, description, phone number, website link button
- Search bar with filtering for extensive resource lists

**Forms & Inputs:**
- Outlined text fields with floating labels
- Clear error states with inline validation messages
- Help text below inputs where needed
- Autosave indicators for resume content

**Job Board Directory:**
- Grid of cards (2-3 columns desktop, 1 mobile)
- Logo placeholder, site name, brief description, "Visit Site" button
- Category filters (General, Industry-Specific, Government, etc.)

**Information Panels:**
- Expandable cards for detailed guides (Fair Work, ATO, Superannuation)
- Clear headings, bullet points, external link icons
- Contact information in highlighted boxes (phone, website, address)

**Targeted Support Sections:**
- Tab navigation for different groups (Parents, 45+, Long-term Unemployed, etc.)
- Icon representation for each group
- Benefit lists, resource links, relevant programs

**Application Guide:**
- Step-by-step numbered sections
- Checklist format for preparation items
- Side-by-side comparison (Online vs. In-Person methods)

**Call-to-Action Elements:**
- Primary buttons: Solid fills, medium rounding (rounded-md)
- Secondary buttons: Outlined style
- Floating "Get Started" button visible throughout landing area

## Images

**Hero Section:** Yes - include a professional, diverse workplace hero image showing collaboration and optimism. Image should feature people from various backgrounds in a modern office/workspace setting. Overlay text with blurred-background buttons.

**Supporting Imagery:**
- Template preview thumbnails (actual template screenshots)
- Icon set for navigation and features (use Heroicons via CDN)
- Illustrative graphics for resource sections (optional small accent graphics, not critical)
- Logo placeholders for job board directory

**Image Treatment:**
- Hero: Full-width, subtle overlay for text readability
- Template previews: Bordered, slight shadow, aspect ratio 1:1.414 (A4 ratio)
- Icons: 24px standard, 32px for section headers