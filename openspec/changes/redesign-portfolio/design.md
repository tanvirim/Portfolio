## Context

The portfolio is a React 18 + Vite 4 SPA (`react-router-dom` v6, 3 routes: `/`, `/about`, `/projects`). Styling is a hybrid of Tailwind CSS, `styled-components`, and plain CSS with hand-picked hex values; there is no shared token system. Content is mostly hardcoded inline in JSX, with one partial data file (`src/constants/index.js`) holding `educationHistory`, `projects[]`, and sample commit data. The `/about` route duplicates content already shown in a modal on `/`. Two carousel libraries, an unused Chakra UI dependency, and a possibly-dead `framer-motion` dependency are present. Two lockfiles (`package-lock.json`, `pnpm-lock.yaml`) coexist. This is a solo-maintained personal site with no CI/CD, no tests beyond none, and no external stakeholders — changes can be made directly on `main` with visual verification via the dev server.

## Goals / Non-Goals

**Goals:**
- One source-of-truth data module for all profile content (name, title, about, skills, experience, education, projects, social links, contact), matching the current GitHub README.
- A small, explicit design-token layer (color, type scale, spacing, breakpoints) consumed consistently by every component, replacing ad hoc hex values and the runtime accent-color picker.
- Full responsive behavior at defined breakpoints (mobile ~375–639px, tablet ~640–1023px, laptop ~1024–1439px, large desktop ≥1440px), verified in-browser at each.
- One animation library (Framer Motion) and one carousel library; drop the redundant one.
- Fix content/data inconsistencies (name spelling, education dates, resume filename) as part of the data-model migration, not as a separate cleanup pass.
- Deliver a visible, professional-grade design upgrade, not just consistency cleanup: a signature interactive hero moment (terminal-style streaming intro) plus a systematic elevation/gradient treatment and micro-interactions applied across cards, nav, and buttons.

**Non-Goals:**
- No backend/CMS — content stays in a static TS/JS data module in the repo, edited via code, not a headless CMS or database.
- No migration off Vite/React or to Next.js — framework stays as-is; this is a content + presentation layer change.
- No new contact-form backend — EmailJS integration is kept, only its config values are updated if needed.
- No automated visual regression or e2e test suite is being introduced as part of this change (manual in-browser verification across breakpoints is the acceptance method).

## Decisions

**1. Single data module (`src/data/profile.ts` or `.js`) as the content source of truth.**
Consolidate `constants/index.js` plus every hardcoded string in `Intro.jsx`, `AboutMe.jsx`, `Header.jsx`, `Footer.jsx`, `Introduction.jsx`, `Skills.jsx`, `Education.jsx`, `ProjectCards`, etc. into one exported object/array set (profile, experience[], education[], skills[], projects[], social[]). Components import from here instead of hardcoding strings.
*Alternative considered*: MDX/JSON content files — rejected as unnecessary indirection for a single-maintainer static site; a typed JS/TS module gives autocomplete and is simpler to keep in sync with the README by hand.

**2. Remove the `/about` route; fold About into the single-page scroll on `/`.**
The About page (`AboutPage.jsx` + `components/aboutPage/*`) duplicates and fragments what the Home page's About section/modal already shows, with weaker styling. Rather than maintain two parallel About implementations, keep one well-designed About section on the home page (anchor `#about`) and remove the separate route and its now-orphaned components.
*Alternative considered*: keep `/about` as the canonical detailed page and slim down the home-page modal — rejected because the single-page scroll is the primary/shared entry point (nav links, resume, etc. anchor to it) and splitting content increases duplication risk again.

**3. Design tokens via Tailwind theme extension, not a parallel CSS-variable system.**
Define the color palette, font scale, spacing, and breakpoints in `tailwind.config.js` `theme.extend`, and drop the free-form runtime `ColorPicker`/`defaultColor` accent-swapping feature. `styled-components` usage is reduced to cases Tailwind can't express cleanly (e.g., keyframe-heavy custom cursor); those pull their values from the same token set via a small exported JS theme object, not separate hardcoded hex codes.
*Alternative considered*: keep styled-components as the primary styling layer — rejected; Tailwind is already the dominant approach and consolidating avoids maintaining two parallel styling mental models. Chakra UI is dropped entirely (lightly used, redundant with Tailwind).

