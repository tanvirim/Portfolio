/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import styled from 'styled-components';
import { defaultColor, educationHistory } from '../../constants';

const Education = ({ color = defaultColor }) => {
  return (
    <>
      <EducationTitle>Education</EducationTitle>
      <Container color={color}>
        <div className='education-history'>
          {educationHistory.map((item, index) => (
            <div key={index} className='education-entry'>
              <div className='institution'>
                <h1>{item.institution}</h1>
                <h3>{item.duration}</h3>
              </div>
              <h2>{item.degree}</h2>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};
const EducationTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;
const Container = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 20px;

  .education-history {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .education-entry {
    display: flex;
    flex-direction: column;
  }

  .institution {
    display: flex;
    gap: 5px;
  }

  h1 {
    color: ${({ color }) => (color ? color : defaultColor)};
    font-size: 24px;
  }

  h3 {
    font-size: 14px;
    margin-top: 12px;
  }

  h2 {
    font-size: 16px;
  }
`;
export default Education;
