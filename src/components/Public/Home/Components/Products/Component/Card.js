import styled from "styled-components";
import { useDispatch } from 'react-redux';
import {addToCart} from '../../../../../../redux/cartSlice';
import {useNavigate} from 'react-router-dom';
export default function Card({id,image,category,price,title,description,adresseWeb}) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  return (
    <Wrapper>
    <div className="card positionrelative"  >
    <img src={image} alt="" onClick={() => navigate('/DetailsProducts', {
   state:{ id: id,
    image: image,
    category: category,
    price: price,
    title: title,
    description: description,
    adresseWeb: adresseWeb
}})}/>
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
  <button className="btn btn-primary p-2 m-2 activeButton"
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
.positionrelative{
  position: relative;
}
width: 18rem;
.activeButton{
  display: none;
}
.card:hover .activeButton{
  display: block;
  position: absolute;
  transform: rotate(360deg);
  animation-name: in;
   animation-duration:2s;
   animation-iteration-count:1;
}
@keyframes in {
    100% {
      transform: rotate(0deg);
    }
  }
`;