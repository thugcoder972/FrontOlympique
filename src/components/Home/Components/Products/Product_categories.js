import styled from "styled-components";
import Product from "./Product";
import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrail, animated } from "react-spring";
import ModelProducts from "../Products/Component/Model_products.js";
import { v4 as uuidv4 } from "uuid";
import Card from "./Component/Card";
import { Waypoint } from "react-waypoint";

export default function Product_categories() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  const [filterGallery, setFilterGallery] = useState(ModelProducts);
  const [toggleTxt, setToggleTxt] = useState(false);
  const trail = useTrail(filterGallery.length, {
    duration: 15000,
    from: {
      opacity: toggleTxt ? 0 : null,
      x: toggleTxt ? 30 : null,
    },
    to: {
      opacity: toggleTxt ? 1 : null,
      x: toggleTxt ? 0 : null,
    },
  });

  const selectGallery = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const newArr = [...ModelProducts];
    // console.log(Gallery)
    const newGallery = newArr.filter((item) => {
      if (e.target.value === "All") {
        return ModelProducts;
      }
      return item.category === e.target.value;
    });
    // console.log(e.target.value)
    setFilterGallery(newGallery);
  };
  return (
    <Wrapper>
      <h1 className="m-4 p-4 text-center">ALL PRODUCTS </h1>
      <div className="widthUl">
        <ul className="ulListe">
          <li className="m-3">
            <button
              onClick={selectGallery}
              value="All"
              className="btn btn-dark m-2"
            >
              All
            </button>
          </li>
          <li className="m-3">
            <button
              onClick={selectGallery}
              value="Tops"
              className="btn btn-dark m-2"
            >
              Top
            </button>
          </li>
          <li className="m-3">
            <button
              className="btn btn-dark  m-2"
              onClick={selectGallery}
              value="JumpSuit"
            >
              JumSuit
            </button>
          </li>
          <li className="m-3">
            <button
              className="btn btn-dark  m-2"
              onClick={selectGallery}
              value="JumpSuit"
            >
              Lingerie
            </button>
          </li>
          <li className="m-3">
            <button
              className="btn btn-dark  m-2"
              onClick={selectGallery}
              value="jeans"
            >
              Jeans
            </button>
          </li>
          <li className="m-3">
            <button
              className="btn btn-dark  m-2"
              onClick={selectGallery}
              value="Dresses"
            >
              Dresses
            </button>
          </li>
          <li className="m-3">
            <button
              className="btn btn-dark  m-2"
              onClick={selectGallery}
              value="Jumpers"
            >
              Jumpers
            </button>
          </li>
          <li className="m-3">
            <button
              className="btn btn-dark  m-2"
              onClick={selectGallery}
              value="JumpSuit"
            >
              Leggins
            </button>
          </li>
        </ul>
      </div>
      <div className="selectProduct">
      <select className="select"   onClick={selectGallery}>
        <option value="All">All</option>
        <option value="JumpSuit">JumpSuit</option>
        <option value="Tops">Tops</option>
        <option value="jeans">jeans</option>
        <option value="Dresses">Dresses</option>
        <option value="Jumpers">Jumpers</option>
        <option value="JumpSuit">JumpSuit</option>
      </select>
      </div>
      <div className="featureCenter">
        <div className="container">
          <div className="ListProdcuts">
            <Waypoint
              bottomOffset="70%"
              onEnter={() => {
                setToggleTxt(true);
              }}
            />
            {trail.map((cardStyle, index) => {
              return (
                <animated.div key={uuidv4()} style={cardStyle}>
                  <div className="CardProducts">
                    <animated.div>
                      <Card
                        key={index}
                        id={filterGallery[index].id}
                        image={filterGallery[index].image}
                        category={filterGallery[index].category}
                        price={filterGallery[index].price}
                        title={filterGallery[index].title}
                        description={filterGallery[index].description}
                        adresseWeb={filterGallery[index].adresseWeb}
                      />
                    </animated.div>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>

        <div className="shopping-cart" onClick={() => navigate("/cart")}>
          <ShoppingCart id="cartIcon" />
          <p>{getTotalQuantity() || 0}</p>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .ulListe {
    list-style-type: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .featureCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ListProdcuts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 50px;
  }
  .CardProducts {
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #70acac;
    margin: 15px;
    opacity: 1;
  }
  .photoProducts {
    padding: 20px;
    margin: 0 auto;
    border-radius: 15px;
  }
  .selectProduct{
    display: none;
 

  }
  @media(max-width: 950px){
    .ulListe{
      display: none;
    }
    .selectProduct{
    display: flex;
    justify-content: center;
    align-items: center;

  }
  }
`;
