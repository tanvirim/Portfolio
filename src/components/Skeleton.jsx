import { Skeleton } from "./ui/skeleton";

const WEEKS = 53;
const DAYS_PER_WEEK = 7;

function SkeletonLoader() {
  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${WEEKS}, minmax(4px, 1fr))`,
        gridTemplateRows: `repeat(${DAYS_PER_WEEK}, auto)`,
        gridAutoFlow: "column",
        gap: "clamp(1.5px, 0.4vw, 4px)",
      }}
    >
      {Array.from({ length: WEEKS * DAYS_PER_WEEK }, (_, index) => (
        <Skeleton
          key={index}
          className="w-full rounded-[3px]"
          style={{ aspectRatio: "1" }}
        />
      ))}
    </div>
  );
}

export default SkeletonLoader;
