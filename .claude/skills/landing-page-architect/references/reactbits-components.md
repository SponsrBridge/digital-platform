# ReactBits Components Reference

Specialty interactive components for enhanced landing pages. Use ReactBits when you need advanced effects beyond standard shadcn/ui components.

---

## Installation

```bash
npx reactbits add <component-name>
```

---

## Background Effects

### Aurora Background
Animated gradient aurora effect for hero sections.

```tsx
import { AuroraBackground } from "@/components/reactbits/aurora-background"

export function HeroWithAurora() {
  return (
    <AuroraBackground className="min-h-screen">
      <div className="relative z-10">
        {/* Hero content */}
      </div>
    </AuroraBackground>
  )
}
```

### Dot Pattern Background
Subtle dot grid pattern.

```tsx
import { DotPattern } from "@/components/reactbits/dot-pattern"

<section className="relative">
  <DotPattern className="absolute inset-0 opacity-50" />
  <div className="relative z-10">Content</div>
</section>
```

### Grid Pattern Background
```tsx
import { GridPattern } from "@/components/reactbits/grid-pattern"

<section className="relative">
  <GridPattern 
    className="absolute inset-0 opacity-30"
    width={40}
    height={40}
  />
  <div className="relative z-10">Content</div>
</section>
```

### Gradient Mesh
Dynamic gradient mesh background.

```tsx
import { GradientMesh } from "@/components/reactbits/gradient-mesh"

<GradientMesh 
  colors={["#ff0080", "#7928ca", "#0070f3"]}
  className="absolute inset-0"
/>
```

---

## Text Effects

### Text Reveal
Characters reveal on scroll/viewport entry.

```tsx
import { TextReveal } from "@/components/reactbits/text-reveal"

<TextReveal>
  Your headline text here
</TextReveal>
```

### Gradient Text
Animated gradient text.

```tsx
import { GradientText } from "@/components/reactbits/gradient-text"

<GradientText
  colors={["#ff0080", "#7928ca", "#0070f3"]}
  animationSpeed={3}
>
  Animated gradient headline
</GradientText>
```

### Split Text Animation
Letter-by-letter animation.

```tsx
import { SplitText } from "@/components/reactbits/split-text"

<SplitText
  text="Hello World"
  className="text-6xl font-bold"
  delay={0.05}
/>
```

### Typewriter
Typing effect with cursor.

```tsx
import { Typewriter } from "@/components/reactbits/typewriter"

<Typewriter
  words={["Developer", "Designer", "Creator"]}
  loop={true}
  typeSpeed={100}
  deleteSpeed={50}
  delaySpeed={2000}
/>
```

### Text Scramble
Scramble/decode effect.

```tsx
import { TextScramble } from "@/components/reactbits/text-scramble"

<TextScramble 
  text="Reveal this text"
  trigger="hover" // or "inView"
/>
```

---

## Interactive Buttons

### Magnetic Button
Cursor-following magnetic effect.

```tsx
import { MagneticButton } from "@/components/reactbits/magnetic-button"
import { Button } from "@/components/ui/button"

<MagneticButton>
  <Button size="lg">
    Get Started
  </Button>
</MagneticButton>
```

### Shiny Button
Animated shine effect.

```tsx
import { ShinyButton } from "@/components/reactbits/shiny-button"

<ShinyButton>
  Click me
</ShinyButton>
```

### Border Beam Button
Animated border light trail.

```tsx
import { BorderBeam } from "@/components/reactbits/border-beam"

<button className="relative px-6 py-3 rounded-xl bg-background border border-border">
  <BorderBeam size={100} duration={5} />
  <span className="relative z-10">Animated Border</span>
</button>
```

---

## Cards & Containers

### Spotlight Card
Card with spotlight follow effect.

```tsx
import { SpotlightCard } from "@/components/reactbits/spotlight-card"

<SpotlightCard className="p-8">
  <h3>Feature Title</h3>
  <p>Feature description...</p>
</SpotlightCard>
```

### Tilt Card
3D tilt effect on hover.

```tsx
import { TiltCard } from "@/components/reactbits/tilt-card"

<TiltCard className="p-6">
  <h3>Tilting Card</h3>
  <p>Hover to see 3D tilt effect</p>
</TiltCard>
```

### Glow Card
Gradient glow on hover.

```tsx
import { GlowCard } from "@/components/reactbits/glow-card"

<GlowCard>
  <div className="p-6">
    Card content
  </div>
</GlowCard>
```

---

## Scroll Effects

### Parallax Section
```tsx
import { ParallaxSection } from "@/components/reactbits/parallax-section"

<ParallaxSection speed={0.5}>
  <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
</ParallaxSection>
```

### Scroll Fade
Fade content based on scroll position.

