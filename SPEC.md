# Birthday Website Specification

## Project Overview
- **Project Name**: Sofia's 17th Birthday
- **Type**: Premium Mobile-First Web App
- **Core Functionality**: Interactive birthday website with countdown, midnight reveal, fireworks, and memories gallery
- **Target Users**: Birthday celebrant and guests

## UI/UX Specification

### Layout Structure
- **Mobile-first**: Optimized for 320px-480px screens
- **Desktop**: Max-width 1200px, centered
- **Sections**: Hero, Gallery, Message
- **Navigation**: Smooth scroll between sections

### Visual Design

#### Color Palette
- Primary: `#FFE4E6` (Soft Rose)
- Secondary: `#FBCFE8` (Pastel Pink)
- Accent: `#F9A8D4` (Rose Gold)
- Dark: `#831843` (Deep Rose)
- Light: `#FFF1F2` (Warm White)
- Text: `#4A044E` (Dark Plum)

#### Typography
- Headings: 'Playfair Display', serif (elegant, premium feel)
- Body: 'Quicksand', sans-serif (friendly, modern)
- Hero Title: 3.5rem mobile, 5rem desktop
- Section Titles: 2rem mobile, 3rem desktop

#### Spacing
- Section padding: 80px vertical, 20px horizontal
- Card gap: 16px
- Element margins: 8px, 16px, 24px, 32px

#### Visual Effects
- AOS animations: fade-up, fade-left, fade-right, zoom-in
- Glassmorphism cards: backdrop-blur, semi-transparent backgrounds
- Soft shadows: `0 8px 32px rgba(131, 24, 67, 0.1)`
- Gradient overlays on images
- Floating particles background animation

### Components

#### Hero Section
- Large animated title "Happy Birthday Sofia"
- Subtitle "Turning 17"
- Countdown timer (days, hours, minutes, seconds)
- Floating decorative elements (hearts, stars)
- Scroll indicator

#### Countdown Timer
- 4 boxes with flip animation effect
- Labels: Days, Hours, Minutes, Seconds
- Glassmorphism style

#### Midnight Reveal State
- Countdown disappears
- Large "Happy Birthday Sofia!" message fades in
- Confetti cannon animation
- Celebration text appears

#### Memories Gallery
- CSS Grid: 2 columns mobile, 3 columns desktop
- Polaroid-style frames
- AOS staggered animations
- Hover: slight scale and shadow increase

#### Sweet Message Section
- Letter-style container with decorative border
- Beautiful typography with line-height
- Floating hearts background
- Signature at bottom

#### Music Player
- Fixed position bottom-right
- Circular button with music note icon
- Toggle on/off with smooth icon transition
- Background audio loop

## Functionality Specification

### Countdown Timer
- Target: April 26, 2026, 00:00:00
- Updates every second
- Calculates days, hours, minutes, seconds remaining

### Midnight Trigger
- Check every second if current time >= target
- When triggered:
  - Hide countdown
  - Show birthday message with fade-in
  - Trigger confetti burst
  - Play celebration audio if enabled

### Confetti Effect
- Use canvas-confetti library
- Burst from center and sides
- Multiple wave effects
- Rose gold and pink colors

### Music Player
- Background ambient music
- Toggle button visibility
- LocalStorage preference saved

### Smooth Scroll
- Navigation links smooth scroll
- AOS scroll trigger adjustments

## Acceptance Criteria
- [ ] Page loads with hero section visible
- [ ] Countdown shows correct time remaining to April 26, 2026
- [ ] Gallery images have AOS animations on scroll
- [ ] Music toggle works and persists preference
- [ ] At midnight April 26, countdown transforms to birthday message
- [ ] Confetti fires at midnight trigger
- [ ] Fully responsive on mobile (375px) and desktop (1200px)
- [ ] All fonts load correctly from Google Fonts
- [ ] No console errors