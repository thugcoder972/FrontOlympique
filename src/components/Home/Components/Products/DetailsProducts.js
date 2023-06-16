import styled from "styled-components";
import { useLocation } from "react-router-dom";
import {addToCart} from '../../../../redux/cartSlice';
import { useDispatch } from 'react-redux';
export default function DetailsProducts({route}) {
    const { state } = useLocation();
    const dispatch = useDispatch()
    console.log(state);
  return (

    <Wrapper>
  
        <div className=" principalDetails ">
          
          
            <div className="row ">
            <div className="col  m-4 right ">
            <img className="imageEncadrement " width={530} src={state.image} alt="" />
            </div>
            <div className="col center">
            <h1>{state.title}</h1>
            <h2>{state.price} $</h2>
            <p>{state.description}</p>
            <button className="btn btn-primary p-2 m-2 activeButton"
            onClick={() => 
            dispatch(addToCart(
                state.id, state.title, state.image, state.price
            ))
            }>Add to Cart
            </button>
            </div>
            </div>
            </div>
         

    </Wrapper>
  )
}
const Wrapper=styled.div `
.backg{
    background-color: black;
}
.imageEncadrement{
    border-style: solid;
    border-width: 1px;
    border-color: black;
    padding: 10px;
    border-radius: 10px;
   
   
}
.center{
    text-align: start;
    margin-top: auto;
    margin-bottom: auto;
}

.right{
    text-align: end;
   
}

`;