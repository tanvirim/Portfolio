import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import GitContributionsBar from "../components/GitContributions";
import Navbar from "../components/Navbar";

import styled from "styled-components";
import Intro from "../components/Intro";
import Bar from "../components/Bar";
import AboutMe from "../components/AboutMe";

import ProjectCards from "../components/project/Project";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import { defaultColor } from "../constants";

const Home = () => {
  const [color, setColor] = useState(defaultColor);
  console.log({ color });
  const gradientStyle = {
    backgroundImage: `url("/src/assets/black-frame-view.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const handleColorState = (newState) => {
    setColor(newState);
  };

  return (
    <>
      <div className="px-2 md:px-10 lg:px-40">
        <Section1 style={gradientStyle}>
          <Navbar color={color} />
          <div className="bar">
            <Bar color={color} />
          </div>
          <div className="intro mt-10">
            <Intro color={color} />
          </div>

          <div className="color-picker">
            <ColorPicker colorStateForHome={handleColorState} />
          </div>
          <div className="contribution">
            <GitContributionsBar color={color} />
          </div>
        </Section1>

        <div id="about">
          <AboutMe color={color} />
          <Skills color={color} />
        </div>

        <div id="projects">
          <ProjectCards color={color} />
        </div>

        <div id="contact">
          <Footer color={color} />
        </div>
      </div>
    </>
  );
};

const Section1 = styled.div`
  height: 100vh;
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
