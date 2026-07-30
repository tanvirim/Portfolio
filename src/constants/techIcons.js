import { FaCubes } from "react-icons/fa";
import { Gamepad2, Component, KeyRound } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiNodedotjs,
  SiReact,
  SiSqlite,
  SiStyledcomponents,
  SiAntdesign,
  SiGooglebard,
  SiHtml5,
  SiDjango,
  SiPostgresql,
} from "react-icons/si";

// Each technology's own real brand color — not the page's accent — so a
// project's tech-stack icons are tinted like the actual logos. There's no
// official Gemini/Gemma icon in the icon set this project uses, so "AI/ML"
// borrows Google Bard's (Gemini's predecessor, same lineage) as the closest
// available stand-in. Two more have no real brand mark to borrow at all:
// "Canvas" uses the HTML5 logo (the canvas element is part of the HTML5
// spec) and "RAWG API" — a video game database API with no simple-icons
// entry — uses a generic game-controller glyph instead of a lookalike
// brand's icon, so it can't be mistaken for endorsement by another company.
//
// Shared between ProjectCards (card tech-stack row) and ProjectModal
// (project detail view) so both show the exact same icon/color per
// technology.
export const TECH_ICON_META = {
  "AI/ML": { icon: SiGooglebard, color: "#886FBF" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "Next.js 14": { icon: SiNextdotjs, color: "#000000" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "Express.js": { icon: SiExpress, color: "#000000" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  "Socket.io": { icon: SiSocketdotio, color: "#010101" },
  "Socket.Io": { icon: SiSocketdotio, color: "#010101" },
  "Redux Toolkit": { icon: SiRedux, color: "#764ABC" },
  "Redux toolkit": { icon: SiRedux, color: "#764ABC" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  Tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  MUI: { icon: SiMui, color: "#007FFF" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  React: { icon: SiReact, color: "#61DAFB" },
  Zustand: { icon: FaCubes, color: "#F0A202" },
  SQLite: { icon: SiSqlite, color: "#003B57" },
  "Styled Component": { icon: SiStyledcomponents, color: "#DB7093" },
  "ANT Design": { icon: SiAntdesign, color: "#1890FF" },
  Canvas: { icon: SiHtml5, color: "#E34F26" },
  "RAWG API": { icon: Gamepad2, color: "#7C5CFC" },
  Django: { icon: SiDjango, color: "#092E20" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  // Neither shadcn/ui nor "Auth" (a generic capability, not a product) has
  // a real brand mark in this icon set — same reasoning as Canvas/RAWG API
  // above, generic glyphs instead of borrowing an unrelated logo.
  "shadcn/ui": { icon: Component, color: "#000000" },
  Auth: { icon: KeyRound, color: "#F59E0B" },
};
