import { FaGithub, FaFacebook, FaLinkedin, FaHackerrank } from 'react-icons/fa';
import styled from "styled-components";
import IconCube from "./IconCube";

// Each network's own real brand color — not the page's accent — so every
// cube is tinted like the actual logo instead of a uniform swatch.
const ICONS = [
  {
    url: "https://github.com/tanvirmitul1",
    icon: FaGithub,
    color: "#181717",
    label: "GitHub",
  },
  {
    url: "https://www.linkedin.com/in/tanu0/",
    icon: FaLinkedin,
    color: "#0A66C2",
    label: "LinkedIn",
  },
  {
    url: "https://www.hackerrank.com/blackpanther1411",
    icon: FaHackerrank,
    color: "#00EA64",
    label: "HackerRank",
  },
  {
    url: "https://www.facebook.com/tanu0",
    icon: FaFacebook,
    color: "#1877F2",
    label: "Facebook",
  },
];

const SocialIcons = () => {
  return (
    <Container>
      {ICONS.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          <IconCube icon={item.icon} color={item.color} size={26} label={item.label} />
        </a>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 22px;
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
