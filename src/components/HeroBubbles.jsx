/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { forceCollide, forceSimulation } from "d3-force";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiMongodb,
  SiExpress,
  SiNestjs,
  SiSocketdotio,
  SiJsonwebtokens,
  SiRedux,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiNginx,
  SiLinux,
  SiPm2,
  SiGithubactions,
  SiEslint,
  SiVite,
  SiCplusplus,
  SiCsharp,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiKotlin,
  SiSwift,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiGraphql,
  SiKubernetes,
  SiAmazonaws,
  SiGooglecloud,
  SiFirebase,
  SiSass,
  SiWebpack,
  SiJest,
  SiRedis,
  SiApachekafka,
  SiTerraform,
  SiFlutter,
  SiDjango,
  SiFlask,
  SiSpring,
  SiLaravel,
  SiDotnet,
  SiElasticsearch,
  SiJenkins,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaNodeJs, FaGithub, FaJava } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { RiGitMergeLine } from "react-icons/ri";
import parseHexColor from "../utils/parseHexColor";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";
import { defaultColor } from "../constants";

// Icons spanning this portfolio's actual stack plus a broader spread of
// well-known languages/frameworks/tooling — a richer "software engineering"
// texture floating around the hero, not just decorative letters/words.
const ICONS = [
  SiReact,
  TbBrandNextjs,
  FaNodeJs,
  SiNestjs,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiRedux,
  SiDocker,
  SiNginx,
  RiGitMergeLine,
  SiSocketdotio,
  SiLinux,
  SiJsonwebtokens,
  BiLogoTailwindCss,
  SiPython,
  SiPm2,
  SiMysql,
  SiGithubactions,
  SiEslint,
  FaGithub,
  SiExpress,
  SiVite,
  FaJava,
  SiCplusplus,
  SiCsharp,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiKotlin,
  SiSwift,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiGraphql,
  SiKubernetes,
  SiAmazonaws,
  SiGooglecloud,
  SiFirebase,
  SiSass,
  SiWebpack,
  SiJest,
  SiRedis,
  SiApachekafka,
  SiTerraform,
  SiFlutter,
  SiDjango,
  SiFlask,
  SiSpring,
  SiLaravel,
  SiDotnet,
  SiElasticsearch,
  SiJenkins,
  SiHtml5,
  SiCss3,
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

// Renders a react-icons component to a colored SVG image once, so the
// animation loop can cheaply drawImage() it every frame instead of
// re-rendering React/SVG per node per tick.
function buildIconImage(Icon, colorCss) {
  const markup = renderToStaticMarkup(<Icon color={colorCss} size={64} />);
  const svg = markup.includes("xmlns")
    ? markup
    : markup.replace("<svg", "<svg xmlns='http://www.w3.org/2000/svg'");
  const img = new Image();
  img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return img;
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
    // Multiple sizes per node (not one fixed size) — sampled per node below.
    const [minIconSize, maxIconSize] =
      width >= 1280 ? [16, 32] : width >= 768 ? [14, 26] : [12, 20];

    const numNodes = width >= 1280 ? 70 : width >= 768 ? 45 : 24;

    // Cache one rendered image per (icon, color) pair so duplicates across
    // nodes reuse the same <img>, regardless of how many nodes exist.
    const imageCache = new Map();
    const getIconImage = (iconIndex, colorIndex) => {
      const key = `${iconIndex}-${colorIndex}`;
      if (!imageCache.has(key)) {
        imageCache.set(
          key,
          buildIconImage(ICONS[iconIndex], palette[colorIndex])
        );
      }
      return imageCache.get(key);
    };

    // Each node keeps its own home position spread across the WHOLE area
    // (not one shared cluster point) — the gentle pull force below returns
    // it there any time the mouse repulsion pushes it away.
    const nodes = Array.from({ length: numNodes }, () => {
      const size = minIconSize + Math.random() * (maxIconSize - minIconSize);
      const margin = size / 2 + 12;
      const homeX = margin + Math.random() * Math.max(width - margin * 2, 1);
      const homeY = margin + Math.random() * Math.max(height - margin * 2, 1);
      const iconIndex = Math.floor(Math.random() * ICONS.length);
      const colorIndex = Math.floor(Math.random() * palette.length);
      return {
        x: homeX,
        y: homeY,
        vx: 0,
        vy: 0,
        homeX,
        homeY,
        radius: size / 2,
        size,
        image: getIconImage(iconIndex, colorIndex),
        opacity: 0.28 + Math.random() * 0.35,
        // Idle wander — each node orbits a slow, randomized ellipse around
        // its home spot even with no mouse nearby, so the field reads as
        // gently alive instead of a frozen still image. Randomized period
        // (~4-9s) and phase per node keep them from drifting in lockstep.
        wanderAmpX: 8 + Math.random() * 10,
        wanderAmpY: 8 + Math.random() * 10,
        wanderFreqX: (Math.PI * 2) / (4000 + Math.random() * 5000),
        wanderFreqY: (Math.PI * 2) / (4000 + Math.random() * 5000),
        wanderPhaseX: Math.random() * Math.PI * 2,
        wanderPhaseY: Math.random() * Math.PI * 2,
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

    const animate = (timestamp) => {
      for (const node of nodes) {
        // Pull back toward this node's OWN home spot (not a shared center —
        // that's what spreads the icons across the whole area instead of
        // clumping into one circle), offset by a slow per-node wander so
        // there's always some idle motion even without the mouse nearby.
        const targetX =
          node.homeX +
          Math.sin(timestamp * node.wanderFreqX + node.wanderPhaseX) *
            node.wanderAmpX;
        const targetY =
          node.homeY +
          Math.cos(timestamp * node.wanderFreqY + node.wanderPhaseY) *
            node.wanderAmpY;
        const dx = targetX - node.x;
        const dy = targetY - node.y;
        const pullStrength = 0.0015;
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

      for (const node of nodes) {
        if (!node.image.complete || !node.image.naturalWidth) continue;
        ctx.globalAlpha = node.opacity;
        ctx.drawImage(
          node.image,
          node.x - node.size / 2,
          node.y - node.size / 2,
          node.size,
          node.size
        );
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
      className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default HeroBubbles;
