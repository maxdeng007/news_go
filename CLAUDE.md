## Design Context

### Users
Chinese-speaking investors who receive a daily newsletter called "Noah Daily" (诺亚日报). They want quick insights into global market trends with personalized portfolio impact analysis. Context: busy professionals who check markets in the morning or evening.

### Brand Personality
**Premium, Light, Aurora-inspired** — The aesthetic evokes a high-end editorial meets soft glassmorphism. Clean, sophisticated, data-driven. The visual language says "institutional quality" with a fresh, airy feel.

### Aesthetic Direction
- **Theme**: Light glassmorphism with subtle aurora accents
- **Primary Colors**: Light (#f8fafc) background, Cyan (#0891b2) primary accent, Purple (#7c3aed) secondary, Pink (#db2777) tertiary
- **Visual Style**: Frosted glass cards with blur, soft transparency, gentle glows on hover, subtle aurora accents
- **Typography**: Inter for body, serif masthead for newsletter branding

### Design Principles
1. **Aurora is subtle** — Background accents should be barely visible, not distracting. Very low opacity (0.1-0.2), smooth flow (18-35s cycles)
2. **Glass is light** — Cards use blur(20-30px), light borders (rgba(0,0,0,0.08)), soft shadows for depth
3. **Accents are refined** — Glow effects only on interactive elements or key UI anchors. Softer, more elegant
4. **Data is readable** — Dark contrast text (#0f172a primary, #475569 secondary, #94a3b8 muted). Clear hierarchy
5. **Motion is smooth** — Use cubic-bezier(0.4, 0, 0.2, 1) for transitions, 200-300ms for micro-interactions, 18-35s for aurora

### Color Palette (CSS Variables)
```
--color-bg-primary: #f8fafc
--color-bg-secondary: #f1f5f9
--color-accent: #0891b2 (cyan)
--color-accent-secondary: #7c3aed (purple)
--color-accent-tertiary: #db2777 (pink)
--color-positive: #0891b2
--color-negative: #db2777
--color-text-primary: #0f172a
--color-text-secondary: #475569
--color-text-muted: #94a3b8
```

### Anti-Patterns to Avoid
- No dark backgrounds or heavy shadows
- No hardcoded hex colors (use CSS variables)
- No bounce easing (too playful for premium feel)
- Aurora should be subtle in light mode (lower opacity)
- No gray-on-color readability violations
