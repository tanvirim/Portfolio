/* eslint-disable react/prop-types */

import styled from "styled-components";
import { ChromePicker } from "react-color";
import { useState } from "react";
import { MdFormatColorFill } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { defaultColor } from "../constants";

const ColorPicker = ({ colorStateForHome }) => {
  const [color, setColor] = useState(defaultColor);
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (color) => {
    setColor(color.hex);
    colorStateForHome(color.hex);
  };

  return (
    <>
      <Container>
        <div className="icon-container">
          {!showPicker ? (
            <MdFormatColorFill
              size="30px"
              color={color}
              onClick={() => setShowPicker(!showPicker)}
            />
          ) : (
            <AiOutlineClose 
              size="25px"
              color={color}
              onClick={() => setShowPicker(!showPicker)}
            />
          )}
        </div>

        <div className={`hidden-component ${showPicker ? "visible" : ""}`}>
          {showPicker && <ChromePicker color={color} onChange={handleChange} />}
        </div>
      </Container>
    </>
  );
};

export default ColorPicker;

const Container = styled.div`
border: 2px solid #b5b1b1;
  width: 90px;
  background-color: white;
  padding: 20px  15px  15px  30px;
  border-radius: 5px;
 
  z-index: 99;
  position: relative;
  display: flex;
  flex-direction: column;

  .hidden-component {
    display: none; /* Initially hidden */
    position: absolute; /* Position it without affecting other elements */
    top: 70px; /* Adjust the top position as needed */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%);
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(46, 42, 42, 0.8);
  }

  .visible {
    display: block; /* Show the component when it's visible */
    z-index: 999;
  }
  .icon-container{
    transition: all 0.3s ease-in-out;
  }
  .icon-container:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;
