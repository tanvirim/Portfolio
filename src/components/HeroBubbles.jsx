/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { forceCollide, forceSimulation } from "d3-force";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiGit,
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
  SiGraphql,
  SiKubernetes,
  SiAmazonaws,
  SiFirebase,
  SiSass,
  SiFlutter,
  SiDjango,
  SiSpring,
  SiLaravel,
  SiDotnet,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaNodeJs, FaGithub, FaJava } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import parseHexColor from "../utils/parseHexColor";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";
import { defaultColor } from "../constants";

// Curated to the icons most people recognize on sight — instantly-known
// language/framework logos rather than niche tooling — so every cube face
// reads clearly at a glance instead of needing a second look.
const ICONS = [
  SiReact,
  TbBrandNextjs,
  FaNodeJs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  BiLogoTailwindCss,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiRedux,
  SiDocker,
  FaGithub,
  SiGit,
  SiPython,
  FaJava,
  SiPhp,
  SiCplusplus,
  SiCsharp,
  SiGo,
  SiRust,
  SiSwift,
  SiKotlin,
  SiVuedotjs,
  SiAngular,
  SiFlutter,
  SiAmazonaws,
  SiFirebase,
  SiGraphql,
  SiKubernetes,
  SiSass,
  SiRuby,
  SiDjango,
  SiLaravel,
  SiSpring,
  SiDotnet,
  SiExpress,
];

// Each icon's own real-world brand color (not the site's accent palette) —
// index-matched with ICONS — so every cube face is tinted like the actual
// logo instead of a generic theme swatch.
const ICON_COLORS = [
  "#61DAFB", // React
  "#000000", // Next.js
  "#339933", // Node.js
  "#3178C6", // TypeScript
  "#F7DF1E", // JavaScript
  "#E34F26", // HTML5
  "#1572B6", // CSS3
  "#38BDF8", // Tailwind CSS
  "#47A248", // MongoDB
  "#4479A1", // MySQL
  "#4169E1", // PostgreSQL
  "#764ABC", // Redux
  "#2496ED", // Docker
  "#181717", // GitHub
  "#F05032", // Git
  "#3776AB", // Python
  "#007396", // Java
  "#777BB4", // PHP
  "#00599C", // C++
  "#239120", // C#
  "#00ADD8", // Go
  "#000000", // Rust
  "#F05138", // Swift
  "#7F52FF", // Kotlin
  "#4FC08D", // Vue.js
  "#DD0031", // Angular
  "#02569B", // Flutter
  "#FF9900", // AWS
  "#FFCA28", // Firebase
  "#E10098", // GraphQL
  "#326CE5", // Kubernetes
  "#CC6699", // Sass
  "#CC342D", // Ruby
  "#092E20", // Django
  "#FF2D20", // Laravel
  "#6DB33F", // Spring
  "#512BD4", // .NET
  "#000000", // Express
];

const CAMERA_Z = 100;
const FOV = 45;

// Picks white or near-black for the glyph, whichever contrasts more
// against a given background (hex "#rrggbb" or "rgb(r, g, b)").
function getContrastingIconColor(bgColorCss) {
  let r = 255;
  let g = 255;
  let b = 255;
  if (bgColorCss.startsWith("#")) {
    ({ r, g, b } = parseHexColor(bgColorCss, { r, g, b }));
  } else {
    const nums = bgColorCss.match(/\d+(\.\d+)?/g);
    if (nums && nums.length >= 3) {
      [r, g, b] = nums.map(Number);
    }
  }
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#101418" : "#ffffff";
}

// A solid, opaque app-icon-style tile — colored square background with the
// glyph drawn on top in whichever of white/near-black contrasts best
// against that background — used as the texture for one face of a die.
// The background fills the entire square edge-to-edge (no rounded corners)
// so adjacent faces meet flush at the cube's edges instead of leaving a
// transparent gap where a rounded corner would have left pixels unpainted.
function buildFaceTexture(Icon, bgColorCss) {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bgColorCss;
  ctx.fillRect(0, 0, size, size);

  // Subtle top-light/bottom-shade gloss so the tile reads as a lit solid
  // surface rather than a flat color swatch.
  const gloss = ctx.createLinearGradient(0, 0, 0, size);
  gloss.addColorStop(0, "rgba(255,255,255,0.28)");
  gloss.addColorStop(0.5, "rgba(255,255,255,0)");
  gloss.addColorStop(1, "rgba(0,0,0,0.18)");
  ctx.fillStyle = gloss;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const iconSize = size * 0.74;
  const markup = renderToStaticMarkup(
    <Icon color={getContrastingIconColor(bgColorCss)} size={iconSize} />
  );
  const svg = markup.includes("xmlns")
    ? markup
    : markup.replace("<svg", "<svg xmlns='http://www.w3.org/2000/svg'");
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(
      img,
      (size - iconSize) / 2,
      (size - iconSize) / 2,
      iconSize,
      iconSize
    );
    texture.needsUpdate = true;
  };
  img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return texture;
}

