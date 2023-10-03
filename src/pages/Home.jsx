import { useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import GitContributionsBar from '../components/GitContributions';
import Navbar from '../components/Navbar';

import styled from 'styled-components';
import Intro from '../components/Intro';
import Bar from '../components/Bar';
import AboutMe from '../components/AboutMe';

import ProjectCards from '../components/project/Project';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import { defaultColor } from '../constants';

const HomeSection = styled.section`
  @media (min-width: 1024px) {
    margin-left: 250px;
    margin-right: 250px;
  }
`;
const Home = () => {
  //colorState start
  const [color, setColor] = useState(defaultColor);

  const handleColorState = (newState) => {
    setColor(newState);
  };
  //colorState end

  return (
    <>
      <HomeSection>
        <Section1>
          <Navbar color={color} />
          <div className='bar'>
            <Bar color={color} />
          </div>
          <div className='intro'>
            <Intro color={color} />
          </div>

          <div className='color-picker'>
            <ColorPicker colorStateForHome={handleColorState} />
          </div>
          <div className='contribution'>
            <GitContributionsBar color={color} />
          </div>
        </Section1>

        <Section2 id='about'>
          <AboutMe color={color} />
          <Skills color={color} />
          {/* <Education color={color} /> */}
        </Section2>

        <Section3 id='projects'>
          <ProjectCards color={color} />
        </Section3>

        <Section4 id='contact'>
          <Footer color={color} />
        </Section4>
      </HomeSection>
    </>
  );
};
const Section2 = styled.div`
  margin-left: 20px;
`;
const Section4 = styled.div`
  margin-left: 20px;
`;
const Section3 = styled.div`
  margin-left: 20px;
`;

const Section1 = styled.div`
  height: 700px;
  position: relative;
  .contribution {
    position: absolute;
    bottom: 0;
    top: 50px;
    right: 5%;
  }
  .color-picker {
    position: absolute;
    top: 10px;
    left: 50%;
    z-index: 5;
  }
  .intro {
    position: absolute;
    z-index: 4;
    top: 130px;
    left: 30px;
  }
  .bar {
    position: absolute;
    top: -20px;
    left: -20px;
    z-index: 3;
  }
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
`;

export default Home;
