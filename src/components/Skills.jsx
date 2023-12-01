/* eslint-disable no-duplicate-case */
/* eslint-disable react/prop-types */
import styled, { keyframes } from 'styled-components';
import { defaultColor } from '../constants';
import { BsFillBootstrapFill } from 'react-icons/bs';
import { DiIllustrator } from 'react-icons/di';
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
} from 'react-icons/si';
import { BiLogoTailwindCss } from 'react-icons/bi';
import { FaNodeJs } from 'react-icons/fa';
import { TbBrandNextjs } from 'react-icons/tb';
import { FaCss3Alt, FaHtml5, FaGithub, FaFigma } from 'react-icons/fa';

import { RiGitMergeLine } from 'react-icons/ri';

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
  border-left: 5px dotted ${({ color }) => (color ? color : defaultColor)};
  border-right: 5px dotted ${({ color }) => (color ? color : defaultColor)};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const SkillCategory = styled.div`
  display: flex;
  flex-direction: column;

  .caterory-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 1.5rem;
      text-align: center;
      font-weight: bold;
      border-bottom: 3px solid black;
    }
  }
  .skills {
    display: flex;
    flex-wrap: wrap;
  }
`;

const SkillItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px;
  text-align: center;
  animation: ${waveAnimation} 1s ease infinite;
  animation-delay: ${(props) => props.delay};
`;

const SkillIcon = styled.div`
  color: ${({ color }) => (color ? color : defaultColor)};
  font-size: 3rem;
  margin-bottom: 10px;
`;

const SkillName = styled.div`
  font-size: 1rem;
`;

const SkillTitle = styled.h2`
  margin: 0 auto;
  text-transform: uppercase;
  border-bottom: 3px solid ${defaultColor};
  padding-bottom: 10px;
  width: 300px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const Skills = ({ color = defaultColor }) => {
  const skills = [
    {
      category: 'Programming Languages',
      items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Front-End Frameworks',
      items: ['React.js', 'Next.Js', 'MUI', 'Chakra UI'],
    },
    { category: 'Back-End', items: ['NodeJs', 'Express.js'] },
    { category: 'Database', items: ['MongoDB'] },
    { category: 'CSS Frameworks', items: ['Tailwind CSS', 'Bootstrap'] },
    {
      category: 'State Management',
      items: ['Redux', 'React Query'],
    },
    {
      category: 'Software Ecosystem',
      items: [
        'Git',
        'GitHub',
        'Render',
        'Vercel',
        'Netlify',
        'Figma',
        'Adobe Illustrator',
      ],
    },
  ];

  const getIcon = (item) => {
    switch (item) {
      case 'Vercel':
        return <SiVercel />;
      case 'Netlify':
        return <SiNetlify />;
      case 'Render':
        return <SiRender />;
      case 'JavaScript':
        return <SiJavascript />;
      case 'TypeScript':
        return <SiTypescript />;
      case 'React.js':
        return <SiReact />;
      case 'NodeJs':
        return <FaNodeJs />;
      case 'MongoDB':
        return <SiMongodb />;
      case 'Express.js':
        return <SiExpress />;
      case 'Python':
        return <SiPython />;
      case 'Redux':
        return <SiRedux />;
      case 'PHP':
        return <SiPhp />;
      case 'Laravel':
        return <SiLaravel />;
      case 'Next.Js':
        return <TbBrandNextjs />;
      case 'HTML5':
        return <FaHtml5 />;
      case 'CSS3':
        return <FaCss3Alt />;
      case 'MUI':
        return <SiMui />;
      case 'Chakra UI':
        return <SiChakraui />;
      case 'Git':
        return <RiGitMergeLine />;
      case 'GitHub':
        return <FaGithub />;
      case 'Figma':
        return <FaFigma />;
      case 'Tailwind CSS':
        return <BiLogoTailwindCss />;
      case 'Bootstrap':
        return <BsFillBootstrapFill />;
      case 'Adobe Illustrator':
        return <DiIllustrator />;

      case 'React Query':
        return <SiReactquery />;
      default:
        return null;
    }
  };

  return (
    <>
      <SkillTitle>Skills</SkillTitle>

      <SkillContainer color={color}>
        {skills.map((category, index) => (
          <SkillCategory key={index}>
            <div className='caterory-container'>
              <h3>{category.category}</h3>
            </div>
            <div className='skills'>
              {category.items.map((item, itemIndex) => (
                <SkillItem
                  color={color}
                  key={`${category.category}-${itemIndex}`}
                  delay={`${index * 0.2 + itemIndex * 0.1}s`}
                >
                  <SkillIcon color={color}>{getIcon(item)}</SkillIcon>
                  <SkillName>{item}</SkillName>
                </SkillItem>
              ))}
            </div>
          </SkillCategory>
        ))}
      </SkillContainer>
    </>
  );
};

export default Skills;