```tsx
import { ScrollFade } from "@/components/reactbits/scroll-fade"

<ScrollFade>
  <div className="h-screen flex items-center justify-center">
    Content fades as you scroll
  </div>
</ScrollFade>
```

### Scroll Velocity Text
Text that moves based on scroll speed.

```tsx
import { ScrollVelocity } from "@/components/reactbits/scroll-velocity"

<ScrollVelocity baseVelocity={3}>
  Your scrolling text here •
</ScrollVelocity>
```

---

## Marquee / Infinite Scroll

### Logo Marquee
Infinite scrolling logos.

```tsx
import { Marquee } from "@/components/reactbits/marquee"

<Marquee pauseOnHover speed={40}>
  {logos.map((logo) => (
    <div key={logo.name} className="mx-8">
      <img src={logo.src} alt={logo.name} className="h-8" />
    </div>
  ))}
</Marquee>
```

### Testimonial Marquee
```tsx
import { Marquee } from "@/components/reactbits/marquee"

<div className="relative">
  <Marquee className="[--duration:40s]">
    {testimonials.slice(0, 5).map((t) => (
      <TestimonialCard key={t.id} {...t} />
    ))}
  </Marquee>
  <Marquee reverse className="[--duration:40s]">
    {testimonials.slice(5, 10).map((t) => (
      <TestimonialCard key={t.id} {...t} />
    ))}
  </Marquee>
  
  {/* Fade edges */}
  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
</div>
```

---

## Cursor Effects

### Custom Cursor
Replace default cursor.

```tsx
import { CustomCursor } from "@/components/reactbits/custom-cursor"

// In layout
<CustomCursor />

// Add data-cursor attributes for effects
<a href="#" data-cursor="pointer">Hover me</a>
<button data-cursor="action">Click me</button>
```

### Cursor Spotlight
Spotlight that follows cursor.

```tsx
import { CursorSpotlight } from "@/components/reactbits/cursor-spotlight"

<section className="relative">
  <CursorSpotlight />
  <div className="relative z-10">
    Content with spotlight effect
  </div>
</section>
```

---

## Counters & Numbers

### Animated Counter
Number counting animation.

```tsx
import { AnimatedCounter } from "@/components/reactbits/animated-counter"

<AnimatedCounter
  value={10000}
  duration={2000}
  formatValue={(v) => `$${v.toLocaleString()}`}
/>
```

### Ticker
Rolling number ticker.

```tsx
import { Ticker } from "@/components/reactbits/ticker"

<Ticker value={42069} className="text-4xl font-bold" />
```

---

## Navigation

### Dock Menu
macOS-style dock navigation.

```tsx
import { Dock, DockItem } from "@/components/reactbits/dock"
import { Home, Settings, User } from "lucide-react"

<Dock>
  <DockItem icon={<Home />} label="Home" href="/" />
  <DockItem icon={<User />} label="Profile" href="/profile" />
  <DockItem icon={<Settings />} label="Settings" href="/settings" />
</Dock>
```

---

## Loading States

### Skeleton Shimmer
Enhanced skeleton loader.

```tsx
import { Skeleton } from "@/components/reactbits/skeleton-shimmer"

<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-1/2" />
```

### Spinner
Animated loading spinner.

```tsx
import { Spinner } from "@/components/reactbits/spinner"

<Spinner size="md" />
```

---

## Combining with shadcn/ui

Best practice: wrap shadcn components with ReactBits for enhanced effects.

```tsx
// Enhanced CTA button
import { MagneticButton } from "@/components/reactbits/magnetic-button"
import { Button } from "@/components/ui/button"

<MagneticButton>
  <Button size="lg" className="relative">
    <BorderBeam />
    Get Started
  </Button>
</MagneticButton>

// Feature card with spotlight
import { SpotlightCard } from "@/components/reactbits/spotlight-card"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

<SpotlightCard>
  <Card>
    <CardHeader>Feature</CardHeader>
    <CardContent>Description</CardContent>
  </Card>
</SpotlightCard>
```

---

## When to Use ReactBits

✅ **Use ReactBits for:**
- Hero section backgrounds (Aurora, Gradient Mesh)
- Premium CTAs (Magnetic, Shiny, Border Beam buttons)
- Testimonial marquees
- Advanced text effects (Split text, Typewriter)
- Feature card hover effects (Spotlight, Tilt)
- Scroll velocity text banners

❌ **Don't use ReactBits for:**
- Basic buttons (use shadcn Button)
- Form elements (use shadcn)
- Dialogs/Modals (use shadcn)
- Standard navigation (use shadcn)
- Basic cards without effects (use shadcn Card)

**Rule of thumb**: Use ReactBits for "wow factor" interactions, shadcn for everything else.