const HeroBubbles = ({ color = defaultColor, targetRef }) => {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    const mount = mountRef.current;
    if (!container || !mount) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // WebGL unavailable — skip the aquarium, page still works fine.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(FOV, width / height, 1, 400);
    camera.position.set(0, 0, CAMERA_Z);
    camera.lookAt(0, 0, 0);

    // A gentle blue-tinted haze so distant icons soften into the
    // background — the depth cue that sells "underwater" beyond perspective.
    const fogColor = parseHexColor(color, { r: 28, g: 229, b: 255 });
    scene.fog = new THREE.Fog(
      new THREE.Color(
        fogColor.r / 255,
        fogColor.g / 255,
        fogColor.b / 255
      ).getHex(),
      CAMERA_Z - 55,
      CAMERA_Z + 90
    );

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    scene.add(new THREE.HemisphereLight(0xbfe9ff, 0x0a1a2a, 0.55));
    const keyLight = new THREE.PointLight(0xffffff, 1.15, 0, 0);
    keyLight.position.set(40, 60, 90);
    scene.add(keyLight);

    // Converts a point in the pixel-space simulation (0..width, 0..height,
    // like the flat 2D version) into a 3D world position at a given depth —
    // keeps every icon inside the visible frustum regardless of how far it
    // drifts toward/away from the camera.
    const frustumSizeAtZ = (z) => {
      const distance = CAMERA_Z - z;
      const vFov = (FOV * Math.PI) / 180;
      const worldHeight = 2 * Math.tan(vFov / 2) * distance;
      const worldWidth = worldHeight * (width / height);
      return { worldWidth, worldHeight };
    };
    const toWorld = (pixelX, pixelY, z) => {
      const { worldWidth, worldHeight } = frustumSizeAtZ(z);
      return {
        worldX: (pixelX / width - 0.5) * worldWidth,
        worldY: -(pixelY / height - 0.5) * worldHeight,
      };
    };
    const worldPerPixelAtHome = frustumSizeAtZ(0).worldHeight / height;

    // Where the icons should gather — horizontally over the external DOM
    // element (e.g. the empty grid cell left behind by a removed layout
    // element), but pinned to the viewport's vertical middle rather than
    // that element's scroll-dependent top, so the cluster stays fixed on
    // screen instead of scrolling away with the page. Falls back to null
    // (each node's own scattered fallback position) when there's no
    // target, or it's not actually rendered/visible (e.g. hidden on
    // narrow viewports, where its rect collapses to zero width).
    const getCircleTarget = () => {
      if (!targetRef || !targetRef.current) return null;
      const rect = targetRef.current.getBoundingClientRect();
      if (rect.width < 40) return null;
      const containerRect = container.getBoundingClientRect();
      return {
        centerX: rect.left - containerRect.left + rect.width / 2,
        centerY: height / 2,
        radius: Math.min(rect.width / 2, height / 2) * 0.85,
      };
    };

    // Multiple sizes per node (not one fixed size) — sampled per node below,
    // in the same pixel-space units as the old 2D version.
    const [minIconSize, maxIconSize] =
      width >= 1280 ? [26, 42] : width >= 768 ? [20, 34] : [15, 24];
    const numNodes = width >= 1280 ? 34 : width >= 768 ? 22 : 12;

    // One shared unit geometry — every cube's actual size comes from
    // mesh.scale, so we're not allocating unique geometry per node.
    // RoundedBoxGeometry (not a plain BoxGeometry) so the edges read as a
    // soft, rounded-corner die instead of a razor-sharp cube — it still
    // keeps BoxGeometry's 6 face groups, so per-face materials still work.
    const chipGeometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.15);

    // One material per icon, tinted with that icon's own brand color —
    // reused across every face/cube that happens to land on the same icon.
    const materialCache = new Map();
    const getFaceMaterial = (iconIndex) => {
      if (!materialCache.has(iconIndex)) {
        const colorCss = ICON_COLORS[iconIndex];
        const texture = buildFaceTexture(ICONS[iconIndex], colorCss);
        materialCache.set(
          iconIndex,
          new THREE.MeshPhysicalMaterial({
            map: texture,
            roughness: 0.3,
            metalness: 0.08,
            clearcoat: 0.55,
            clearcoatRoughness: 0.3,
            emissive: new THREE.Color(colorCss),
            emissiveIntensity: 0.05,
          })
        );
      }
      return materialCache.get(iconIndex);
    };

    // 6 distinct icons per cube, no repeats — one per face, so every face
    // of the die shows something different as it tumbles.
    const pickFaceIcons = () => {
      const picked = new Set();
      while (picked.size < 6) {
        picked.add(Math.floor(Math.random() * ICONS.length));
      }
      return Array.from(picked);
    };

    // Each node keeps its own home position — either evenly spaced around
    // the live circle target (see getCircleTarget) or, when there's no
    // target, scattered across the whole area — the gentle pull force below
    // returns it there any time the mouse repulsion pushes it away.
    const nodes = Array.from({ length: numNodes }, (_, i) => {
      const size = minIconSize + Math.random() * (maxIconSize - minIconSize);
      const margin = size / 2 + 12;
      const fallbackHomeX =
        margin + Math.random() * Math.max(width - margin * 2, 1);
      const fallbackHomeY =
        margin + Math.random() * Math.max(height - margin * 2, 1);
      const ringAngle =
        (i / numNodes) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      // sqrt(random()), not a plain random() — a linear radius sample
      // leaves the middle empty (equal odds per radius band means the
      // small-area band near the center gets as many nodes as the much
      // bigger band near the edge). sqrt gives an even, area-uniform fill
      // of the whole disc, center included.
      const ringRadiusFactor = Math.sqrt(Math.random());
      const materials = pickFaceIcons().map((iconIndex) =>
        getFaceMaterial(iconIndex)
      );

      const worldSize = size * worldPerPixelAtHome;
      const mesh = new THREE.Mesh(chipGeometry, materials);
      mesh.scale.set(worldSize, worldSize, worldSize);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.6
      );
      scene.add(mesh);

      return {
        x: fallbackHomeX,
        y: fallbackHomeY,
        vx: 0,
        vy: 0,
        fallbackHomeX,
        fallbackHomeY,
        ringAngle,
        ringRadiusFactor,
        radius: size / 2,
        mesh,
        baseZ: -28 + Math.random() * 56,
        depthAmp: 10 + Math.random() * 16,
        depthFreq: (Math.PI * 2) / (6000 + Math.random() * 6000),
        depthPhase: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.0006,
        rotSpeedY: (Math.random() - 0.5) * 0.0009,
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
    let lastTime = performance.now();

    const animate = (timestamp) => {
      const dt = Math.min(timestamp - lastTime, 100);
      lastTime = timestamp;

      const circleTarget = getCircleTarget();

      for (const node of nodes) {
        // Pull back toward this node's own home spot — evenly spaced
        // around the live circle target when one's available, otherwise
        // its scattered fallback spot — offset by a slow per-node wander
        // so there's always some idle motion even without the mouse nearby.
        const homeX = circleTarget
          ? circleTarget.centerX +
            Math.cos(node.ringAngle) *
              circleTarget.radius *
              node.ringRadiusFactor
          : node.fallbackHomeX;
        const homeY = circleTarget
          ? circleTarget.centerY +
            Math.sin(node.ringAngle) *
              circleTarget.radius *
              node.ringRadiusFactor
          : node.fallbackHomeY;
        const targetX =
          homeX +
          Math.sin(timestamp * node.wanderFreqX + node.wanderPhaseX) *
            node.wanderAmpX;
        const targetY =
          homeY +
          Math.cos(timestamp * node.wanderFreqY + node.wanderPhaseY) *
            node.wanderAmpY;
        const dx = targetX - node.x;
        const dy = targetY - node.y;
        const pullStrength = 0.0005;
        node.vx += dx * pullStrength;
        node.vy += dy * pullStrength;

        // Viscous drag
        node.vx *= 0.9;
        node.vy *= 0.9;

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

      for (const node of nodes) {
        const z =
          node.baseZ +
          Math.sin(timestamp * node.depthFreq + node.depthPhase) *
            node.depthAmp;
        const { worldX, worldY } = toWorld(node.x, node.y, z);
        node.mesh.position.set(worldX, worldY, z);
        node.mesh.rotation.x += node.rotSpeedX * dt;
        node.mesh.rotation.y += node.rotSpeedY * dt;
      }

      // Subtle camera parallax toward the pointer — a cheap but convincing
      // "looking around inside the tank" depth cue.
      const targetCamX = pointer.active ? (pointer.x / width - 0.5) * 14 : 0;
      const targetCamY = pointer.active
        ? -(pointer.y / height - 0.5) * 10
        : 0;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const updatePointer = (pcx, pcy) => {
      const rect = renderer.domElement.getBoundingClientRect();
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
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
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

      for (const material of materialCache.values()) {
        if (material.map) material.map.dispose();
        material.dispose();
      }
      chipGeometry.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [color, prefersReducedMotion, targetRef]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 15%, rgba(56,189,248,0.14), transparent 70%)",
        }}
      />
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  );
};

export default HeroBubbles;
