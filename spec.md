# Sparkle with Asma

## Current State
New project with default scaffold.

## Requested Changes (Diff)

### Add
- Animated pastel background with floating stars, sparkles, and clouds (CSS/SVG)
- Bilingual (Arabic + English) welcome header with colorful gradient text
- Three large 3D-style section cards: Stories, Draw, Music
- Hover/tap bounce and scale animations on all cards
- Responsive mobile-first layout

### Modify
- App.tsx to render the dashboard
- index.css to add keyframe animations and custom font import

### Remove
- Default scaffold content

## Implementation Plan
1. Update index.css: import a friendly bilingual font (e.g. Nunito + Tajawal), add keyframe animations (float, bounce, sparkle-pulse)
2. Update App.tsx: render full-screen pastel gradient background with floating SVG decorations, bilingual header, and three section cards
3. Each card: large rounded box, 3D raised shadow, icon (SVG), English + Arabic label, hover scale + translateY transform
4. No backend changes needed
