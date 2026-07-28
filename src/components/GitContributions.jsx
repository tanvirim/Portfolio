/* eslint-disable react/prop-types */

import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import useGitHubRepos from "../Hooks/useRepos";
import useCommits from "../Hooks/useCommits";
import { useState } from "react";
import parseHexColor from "../utils/parseHexColor";
import SkeletonLoader from "./Skeleton";
import { StaticDate } from "../constants";

const WEEKS = 30;
const DAYS_PER_WEEK = 7;

// Builds a trailing 30-week calendar (like github.com's contribution graph):
// one cell per real calendar day, including days with zero commits, laid
// out column-major (each column = one week) so it reads left-to-right.
const buildCalendar = (frequencyMap) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalDays = WEEKS * DAYS_PER_WEEK;
  const start = new Date(today);
  start.setDate(start.getDate() - (totalDays - 1));
  // Align the grid so the first column starts on a Sunday.
  start.setDate(start.getDate() - start.getDay());

  const days = [];
  const cursor = new Date(start);
  while (cursor <= today || days.length % DAYS_PER_WEEK !== 0) {
    const key = cursor.toISOString().split("T")[0];
    days.push({
      date: new Date(cursor),
      count: frequencyMap[key] || 0,
    });
    cursor.setDate(cursor.getDate() + 1);
    if (cursor > today && days.length % DAYS_PER_WEEK === 0) break;
  }

  return days;
};

const countToClass = (count) => {
  if (count > 10) return "class1";
  if (count >= 6) return "class2";
  if (count >= 2) return "class3";
  if (count >= 1) return "class4";
  return "class0";
};

// Defined once at module scope (not inside the component) — a styled-component
// redefined on every render gets a fresh identity each time, which forces
// React to unmount/remount the whole grid on every state update. That was
// racing with the hover events and killing the tooltip before it could show.
const Container = styled.div`
  display: grid;
  /* Exactly ${WEEKS} equal columns spanning the full container width — cell
     width is however wide that makes each column, not a fixed size. Row
     height is NOT set independently; each .column derives its height from
     that computed width via aspect-ratio below, so cells stay square and
     the panel's total height grows/shrinks with the container's width
     instead of the grid stretching non-square cells to fit. */
  grid-template-columns: repeat(${WEEKS}, minmax(4px, 1fr));
  grid-template-rows: repeat(${DAYS_PER_WEEK}, auto);
  grid-auto-flow: column;
  gap: clamp(2px, 0.6vw, 6px);
  width: 100%;

  /* Stable wrapper — never transformed, so getBoundingClientRect() on it
     always reflects the real grid position. The hover "pop" is applied to
     .tile inside it instead; otherwise a scale-from-center transform on
     this element would grow its own rect (bottom edge moves down), which
     was throwing the tooltip's computed position off. */
  .column {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
  }

  .tile {
    position: absolute;
    inset: 0;
    border-radius: 3px;
    transform: scale(1) translateY(0);
    transition:
      transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.15s ease,
      outline 0.15s ease;
  }

  .column:hover .tile {
    outline: 1px solid rgba(255, 255, 255, 0.6);
    transform: scale(1.4) translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.45);
    z-index: 5;
    cursor: pointer;
  }
  .class0 {
    background-color: rgba(255, 255, 255, 0.08);
  }
  .class1 {
    background-color: rgba(
      ${({ colorRGBA }) => colorRGBA.r || 0},
      ${({ colorRGBA }) => colorRGBA.g || 0},
      ${({ colorRGBA }) => colorRGBA.b || 0},
      1
    );
  }
  .class2 {
    background-color: rgba(
      ${({ colorRGBA }) => colorRGBA.r || 0},
      ${({ colorRGBA }) => colorRGBA.g || 0},
      ${({ colorRGBA }) => colorRGBA.b || 0},
      0.75
    );
  }
  .class3 {
    background-color: rgba(
      ${({ colorRGBA }) => colorRGBA.r || 0},
      ${({ colorRGBA }) => colorRGBA.g || 0},
      ${({ colorRGBA }) => colorRGBA.b || 0},
      0.5
    );
  }
  .class4 {
    background-color: rgba(
      ${({ colorRGBA }) => colorRGBA.r || 0},
      ${({ colorRGBA }) => colorRGBA.g || 0},
      ${({ colorRGBA }) => colorRGBA.b || 0},
      0.3
    );
  }
`;

