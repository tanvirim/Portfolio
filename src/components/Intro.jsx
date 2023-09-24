/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";
import { defaultColor } from "../constants";
import SocialIcons from "./Socialicon";
import ResumeAndHireButtons from "./Button";
import AnimProfession from "./AnimProfession";

const Intro= ({ color }) => {
  return (
    <Container>
      <Text color={color}>
        <span>Tanvir</span>
        <span>Mitul</span>
      </Text>
      <AnimProfession/>
       <SocialIcons color={color} />
      <ResumeAndHireButtons color={color} />
    </Container>
  );
};


const Container = styled.div`
display:flex;
flex-direction:column ;
gap: 20px;
  background-color: white;
  width: 300px;
  height: 400px;
  padding-left: 20px;
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


export default Intro;