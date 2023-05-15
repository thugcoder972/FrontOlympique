import styled from "styled-components";
import Mode1 from "./mode1.jpg";
import Mode2 from "./model2.jpg";
import React, { useState, useEffect } from "react";
import CarouselComp from "../Carousel/CarouselComp";
import Feature from "./Feature";
import Product from "../Products/Product";
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ShoppingCart } from '@mui/icons-material'

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
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart)

const getTotalQuantity = () => {
  let total = 0
  cart.forEach(item => {
    total += item.quantity
  })
  return total
}
  return (
    <Wrapper>
      <div className={isActive ? "div_principal" : "div_principal2"}>
        <div className="text-light divHeader ">
          <div className="textHeader ">
            <h4>NEW ARRIVALS</h4>
            <h1>DENIM JACKETS</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            ducimus deleniti mollitia reiciendis dolores doloribus? Sunt tempora
            enim adipisci. Delectus?Amet ducimus deleniti mollitia reiciendis
            dolores doloribus? Sunt tempora enim adipisci. Delectus?
            <button type="button" class="btn btn-info m-3">
              Discover
            </button>
            <button type="button" class="btn btn-info">
              Add To Cart
            </button>
          </div>

          <div className="priceHeader ">
            <div className="priceDiv">
            From
            <h1>$29</h1>
            Shop
            </div>
          
          </div>
        </div>
      </div>
     
      <Feature />

      <h1 className="m-4 p-4 text-center">LATEST PRODUCTS  </h1>
      <div className="featureCenter">
      <CarouselComp/>
      </div>

    
      <h1 className="m-4 p-4 text-center">LATEST PRODUCTS  </h1>
      <div className="widthUl">
      <ul className="ulListe">
            <li className="m-3">
                <a className="btn btn-dark m-2" href="">Top</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">JumSuit</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Lingerie</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Jeans</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Dresses</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Jumpers</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Leggins</a>
            </li>
        </ul>
      </div>
    
      <div className="featureCenter">
        <div className="container">
        <div className="row">
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
        </div>

        <div className="row">
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
        </div>
        </div>
        <div className='shopping-cart' onClick={() => navigate('/cart')}>
        <ShoppingCart id='cartIcon'/>
        <p>{getTotalQuantity() || 0}</p>
      </div>
  
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .div_principal {
    height: 780px;
    background: url(${Mode1});
    background-repeat: no-repeat;
    background-size: auto;
  }
  .div_principal2 {
    height: 780px;
    background: url(${Mode2});
    background-repeat: no-repeat;
    background-size: auto;
  }
  .textHeader {
    width: 390px;
    /* margin-left: 30%;
    margin-right: 50%; */
    position: absolute;
    top: 300px;
    left: 300px;
    animation: fly-ball 4s infinite;
  }
  .divHeader {
    /* display: flex;

    align-items: center; */
    position: relative;
  }
  .priceHeader {
    position: absolute;
    top: 300px;
    right: 450px;
    background-color: blueviolet;
 
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    animation: rorateDiv 4s infinite;
  }
  .featureCenter{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul {
    list-style-type: none;
  }
  .priceDiv{
    text-align:center;
  }
  .ulListe {
    list-style-type: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
   
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
