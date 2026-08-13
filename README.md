# TRANSFORM — Fitness Web Application

A modern, fully animated fitness platform built with React and GSAP.
The application combines cinematic UI animations with a dynamic workout library powered by the ExerciseDB API, creating an engaging and interactive experience for fitness enthusiasts.

---

## Live Demo
https://transform-stt7.vercel.app/

## Highlights

- Cinematic GSAP page-load animations
- Interactive workout library with 1300+ exercises
- Advanced filtering and search system
- Responsive exercise grid with pagination
- Smart API fallback system when rate limits are reached
- Fully responsive design across desktop, tablet, and mobile
- Clean architecture with custom animation hooks


## Why I Built This
I built TRANSFORM to explore advanced frontend animation patterns while creating a realistic fitness platform interface.

***The project focuses on:***
- reusable GSAP animation hooks
- smooth page transitions
- interactive filtering systems
- clean component architecture
The goal was to combine modern UI design with engineering best practices in a real-world style project.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | Frontend framework and build tool |
| React Router v6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| GSAP + ScrollTrigger | All animations and scroll effects |
| ExerciseDB (RapidAPI) | Exercise data — 1300+ exercises |
| Lucide React | Icon library |

## Features

### Pages
- **Home** — Hero section, Programs, CTA, Team, Pricing, FAQ, Footer
- **Workout Library** — Browse 1300+ exercises filtered by body part, equipment, or muscle group
- **Contact** — Validated contact form with animated feedback

### Animations
Every animation in the project is extracted into a custom hook — zero raw GSAP code inside components.

| Hook | File | What it does |
|---|---|---|
| `useNavbarScroll` | `useNavbar.js` | Entrance + scroll-collapse to mini bar |
| `useMobileMenu` | `useNavbar.js` | Clip-path circle reveal for mobile menu |
| `useHeroEntrance` | `useHero.js` | Full cinematic page-load timeline |
| `useFloating` | `useHero.js` | Idle bobbing loop for cards/images |
| `useFooterEntrance` | `useFooter.js` | Brand, links, socials, copyright stagger |
| `useMarqueeDual` | `useMarquee.js` | Seamless marquee — two span pattern |
| `useMarqueeHalf` | `useMarquee.js` | Seamless marquee — scrollWidth/2 |
| `useFadeUp` | `useReveal.js` | Fade + slide up, supports children stagger |
| `useSlideIn` | `useReveal.js` | Slide from left / right / up |
| `useSlideInFaq` | `useReveal.js` | Stagger-slides an array ref from left |
| `useTextReveal` | `useReveal.js` | Word-by-word stagger reveal |
| `useButtonPulse` | `useReveal.js` | Pulse loop when form is ready to submit |
| `shakeElement` | `useReveal.js` | Shake on invalid form submit |
| `fadeOutElement` | `useReveal.js` | Fade out before state change |
| `usePricingEntrance` | `usePricing.js` | Cards scale + fade up on scroll |
| `useFaqEntrance` | `useFaq.js` | Left text + FAQ items from left |
| `useLibraryHero` | `useWorkoutLibrary.js` | Workout library hero stagger |
| `useExerciseGrid` | `useWorkoutLibrary.js` | Cards stagger in on new results |
| `useFilterBarEntrance` | `useWorkoutLibrary.js` | Filter bar slides down on mount |

### Workout Library
- Fetches exercises from ExerciseDB RapidAPI
- GIFs loaded as blobs (bypasses CORS) and cached in memory
- **Smart mock fallback** — when the API is unavailable or the monthly quota (100 req/month on free plan) is reached, the app automatically switches to 28 hardcoded exercises with full filter and pagination support
- API availability is cached for 60 minutes to avoid wasting quota
- Filter by Body Part, Equipment, or Muscle Group
- Search by exercise name
- Pagination with 10 results per page

---

## Project Structure

```
src/
├── assets/                  # Images (hero, programs)
├── components/
│   ├── Layout/              # Navbar, Footer, ScrollToTop, PageLoader
│   └── WorkoutLibrary/      # ExerciseCard, ExerciseModal, FilterBar, Pagination
├── hooks/
│   ├── index.js             # Barrel export — import everything from here
│   ├── useNavbar.js
│   ├── useHero.js
│   ├── useFooter.js
│   ├── useMarquee.js
│   ├── useReveal.js
│   ├── usePricing.js
│   ├── useFaq.js
│   ├── useWorkoutLibrary.js
│   └── useExercises.js      # API logic, mock fallback, filters
├── pages/
│   ├── Home.jsx
│   ├── Contact.jsx
│   └── WorkoutLibraryPage.jsx
└── App.jsx
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/amani.204/transform.git
cd transform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_RAPIDAPI_KEY=api_key_here
```
Get your free API key at [rapidapi.com](https://rapidapi.com) → search **ExerciseDB** → subscribe to the free plan.

> **Note:** The free plan allows 100 requests/month. The app automatically falls back to mock data when the quota is reached — it will still work perfectly without an API key.

### 4. Start the dev server

```bash
npm run dev
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_RAPIDAPI_KEY` | No | ExerciseDB API key. App uses mock data if missing. |

---

## How the Mock Fallback Works

The free ExerciseDB plan limits you to 100 requests/month. To handle this gracefully:

1. On first load, the app pings the API with a single test request
2. If it gets a `403` or `429` response, it sets `apiAvailable = false`
3. All subsequent renders use the 12 hardcoded mock exercises instead
4. The result is cached for 60 minutes — no repeated failed requests
5. A banner is shown in the UI so the user knows they're in mock mode
6. Filters, search, and pagination all work normally on mock data

---

## Key Design Decisions

**Custom GSAP hooks** — Every animation lives in `src/hooks/`. Components contain zero raw `gsap` calls, making them easy to read and maintain.

**Single barrel export** — All hooks are exported from `src/hooks/index.js` so every import is just:
```js
import { useHeroEntrance, useFadeUp, useSlideIn } from '../hooks'
```

**Blob GIF loading** — ExerciseDB serves GIFs with CORS restrictions. The app fetches them as blobs and creates object URLs, bypassing the restriction while caching results in memory.

**Page loader** — A cinematic GSAP loader (letters stagger in → screen splits) runs once on app mount, then unmounts completely.

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---
## Author
*Amani*
