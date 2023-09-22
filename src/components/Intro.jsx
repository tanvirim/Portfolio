/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { defaultColor } from "../constants";

const Intro= ({ color }) => {
  return (
    <Container>
      <Text color={color}>
        <span>tanvir</span>
        <span>mitul</span>
      </Text>
      <Paragraph className="name">WEB DEVELOPER</Paragraph>
    </Container>
  );
};

const Container = styled.div`
display:flex;
flex-direction:column ;
gap: 20px;
  background-color: white;
  width: 250px;
  height: 350px;
  padding-top: 30px;
  
`;

const Text = styled.h1`
  color: ${({ color }) => (color ? color : defaultColor)};
  font-weight: bold;
  font-size: 3rem;
  letter-spacing: 5px;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  span {
    white-space: nowrap;
  }
`;

const Paragraph = styled.p`
  font-size: 25px;
  letter-spacing: 7px;
`;

export default Intro;
