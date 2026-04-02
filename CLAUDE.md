## Design Context

### Users
Chinese-speaking investors who receive a daily newsletter called "Noah Daily" (诺亚日报). They want quick insights into global market trends with personalized portfolio impact analysis. Context: busy professionals who check markets in the morning or evening.

### Brand Personality
**Premium, Dark, Aurora-inspired** — The aesthetic evokes a high-end trading terminal meets northern lights. Confident, sophisticated, data-driven. The visual language says "institutional quality" not "retail app."

### Aesthetic Direction
- **Theme**: Dark glassmorphism with animated aurora borealis background
- **Primary Colors**: Black (#000000) background, Cyan (#00ffff) primary accent, Purple (#a855f7) secondary, Pink (#ec4899) tertiary
- **Visual Style**: Glass cards with blur, subtle transparency, neon glows on hover, smooth aurora animations
- **Typography**: Inter for body, serif masthead for newsletter branding

### Design Principles
1. **Aurora is ambient** — Background animations should be visible but never distracting. Subtle opacity (0.3-0.5), smooth flow (18-35s cycles)
2. **Glass is premium** — Cards use blur(20-30px), subtle borders (rgba(255,255,255,0.1)), inset shadows for depth
3. **Neon is intentional** — Glow effects only on interactive elements or key UI anchors. Not decorative everywhere
4. **Data is readable** — High contrast text (#f5f5ff primary, #a8a8c0 secondary, #606078 muted). Never sacrifice readability for aesthetics
5. **Motion is smooth** — Use cubic-bezier(0.4, 0, 0.2, 1) for transitions, 200-300ms for micro-interactions, 18-35s for aurora

### Color Palette (CSS Variables)
```
--color-bg-primary: #000000
--color-bg-secondary: #0a0a14
--color-accent: #00ffff (cyan)
--color-accent-secondary: #a855f7 (purple)
--color-accent-tertiary: #ec4899 (pink)
--color-positive: #22d3ee
--color-negative: #f472b6
--color-text-primary: #f5f5ff
--color-text-secondary: #a8a8c0
--color-text-muted: #606078
```

### Anti-Patterns to Avoid
- No newspaper cream/warm colors in dark mode
- No hardcoded hex colors (use CSS variables)
- No bounce easing (too playful for premium feel)
- Aurora ribbons must be visible (min 3-4px height, with glow)
- No gray-on-color readability violations
