# Section Patterns Library

Proven landing page section patterns. Match user's wireframe to pattern, then customize.

---

## NAVIGATION

### Floating Nav with Blur
```tsx
"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
    >
      <nav className="flex items-center justify-between px-4 py-3 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">L</span>
          </div>
          <span className="font-semibold">Brand</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1">
          {["Features", "Pricing", "About", "Blog"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              {item}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">Log in</Button>
          <Button size="sm">Get Started</Button>
        </div>
      </nav>
    </motion.header>
  )
}
```

---

## HERO SECTIONS

### Pattern: Split Hero (Image Right)
```
┌─────────────────────────────────────────────────────┐
│ [Badge]                                             │
│                                                     │
│ HEADLINE                        ┌─────────────────┐ │
│ Subheadline text                │                 │ │
│                                 │     IMAGE       │ │
│ ✓ Feature one                   │                 │ │
│ ✓ Feature two                   │   [floating]    │ │
│                                 │     [cards]     │ │
│ [CTA Primary] [CTA Secondary]   └─────────────────┘ │
└─────────────────────────────────────────────────────┘
```

```tsx
"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export function HeroSplit() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={item}>
              <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                <span className="mr-2">✨</span>
                Announcing v2.0
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={item}
              className="text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-bold tracking-tight leading-[1.1]"
            >
              Build faster with{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                modern tools
              </span>
            </motion.h1>
            
            <motion.p 
              variants={item}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              The platform that helps teams ship products 10x faster with AI-powered workflows.
            </motion.p>
            
            <motion.ul variants={item} className="space-y-3">
              {["Lightning fast performance", "Built-in analytics", "24/7 support"].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </motion.ul>
            
            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="h-12 px-6 rounded-xl">
                Start free trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 rounded-xl">
                Book a demo
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
              {/* Main image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
              
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute top-6 left-6 p-4 rounded-2xl bg-background/95 backdrop-blur shadow-xl border border-border/50"
              >
                <p className="text-3xl font-bold">10x</p>
                <p className="text-sm text-muted-foreground">Faster delivery</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### Pattern: Centered Hero
```
┌─────────────────────────────────────────────────────┐
│                     [Badge]                         │
│                                                     │
│               LARGE HEADLINE                        │
│             Subheadline centered                    │
│                                                     │
│            [CTA]          [CTA]                     │
│                                                     │
│     ┌─────────────────────────────────────────┐     │
│     │                                         │     │
│     │            HERO IMAGE                   │     │
│     │                                         │     │
│     └─────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

```tsx
"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function HeroCentered() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background" />
      
      <div className="container relative px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Now in public beta
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tight leading-[1.1]"
          >
            The future of{" "}
            <span className="block">product development</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Streamline your workflow, collaborate seamlessly, and ship products that users love.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Button size="lg" className="h-14 px-8 text-base rounded-xl">
              Get started free
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl">
              Watch demo
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 md:mt-20"
        >
          <div className="relative mx-auto max-w-6xl">
            <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 border border-border/50 shadow-2xl">
              {/* Image placeholder */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## LOGO CLOUD / SOCIAL PROOF

```tsx
"use client"
import { motion } from "framer-motion"

const logos = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Slack"]

export function LogoCloud() {
  return (
    <section className="py-12 md:py-16 border-y border-border/50">
      <div className="container px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Trusted by teams at
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-muted-foreground/60 font-semibold text-lg hover:text-muted-foreground transition-colors"
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## STATS SECTION

```tsx
"use client"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" })
    return controls.stop
  }, [count, value])
  
  return (
    <motion.span ref={ref}>
      {rounded}
      {suffix}
    </motion.span>
  )
}

const stats = [
  { value: 99, suffix: "%", label: "Uptime SLA" },
  { value: 10, suffix: "x", label: "Faster deploys" },
  { value: 500, suffix: "+", label: "Integrations" },
  { value: 24, suffix: "/7", label: "Support" },
]

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## FEATURES SECTION

### Pattern: Bento Grid
```tsx
"use client"
import { motion } from "framer-motion"
import { Zap, Shield, BarChart3, Palette } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with optimized performance at every layer.",
    className: "md:col-span-2 md:row-span-2",
    featured: true
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security built in.",
    className: "md:col-span-1"
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Comprehensive insights dashboard.",
    className: "md:col-span-1"
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Tailor everything to your brand.",
    className: "md:col-span-2"
  }
]

export function FeaturesBento() {
  return (
    <section className="py-20 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful features to help you build, deploy, and scale.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group relative p-6 md:p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 transition-colors ${feature.className}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                feature.featured ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <feature.icon className="w-6 h-6" />
              </div>
              
              <h3 className={`font-semibold mb-2 ${feature.featured ? "text-2xl" : "text-lg"}`}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pattern: Features with Image
```tsx
"use client"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const features = [
  "Automated workflows",
  "Real-time collaboration", 
  "Version control",
  "Custom integrations"
]

export function FeatureWithImage() {
  return (
    <section className="py-20 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
              {/* Image placeholder */}
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 space-y-6"
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wider">
              Workflow
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight">
              Streamline your entire process
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              From ideation to deployment, manage everything in one place with powerful automation.
            </p>
            
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

## TESTIMONIALS

```tsx
"use client"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const testimonials = [
  {
    quote: "This tool has completely transformed how we work. The speed and reliability are unmatched.",
    author: "Sarah Chen",
    role: "CTO at TechCorp",
    avatar: "/avatars/1.jpg"
  },
  {
    quote: "We shipped 3x faster after switching. The team collaboration features are incredible.",
    author: "Marcus Johnson",
    role: "Lead Developer at StartupXYZ",
    avatar: "/avatars/2.jpg"
  },
  {
    quote: "Best investment we've made. The support team is responsive and the product just works.",
    author: "Emily Rodriguez",
    role: "Founder at DesignStudio",
    avatar: "/avatars/3.jpg"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight mb-4">
            Loved by teams everywhere
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our customers have to say about their experience.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 md:p-8 h-full bg-background">
                <blockquote className="text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted" />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## CTA SECTION

```tsx
"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-purple-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
          
          {/* Content */}
          <div className="relative px-6 py-16 md:px-12 md:py-20 lg:py-24 text-center text-primary-foreground">
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of teams already using our platform to build better products.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="h-12 px-6 rounded-xl">
                Start free trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6 rounded-xl bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Talk to sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## FOOTER

```tsx
"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "Help Center", "Community", "Contact"],
  Legal: ["Privacy", "Terms", "Security"]
}

export function Footer() {
  return (
    <footer className="py-16 md:py-20 border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">L</span>
              </div>
              <span className="font-semibold">Brand</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building the future of product development.
            </p>
          </div>
          
          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Brand. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map((social) => (
              <Link 
                key={social}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">{social}</span>
                <div className="w-5 h-5 bg-current opacity-60 rounded" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```
