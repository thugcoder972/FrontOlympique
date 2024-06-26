import styled from "styled-components";
import Mode1 from "./mode1.jpg";
import Mode2 from "./model2.jpg";
import React, { useState, useEffect } from "react";
import CarouselComp from "../Carousel/CarouselComp/CarouselView";
import Feature from "./Feature";
import ProductCategories from "../Products/Product_categories";


export default function Header() {

  const [isActive, setIsActive] = useState(false);

  const changeBool = () => {
    setIsActive((isActive) => !isActive);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeBool();
      console.log(isActive);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Wrapper>
      <div className={isActive ? "div_principal" : "div_principal2"}>
        <div className="text-light divHeader ">
          <div className="textHeader ">
            <h4>MAGINIFIQUE</h4>
            <h1>LES JEUX SONT LA</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            ducimus deleniti mollitia reiciendis dolores doloribus? Sunt tempora
            enim adipisci. Delectus?Amet ducimus deleniti mollitia reiciendis
            dolores doloribus? Sunt tempora enim adipisci. Delectus?
            <p></p>
            {/* <button type="button" class="btn btn-info m-3">
              Discover
            </button>
            <button type="button" class="btn btn-info">
              Add To Cart
            </button> */}
          </div>
          <div className="priceHeader ">
            <div className="priceDiv">
            From
            <h1>$30</h1>
            Shop
            </div>
          
          </div>
        </div>
      </div>
     
      <Feature />

<h1 className="m-4 p-4 text-center">CATEGORIES </h1>
<div className="featureCenter">
<CarouselComp/>
</div>

<ProductCategories/>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .div_principal {
    height: 780px;
    background: url(${Mode1});
   
    background-size: cover;
    
    background-position: center;
    
  }
  .div_principal2 {
    height: 780px;
    background: url(${Mode2});
    
    background-size: cover;
    
    background-position: center;
  }
  .textHeader {
    width: 30%;
    /* margin-left: 30%;
    margin-right: 50%; */
    position: absolute;
    top: 300px;
    left: 300px;
    animation: fly-ball 4s infinite;
    color: black;
  }
  .divHeader {
    position: relative;
  }
  .priceHeader {
    position: absolute;
    top: 300px;
    right: 450px;
    background-color: black;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: rorateDiv 4s infinite;
  }

  ul {
    list-style-type: none;
  }
  .priceDiv{
    text-align:center;
  }

  .shopping-cart {
  background-color: black;
  position: relative;
  padding: 25px;
  border-radius: 100px;
  position: fixed;
  bottom: 40px;
  right: 10%;
  z-index: 1;
}

.shopping-cart:active {
  box-shadow: 0 4px 4px gray;
}

#cartIcon{
  color: white;
}

.shopping-cart > p{
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  padding: 4px 8px;
  color: white;
  border-radius: 50px;
}

@media(max-width: 1343px){
  .textHeader {
    top: 350px;
   
  }
  .priceHeader {
    top: 40px;
  }
}
@media(max-width: 1088px){
  .textHeader {
    width: 40%;
    right: 50%;
    left: 50%;
  }
  .priceHeader {

    right: 50%;
    left: 50%;
  }

}

@media(max-width: 768px){
  

  .home__row > div:nth-child(3) {
    grid-column: 1 / span 3;
  }
  
  .home__row > div:nth-child(4) {
    grid-column: span 3;
  }

  .home__row > div:nth-child(5) {
    grid-column: 1 / span 3;
  }

  .home__row > div:nth-child(6) {
    grid-column: span 3;
  }

}

@media(max-width: 600px){
  .home__row{
    display: unset;
  }

  .textHeader {
    width: 50%;
    font-size: 10px;
    left:30%;
  }
  .priceHeader {
    left:30%;
}
}


  @keyframes fly-ball {
    100% {
      transform: translateY(-100px);
    }
  }

  @keyframes rorateDiv {
    100% {
      transform: rotate(-360deg);
    }
  }
`;
