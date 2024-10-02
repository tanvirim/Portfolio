/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import { defaultColor } from "../constants";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import introGif from "../assets/intro.gif";

const AboutMe = ({ color = defaultColor }) => {
  return (
    <div className="custom-shadow-border mb-20 p-5">
      <div className="title-text-style">
        ABOUT ME{" "}
        {/* <span>
          <img  src={introGif} alt="" />
        </span> */}
      </div>
      <Container color={color}>
        <p>
          `As a <span>JavaScript</span> developer ,I leverage a combination of{" "}
          <span>object-oriented </span>and <span>functional programming</span>{" "}
          to efficiently solve challenges. My enthusiasm for learning extends to
          embracing <span>new technology stacks </span>. Moreover, I excel as a{" "}
          <span>team player</span> and demonstrate strong{" "}
          <span> leadership skills</span>, effectively collaborating with
          colleagues to achieve our shared objectives.
        </p>

        <StyledLearnMoreButton color={color} to="/about">
          Learn More
          <AiOutlineDoubleRight />
        </StyledLearnMoreButton>
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: relative;
  padding: 10px;
  margin-bottom: 100px;
  font-size: 20px;

  h1 {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }
  p {
    line-height: 25px;
    text-align: justify;
    padding: 10px;
  }
  span {
    color: ${({ color }) => (color ? color : defaultColor)};
    font-weight: bold;
  }
`;

const StyledLearnMoreButton = styled(Link)`
  position: absolute;
  left: 70%;
  font-size: 12px;
  display: flex;
  width: fit-content;
  align-items: center;

  padding: 5px 10px;
  border-radius: 5px;
  background: ${({ color }) => (color ? color : defaultColor)};
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    background-color: #3f51b5;
  }
  & > svg {
    margin-left: 5px;
  }
`;
export default AboutMe;
