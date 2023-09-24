/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Carousel from "nuka-carousel"

const CarouselBar = ({ compliments }) => {
    return (
      <Carousel style={{height:"200px"}}>
        {compliments.map(compliment => <div> {compliment.name} </div>)}
      </Carousel>
    );
  }
  

export default CarouselBar; 
