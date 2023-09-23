/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import styled from "styled-components";

import useGitHubRepos from "../Hooks/useRepos";
import useCommits from "../Hooks/useCommits";
import { useState } from "react";
import parseHexColor from "../utils/parseHexColor"
import SkeletonLoader from "./Skeleton"
import { StaticDate } from "../constants";



const GitContributionsBar = ({color}) => {
  const colorRGBA = parseHexColor(color, { r: 77, g: 27, b: 97 });

  const accessToken = import.meta.env.VITE_GITHUB_SECRET_KEY;
  const owner = import.meta.env.VITE_GITHUB_USERNAME;
  const repositories = useGitHubRepos(accessToken);

  const {dateFrequencyMap } = useCommits(owner, repositories, accessToken);

  const data = Object.entries(dateFrequencyMap).map(([date, count]) => ({
    date: new Date(date),
    count,
  }));

  const [tooltipText, setTooltipText] = useState("");

  const handleMouseEnter = (date) => {
    setTooltipText(
      `${  date.count} Contributions on ${new Date(date.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}`
    )
  }
  
  const handleMouseLeave = () => {
    setTooltipText(""); 
  };

  const sortedDate = data.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-98)

  console.log("sorted date" , sortedDate)
const Container = styled.div`

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
  width: 20%;

  .column {
    position: relative;
    width: 40px;
    height: 40px;
    transition: all 0.3s ease-in-out;
  }

  .column:hover {
    border-radius: 50%;
    cursor: pointer;
  }
  .tooltip {
    font-size: 14px;
    width: 150px;
    display: none; /* Initially hidden */
    position: absolute;
    background-color: #000000;
    opacity:.9;
    color: #fff;
    padding:5px 10px;
    border-radius: 5px;
    border:1px solid #fff;
    
   
  }
  .column:hover .tooltip {
    display: block;
    top: -60px; /* Adjust this value to position the tooltip as needed */
    left: 50%;
    transform: translateX(-50%);
    z-index: 99; /* Ensure the tooltip is above other elements */
  }
  .class1 {
    background-color: rgba(${colorRGBA.r || 0}, ${colorRGBA.g || 0}, ${colorRGBA.b || 0}, 1);
  }
  .class1:hover {
    background-color: #28292d;
  }

  .class2 {
    background-color: rgba(${colorRGBA.r || 0}, ${colorRGBA.g || 0}, ${colorRGBA.b || 0}, 0.8);
  }
  .class2:hover {
    background-color: #626265;
  }

  .class3 {
    background-color: rgba(${colorRGBA.r || 0}, ${colorRGBA.g || 0}, ${colorRGBA.b || 0}, 0.6);
  }
  .class3:hover {
    background-color: #8a8787;
  }

  .class4 {
    background-color: rgba(${colorRGBA.r || 0}, ${colorRGBA.g || 0}, ${colorRGBA.b || 0}, .4);
  }
  .class4:hover {
    background-color: #cecccd;
  }
`;
  if(sortedDate.length===0 && !StaticDate )
  {return <SkeletonLoader/>}
  return (
     <Container>
      {sortedDate.length!==0 ?
        sortedDate.map((date, index) => {
          let className = "column"; // Default class
          if (date.count >= 1 && date.count < 2) {
            className += " class4"; // Apply class1 for the range 1-2
          } else if (date.count >= 2 && date.count <= 5) {
            className += " class3"; // Apply class2 for the range 3-5
          } else if (date.count >= 6 && date.count <= 10) {
            className += " class2"; // Apply class3 for the range 6-7
          } else if (date.count > 10) {
            className += " class1"; // Apply class4 for values greater than 7
          }

          return (
            <div
              key={index}
              className={className}
              onMouseEnter={() => handleMouseEnter(date)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="tooltip">{  tooltipText}</div>
            </div>
          );
        }): 
        StaticDate.map((date, index) => {
          let className = "column"; // Default class
          if (date.count >= 1 && date.count < 2) {
            className += " class4"; // Apply class1 for the range 1-2
          } else if (date.count >= 2 && date.count <= 5) {
            className += " class3"; // Apply class2 for the range 3-5
          } else if (date.count >= 6 && date.count <= 10) {
            className += " class2"; // Apply class3 for the range 6-7
          } else if (date.count > 10) {
            className += " class1"; // Apply class4 for values greater than 7
          }

          return (
            <div
              key={index}
              className={className}
              onMouseEnter={() => handleMouseEnter(date)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="tooltip">{  tooltipText}</div>
            </div>
          );
        }) }
    </Container>
  );
};

export default GitContributionsBar;
