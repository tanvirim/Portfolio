/* eslint-disable react/prop-types */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltRange, -tiltRange]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltRange, tiltRange]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const resetTilt = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <Component
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default TiltCard;
