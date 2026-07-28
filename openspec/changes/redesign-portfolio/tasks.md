## 1. Content Data Model

- [x] 1.1 Create `src/data/profile.js` (or `.ts`) exporting: `profile` (name, title/tagline, about copy, email, resume path), `social[]` (GitHub, LinkedIn, email, etc.), `experience[]` (Dream71, Seopage1, Qubitech Solutions with accurate dates/descriptions), `education[]` (RUET, BSc Materials Science & Engineering, one consistent date range), `skills[]` (grouped: languages, frontend, backend, database, devops/infra, tooling — including Docker, Nginx, Linux, PM2, VPS, GitHub Actions), `projects[]` (TAS, Eblict Crowd Data Platform, BanglaGovBD/EBLICT Portal, Game Lab, Drawing Board, with description, tech tags, and links)
- [x] 1.2 Fix resume asset filename typo (`Tanvit_Mitul_Resume.pdf` → correct spelling) and update the reference in the new data module
- [x] 1.3 Audit all components for hardcoded personal content strings (Navbar, Intro, Welcome, AboutMe, Footer, Introduction, Education, Hobbies, Skills, ProjectCards) and list them for replacement in section 2

## 2. Migrate Components to Data Model

- [x] 2.1 Update Navbar/Footer to read name, title, and social links from `profile`/`social`
- [x] 2.2 Update Intro/hero section to read name, title/tagline, and about summary from `profile`
- [x] 2.3 Update About section to read about copy, education, and hobbies from the data module (single copy, not duplicated between Home and `/about`)
- [x] 2.4 Update Skills section to render from `skills[]`, including the new DevOps/infra group
- [x] 2.5 Add an Experience section (new or extending AboutMe) rendering `experience[]` in reverse-chronological order
- [x] 2.6 Update Projects section/cards to render from `projects[]`, replacing the outdated project list
- [x] 2.7 Verify no component still contains hardcoded personal content after migration (re-check the list from 1.3)

## 3. Design Tokens

- [x] 3.1 Define color palette, font families/scale, spacing scale, and breakpoints (`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`) in `tailwind.config.js` `theme.extend`
- [x] 3.2 Reduce Google Fonts import to at most two font families (heading + body) and update `index.css`/`App.css`
- [x] 3.3 Remove the `ColorPicker` component, `defaultColor` state, and any accent-color runtime logic from `Home.jsx` and related components
- [x] 3.4 Create a shared JS theme object (mirroring the Tailwind tokens) for any remaining `styled-components` usage, and update those components to reference it instead of hardcoded hex values — superseded: every remaining `styled-components` usage migrated cleanly to Tailwind utilities, so `styled-components` and the JS theme object were removed entirely instead (see design.md decision 3 update)

## 4. Terminal Streaming Hero & Visual Polish

- [x] 4.1 Build a terminal-style streaming component that types out a scripted sequence (e.g., `whoami`, name, `cat role.txt`, title, `cat stack.txt`, key skills) sourced from the `profile` data module
- [x] 4.2 Respect `prefers-reduced-motion`: render the full sequence immediately without the typewriter animation when reduced motion is requested
- [x] 4.3 Ensure the terminal component's content is present in the DOM as real text (not canvas/video) for accessibility and SEO, with the animation purely visual
- [x] 4.4 Redesign the hero section layout around the terminal component (asymmetric grid, gradient/glass accent panel)
- [x] 4.5 Define and apply a consistent card/panel elevation system (shadow tokens) across project cards, skill badges, and the terminal panel
- [x] 4.6 Add scroll-triggered reveal micro-interactions (via Framer Motion) to project cards, skill badges, and section headings
- [x] 4.7 Add polished hover/focus states to nav links, project cards, and buttons (elevation/shadow shift, accent color transition)

## 5. Animation & Dependency Consolidation

- [x] 5.1 Identify all hand-rolled CSS `@keyframes` animations in styled-components (navbar hover, social icon wave, letter-reveal, footer pulse, cursor glow, section reveals) and reimplement entrance/scroll animations with Framer Motion
- [x] 5.2 Grep the codebase for `nuka-carousel` usage; migrate any remaining usages to `react-slick`, then remove `nuka-carousel` from `package.json` — no remaining carousel UI at all post-redesign (project image galleries removed with the modal), so `react-slick`/`slick-carousel` were removed too instead of kept
- [x] 5.3 Grep the codebase for `@chakra-ui/react` / `@chakra-ui/icons` usage; replace with Tailwind/plain components, then remove the Chakra packages from `package.json`
- [x] 5.4 Delete the unused lockfile (keep one of `package-lock.json` / `pnpm-lock.yaml` matching the package manager actually in use) and reinstall to confirm a clean install works

## 6. Information Architecture

- [x] 6.1 Consolidate the `/about` route content into the home page's About section per design.md decision 2; remove `AboutPage.jsx` and now-unused `components/aboutPage/*` files once the consolidated section is verified complete
- [x] 6.2 Add a redirect from `/about` to `/#about` in the router so existing links don't 404
- [x] 6.3 Review `/projects` route for consistency with the new design tokens and data model (kept as a standalone route per design.md)

## 7. Responsive Pass

- [ ] 7.1 Replace ad hoc `max-width: 768px` styled-components media queries with the shared breakpoint scale from section 3
- [ ] 7.2 Verify and fix layout at mobile width (375px): navbar hamburger menu, hero (terminal component), about, skills, experience, projects (single column), footer — no horizontal scroll or clipped content
- [ ] 7.3 Verify and fix layout at tablet width (~768px)
- [ ] 7.4 Verify and fix layout at laptop width (~1280px)
- [ ] 7.5 Verify and fix layout at large desktop width (~1920px): content constrained to a readable max-width, no edge-to-edge stretching
- [ ] 7.6 Verify mobile navigation menu exposes every primary nav link available on desktop

## 8. Final Verification

- [ ] 8.1 Run the app locally (`npm run dev` / `pnpm dev`) and click through every nav link, section anchor, project link, and the resume download to confirm they work
- [ ] 8.2 Confirm EmailJS contact form still submits successfully with current config
- [ ] 8.3 Run lint/build (`npm run lint`, `npm run build`) and fix any errors introduced by the migration
- [ ] 8.4 Cross-check all rendered content (name, dates, roles, projects) against the source GitHub README for accuracy
