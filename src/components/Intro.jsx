/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import SocialIcons from "./Socialicon";
import ResumeAndHireButtons from "./Button";
import AnimProfession from "./AnimProfession";
import profilePic from "../assets/profile.jpg"; // Import your profile picture

const Intro = ({ color }) => {
  return (
    <div className="bg-[rgba(173,216,230,0.5)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-lg rounded-lg p-5 flex flex-col gap-5 w-[320px] md:w-[450px] items-center jus">
      <img
        src={profilePic}
        alt="Profile Picture"
        className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full object-cover self-center"
      />
      <h1 className="text-black font-bold text-3xl leading-none text-center  transition-transform duration-300 ease-in-out hover:scale-110 flex flex-col intro-text-style">
        Tanvir Imam Mitul
      </h1>
      <AnimProfession />
      <SocialIcons color={color} />
      <ResumeAndHireButtons color={color} />
    </div>
  );
};

export default Intro;
