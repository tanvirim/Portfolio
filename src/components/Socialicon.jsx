/* eslint-disable react/prop-types */

import { FaGithub, FaFacebook, FaLinkedin, FaHackerrank } from 'react-icons/fa'; // Import icons from react-icons/fa
import styled from "styled-components";
import { defaultColor } from '../constants';

const SocialIcons = ({color=defaultColor}) => {
  return (
    <Container>
      <a href="https://github.com/tanvirim" target="_blank" rel="noopener noreferrer">
        <FaGithub color={color? color : defaultColor} size={32} />
      </a>
      <a href="https://www.linkedin.com/tanu0" target="_blank" rel="noopener noreferrer">
        <FaLinkedin color={color? color : defaultColor} size={32} />
      </a>
      <a href="https://www.hackerrank.com/blackpanther1411" target="_blank" rel="noopener noreferrer">
        <FaHackerrank color={color? color : defaultColor} size={32} />
      </a>
      <a href="https://www.facebook.com/tanu0" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={32} color={color? color : defaultColor} />
      </a>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  a{
    transition: transform 0.3s ease; 
  &:hover {
    transform: scale(1.3);
}
  }
  `
  

export default SocialIcons;