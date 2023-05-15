import styled from "styled-components";
import { useDispatch } from 'react-redux';
import {addToCart} from '../../../../../redux/cartSlice';

export default function Card({id,image,category,price,title,description,adresseWeb}) {
  const dispatch = useDispatch()
  return (
    <Wrapper>
   <div className="card" >
    <img src={image} alt="" />
  <div class="card-body">
    <div className="row">
    <div className="col">
    {title}
   </div>
   <div className="col col-lg-3">
    ${price}
   </div>
    </div>
  
  </div>
  <button 
        onClick={() => 
          dispatch(addToCart({
            id, title, image, price
          }))
        }>Add to Cart
    </button>
  </div>
        
    </Wrapper>
  )
}
const Wrapper=styled.div `

width: 18rem;
`;