**4. One animation library: Framer Motion.**
Replace hand-rolled CSS `@keyframes` (in styled-components) for page/section transitions, reveal-on-scroll, and hover effects with Framer Motion, since it's already a dependency. Keep small, cheap pure-CSS transitions (e.g., `:hover` color changes) as plain CSS/Tailwind — Framer Motion is for orchestrated/entrance animations only, not a blanket replacement of every transition.
*Alternative considered*: drop Framer Motion and keep CSS keyframes — rejected since it's a sunk dependency and gives easier scroll-triggered/staggered animations for a "professional, amazing" feel.

**5. One carousel: keep `react-slick` (`slick-carousel`), drop `nuka-carousel`.**
`react-slick` is the more actively maintained/broadly used option of the two already present. Remove `nuka-carousel` from `package.json` and any usage.

**6. Breakpoint scale: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`) used consistently everywhere, replacing ad hoc `max-width: 768px` styled-components media queries.**
Any remaining styled-components media queries are rewritten to match these same pixel values so behavior is consistent whether a component uses Tailwind classes or styled-components.

**7. Dependency cleanup: pick one package manager/lockfile (npm, matching existing `package-lock.json` as the one currently referenced in most tooling) and delete the other lockfile; remove `nuka-carousel`, `@chakra-ui/react`, `@chakra-ui/icons` if confirmed unused after the migration.**

**8. Terminal-style streaming hero component, built as scripted text + CSS/Framer Motion, not video/canvas.**
A small component drives a scripted array of lines (sourced from the `profile` data module — name, title, key stack facts) and reveals them with a character-by-character typewriter effect using Framer Motion or a lightweight interval-based hook. The lines are real text nodes present in the DOM immediately (the animation is a purely visual reveal, e.g., via opacity/width, not a delayed content injection), so screen readers and SEO crawlers see full content regardless of animation state. When `prefers-reduced-motion` is set, the component skips the typewriter effect and renders the full sequence immediately.
*Alternative considered*: a recorded terminal GIF/video — rejected as inaccessible (not real text, not resizable/theming-aware) and disconnected from the single content data module (would need separate re-recording whenever profile data changes).

## Risks / Trade-offs

- [Risk] Removing `/about` as a distinct route could break any external links/bookmarks pointing at `/about` → Mitigation: add a redirect from `/about` to `/#about` in the router rather than a hard 404.
- [Risk] Large-scale JSX rewrite across ~20 components risks visual regressions with no automated test coverage → Mitigation: manual pass through every section at all 4 breakpoints (documented in tasks.md) before considering the change done; keep changes reviewable by doing content-model migration and visual redesign as distinguishable, sequential task groups.
- [Risk] Removing Chakra UI/nuka-carousel could break a component not caught during the audit → Mitigation: grep for imports of the dropped packages before removing them from `package.json`, not just before/after visual check.
- [Risk] Content accuracy — profile data must match the developer's actual current role/projects, not just the shared README verbatim → Mitigation: use the provided GitHub README as the primary source and flag any additional/missing details as open questions before writing final copy.
- [Trade-off] Dropping the runtime accent-color picker removes a "fun" personalization feature in favor of a consistent, curated palette — acceptable given the goal is a polished, professional impression over a novelty interaction.
- [Risk] The terminal streaming animation could be a11y-hostile (motion sensitivity, screen readers reading a partially-revealed line) if implemented as content injected over time → Mitigation: keep full text in the DOM from render and reveal only via CSS/opacity, and honor `prefers-reduced-motion` to skip the animation entirely (see Decision 8).

## Migration Plan

1. Build the new data module and design tokens first (non-visual, low risk).
2. Migrate components section-by-section (Navbar → Hero/Intro → About → Skills → Experience → Projects → Footer/Contact) to consume the new data + tokens, verifying each in the browser before moving to the next.
3. Remove the `/about` route and its now-unused components only after the consolidated About section on `/` is verified complete.
4. Run the responsive pass (mobile → large desktop) across the whole site as a final dedicated step.
5. Clean up dependencies (lockfile, unused packages) last, after nothing in the codebase references them.
Rollback: each step is a small commit on `main`; since there's no deployed CI/CD gate described, rollback is `git revert` of the offending commit(s).

## Open Questions

- Should `/about` and `/projects` be removed as routes entirely (folding everything into one scrolling page), or kept as real pages with the design system applied? (Design above assumes removing `/about` but keeping `/projects` as-is — confirm scope with user before task execution if unclear.)
- Any additional projects/details beyond the shared GitHub README to include (e.g., specific screenshots, case-study write-ups) not yet available?
- Preferred final visual direction — the design.md sets the mechanism (tokens, one palette) but not final color/typography choices; those will be proposed during implementation and can be adjusted with the user.
