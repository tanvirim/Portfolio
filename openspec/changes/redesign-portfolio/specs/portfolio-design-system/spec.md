## ADDED Requirements

### Requirement: Centralized design tokens
The system SHALL define color, typography, and spacing values as centralized design tokens (via Tailwind theme configuration) that components reference, rather than components declaring their own hardcoded hex colors or font stacks.

#### Scenario: Color used consistently across components
- **WHEN** any two components display an element in the "primary accent" role (e.g., a call-to-action button and a section heading underline)
- **THEN** both use the same token-defined color value, not independently chosen hex codes

#### Scenario: Adding a new component follows the token palette
- **WHEN** a new UI element is added to the site
- **THEN** its colors and font sizes are drawn from the defined token set rather than introducing a new one-off value

### Requirement: Fixed, curated color palette (no runtime accent picker)
The system SHALL present a single, curated color palette to all visitors. The prior runtime accent-color picker feature SHALL be removed.

#### Scenario: Palette is not user-configurable
- **WHEN** a visitor loads the site
- **THEN** no UI control exists to change the site's accent color, and the palette is identical across page loads and sessions

### Requirement: Reduced, purposeful typography scale
The system SHALL use a typography system limited to at most two font families (e.g., one for headings, one for body/UI text) with a defined set of size steps, replacing the prior ad hoc use of eight+ Google Fonts.

#### Scenario: Consistent heading font across sections
- **WHEN** headings are rendered in different sections (hero, about, projects, footer)
- **THEN** all headings use the same designated heading font and one of the defined size steps

### Requirement: Single animation library
The system SHALL implement entrance/scroll/orchestrated animations using Framer Motion exclusively; redundant hand-rolled CSS `@keyframes` implementations of the same effects SHALL be removed.

#### Scenario: Section reveal animation
- **WHEN** a visitor scrolls a new section into view
- **THEN** the section's entrance animation is driven by Framer Motion, not a component-local CSS `@keyframes` block duplicating the same effect

### Requirement: Single carousel implementation
The system SHALL use exactly one carousel library across the site. Any redundant second carousel dependency SHALL be removed along with its usages.

#### Scenario: Only one carousel package remains
- **WHEN** the project's dependency manifest is inspected after this change
- **THEN** only one carousel-related package is listed, and it is the one actively used by all carousel UI on the site

### Requirement: Terminal-style streaming introduction
The system SHALL present a terminal/CLI-style animated introduction as the hero section's signature element, streaming the developer's name, title, and key profile facts sourced from the same content data module used elsewhere on the site. The streamed text SHALL be present in the DOM as real text at render time, with the animation implemented as a visual reveal (not delayed content injection).

#### Scenario: Hero streams profile details
- **WHEN** a visitor loads the home page
- **THEN** the hero section plays a typewriter-style sequence revealing the developer's name, title, and key stack facts, matching the content data module

#### Scenario: Reduced-motion visitors see full content immediately
- **WHEN** a visitor has `prefers-reduced-motion` enabled
- **THEN** the terminal component renders its full text immediately without the typewriter animation

#### Scenario: Content is accessible regardless of animation state
- **WHEN** a screen reader or search engine crawler inspects the hero section
- **THEN** the full streamed text is present in the page's DOM/accessibility tree, not hidden or only revealed via a JavaScript animation timeline

### Requirement: Elevated visual polish and micro-interactions
The system SHALL apply a consistent elevation system (shadow/layering tokens) and scroll-triggered or hover/focus-triggered micro-interactions across navigation links, project cards, skill badges, and buttons, so the redesign reads as a visible upgrade rather than a like-for-like cleanup.

#### Scenario: Project cards have consistent elevation and hover feedback
- **WHEN** a visitor hovers or focuses a project card
- **THEN** the card responds with a defined elevation/shadow shift and accent-color transition consistent with every other project card on the page

#### Scenario: Sections reveal with micro-interaction on scroll
- **WHEN** a visitor scrolls a new section (e.g., skills, projects, experience) into view
- **THEN** the section's elements animate in via a defined micro-interaction (e.g., fade/slide reveal) rather than appearing abruptly with no transition
