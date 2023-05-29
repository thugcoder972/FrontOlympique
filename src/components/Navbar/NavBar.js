import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import AnimateHeight from "react-animate-height";
import {NavLink} from 'react-router-dom';
import Home from "../Home/Home";
import News from "../News/News";
import Top from "../Top/Top";
import ResumeCart from "../Cart/ResumeCart";
import Category from "../Category/Category";
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ShoppingCart } from '@mui/icons-material'

export default function Navbar() {
  const [height, setHeight] = useState(90);
  const [toggleMenuMobile, setToggleMMenuMobile] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);

  const toogleUl = () => {
    setToggleMMenuMobile(!toggleMenuMobile);
  };
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart)
  const toogleMenu = () => {
    if (height == 90) {
      setHeight(250);
      setTimeout(() => {
        setToggleMMenuMobile(true);
      }, 600);
    } else {
      setHeight(90);
      setToggleMMenuMobile(false);
    }
  };

  const getTotalQuantity = () => {
    let total = 0
    cart.forEach(item => {
      total += item.quantity
    })
    return total
  }
  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);
      if (largeur > 622) {
        setHeight(90);
        setToggleMMenuMobile(false);
      }
    };
    window.addEventListener("resize", changeWidth);
    
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);
  return (
    <Wrapper>
      <div className=" row d-flex justify-content-center ">
        <div className="d-flex divMenu">
          <div className="col mt-4">
            {toggleMenuMobile && largeur < 622 && (
              <ul className="ulListeMobile">
            <li>< NavLink to ="/" className={({isActive})=>{return isActive?"activeLink" :"noActiveLink"}}>  Home </NavLink></li> 
            <li><NavLink to ="/news"className={({isActive})=>{return isActive?"activeLink" :"noActiveLink"}}> news </NavLink></li>
            <li><NavLink to ="/Top"className={({isActive})=>{return isActive?"activeLink" :"noActiveLink"}}>Top </NavLink></li>
            <li><NavLink to ="/category"className={({isActive})=>{return isActive?"activeLink" :"noActiveLink"}}>Category</NavLink></li>           
              </ul>
            )}
      <div className='shopping-cart' onClick={() => navigate('/cart')}>
        <ShoppingCart id='cartIcon'/>
        <p>{getTotalQuantity() || 0}</p>
      </div>
      <div className="cartVisible">
      <ResumeCart className="cart"/>     
      </div>
           
    
          </div>

          <AnimateHeight duration={500} height={height}>
            <div className="Menu" onClick={toogleMenu}>
              <span className="spanMenu">Menu</span>
              <RxHamburgerMenu />
            </div>
          </AnimateHeight>
        </div>

        <div className=" ulMenu">
          <ul className="ulListe">
            <li>< NavLink to ="/" className={({isActive})=>{return isActive?"activeLink" :"noActiveLink"}}>  Home </NavLink></li> 
            <li><NavLink to ="/news"className={({isActive})=>{return isActive?"activeLink" :"noActiveLink"}}> news </NavLink></li>
            <li><NavLink to ="/Top"className={({isActive})=>{return isActive?"activeLink" :"noActiveLink"}}>Top </NavLink></li>
            <li><NavLink to ="/category"className={({isActive})=>{return isActive?"activeLink" :"noActiveLink"}}>Category</NavLink></li>          
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
  height: 140px;
  background: #44545c;

  .burgerMenu {
  }
  .ulMenuMobile {
  }
  .ulListeMobile {
    list-style-type: none;
  }
  .ulListe {
    list-style-type: none;
    background: #44545c;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  
 

  .divMenu {
    background: gray;
    /* height: 60px; */
    width: 70%;
  }
  .Menu {
    margin: 10px;
    padding: 10px;
    background: #44545c;
    height: 40px;
    display: none;
  }
  .colorBorder {
    background-color: black;
  }
  .spanMenu {
    padding: 5px;
  }
  .ulMenu {
    width: 75%;
  }
  .activeLink {
    padding: 7px;
    border-bottom: solid 3px #70acac;
    text-decoration:none;
    color: #70acac;
  }
  .noActiveLink{
    text-decoration:none;
    color: white;
    &:hover {
        color: #70acac;
      }
  }
  ul {
    & li {
      width: 40px;
      margin-right: 20px;
      margin-left: 20px;
     
      margin-bottom: 10px;
      color: #e4ecec;
      cursor: pointer;
   
    }
  }
  .shopping-cart {
  background-color: white;
  position: relative;
  padding: 15px;
  border-radius: 100px;
  width:60px;
  left: 103%;
  z-index: 1;
}
.cartVisible{
  visibility:hidden;
}
.shopping-cart:hover + .cartVisible{
  visibility:visible;
}

.cart {
  background-color:white;
  position: absolute;
  height:550px;
  top: 50px;
  right: 80px;
  z-index: 1;
  overflow-y: scroll;
}

.cartVisible:hover{
  visibility:visible;
}


.shopping-cart:active {
  box-shadow: 0 4px 4px gray;
}

#cartIcon{
  color: black;
}

.shopping-cart > p{
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  padding: 0px 6px;
  color: white;
  border-radius: 50px;
}
  @media screen and (max-width: 622px) {
    .burgerMenu {
      display: block;
    }

    .ulListe {
      display: none;
    }

    /* .divMenu {

    height: 260px;
  
  
  } */
    /* .ulListeMobile{
    display: block;
  } */
    .Menu {
      display: block;
    }
  }
`;
