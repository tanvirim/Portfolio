/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../Hooks/usePrefersReducedMotion";

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
const IconCube = ({ icon: Icon, color, size = 36 }) => {
  const cubeRef = useRef(null);
  const velocity = useRef({ pitch: 0, yaw: IDLE_SPIN_SPEED });
  const rotation = useRef({ x: -18, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

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

  const half = size / 2;
  const faceBaseStyle = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    background: `${color}1f`,
    border: `1px solid ${color}55`,
    borderRadius: size * 0.16,
    fontSize: size * 0.8,
    color,
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="shrink-0"
      style={{ width: size, height: size, perspective: size * 8 }}
    >
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
            {Icon && <Icon />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconCube;
