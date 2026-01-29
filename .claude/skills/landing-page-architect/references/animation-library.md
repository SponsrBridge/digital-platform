# Animation Library

Framer Motion patterns for smooth, professional landing page animations.

---

## Core Principles

1. **Subtle > Flashy**: Animations should enhance, not distract
2. **Performance**: Target 60fps, use `will-change` sparingly
3. **Purpose**: Every animation should communicate meaning
4. **Consistency**: Use same easing and timing across sections

---

## Easing Functions

```tsx
// Smooth ease out (recommended default)
const easeOut = [0.25, 0.46, 0.45, 0.94]

// Natural spring
const spring = { type: "spring", stiffness: 400, damping: 30 }

// Soft bounce
const softBounce = { type: "spring", stiffness: 300, damping: 20 }

// Gentle ease
const gentle = { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
```

---

## Entry Animations

### Fade Up (Default for content)
```tsx
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}

<motion.div {...fadeUp}>
  Content here
</motion.div>
```

### Fade In (Subtle)
```tsx
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 }
}
```

### Scale Up (For emphasis)
```tsx
const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}
```

### Slide In (From directions)
```tsx
// From left
const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}

// From right
const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}
```

---

## Stagger Animations

### Container + Children Pattern
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,      // Delay between children
      delayChildren: 0.2         // Initial delay
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

// Usage
<motion.div
  variants={container}
  initial="hidden"
  animate="show"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Stagger Grid
```tsx
const containerGrid = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      staggerDirection: 1
    }
  }
}

const gridItem = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
}
```

---

## Scroll-Triggered Animations

### Basic Scroll Reveal
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  Content reveals on scroll
</motion.div>
```

### Scroll Reveal with Delay
```tsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
  >
    {item.content}
  </motion.div>
))}
```

### Scroll Progress
```tsx
import { useScroll, useTransform, motion } from "framer-motion"

function ParallaxSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  return (
    <motion.div style={{ y, opacity }}>
      Parallax content
    </motion.div>
  )
}
```

---

## Hover Animations

### Scale on Hover (Cards, buttons)
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Hover me
</motion.div>
```

### Lift on Hover (Cards)
```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="hover:shadow-lg transition-shadow"
>
  Card content
</motion.div>
```

### Reveal on Hover
```tsx
<motion.div className="group relative overflow-hidden">
  <motion.div
    className="absolute inset-0 bg-primary/10"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
  />
  Content
</motion.div>
```

### Arrow Slide on Hover
```tsx
<motion.button className="group flex items-center gap-2">
  <span>Learn more</span>
  <motion.span
    initial={{ x: 0 }}
    whileHover={{ x: 4 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    →
  </motion.span>
</motion.button>

// Or using Tailwind group-hover
<button className="group flex items-center gap-2">
  <span>Learn more</span>
  <span className="transition-transform group-hover:translate-x-1">→</span>
</button>
```

---

## Loading & State Animations

### Skeleton Pulse
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-muted rounded w-3/4 mb-4" />
  <div className="h-4 bg-muted rounded w-1/2" />
</div>
```

### Spinner
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
  className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
/>
```

### Success Checkmark
```tsx
const checkVariants = {
  hidden: { pathLength: 0 },
  visible: { 
    pathLength: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

<motion.svg className="w-6 h-6" viewBox="0 0 24 24">
  <motion.path
    d="M5 13l4 4L19 7"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    variants={checkVariants}
    initial="hidden"
    animate="visible"
  />
</motion.svg>
```

---

## Animated Counter

```tsx
import { useMotionValue, useTransform, animate, motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
}

export function AnimatedCounter({ value, duration = 2, suffix = "" }: AnimatedCounterProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const displayValue = useTransform(rounded, (v) => `${v}${suffix}`)
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const controls = animate(count, value, { duration, ease: "easeOut" })
    return controls.stop
  }, [count, value, duration])
  
  return <motion.span ref={ref}>{displayValue}</motion.span>
}

// Usage
<AnimatedCounter value={99} suffix="%" />
```

---

## Text Animations

### Split Text Reveal
```tsx
const text = "Hello World"

<motion.div className="flex overflow-hidden">
  {text.split("").map((char, i) => (
    <motion.span
      key={i}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ 
        delay: i * 0.03,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</motion.div>
```

### Word by Word Reveal
```tsx
const text = "Welcome to our platform"
const words = text.split(" ")

<motion.div className="flex flex-wrap gap-x-2">
  {words.map((word, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.4 }}
    >
      {word}
    </motion.span>
  ))}
</motion.div>
```

### Typewriter Effect
```tsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Typewriter({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("")
  
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    
    return () => clearInterval(timer)
  }, [text, speed])
  
  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-0.5 h-[1em] bg-current ml-1"
      />
    </span>
  )
}
```

---

## Page Transitions

### Fade Transition
```tsx
// In layout or page wrapper
import { AnimatePresence, motion } from "framer-motion"

const pageVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## Scroll-Linked Effects

### Navbar Hide on Scroll
```tsx
import { useMotionValueEvent, useScroll, motion } from "framer-motion"
import { useState } from "react"

export function HidingNavbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })
  
  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full z-50"
    >
      {/* Navbar content */}
    </motion.nav>
  )
}
```

### Progress Bar
```tsx
import { useScroll, motion } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
    />
  )
}
```

---

## Micro-Interactions

### Button Press
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl"
>
  Click me
</motion.button>
```

### Toggle Switch
```tsx
import { motion } from "framer-motion"
import { useState } from "react"

export function Toggle() {
  const [isOn, setIsOn] = useState(false)
  
  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`w-14 h-8 rounded-full p-1 transition-colors ${
        isOn ? "bg-primary" : "bg-muted"
      }`}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow"
        animate={{ x: isOn ? 22 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  )
}
```

### Notification Badge Bounce
```tsx
<motion.span
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 500, damping: 15 }}
  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
>
  3
</motion.span>
```

---

## Performance Tips

1. **Use `layoutId` for shared element transitions**
2. **Avoid animating `width`/`height` - use `scale` instead**
3. **Use `will-change` sparingly and remove after animation**
4. **Prefer `transform` and `opacity` for 60fps**
5. **Use `viewport={{ once: true }}` for scroll animations**
6. **Debounce scroll handlers**
