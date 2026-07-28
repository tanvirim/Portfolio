## ADDED Requirements

### Requirement: Consistent breakpoint scale
The system SHALL apply a single, shared breakpoint scale (mobile <640px, tablet 640–1023px, laptop 1024–1439px, large desktop ≥1440px) across all components, whether styled with Tailwind utility classes or styled-components media queries. Ad hoc, component-specific breakpoint values SHALL NOT be introduced.

#### Scenario: Navbar and layout breakpoints agree
- **WHEN** the viewport width crosses the tablet/laptop boundary (1024px)
- **THEN** the navigation, section layout, and any other responsive component all transition to their laptop-and-up presentation at the same width, with no component switching at a different, inconsistent breakpoint

### Requirement: No horizontal scrolling or content clipping at any supported width
The system SHALL render every page/section without horizontal overflow or clipped content at viewport widths from 375px up to at least 1920px.

#### Scenario: Mobile viewport renders without overflow
- **WHEN** the site is loaded at a 375px-wide viewport
- **THEN** no element causes horizontal scrolling and all text/images remain within the viewport bounds

#### Scenario: Large desktop viewport renders without excessive whitespace or broken layout
- **WHEN** the site is loaded at a 1920px-wide viewport
- **THEN** content is constrained to a readable max-width layout (not stretched edge-to-edge with distorted spacing) and no element overflows or clips

### Requirement: Mobile navigation
The system SHALL provide a usable mobile navigation pattern (e.g., collapsible/hamburger menu) below the tablet breakpoint that provides access to all primary navigation links available on desktop.

#### Scenario: All nav links reachable on mobile
- **WHEN** a visitor on a viewport narrower than 640px opens the mobile navigation menu
- **THEN** every primary navigation link available in the desktop navbar is present and functional in the mobile menu

### Requirement: Responsive project and skill card grids
The system SHALL reflow project cards and skill badges into an appropriate column count per breakpoint (e.g., single column on mobile, multi-column on tablet and above) without overlapping or truncating content.

#### Scenario: Project cards reflow on mobile
- **WHEN** the projects section is viewed on a mobile-width viewport
- **THEN** project cards stack in a single column, each fully readable without horizontal scrolling or overlapping text

### Requirement: Single consolidated About experience
The system SHALL present exactly one About section/page containing the developer's introduction, education, and hobbies content — not a route-level page and a separate home-page modal that duplicate and diverge from each other. If the `/about` route is removed, navigating to it SHALL redirect to the equivalent section on the home page rather than returning a broken/404 page.

#### Scenario: About content is not duplicated
- **WHEN** a visitor looks for education or hobbies information
- **THEN** it appears in exactly one place in the site's information architecture, with consistent content

#### Scenario: Legacy /about link still resolves
- **WHEN** a visitor navigates directly to the `/about` URL
- **THEN** they are redirected to the consolidated About section rather than seeing a 404 or broken page
