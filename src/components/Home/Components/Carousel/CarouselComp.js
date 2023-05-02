import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./components/card";
import LastProduct from  "../Carousel/Last_product"


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


export default function CarouselComp() {
  return (
    <Wrapper>
      <Carousel responsive={responsive}
      infinite={true}
       autoPlay={true}
      autoPlaySpeed={2000}>
      {LastProduct.map((value, index) => {
                return (
                  <Card
                    key={index}
                    image={value.image}
                    category={value.category}
                    price={value.price}
                    title={value.title}
                    description ={value.description}
                    adresseWeb = {value.adresseWeb}
                  />
                );
              })}
        
      
        
      </Carousel>
    </Wrapper>
  );
}
const Wrapper = styled.div`
width:1500px;
`;
