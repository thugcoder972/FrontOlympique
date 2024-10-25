// src/components/Carousel/views/components/CategoryCard.js

import React from 'react';
import styled from 'styled-components';

const CategoryCard = ({ category }) => (
  <Card>
    <img src={category.image_url} alt={category.type_epreuve_sportive} />
    <CardTitle>
      <div className="card-body">
        {category.type_epreuve_sportive}
      </div>
    </CardTitle>
  </Card>
);

const Card = styled.div`
  .card-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 400px;
    height: 350px;
    object-fit: cover;
  }
`;

const CardTitle = styled.h5`
  padding: 5px 10px;
  border:1px solid black;
  display: inline-block;
  border-radius: 5px;
  color: black;
`;

export default CategoryCard;
