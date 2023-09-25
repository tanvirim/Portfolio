/* eslint-disable react/prop-types */

import { FaGithub, FaFacebook, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import styled from "styled-components";
import { defaultColor } from '../constants';

const SocialIcons = ({color=defaultColor}) => {
  const icons = [
    {
      url: "https://github.com/tanvirim",
      icon: <FaGithub color={color ? color : defaultColor} size={32} />,
    },
    {
      url: "https://www.linkedin.com/in/tanu0/",
      icon: <FaLinkedin color={color ? color : defaultColor} size={32} />,
    },
    {
      url: "https://www.hackerrank.com/blackpanther1411",
      icon: <FaHackerrank color={color ? color : defaultColor} size={32} />,
    },
    {
      url: "https://www.facebook.com/tanu0",
      icon: <FaFacebook size={32} color={color ? color : defaultColor} />,
    },
  ];

  return (
    <Container>
      {icons.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          {item.icon}
        </a>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  a {
    animation: wave 5s linear infinite; /* Add the wave animation */
    animation-fill-mode: both;

  }

  @keyframes wave {
    0%, 100% {
      transform: translateY(0);
    }
    25%, 75% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(5px);
    }
  }
`;

export default SocialIcons;
