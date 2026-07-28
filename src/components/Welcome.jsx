import Robot from "../assets/robot.gif";
const Welcome = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={Robot}
        alt="Waving robot mascot"
        className="w-full h-full max-h-80 object-contain"
      />
    </div>
  );
};

export default Welcome;
