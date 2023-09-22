/* eslint-disable react/prop-types */

import styled from "styled-components";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { MdFormatColorFill } from "react-icons/md";
import { GrClose } from "react-icons/gr";

const ColorPicker = ({ colorStateForHome }) => {
  const [color, setColor] = useState("#060096");
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
            <GrClose
              size="30px"
              color={color}
              onClick={() => setShowPicker(!showPicker)}
            />
          )}
        </div>

        <div className={`hidden-component ${showPicker ? "visible" : ""}`}>
          {showPicker && <SketchPicker color={color} onChange={handleChange} />}
        </div>
      </Container>
    </>
  );
};

export default ColorPicker;

const Container = styled.div`
  width: 60px;
  background-color: white;
  padding: 15px;
  border-radius: 5px;

  z-index: 99;
  position: relative;
  display: flex;
  flex-direction: column;

  .hidden-component {
    display: none; /* Initially hidden */
    position: absolute; /* Position it without affecting other elements */
    top: 50px; /* Adjust the top position as needed */
    left: 10%; /* Center horizontally */
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

  .icon-container:hover {
    cursor: pointer;
  }
`;
