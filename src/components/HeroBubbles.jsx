/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { forceCollide, forceSimulation } from "d3-force";
import parseHexColor from "../utils/parseHexColor";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";
import { defaultColor } from "../constants";

// Words related to this portfolio's actual stack (see Skills.jsx /
// TerminalIntro.jsx) instead of decorative single letters — floats past as
// a code-flavored ambient background rather than abstract confetti.
const WORDS = [
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "TypeScript",
  "JavaScript",
  "MongoDB",
  "PostgreSQL",
  "Redux",
  "Docker",
  "Nginx",
  "Git",
  "REST API",
  "Socket.io",
  "Linux",
  "JWT",
  "Tailwind",
  "Python",
  "Zustand",
  "CI/CD",
  "Vite",
  "PM2",
  "Kajog.ai",
  "jiggasha.ai",
  "bangla.gov.bd",

];

function lighten(hex, amount, fallback) {
  const { r, g, b } = parseHexColor(hex, fallback);
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function buildPalette(accentColor) {
  const secondary =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--secondary-color")
      .trim() || "#5153d6";
  const accentRGBA = parseHexColor(accentColor, { r: 28, g: 229, b: 255 });

  return [
    accentColor,
    secondary,
    lighten(accentColor, 0.3, accentRGBA),
    lighten(secondary, 0.3, { r: 81, g: 83, b: 214 }),
  ];
}

const HeroBubbles = ({ color = defaultColor }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const dpr = window.devicePixelRatio || 1;
    const setupCanvasScale = () => {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvasScale();

    const palette = buildPalette(color);
    const fontFamily =
      'ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace';
    // Multiple sizes per node (not one fixed size) — sampled per node below.
    const [minFontSize, maxFontSize] =
      width >= 1280 ? [9, 18] : width >= 768 ? [8, 14] : [7, 11];

    const numNodes = width >= 1280 ? 70 : width >= 768 ? 45 : 24;
    // Each node keeps its own home position spread across the WHOLE area
    // (not one shared cluster point) — the gentle pull force below returns
    // it there any time the mouse repulsion pushes it away.
    const nodes = Array.from({ length: numNodes }, (_, i) => {
      const text = WORDS[i % WORDS.length];
      const fontSize =
        minFontSize + Math.random() * (maxFontSize - minFontSize);
      ctx.font = `600 ${fontSize}px ${fontFamily}`;
      const textWidth = ctx.measureText(text).width;
      const margin = textWidth / 2 + 12;
      const homeX = margin + Math.random() * Math.max(width - margin * 2, 1);
      const homeY = margin + Math.random() * Math.max(height - margin * 2, 1);
      return {
        x: homeX,
        y: homeY,
        vx: 0,
        vy: 0,
        homeX,
        homeY,
        radius: textWidth / 2,
        text,
        fontSize,
        color: palette[i % palette.length],
        opacity: 0.28 + Math.random() * 0.35,
      };
    });

    const pointer = { x: -9999, y: -9999, active: false };

    const simulation = forceSimulation(nodes)
      .alphaDecay(0)
      .alphaTarget(1)
      .velocityDecay(0.005)
      .force(
        "collide",
        forceCollide()
          .radius((d) => d.radius + 10)
          .iterations(2)
          .strength(0.7)
      );
    simulation.stop();

    let raf = 0;

    const animate = () => {
      for (const node of nodes) {
        // Pull back toward this node's OWN home spot, not a shared center —
        // this is what spreads the words across the whole area instead of
        // clumping into one circle.
        const dx = node.homeX - node.x;
        const dy = node.homeY - node.y;
        const pullStrength = 0.0003;
        node.vx += dx * pullStrength;
        node.vy += dy * pullStrength;

        // Viscous drag
        node.vx *= 0.94;
        node.vy *= 0.94;

        // Mouse repulsion
        if (pointer.active) {
          const mdx = node.x - pointer.x;
          const mdy = node.y - pointer.y;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const repelRadius = 300;

          if (mouseDist > 0 && mouseDist < repelRadius) {
            const t = mouseDist / repelRadius;
            const force = (1 - t) * (1 - t) * (1 - t) * 35;
            node.vx += (mdx / mouseDist) * force;
            node.vy += (mdy / mouseDist) * force;
          }
        }
      }

      simulation.tick();

      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const node of nodes) {
        ctx.font = `600 ${node.fontSize}px ${fontFamily}`;
        ctx.globalAlpha = node.opacity;
        ctx.fillStyle = node.color;
        ctx.fillText(node.text, node.x, node.y);
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const updatePointer = (pcx, pcy) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = pcx - rect.left;
      pointer.y = pcy - rect.top;
      pointer.active = true;
    };

    const onMouseMove = (e) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("touchend", onPointerLeave);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        setupCanvasScale();
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      simulation.stop();
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("touchend", onPointerLeave);
    };
  }, [color, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default HeroBubbles;
