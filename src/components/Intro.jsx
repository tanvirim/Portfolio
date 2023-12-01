/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled, { keyframes } from 'styled-components';
import { defaultColor } from '../constants';
import SocialIcons from './Socialicon';
import ResumeAndHireButtons from './Button';
import AnimProfession from './AnimProfession';

const Intro = ({ color }) => {
  return (
    <Container>
      <Text color={color}>
        <span>Tanvir</span>
        <span>Mitul</span>
      </Text>
      <AnimProfession />
      <SocialIcons color={color} />
      <ResumeAndHireButtons color={color} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  width: 320px;
  height: 400px;
  padding-left: 20px;

  @media screen and (min-width: 1080px) {
    width: 450px;
    height: 450px;
    align-items: center;
    padding: 20px;
  }
`;

const Text = styled.h1`
  align-self: center;
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

  @media screen and (min-width: 1080px) {
    flex-direction: row;
    gap: 20px;
  }
`;

export default Intro;
