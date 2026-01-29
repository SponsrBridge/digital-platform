---
name: landing-page-architect
description: Build stunning, award-worthy landing pages with Webflow/Framer-level polish using Next.js 15, shadcn/ui, ReactBits, and Framer Motion. Use when user provides low-fidelity wireframes, layout sketches, or describes landing page sections. Handles layout refinement, spacing systems, typography scales, micro-interactions, scroll animations, and section-by-section builds. Produces minimalist, buttery-smooth interfaces that match Awwwards-quality standards.
---

# Landing Page Architect

Build exceptional landing pages from low-fidelity inputs. Transform wireframes into polished, animated interfaces with Webflow/Framer-level craft.

## Workflow

### Step 1: Analyze Low-Fidelity Input

When user provides a wireframe or description:
1. Identify section type (Hero, Features, Stats, Testimonials, CTA, Footer, etc.)
2. Map content placement (headlines, images, CTAs)
3. Determine visual hierarchy and flow
4. Note any specific layout constraints

### Step 2: Apply Design System

Load and apply: `references/design-system.md`
- 8px spacing grid
- Typography scale (display → caption)
- Color tokens
- Responsive breakpoints

### Step 3: Select Section Pattern

Load: `references/section-patterns.md`
Match user's layout to proven patterns, then customize.

### Step 4: Apply Animations

Load: `references/animation-library.md`
- Entry animations (stagger, fade, slide)
- Scroll-triggered reveals
- Micro-interactions (hover, focus)
- Page transitions

### Step 5: Build & Refine

Generate complete Next.js component with:
- shadcn/ui components
- ReactBits components (where appropriate)
- Framer Motion animations
- Responsive design
- Accessibility

---

## Tech Stack

```
Framework:    Next.js 15+ (App Router)
Styling:      Tailwind CSS v4
Components:   shadcn/ui (primary)
              ReactBits (specialty components)
Animation:    Framer Motion
Icons:        Lucide React
Fonts:        next/font (variable fonts)
```

## Quick Reference

### Spacing Scale (8px base)
```
4   = 1rem   (section-y)
8   = 2rem   (content gaps)
12  = 3rem   (large gaps)
16  = 4rem   (section padding mobile)
24  = 6rem   (section padding desktop)
32  = 8rem   (hero padding)
```

### Typography Quick Scale
```
Display:  clamp(2.5rem, 5vw, 4.5rem)  font-bold tracking-tight
H1:       clamp(2rem, 4vw, 3.5rem)    font-bold tracking-tight
H2:       clamp(1.75rem, 3vw, 2.5rem) font-semibold
H3:       clamp(1.25rem, 2vw, 1.5rem) font-medium
Body:     1rem/1.625                   text-muted-foreground
Small:    0.875rem                     text-muted-foreground
```

### Animation Defaults
```tsx
// Fade up entry
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}

// Stagger children
staggerChildren: 0.1

// Hover scale
whileHover={{ scale: 1.02 }}
transition={{ type: "spring", stiffness: 400, damping: 17 }}
```

---

## Component Integration

### shadcn/ui Usage
Primary component library. Use for:
- Buttons, Cards, Badges
- Dialog, Sheet, Drawer
- Form elements (Input, Select, etc.)
- Accordion, Tabs
- Navigation menus

### ReactBits Usage
Use for specialty interactive elements:
- Animated backgrounds
- Text effects (split text, typewriter)
- Magnetic buttons
- Cursor effects
- Marquee/infinite scroll
- Animated counters

### Combining Libraries
```tsx
import { Button } from "@/components/ui/button"  // shadcn
import { MagneticButton } from "@/components/reactbits/magnetic-button"  // ReactBits wrapper

// Wrap shadcn components for enhanced interaction
<MagneticButton>
  <Button size="lg">Get Started</Button>
</MagneticButton>
```

---

## Output Checklist

Before delivering, verify:
- [ ] Responsive at all breakpoints (mobile-first)
- [ ] Animations are smooth (60fps)
- [ ] Typography hierarchy clear
- [ ] Spacing follows 8px grid
- [ ] Colors use CSS variables
- [ ] Accessibility: semantic HTML, ARIA labels
- [ ] Hover/focus states defined
- [ ] Loading states handled
- [ ] Component is self-contained

---

## Reference Files

| File | When to Read |
|------|--------------|
| `references/design-system.md` | Every build - spacing, typography, colors |
| `references/section-patterns.md` | When building specific section types |
| `references/animation-library.md` | When adding motion/interactions |
| `references/reactbits-components.md` | When using ReactBits specialty components |
