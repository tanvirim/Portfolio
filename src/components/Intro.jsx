/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
import { defaultColor } from "../constants";
import SocialIcons from "./Socialicon";

const Intro= ({ color }) => {
  return (
    <Container>
      <Text color={color}>
        <span>tanvir</span>
        <span>mitul</span>
      </Text>
      <Paragraph className="name">WEB DEVELOPER</Paragraph>
      <SocialIcons color={color} />
    </Container>
  );
};


const Container = styled.div`
display:flex;
flex-direction:column ;
gap: 20px;
  background-color: white;
  width: 270px;
  height: 350px;
  padding-top: 30px;
  padding-left: 40px;
  
`;

const Text = styled.h1`
  color: ${({ color }) => (color ? color : defaultColor)};
  font-weight: bold;
  font-size: 3rem;
  letter-spacing: 5px;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  transition: transform 0.3s ease; 
  &:hover {
    
    
    transform: scale(1.1);
}
  span {
    white-space: nowrap;
  }
`;
const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(-30deg);
  }
  75% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;


const Paragraph = styled.p`
  font-size: 25px;
  letter-spacing: 7px;
  transition: transform 0.3s ease; 

  &:hover {
    
    
    transform: scale(1.1);
}
`;


export default Intro;
