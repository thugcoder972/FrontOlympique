import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import AnimateHeight from "react-animate-height";
import {NavLink} from 'react-router-dom';
import Home from "../Home/Home";
import News from "../News/News";
import Top from "../Top/Top";
import Category from "../Category/Category";

export default function Navbar() {
  const [height, setHeight] = useState(90);
  const [toggleMenuMobile, setToggleMMenuMobile] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);

  const toogleUl = () => {
    setToggleMMenuMobile(!toggleMenuMobile);
  };

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
