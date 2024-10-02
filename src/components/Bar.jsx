/* eslint-disable react/prop-types */
import styled from "styled-components";
import { defaultColor } from "../constants";

const Bar = ({ color }) => {
  console.log("color", color);
  return <Container color={color}></Container>;
};
const Container = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ color }) => (color ? color : defaultColor)};
  backdrop-filter: blur(10px);
  box-shadow: 10px 20px 30px rgba(0, 128, 255, 0.2);

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 1080px) {
    width: 400px;
    height: 400px;
  }
`;
export default Bar;
