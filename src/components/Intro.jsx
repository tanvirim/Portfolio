/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { defaultColor } from "../constants";
import SocialIcons from "./Socialicon";
import ResumeAndHireButtons from "./Button";
import AnimProfession from "./AnimProfession";
import profilePic from "../assets/profile.jpg"; // Import your profile picture

const Intro = ({ color }) => {
  return (
    <Container>
      <Avatar src={profilePic} alt="Profile Picture" />
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
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(173, 216, 230, 0.5);
  backdrop-filter: blur(15px);
  box-shadow: 10px 20px 30px rgba(0, 128, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 320px;
  height: fit-content;
  padding: 20px;

  @media screen and (min-width: 1080px) {
    width: 450px;
    height: fit-content;
    align-items: center;
    padding: 20px;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  align-self: center;

  @media screen and (min-width: 1080px) {
    width: 120px;
    height: 120px;
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
