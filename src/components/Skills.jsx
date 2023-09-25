/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
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
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { defaultColor } from "../constants";

const waveAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const SkillContainer = styled.div`
border-left:5px dotted ${({ color }) => (color ? color : defaultColor)};
  border-right:5px dotted ${({ color }) => (color ? color : defaultColor)};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  text-align: center;
  animation: ${waveAnimation} 1s ease infinite;
  animation-delay: ${(props) => props.delay};
`;

const SkillIcon = styled.div`
color: ${({ color }) => (color ? color : defaultColor)};
  font-size: 4rem; /* Larger icon size */
  margin-bottom: 10px;
`;

const SkillName = styled.div`
  font-size: 1.5rem; /* Larger text size */
`;

const SkillTitle = styled.h2`
margin: 0 auto;
text-transform:uppercase;
  border-bottom: 3px solid ${defaultColor};
  padding-bottom: 10px;
  width: 300px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const Skills = ({color=defaultColor}) => {
  const skills = [
    { Icon: SiJavascript, name: "JavaScript" },
    { Icon: SiTypescript, name: "TypeScript" },
    { Icon: SiReact, name: "React" },
    { Icon: FaNodeJs, name: "NodeJs" },
    { Icon: SiMongodb, name: "MongoDB" },
    { Icon: SiExpress, name: "Express.js" },
    { Icon: SiPython, name: "Python" },
    { Icon: SiRedux, name: "Redux" },
    { Icon: SiPhp, name: "PHP" },
    { Icon: SiLaravel, name: "Laravel" },
    { Icon: TbBrandNextjs, name: "NextJs" },
    
  ];

  return (
    <>
      <SkillTitle>Skills</SkillTitle>
      <SkillContainer color={color} >
        {skills.map((skill, index) => (
          <SkillItem color={color} key={skill.name} delay={`${index * 0.2}s`}>
            <SkillIcon color={color}>
              <skill.Icon />
            </SkillIcon>
            <SkillName>{skill.name}</SkillName>
          </SkillItem>
        ))}
      </SkillContainer>
    </>
  );
};

export default Skills;
