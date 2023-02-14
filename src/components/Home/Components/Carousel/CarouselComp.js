import styled from "styled-components";
import { Carousel} from "react-responsive-carousel";
import Card from "./components/card";

export default function CarouselComp() {
  return (
    <Wrapper>
      <Carousel
        useKeyboardArrows
        showArrows={false}
        showThumbs={false}
      >

        <Card/>
         <Card/>
        
      </Carousel>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
