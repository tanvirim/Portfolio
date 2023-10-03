/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import { defaultColor } from '../constants';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { AiOutlineDoubleRight } from 'react-icons/ai'; // You can choose any icon you prefer

const AboutTitle = styled.h2`
  text-transform: uppercase;
  border-bottom: 3px solid ${defaultColor};
  padding-bottom: 10px;
  width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const AboutMe = ({ color = defaultColor }) => {
  return (
    <>
      <AboutTitle>About me</AboutTitle>
      <Container color={color}>
        <p>
          `As a <span>JavaScript</span> developer specializing in the
          <span> MERN stack</span> , I'm dedicated to crafting dynamic web
          applications. I leverage a combination of{' '}
          <span>object-oriented </span>and <span>functional programming</span>{' '}
          to efficiently solve challenges. My enthusiasm for learning extends to
          embracing <span>new technology stacks </span>,and my proficiency in{' '}
          <span>TypeScript </span>
          further enhances my adaptability, making me a valuable asset for any
          software development team. Moreover, I excel as a{' '}
          <span>team player</span> and demonstrate strong{' '}
          <span> leadership skills</span>, effectively collaborating with
          colleagues to achieve our shared objectives.
        </p>

        <StyledLearnMoreButton color={color} to='/about'>
          Learn More
          <AiOutlineDoubleRight />
        </StyledLearnMoreButton>
      </Container>
    </>
  );
};
const Container = styled.div`
  position: relative;
  padding: 10px;
  margin-bottom: 20px;
  border-left: 5px dotted ${({ color }) => (color ? color : defaultColor)};
  border-right: 5px dotted ${({ color }) => (color ? color : defaultColor)};

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
