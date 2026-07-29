/* eslint-disable react/prop-types */

import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useMemo, useState } from "react";

import useContributions from "../Hooks/useContributions";
import parseHexColor from "../utils/parseHexColor";
import SkeletonLoader from "./Skeleton";

const DAYS_PER_WEEK = 7;
const YEARS_BACK = 2; // shows current (rolling) year plus this many past calendar years

// 2021-2023 contribution history lives under a different (older) GitHub
// account than the current one, so those tabs authenticate with a separate
// login/token pair (see VITE_GITHUB_*_LEGACY in .env) instead of the
// primary VITE_GITHUB_* credentials used for everything else.
const LEGACY_YEARS = [2023, 2022, 2021];
const LEGACY_YEAR_SET = new Set(LEGACY_YEARS);

const countToClass = (count) => {
  if (count > 10) return "class1";
  if (count >= 6) return "class2";
  if (count >= 2) return "class3";
  if (count >= 1) return "class4";
  return "class0";
};

// Legend order goes light -> dark ("Less" to "More").
const LEGEND_CLASSES = ["class0", "class4", "class3", "class2", "class1"];

// The current tab is GitHub's rolling "last year" window (today - 365 days);
// past tabs are full Jan 1 - Dec 31 calendar years, matching github.com.
const getRangeForYear = (year, currentYear, today) => {
  if (year === currentYear) {
    const to = new Date(today);
    to.setHours(23, 59, 59, 999);
    const from = new Date(today);
    from.setFullYear(from.getFullYear() - 1);
    from.setDate(from.getDate() + 1);
    from.setHours(0, 0, 0, 0);
    return { from: from.toISOString(), to: to.toISOString() };
  }
  const from = new Date(year, 0, 1, 0, 0, 0);
  const to = new Date(year, 11, 31, 23, 59, 59);
  return { from: from.toISOString(), to: to.toISOString() };
};

// GitHub returns each week as only the days that fall inside [from, to], so
// a boundary week can start mid-week. Re-bucket every day into its real
// weekday row (Sun=0..Sat=6) so the grid lines up column-major like GitHub's.
const buildColumns = (weeks) =>
  weeks.map((week) => {
    const column = Array(DAYS_PER_WEEK).fill(null);
    week.contributionDays.forEach((day) => {
      const dayOfWeek = new Date(`${day.date}T00:00:00`).getDay();
      column[dayOfWeek] = day;
    });
    return column;
  });

const getMonthLabels = (weeks) => {
  let lastMonth = -1;
  const raw = weeks.map((week) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return null;
    const date = new Date(`${firstDay.date}T00:00:00`);
    if (date.getMonth() === lastMonth) return null;
    lastMonth = date.getMonth();
    return date.toLocaleDateString("en-US", { month: "short" });
  });

  // A boundary week can put a 1-column sliver of the previous month right
  // next to the new month's label (e.g. a lone "Jul" before "Aug" at the
  // start of a rolling last-year window) — when two labels land too close
  // to read, drop the earlier sliver in favor of the later, fuller month,
  // same as github.com does.
  const MIN_COLUMN_GAP = 2;
  const kept = []; // [{ index, label }]
  raw.forEach((label, index) => {
    if (!label) return;
    if (kept.length && index - kept[kept.length - 1].index < MIN_COLUMN_GAP) {
      kept.pop();
    }
    kept.push({ index, label });
  });

  const result = Array(raw.length).fill(null);
  kept.forEach(({ index, label }) => {
    result[index] = label;
  });
  return result;
};

// Defined once at module scope (not inside the component) — a styled-component
// redefined on every render gets a fresh identity each time, which forces
// React to unmount/remount the whole grid on every state update. That was
// racing with the hover events and killing the tooltip before it could show.
const Container = styled.div`
  display: grid;
  /* Column 1 is the Mon/Wed/Fri weekday labels; the rest are one column per
     week. Row 1 is the month labels; the rest are one row per weekday.
     Row height is NOT set independently — each .column derives its height
     from its own computed width via aspect-ratio below, so cells stay
     square and the panel's height grows/shrinks with container width. */
  grid-template-columns: 22px repeat(${({ $weeksCount }) => $weeksCount}, minmax(9px, 1fr));
  grid-template-rows: 16px repeat(${DAYS_PER_WEEK}, auto);
  gap: clamp(1.5px, 0.4vw, 4px);
  width: 100%;

  .weekday-label {
    grid-column: 1;
    align-self: center;
    font-size: clamp(8px, 1.6vw, 10px);
    color: var(--text-color);
    opacity: 0.45;
    font-family: inherit;
  }

  .month-label {
    grid-row: 1;
    align-self: end;
    white-space: nowrap;
    font-size: clamp(8px, 1.6vw, 10px);
    color: var(--text-color);
    opacity: 0.45;
  }

  /* Stable wrapper — never transformed, so getBoundingClientRect() on it
     always reflects the real grid position. The hover "pop" is applied to
     .tile inside it instead; otherwise a scale-from-center transform on
     this element would grow its own rect (bottom edge moves down), which
     was throwing the tooltip's computed position off. */
  .column {
    position: relative;
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
    outline: 1px solid rgba(148, 163, 184, 0.8);
    transform: scale(1.4) translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
    z-index: 5;
    cursor: pointer;
  }
  .class0 {
    background-color: var(--border-soft);
  }
  .class1 {
    background-color: rgba(
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.r || 0},
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.g || 0},
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.b || 0},
      1
    );
  }
  .class2 {
    background-color: rgba(
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.r || 0},
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.g || 0},
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.b || 0},
      0.75
    );
  }
  .class3 {
    background-color: rgba(
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.r || 0},
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.g || 0},
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.b || 0},
      0.5
    );
  }
  .class4 {
    background-color: rgba(
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.r || 0},
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.g || 0},
      ${({ $colorRGBA: colorRGBA }) => colorRGBA.b || 0},
      0.3
    );
  }
`;

