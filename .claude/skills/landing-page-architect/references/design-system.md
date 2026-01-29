# Design System Reference

Awwwards-quality design foundations for landing pages.

---

## Spacing System (8px Grid)

All spacing derives from 8px base unit. Use Tailwind's spacing scale.

### Spacing Tokens
```
--space-1:  0.25rem  (4px)   - Inline spacing, icon gaps
--space-2:  0.5rem   (8px)   - Tight component spacing
--space-3:  0.75rem  (12px)  - Form element padding
--space-4:  1rem     (16px)  - Standard gaps
--space-6:  1.5rem   (24px)  - Section content gaps
--space-8:  2rem     (32px)  - Large content spacing
--space-12: 3rem     (48px)  - Section internal padding
--space-16: 4rem     (64px)  - Section padding (mobile)
--space-20: 5rem     (80px)  - Section padding (tablet)
--space-24: 6rem     (96px)  - Section padding (desktop)
--space-32: 8rem     (128px) - Hero section padding
```

### Section Padding Pattern
```tsx
// Standard section
className="py-16 md:py-20 lg:py-24"

// Hero section
className="py-20 md:py-28 lg:py-32"

// Compact section
className="py-12 md:py-16 lg:py-20"
```

### Container Widths
```tsx
// Default container
className="container px-4 md:px-6 lg:px-8"

// Narrow content (blog, text-heavy)
className="container max-w-3xl px-4 md:px-6"

// Wide content (dashboards, galleries)
className="container max-w-7xl px-4 md:px-6"

// Full bleed with padding
className="w-full px-4 md:px-8 lg:px-16"
```

---

## Typography System

### Font Stack Configuration (next/font)
```tsx
// app/layout.tsx
import { Inter, Outfit, Playfair_Display } from 'next/font/google'

// Primary: Clean, modern sans-serif
const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap'
})

// Display: Distinctive headlines
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

// Body: Highly readable
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})
```

### Type Scale (Fluid Typography)
```css
/* globals.css */
:root {
  /* Display - Hero headlines */
  --text-display: clamp(2.5rem, 5vw + 1rem, 5rem);
  
  /* H1 - Page titles */
  --text-h1: clamp(2rem, 4vw + 0.5rem, 3.75rem);
  
  /* H2 - Section titles */
  --text-h2: clamp(1.5rem, 3vw + 0.5rem, 2.5rem);
  
  /* H3 - Subsection titles */
  --text-h3: clamp(1.25rem, 2vw + 0.25rem, 1.75rem);
  
  /* H4 - Card titles */
  --text-h4: clamp(1rem, 1.5vw + 0.25rem, 1.25rem);
  
  /* Body large */
  --text-body-lg: 1.125rem;
  
  /* Body */
  --text-body: 1rem;
  
  /* Small */
  --text-sm: 0.875rem;
  
  /* Caption */
  --text-caption: 0.75rem;
}
```

### Typography Classes
```tsx
// Display headline (Hero)
className="text-[clamp(2.5rem,5vw+1rem,5rem)] font-bold tracking-tight leading-[1.1]"

// H1
className="text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-bold tracking-tight leading-[1.15]"

// H2 Section title
className="text-[clamp(1.5rem,3vw+0.5rem,2.5rem)] font-semibold tracking-tight leading-[1.2]"

// H3 Subsection
className="text-[clamp(1.25rem,2vw+0.25rem,1.75rem)] font-medium leading-[1.3]"

// Body large (hero descriptions)
className="text-lg md:text-xl text-muted-foreground leading-relaxed"

// Body
className="text-base text-muted-foreground leading-relaxed"

// Small/Caption
className="text-sm text-muted-foreground"

// Eyebrow/Label
className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
```

### Line Heights
```
Headings:  1.1 - 1.2 (tight)
Subheads:  1.3 - 1.4
Body:      1.6 - 1.7 (relaxed)
```

### Letter Spacing
```
Display/H1:  -0.02em (tracking-tight)
H2/H3:       -0.01em
Body:        0 (normal)
Uppercase:   0.05em - 0.1em (tracking-wider)
```

---

## Color System

### Base Tokens (Dark Mode Ready)
```css
:root {
  /* Backgrounds */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  
  /* Cards/Elevated surfaces */
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  
  /* Muted elements */
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  
  /* Borders */
  --border: 0 0% 89.8%;
  
  /* Primary brand */
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  
  /* Accent */
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  
  /* Semantic */
  --destructive: 0 84.2% 60.2%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 7%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --border: 0 0% 14.9%;
}
```

### Brand Color Patterns
```tsx
// Gradient text
className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"

// Gradient background
className="bg-gradient-to-br from-background via-muted/50 to-background"

// Subtle brand tint
className="bg-primary/5"

// Brand border glow
className="border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
```

---

## Responsive Breakpoints

### Tailwind Breakpoints
```
sm:   640px   (Mobile landscape)
md:   768px   (Tablet)
lg:   1024px  (Desktop)
xl:   1280px  (Large desktop)
2xl:  1536px  (Extra large)
```

### Responsive Patterns
```tsx
// Mobile-first grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"

// Responsive text alignment
className="text-center md:text-left"

// Responsive flex direction
className="flex flex-col md:flex-row items-center gap-4 md:gap-8"

// Responsive spacing
className="space-y-8 md:space-y-12 lg:space-y-16"

// Hide/show at breakpoints
className="hidden md:block"  // Show on tablet+
className="md:hidden"        // Hide on tablet+
```

---

## Visual Effects

### Border Radius Scale
```
rounded-sm:   0.125rem (2px)
rounded:      0.25rem  (4px)
rounded-md:   0.375rem (6px)
rounded-lg:   0.5rem   (8px)   - Buttons, inputs
rounded-xl:   0.75rem  (12px)  - Cards
rounded-2xl:  1rem     (16px)  - Large cards
rounded-3xl:  1.5rem   (24px)  - Hero images
rounded-full: 9999px            - Pills, avatars
```

### Shadow Scale
```tsx
// Subtle lift
className="shadow-sm"

// Card elevation
className="shadow-md"

// Floating element
className="shadow-lg"

// Hero/Modal
className="shadow-xl"

// Custom soft shadow
style={{ boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}

// Colored shadow
style={{ boxShadow: '0 10px 40px -10px rgba(var(--primary), 0.3)' }}

// Inner shadow (pressed)
className="shadow-inner"
```

### Backdrop Effects
```tsx
// Frosted glass
className="bg-background/80 backdrop-blur-md"

// Stronger blur
className="bg-background/60 backdrop-blur-xl"

// Subtle tint
className="bg-gradient-to-b from-background/80 to-background backdrop-blur-sm"
```

### Noise/Grain Texture
```tsx
// Add grain overlay
<div 
  className="absolute inset-0 opacity-[0.015] pointer-events-none"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
  }}
/>
```

---

## Component Sizing

### Button Sizes
```tsx
// Small
className="h-8 px-3 text-sm"

// Default
className="h-10 px-4"

// Large (CTAs)
className="h-12 px-6 text-base"

// Extra large (Hero CTA)
className="h-14 px-8 text-lg"
```

### Input Sizes
```tsx
// Default
className="h-10 px-3"

// Large
className="h-12 px-4 text-base"
```

### Card Padding
```tsx
// Compact
className="p-4"

// Default
className="p-6"

// Spacious
className="p-8 md:p-10"
```

---

## Z-Index Scale
```
z-0:    Base content
z-10:   Floating elements
z-20:   Sticky navigation
z-30:   Dropdown menus
z-40:   Modals/Dialogs
z-50:   Tooltips/Toasts
```
