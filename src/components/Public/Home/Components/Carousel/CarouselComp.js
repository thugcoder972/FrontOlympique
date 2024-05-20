import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { getCategories } from "./api";
import { useNavigate } from 'react-router-dom';
import CategoryCard from './components/CategoryCard'

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1640 }, items: 4 },
  desktop: { breakpoint: { max: 1640, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 657 }, items: 2 },
  mobile: { breakpoint: { max: 657, min: 0 }, items: 1 }
};

export default function CarouselComp() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <Wrapper>
      <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={2000}>
        {categories.map((category, index) => (
          <div key={index} onClick={() => navigate(`/category/${category.type_epreuve_sportive}`)}>
            <CategoryCard category={category} />
          </div>
        ))}
      </Carousel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 655px) {
    width: 50%;
  }
`;