const GitContributionsBar = ({ color }) => {
  const colorRGBA = parseHexColor(color, { r: 77, g: 27, b: 97 });

  const accessToken = import.meta.env.VITE_GITHUB_SECRET_KEY;
  const owner = import.meta.env.VITE_GITHUB_USERNAME;
  const repositories = useGitHubRepos(accessToken);

  const { dateFrequencyMap, isLoading } = useCommits(
    owner,
    repositories,
    accessToken
  );

  // A single tooltip rendered with `position: fixed`, positioned from the
  // hovered cell's real screen coordinates — this escapes the grid's
  // `overflow-x: auto` clipping entirely, unlike a tooltip nested inside
  // each cell (which was getting cut off).
  const [tooltip, setTooltip] = useState(null);

  const TOOLTIP_MAX_WIDTH = 180;
  const VIEWPORT_MARGIN = 8;

  const handleMouseEnter = (event, day) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const halfWidth = TOOLTIP_MAX_WIDTH / 2;
    const rawX = rect.left + rect.width / 2;
    // Clamp so the tooltip (centered on the cell) never crosses the
    // viewport edge, regardless of which column is hovered.
    const clampedX = Math.min(
      Math.max(rawX, halfWidth + VIEWPORT_MARGIN),
      window.innerWidth - halfWidth - VIEWPORT_MARGIN
    );

    // If the cell is near the bottom of the viewport, show the tooltip
    // above it instead of below, so it can't get cut off at the bottom.
    const spaceBelow = window.innerHeight - rect.bottom;
    const showAbove = spaceBelow < 80;

    setTooltip({
      x: clampedX,
      y: showAbove ? rect.top - 8 : rect.bottom + 8,
      showAbove,
      text: `${day.count} GitHub ${
        day.count === 1 ? "Contribution" : "Contributions"
      } on ${day.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`,
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  const hasLiveData = Object.keys(dateFrequencyMap).length > 0;
  const staticFrequencyMap = StaticDate.reduce((acc, entry) => {
    const key = new Date(entry.date).toISOString().split("T")[0];
    acc[key] = entry.count;
    return acc;
  }, {});

  const calendarDays = buildCalendar(
    hasLiveData ? dateFrequencyMap : staticFrequencyMap
  );

  if (isLoading && !hasLiveData) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <Container colorRGBA={colorRGBA}>
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className="column"
            onMouseEnter={(event) => handleMouseEnter(event, day)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`tile ${countToClass(day.count)}`} />
          </div>
        ))}
      </Container>
      {createPortal(
        <AnimatePresence>
          {tooltip && (
            <motion.div
              key={tooltip.text}
              initial={{ opacity: 0, scale: 0.85, y: tooltip.showAbove ? 6 : -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: tooltip.showAbove ? 6 : -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`fixed z-[999] pointer-events-none -translate-x-1/2 flex flex-col items-center ${
                tooltip.showAbove ? "flex-col-reverse -translate-y-full" : ""
              }`}
              style={{ left: tooltip.x, top: tooltip.y, maxWidth: TOOLTIP_MAX_WIDTH }}
            >
              <div
                className={`w-2.5 h-2.5 rotate-45 shrink-0 ${
                  tooltip.showAbove ? "mt-[-6px]" : "mb-[-6px]"
                }`}
                style={{
                  backgroundImage: `linear-gradient(135deg, ${color}, var(--secondary-color))`,
                }}
              />
              <div
                className="p-[1.5px] rounded-lg shadow-[0_0_16px_rgba(0,0,0,0.35)] w-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${color}, var(--secondary-color))`,
                }}
              >
                <div className="rounded-[7px] bg-[#0d1117] px-3 py-1.5">
                  <span className="text-xs font-semibold text-white break-words">
                    {tooltip.text}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default GitContributionsBar;
