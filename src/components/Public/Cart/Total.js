import styled from "styled-components";
import {useSelector} from 'react-redux'


 

export default function Total() {
const cart = useSelector((state) => state.cart);
let taxe = 20

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
 <div className="total ">
      <h4>Orders Sumary</h4>
      <div className="trait"></div>
      <div className="height"></div>
<div className="row">
      <div className="col">
        <p className="total__p">
        Cart Subtotal HT ({getTotal().totalQuantity} items) 

        </p>
      </div>
      <div className="col-6 col-sm-4">
        <p className="total__p">

           <strong>${getTotal().totalPrice}</strong>
        </p>
      </div>
  </div>

  <div className="trait"></div>
  <div className="row">
      <div className="col">
      <p className="total__p">
        Taxe (20%) 
         
        </p>
      </div>
      <div className="col-6 col-sm-4">
        <p className="total__p">

        <strong>${((getTotal().totalPrice * taxe)/100)}</strong>
        </p>
      </div>
  </div>

  <div className="trait"></div>

  <div className="row">
      <div className="col">
      <p className="total__p">
      Shipping
         
        </p>
      </div>
      <div className="col-6 col-sm-4">
        <p className="total__p">

        <strong>free shipping</strong>
        </p>
      </div>
  </div>

  <div className="trait"></div>

  <div className="row">
      <div className="col">
      <p className="total__p">
      Total TTC
         
        </p>
      </div>
      <div className="col-6 col-sm-4">
        <p className="total__p">

        <strong>${((getTotal().totalPrice * taxe)/100) + getTotal().totalPrice}</strong>
        </p>
      </div>
  </div>

  <button type="button" class="btn btn-success">Proceed to checkOut</button>
    </div>
    <div className="height"></div>

    </Wrapper>
  )
}
const Wrapper=styled.div `

.total{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid #000;
  margin-bottom:10px;
  padding: 20px;
  background: white;
  border-radius: 3px;
  min-width: 350px;
}

.total > h2{
  font-weight: 400;
}
.height{
  height:10px;
}
.total__p{
  font-size: 20px;
  font-weight: 450;
  color: rgb(72, 77, 77);
}
.trait{
  border-top: 1px solid #000;
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