## Why

The live portfolio (React + Vite) is running content and design from an early-career MERN-bootcamp era: the About/Skills/Experience/Projects sections omit Dream71, Kagoj.ai, Jiggasha.ai, TAS, and the Eblict Crowd Data Platform, list zero DevOps/cloud skills, and contain conflicting names/dates duplicated across three-plus files. This undersells the candidate's actual current profile (Full Stack Engineer with DevOps focus on national AI platforms) and the design/UX (single fixed dark theme, ad-hoc `768px` breakpoints, two competing carousel libs, unused Framer Motion dependency, fragmented `/about` page) reads as unpolished. A hiring manager or client visiting today sees a stale, inconsistent site. This needs a coordinated content refresh and a professional-grade design/UX rebuild now, not a patch.

## What Changes

- Replace all hardcoded/duplicated personal content (name, title, about copy, skills, experience, education, projects, social links) with a single source-of-truth data model, refreshed to match the current GitHub profile README (Dream71, Kagoj.ai, Jiggasha.ai, TAS, Eblict Crowd Data Platform, Seopage1, Qubitech, RUET, updated skills incl. Docker/Nginx/Linux/PM2/CI-CD).
- **BREAKING**: Consolidate the fragmented `/about` route into the single-page scroll experience (or redesign it as a fully first-class page) — remove the duplicated/unstyled About content split across `Home` and `AboutPage`.
- Rebuild the visual design system: consistent color tokens (replacing the single hardcoded dark palette + free-form accent color picker), typography scale (trim the 8-font Google Fonts list), and a systematic breakpoint scale replacing ad-hoc `768px` checks.
- Rework layout and components for full responsiveness across mobile/tablet/laptop/large-desktop, including navigation, project cards, and the about/skills sections.
- Standardize animation on a single library (Framer Motion, already a dependency) and remove redundant/unused UI libraries (pick one carousel lib, evaluate Chakra UI vs. Tailwind-only usage).
- Add a terminal/CLI-style streaming introduction as the hero's signature moment: an animated sequence (e.g., `whoami`, name, `cat role.txt`, title, `cat stack.txt`, key skills) that types out the developer's profile details, sourced from the same content data model so it never drifts from the rest of the site.
- Elevate the visual design beyond consistency cleanup: a defined card/panel elevation system (shadows, layering), gradient/glass accent treatments, and scroll-triggered micro-interactions and hover/focus states across navigation, project cards, and skill badges — the goal is a visible, professional upgrade, not just tidied-up code.
- Update the Experience, Skills, and Projects sections to reflect current, accurate work history and featured projects (TAS, Eblict Crowd Data Platform, BanglaGovBD/EBLICT Portal, Game Lab, Drawing Board), replacing the outdated project list.
- Fix data inconsistencies (name spelling, education dates, resume filename) and clean up dependency hygiene (single lockfile, drop unused packages).

## Capabilities

### New Capabilities
- `portfolio-content`: Single source-of-truth data model for profile/about/experience/education/skills/projects/social content, kept in sync with the canonical GitHub README profile.
- `portfolio-design-system`: Shared design tokens (color, typography, spacing, breakpoints) and component-level visual language applied consistently across the site.
- `portfolio-responsive-layout`: Layout and navigation behavior across defined breakpoints (mobile, tablet, desktop, large desktop) for every section/page.

### Modified Capabilities
(none — no existing `openspec/specs/` capabilities yet; this is the first change in this repo)

## Impact

- Affected code: `src/constants/index.js` (becomes/feeds the new data model), all components under `src/components/` and `src/components/aboutPage/`, `src/pages/*.jsx`, `src/App.jsx` routing, `src/index.css`/`App.css` and styled-components theme values.
- Dependencies: likely drop one of `nuka-carousel`/`react-slick`, reassess `@chakra-ui/react` vs. Tailwind-only, consolidate on `framer-motion` for animation, reconcile `package-lock.json` vs `pnpm-lock.yaml` to a single lockfile.
- Assets: replace/update `profile.jpg`, resume PDF (fix filename typo), and project images (currently hosted on ibb.co) with current project screenshots.
- No backend/API impact — this is a static front-end content and presentation change; EmailJS contact form config may need updated IDs.
