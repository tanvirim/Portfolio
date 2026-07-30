/* eslint-disable react/prop-types */
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// Pointer-tracked 3D tilt wrapper — rotateX/rotateY follow the cursor's
// position within the element (a real tilt-card effect, not a fixed hover
// pose), smoothed through a spring so it settles instead of snapping.
// Shared by ProjectCards and Skills so every card on the page tilts the
// same way. Owns `initial`/`whileInView` itself (opacity/y only, never
// rotateX) so the mouse-driven tilt is never fought by a separate entrance
// animation on the same transform channel — mixing the two on one element
// is what made hover tilts silently stop working before (Framer Motion
// writes the resolved transform straight into the inline style, so
// whichever animation touches a property last wins outright).
//
// rotateX/rotateY alone read as a flat plane spinning in place, not an
// object with volume — there's no cue that the card actually HAS a front
// face and depth behind it. Two more layers sell that: a solid backing
// panel set back in Z-space (`.tilt-card-depth`, translateZ negative — as
// the card tilts, it peeks out past the front face's edges exactly like a
// physical slab's side would) and a pointer-tracked glare sheen
// (`.tilt-card-glare` — the specular highlight a glossy real-world surface
// would catch as its angle to the light changes).
const TiltCard = ({
  as: Component = motion.div,
  className,
  style,
  delay = 0,
  viewport = { once: true, amount: 0.2 },
  tiltRange = 9,
  children,
  ...props
}) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glareOpacity = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltRange, -tiltRange]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltRange, tiltRange]), springConfig);
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35), transparent 55%)`;
  const glareOpacitySpring = useSpring(glareOpacity, { stiffness: 200, damping: 24 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => glareOpacity.set(1);

  const resetTilt = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <Component
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ position: "relative", rotateX, rotateY, transformPerspective: 900, ...style }}
      {...props}
    >
      <div className="tilt-card-depth" aria-hidden="true" />
      {children}
      <motion.div
        className="tilt-card-glare"
        style={{ background: glareBackground, opacity: glareOpacitySpring }}
        aria-hidden="true"
      />
    </Component>
  );
};

export default TiltCard;
