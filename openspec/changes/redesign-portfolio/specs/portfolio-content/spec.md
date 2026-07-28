## ADDED Requirements

### Requirement: Single source-of-truth content module
The system SHALL define all personal/profile content (name, title/tagline, about copy, social links, contact info) in one data module that every component consuming this content imports from, rather than hardcoding the values inline in multiple components.

#### Scenario: Name and title rendered consistently
- **WHEN** the site renders the name and professional title in the navbar, intro/hero section, footer, and any about section
- **THEN** all instances display the identical, current name and title sourced from the single content module

#### Scenario: Updating content requires editing one location
- **WHEN** a maintainer needs to update the tagline or about text
- **THEN** editing the single content module's relevant field updates every place that text is displayed, with no duplicate copies to edit elsewhere

### Requirement: Current experience history
The system SHALL list work experience entries matching the developer's actual current history: Software Engineer at Dream71 Bangladesh Limited (2025–Present), Software Developer at Seopage1 (2024–2025), and Intern Web Developer at Qubitech Solutions (2023), each with role, organization, dates, and a description.

#### Scenario: Experience section displays all current roles
- **WHEN** a visitor views the experience/work-history section
- **THEN** the three roles above are displayed in reverse-chronological order with accurate dates and descriptions, and no outdated or fabricated roles are shown

### Requirement: Current skills list including DevOps/infrastructure
The system SHALL list skills reflecting the developer's current stack, including frontend (Next.js, React, Tailwind CSS, Redux Toolkit, Shadcn/UI), backend (Node.js, Express.js, NestJS, Socket.io, JWT/OAuth), databases (MongoDB, MySQL, SQLite), and DevOps/infrastructure (Docker, Nginx, Linux, PM2, VPS/production servers, Git, GitHub Actions).

#### Scenario: Skills section includes DevOps category
- **WHEN** a visitor views the skills section
- **THEN** Docker, Nginx, Linux, and PM2 appear among the listed skills, in addition to the existing frontend/backend/database entries

### Requirement: Current featured projects
The system SHALL list, at minimum, the following projects with descriptions and links where available: TAS (AI Meeting Minutes), Eblict Crowd Data Platform, BanglaGovBD/EBLICT Information Portal, Game Lab, and Drawing Board. Outdated placeholder-era projects not reflective of current work (e.g., generic bootcamp exercises no longer representative) SHALL be removed unless the maintainer confirms they should remain.

#### Scenario: Projects section shows current flagship work
- **WHEN** a visitor views the projects section
- **THEN** TAS and Eblict Crowd Data Platform are shown with their tech stack tags and, where available, a live link

### Requirement: Accurate education record
The system SHALL display a single, internally consistent education record: Bachelor of Science, Materials Science & Engineering, Rajshahi University of Engineering & Technology (RUET), with one consistent set of dates (not conflicting values across sections).

#### Scenario: Education dates are consistent
- **WHEN** the education entry is rendered anywhere on the site
- **THEN** the institution name and date range match exactly everywhere it appears, with no conflicting years shown in different components

### Requirement: Correct resume asset
The system SHALL serve the resume download from a correctly named file (no typos in the filename) and the link SHALL resolve to a downloadable PDF.

#### Scenario: Visitor downloads resume
- **WHEN** a visitor clicks the resume/CV download link
- **THEN** a valid PDF resume downloads successfully, served from a correctly spelled filename
