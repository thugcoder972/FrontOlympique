import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./components/card";
import LastProduct from  "./Last_product"


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1640 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1640, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 657 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 657, min: 0 },
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
                    id={value.id}
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
width:90%;
display: block;
 margin-left: auto;
 margin-right: auto;

 @media(max-width: 655px){
  width:50%;
 }
`;
