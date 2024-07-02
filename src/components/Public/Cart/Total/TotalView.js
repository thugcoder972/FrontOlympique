import React from 'react';
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { useDependencies } from '../../../../DependencyContext';
import { clearCart } from '../../../../../src/redux/cartSlice';
import { useDispatch } from 'react-redux';

const TotalView = observer(() => {
  const { cartViewModel } = useDependencies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!cartViewModel.user) {
      navigate('/login');
    } else {
      try {
        await cartViewModel.handleCheckout();
        dispatch(clearCart());
        navigate('/confirmation', { state: { cart: cartViewModel.cart, totalPrice: cartViewModel.totalPriceWithTax } });
      } catch (error) {
        console.error("Erreur lors de la création des achats", error);
      }
    }
  };

  return (
    <Wrapper>
      <div className="total">
        <h4>Orders Summary</h4>
        <div className="trait"></div>
        <div className="height"></div>
        <div className="row">
          <div className="col">
            <p className="total__p">
              Cart Subtotal HT ({cartViewModel.totalQuantity} items)
            </p>
          </div>
          <div className="col-6 col-sm-4">
            <p className="total__p">
              <strong>${cartViewModel.totalPrice}</strong>
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
              <strong>${((cartViewModel.totalPrice * 20) / 100)}</strong>
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
              <strong>${cartViewModel.totalPriceWithTax}</strong>
            </p>
          </div>
        </div>

        <button type="button" className="btn btn-success" onClick={handleCheckout}>Proceed to checkOut</button>
      </div>
      <div className="height"></div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
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

export default TotalView;
