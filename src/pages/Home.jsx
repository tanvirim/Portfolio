import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import GitContributionsBar from "../components/GitContributions";
import Navbar from "../components/Navbar";

import styled from "styled-components";
import Intro from "../components/Intro";
import Bar from "../components/Bar";

const Home = () => {
  //colorState start
  const [color, setColor] = useState("");

  const handleColorState = (newState) => {
    setColor(newState);
  };
  //colorState end

  return (
    <Container >
      <Navbar color={color} />
      <div className="bar">
        <Bar color={color} />
      </div>
      <div className="intro">
        <Intro color={color} />
      </div>

      <div className="color-picker">
        <ColorPicker colorStateForHome={handleColorState} />
      </div>
      <div className="contribution">
        <GitContributionsBar color={color} />
      </div>
    </Container>
  );
};

const Container = styled.div`
height:200vh;
margin-right: 10px;
  position: relative;
  .contribution {
    position: absolute;
    bottom: 0;
    top: 40px;
    right: 10%;
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
    left:50px;
    
  }
  .bar {
    position: absolute;
    top: -40px;
    left: -40px;
    z-index: 3;
    
  }
  @media (max-width: 768px) {
    overflow-x: hidden;
  }

`;
export default Home;
