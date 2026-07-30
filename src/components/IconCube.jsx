/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";
import getContrastColor from "../utils/getContrastColor";

const IDLE_SPIN_SPEED = 0.35; // deg/frame — constant baseline auto-rotation
const PUSH_SENSITIVITY = 0.6; // how strongly a mouse move nudges the spin
const MAX_VELOCITY = 8; // deg/frame — clamps a fast flick from spinning wild
const YAW_RETURN = 0.02; // how quickly yaw velocity settles back to idle spin
const PITCH_RETURN = 0.05; // how quickly pitch velocity settles back to 0

const FACE_TRANSFORMS = (half) => [
  `translateZ(${half}px)`, // front
  `rotateY(180deg) translateZ(${half}px)`, // back
  `rotateY(90deg) translateZ(${half}px)`, // right
  `rotateY(-90deg) translateZ(${half}px)`, // left
  `rotateX(90deg) translateZ(${half}px)`, // top
  `rotateX(-90deg) translateZ(${half}px)`, // bottom
];

// A small CSS-3D die that spins in place — every face shows the same icon.
// Idles at a constant slow spin; moving the mouse over it "pushes" the spin
// (speed and even direction follow the cursor), then it eases back to the
// idle rate once the cursor stops or leaves.
//
// `label` is optional — pass it on clickable cubes (links/buttons) to get a
// bouncy, game-style tooltip revealing what the cube does on hover. Purely
// decorative (non-interactive) cubes should leave it unset.
const IconCube = ({ icon: Icon, color, size = 36, label, tooltipSide = "top" }) => {
  const wrapperRef = useRef(null);
  const cubeRef = useRef(null);
  const velocity = useRef({ pitch: 0, yaw: IDLE_SPIN_SPEED });
  const rotation = useRef({ x: -18, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [tooltipPos, setTooltipPos] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let raf = 0;

    const animate = () => {
      const v = velocity.current;
      v.yaw += (IDLE_SPIN_SPEED - v.yaw) * YAW_RETURN;
      v.pitch += (0 - v.pitch) * PITCH_RETURN;

      const r = rotation.current;
      r.x += v.pitch;
      r.y += v.yaw;

      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${r.x}deg) rotateY(${r.y}deg)`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  const handleMouseMove = (e) => {
    const v = velocity.current;
    v.yaw = Math.max(
      -MAX_VELOCITY,
      Math.min(MAX_VELOCITY, v.yaw + e.movementX * PUSH_SENSITIVITY)
    );
    v.pitch = Math.max(
      -MAX_VELOCITY,
      Math.min(MAX_VELOCITY, v.pitch - e.movementY * PUSH_SENSITIVITY)
    );
  };

  // The tooltip is portaled to <body> (position: fixed, computed from the
  // trigger's own screen position) instead of living inside this component's
  // DOM subtree — several places this renders (the navbar pill, popover
  // triggers, project cards) clip overflowing children or sit inside their
  // own stacking context, which silently hid an in-place absolutely
  // positioned tooltip no matter how high its z-index was.
  const updateTooltipPosition = () => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setTooltipPos({
      left: rect.left + rect.width / 2,
      top: tooltipSide === "top" ? rect.top - 8 : rect.bottom + 8,
    });
  };

  const handleMouseEnter = () => {
    updateTooltipPosition();
  };

  const handleMouseLeave = () => {
    setTooltipPos(null);
  };

  useEffect(() => {
    if (!label || tooltipPos === null) return;
    const handleReposition = () => updateTooltipPosition();
    window.addEventListener("scroll", handleReposition, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", handleReposition);
    return () => {
      window.removeEventListener("scroll", handleReposition, {
        capture: true,
      });
      window.removeEventListener("resize", handleReposition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipPos !== null, tooltipSide]);

  const half = size / 2;
  const iconColor = getContrastColor(color);
  const faceBaseStyle = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    // Solid, opaque brand-color fill (not a translucent tint) — so the
    // tile itself is always visible regardless of what's behind it, and
    // a theme-aware neutral edge (var(--border), same token the rest of
    // the UI uses) instead of one derived from the brand color, which
    // could be just as invisible against a same-toned page background.
    background: color,
    border: "1px solid var(--border)",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.25)",
    borderRadius: size * 0.16,
    fontSize: size * 0.8,
    color: iconColor,
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={label ? handleMouseEnter : undefined}
      onMouseLeave={label ? handleMouseLeave : undefined}
      className="relative shrink-0"
      style={{ width: size, height: size, perspective: size * 8 }}
    >
      {label &&
        tooltipPos &&
        createPortal(
          // Outer element only positions the tooltip (fixed + static
          // translate to pin it above/below the cube) — never animated, so
          // it can't fight the inner bubble's own bounce transform. Inner
          // element is the one that actually pops/bounces in.
          <span
            aria-hidden="true"
            className={`pointer-events-none fixed z-[9999] -translate-x-1/2 whitespace-nowrap ${
              tooltipSide === "top" ? "-translate-y-full" : ""
            }`}
            style={{ left: tooltipPos.left, top: tooltipPos.top }}
          >
            <span
              className="icon-cube-tooltip relative block rounded-lg px-2.5 py-1 text-xs font-extrabold shadow-[0_6px_14px_rgba(0,0,0,0.35)] ring-2 ring-black/10 [animation:cube-tooltip-pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)] dark:ring-white/20"
              style={{ backgroundColor: color, color: iconColor }}
            >
              {label}
              <span
                className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 ${
                  tooltipSide === "top" ? "-bottom-1" : "-top-1"
                }`}
                style={{ backgroundColor: color }}
              />
            </span>
          </span>,
          document.body
        )}
      <div
        ref={cubeRef}
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`,
        }}
      >
        {FACE_TRANSFORMS(half).map((transform, i) => (
          <div key={i} style={{ ...faceBaseStyle, transform }}>
            {/* size="1em" so this scales off the face's fontSize for any
                icon library — react-icons defaults to 1em already, but
                lucide-react defaults to a fixed 24px unless told otherwise. */}
            {Icon && <Icon size="1em" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconCube;
