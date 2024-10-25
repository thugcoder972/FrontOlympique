// src/components/Carousel/views/components/Card.js

import React from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Card({ id, image, catetypeEpreuveg,title, niveauEpreuve, hallComplexe }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="card positionrelative">
        <img src={image} alt={title} onClick={() => navigate('/DetailsProducts', {
          state: { id, image, catetypeEpreuveg,title, niveauEpreuve,hallComplexe }
        })} />
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="titleVignette">
                {title}
              </div>
            </div>
            <div className="col col-lg-3">
              <div className="titleVignette">
  
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .positionrelative {
    position: relative;
  }
  width: 30rem;
  .activeButton {
    display: none;
  }
  .titleVignette {
    font-size: 12px;
    padding: 5px 10px;
    border: 2px solid black;
    display: inline-block;
    border-radius: 5px;
    color: black;
  }
  .card:hover .activeButton {
    display: block;
    position: absolute;
    transform: rotate(360deg);
    animation-name: in;
    animation-duration: 2s;
    animation-iteration-count: 1;
  }
  @keyframes in {
    100% {
      transform: rotate(0deg);
    }
  }
`;
