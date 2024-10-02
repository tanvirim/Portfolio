/* eslint-disable no-unused-vars */
/* eslint-disable no-duplicate-case */
/* eslint-disable react/prop-types */
import { BsFillBootstrapFill } from "react-icons/bs";
import { DiIllustrator } from "react-icons/di";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiMongodb,
  SiExpress,
  SiPython,
  SiRedux,
  SiPhp,
  SiLaravel,
  SiMui,
  SiChakraui,
  SiRender,
  SiReactquery,
  SiNetlify,
  SiVercel,
} from "react-icons/si";
import { BiLogoTailwindCss } from "react-icons/bi";
import {
  FaNodeJs,
  FaCss3Alt,
  FaHtml5,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { RiGitMergeLine } from "react-icons/ri";
import styled from "styled-components";
const Skills = ({ color }) => {
  const skills = [
    {
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
    },
    {
      category: "Front-End Frameworks",
      items: ["React.js", "Next.Js", "MUI", "Chakra UI"],
    },
    { category: "Back-End", items: ["NodeJs", "Express.js"] },
    { category: "Database", items: ["MongoDB"] },
    { category: "CSS Frameworks", items: ["Tailwind CSS", "Bootstrap"] },
    {
      category: "State Management",
      items: ["Redux", "React Query"],
    },
    {
      category: "Software Ecosystem",
      items: [
        "Git",
        "GitHub",
        "Render",
        "Vercel",
        "Netlify",
        "Figma",
        "Adobe Illustrator",
      ],
    },
  ];

  const getIcon = (item) => {
    switch (item) {
      case "Vercel":
        return <SiVercel />;
      case "Netlify":
        return <SiNetlify />;
      case "Render":
        return <SiRender />;
      case "JavaScript":
        return <SiJavascript />;
      case "TypeScript":
        return <SiTypescript />;
      case "React.js":
        return <SiReact />;
      case "NodeJs":
        return <FaNodeJs />;
      case "MongoDB":
        return <SiMongodb />;
      case "Express.js":
        return <SiExpress />;
      case "Python":
        return <SiPython />;
      case "Redux":
        return <SiRedux />;
      case "PHP":
        return <SiPhp />;
      case "Laravel":
        return <SiLaravel />;
      case "Next.Js":
        return <TbBrandNextjs />;
      case "HTML5":
        return <FaHtml5 />;
      case "CSS3":
        return <FaCss3Alt />;
      case "MUI":
        return <SiMui />;
      case "Chakra UI":
        return <SiChakraui />;
      case "Git":
        return <RiGitMergeLine />;
      case "GitHub":
        return <FaGithub />;
      case "Figma":
        return <FaFigma />;
      case "Tailwind CSS":
        return <BiLogoTailwindCss />;
      case "Bootstrap":
        return <BsFillBootstrapFill />;
      case "Adobe Illustrator":
        return <DiIllustrator />;
      case "React Query":
        return <SiReactquery />;
      default:
        return null;
    }
  };
  const SkillsTitle = styled.h1`
    font-size: 25px;
    text-align: center;
    box-shadow: 0px 10px 30px rgba(0, 128, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `;
  return (
    <div className="custom-shadow-border mb-20 p-5">
      <div className="title-text-style mb-5">SKILLS</div>
      <div className="flex flex-wrap justify-center gap-8">
        {skills.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Category Title */}
            <h3 className="text-2xl text-center font-bold border-b-2 pb-2 mb-4">
              {category.category}
            </h3>

            {/* Skills List */}
            <div className="flex flex-wrap justify-center">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-col items-center text-center mx-5 my-2"
                >
                  <div className="text-3xl mb-2 text-current" style={{ color }}>
                    {getIcon(item)}
                  </div>
                  <div className="text-lg">{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
