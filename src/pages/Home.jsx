import { useState } from "react";
import ColorPicker from "../components/ColorPicker"
import GitContributionsBar from "../components/GitContributions";
import Navbar from "../components/Navbar";

import styled from "styled-components";
import Intro from "../components/Intro";

const Home = () => {

 //colorState start
    const [color, setColor] = useState('');

    const handleColorState = (newState) => {
      setColor(newState);
    };
//colorState end


  return (
    <Container style={{"margin":"10px 20px"}}>
      <Navbar color={color}/>
      <Intro className="intro" color={color}/>
      
      <div className="color-picker">
      <ColorPicker colorStateForHome={handleColorState}/>

      </div>
      <div className="contribution">
      <GitContributionsBar color={color} />
      </div>
    </Container>
  )
}

const Container = styled.div`
position:relative;
.contribution{
    position:absolute ;
    bottom: 0;
    top:0;
    right:10%;
}
.color-picker{
    position:absolute;
    top:60px;
    left:40%;
    
   
}
.intro{
  z-index:999;
}

`
export default Home
