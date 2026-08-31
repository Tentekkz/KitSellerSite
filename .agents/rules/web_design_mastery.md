---
description: "Mastery of modern high-end web design, UI/UX aesthetics, Bento grids, glassmorphism, micro-interactions, and conversion-focused SaaS interfaces."
globs: ["**/*.html", "**/*.css", "**/*.js", "**/*.vue", "**/*.jsx", "**/*.tsx"]
---

# Web Design & UI/UX Mastery Guidelines

Always apply top-tier 2026 web design standards across all web projects (inspired by Linear, Stripe, Apple, Vercel, Supabase, and Aceternity UI).

## 1. Visual Hierarchy & Aesthetics
- **No Boring / Flat UI**: Avoid plain, generic designs. Every interface must feel polished, premium, and alive.
- **Depth & Layering**:
  - Use multi-layer ambient box-shadows (`box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1), 0 20px 25px -5px rgba(0,0,0,0.04)`).
  - Subtle borders with alpha channel: `border: 1px solid rgba(255, 255, 255, 0.08)` (dark mode) or `border: 1px solid rgba(0, 0, 0, 0.06)` (light mode).
  - Glassmorphism: `backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.7);` or `rgba(15, 23, 42, 0.75)`.
  - Ambient radial glow highlights behind hero titles and key feature cards (`background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)`).

## 2. Layouts: Modern Bento Grids & Spacing
- **Bento Grid Layouts**: Use CSS Grid with varying spans (`col-span-2`, `row-span-2`) to give visual rhythm rather than monotonous 3-column rows.
- **Consistent Spacing Scale**: Stick to strict 4px/8px modular scales (8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px).
- **Whitespace / Breathing Room**: Generous padding on sections (at least `80px` to `120px` vertical padding on desktop).

## 3. Typography & Copy Styling
- **Modern Sans-Serif Fonts**: Prefer `Inter`, `Plus Jakarta Sans`, `Geist`, `Outfit`, or system-ui font stacks.
- **Hero Title Tracking & Weights**:
  - Tight tracking on big headings: `letter-spacing: -0.03em; font-weight: 700 / 800`.
  - Fluid typography: Use `clamp()` for responsive hero text (`font-size: clamp(2.2rem, 5vw, 4rem); line-height: 1.15;`).
  - Text Gradients on key phrases: `background: linear-gradient(135deg, #1e293b 0%, #475569 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`.
- **High Contrast Body**: Ensure body text has strong legibility (`color: #334155` or `#475569` on light, `#94a3b8` on dark).

## 4. Colors & Design Tokens
- **Avoid Pure #000000**: In dark mode, use deep rich slates/blues: `#090d16`, `#0b0f19`, `#0f172a`.
- **Vibrant Semantic Accents**: Use refined color palettes (Indigo `#4f46e5`, Emerald `#059669`, Violet `#7c3aed`, Sky `#0284c7`, Amber `#d97706`).
- **Glow & Badges**: Small pill badges with soft background and glowing border (e.g. `background: rgba(99, 102, 241, 0.1); color: #4f46e5; border: 1px solid rgba(99, 102, 241, 0.2);`).

## 5. Micro-Interactions & Animation
- **Smooth Transitions**: Use tailored easing curves: `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);`.
- **Card Hover States**:
  - Lift up on hover: `transform: translateY(-4px); box-shadow: ...`.
  - Spotlight / glowing border effect on hover.
- **Magnetic Buttons**: High-contrast, tactile buttons with hover lift, ripple/gradient shift, and active state press down (`transform: scale(0.98)`).
- **Live Widgets & Interactivity**: Interactive sliders, dynamic calculators, animated tally counters, smooth FAQ accordions, tab switchers with active indicator gliding.

## 6. SaaS Conversion Rate Optimization (CRO)
- **Clear Value Prop Above Fold**: Headline + Subhead + Direct CTA + Micro Social Proof ("Более 500+ селлеров Kaspi", рейтинг 4.9).
- **Interactive Visual Preview**: Show the actual UI in action (mockup dashboard, live profit calculator, simulated repricer).
- **Sticky / Accessible CTAs**: Sticky navbar with clear CTA button, floating action button on mobile.
- **Frictionless Forms**: Clean, minimal input fields with autofocus indicators, validation feedback, and clear button labels.

## 7. Mobile-First & Performance
- Zero horizontal scrollbars (`overflow-x: hidden`).
- Touch targets min 44x44px.
- Fluid media queries (`@media (max-width: 768px)`).
- Crisp SVG icons (Lucide / Heroicons style).
