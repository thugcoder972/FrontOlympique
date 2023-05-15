import styled from "styled-components";
import {useSelector} from 'react-redux'


 

export default function Total() {
const cart = useSelector((state) => state.cart);
const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart.forEach(item => {
      totalQuantity += item.quantity
      totalPrice += item.price * item.quantity
    })
    return {totalPrice, totalQuantity}
  }
  return (
    <Wrapper>
 <div className="total">
      <h2>ORDER SUMMARY</h2>
      <div>
        <p className="total__p">
          total ({getTotal().totalQuantity} items) 
          : <strong>${getTotal().totalPrice}</strong>
        </p>
      </div>
    </div>
    </Wrapper>
  )
}
const Wrapper=styled.div `

.total{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 270px;
  height: 110px;
  padding: 20px;
  background: white;
  border-radius: 3px;
  min-width: 350px;
}

.total > h2{
  font-weight: 400;
}

.total__p{
  font-size: 20px;
  font-weight: 450;
  color: rgb(72, 77, 77);
}

.total > button:active{
  background-color: unset;
  border: 1px solid #FFD814;
}

@media(max-width:800px){
  .total{
    width: unset;
    text-align: center;
  }
}

@media(max-width:900px){
  .total{
    min-width: unset;
  }
}
`;