const GitContributionsBar = ({ color }) => {
  const colorRGBA = parseHexColor(color, { r: 77, g: 27, b: 97 });

  const primaryToken = import.meta.env.VITE_GITHUB_SECRET_KEY;
  const primaryLogin = import.meta.env.VITE_GITHUB_USERNAME;
  const legacyToken = import.meta.env.VITE_GITHUB_SECRET_KEY_LEGACY;
  const legacyLogin = import.meta.env.VITE_GITHUB_USERNAME_LEGACY;

  const today = useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();
  const yearTabs = useMemo(() => {
    const recentYears = Array.from(
      { length: YEARS_BACK + 1 },
      (_, i) => currentYear - i
    );
    const olderYears = LEGACY_YEARS.filter((year) => !recentYears.includes(year));
    return [...recentYears, ...olderYears];
  }, [currentYear]);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const range = useMemo(
    () => getRangeForYear(selectedYear, currentYear, today),
    [selectedYear, currentYear, today]
  );

  const isLegacyYear = LEGACY_YEAR_SET.has(selectedYear);
  const login = isLegacyYear ? legacyLogin : primaryLogin;
  const accessToken = isLegacyYear ? legacyToken : primaryToken;

  const { weeks, totalContributions, isLoading, error } = useContributions(
    login,
    accessToken,
    range
  );

  const columns = useMemo(() => buildColumns(weeks), [weeks]);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

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
      text: `${day.contributionCount} GitHub ${
        day.contributionCount === 1 ? "Contribution" : "Contributions"
      } on ${new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`,
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
          {isLoading && weeks.length === 0 ? (
            <span className="text-gray-500">Loading contributions…</span>
          ) : (
            <>
              <strong className="text-gray-900 dark:text-white font-semibold">
                {totalContributions.toLocaleString()}
              </strong>{" "}
              contributions{" "}
              {selectedYear === currentYear ? "in the last year" : `in ${selectedYear}`}
            </>
          )}
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0 overflow-x-auto pb-1">
          {isLoading && weeks.length === 0 ? (
            <SkeletonLoader />
          ) : error && weeks.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">
              Couldn&apos;t load GitHub contributions right now.
            </p>
          ) : (
            <Container $colorRGBA={colorRGBA} $weeksCount={Math.max(columns.length, 1)}>
              <span className="weekday-label" style={{ gridRow: 3 }}>
                Mon
              </span>
              <span className="weekday-label" style={{ gridRow: 5 }}>
                Wed
              </span>
              <span className="weekday-label" style={{ gridRow: 7 }}>
                Fri
              </span>

              {monthLabels.map(
                (label, weekIndex) =>
                  label && (
                    <span
                      key={`month-${weekIndex}`}
                      className="month-label"
                      style={{ gridColumn: weekIndex + 2 }}
                    >
                      {label}
                    </span>
                  )
              )}

              {columns.map((column, weekIndex) =>
                column.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className="column"
                    style={{ gridColumn: weekIndex + 2, gridRow: dayIndex + 2 }}
                    {...(day
                      ? {
                          onMouseEnter: (event) => handleMouseEnter(event, day),
                          onMouseLeave: handleMouseLeave,
                        }
                      : {})}
                  >
                    {day && (
                      <div className={`tile ${countToClass(day.contributionCount)}`} />
                    )}
                  </div>
                ))
              )}
            </Container>
          )}
        </div>

        <div className="flex flex-col gap-1 shrink-0">
          {yearTabs.map((year, index) => (
            <button
              key={year}
              type="button"
              onClick={() => setSelectedYear(year)}
              title={
                LEGACY_YEAR_SET.has(year)
                  ? `${year} contributions (older account)`
                  : undefined
              }
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                index === YEARS_BACK + 1 ? "mt-1 pt-2 border-t border-black/10 dark:border-white/10" : ""
              } ${
                year === selectedYear
                  ? "text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              style={year === selectedYear ? { backgroundColor: color } : undefined}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
        <div className="flex items-center gap-1">
          <span>Less</span>
          {LEGEND_CLASSES.map((cls) => (
            <span
              key={cls}
              className={cls}
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                display: "inline-block",
                ...(cls === "class0"
                  ? { backgroundColor: "var(--border-soft)" }
                  : {
                      backgroundColor: `rgba(${colorRGBA.r || 0}, ${colorRGBA.g || 0}, ${
                        colorRGBA.b || 0
                      }, ${
                        { class1: 1, class2: 0.75, class3: 0.5, class4: 0.3 }[cls]
                      })`,
                    }),
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

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
                <div className="rounded-[7px] bg-white dark:bg-[#0d1117] px-3 py-1.5">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white break-words">
                    {tooltip.text}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default GitContributionsBar;
