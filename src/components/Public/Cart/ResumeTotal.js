import styled from "styled-components";
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../Contexts/authContext';

export default function ResumeTotal() {
  const cart = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const taxe = 20;

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  const handleCheckout = async () => {
    console.log('user', user);
    if (!user) {
      
      navigate('/login');
    } else {
      try {
        for (const item of cart) {
          const response = await fetch('https://backend-strapi.online/api.jeuxolympiques.com/api/achats/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({
              ticket: item.id,
              nombre_tickets: item.quantity,
              prix_ticket: item.price,
              prix_total: item.price * item.quantity
            })
          });

          if (!response.ok) {
            throw new Error('Failed to create purchase');
          }
        }

        // Redirection après validation
        navigate('/confirmation');
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
              <strong>${((getTotal().totalPrice * taxe) / 100)}</strong>
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
              <strong>Free</strong>
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
              <strong>${((getTotal().totalPrice * taxe) / 100) + getTotal().totalPrice}</strong>
            </p>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-success" onClick={handleCheckout}>Proceed to checkOut</button>
      <div className="height"></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .total {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid #000;
    margin-bottom: 10px;
    padding: 20px;
    background: white;
    border-radius: 3px;
    min-width: 350px;
  }

  .total > h2 {
    font-weight: 200;
  }

  .height {
    height: 10px;
  }

  .total__p {
    font-size: 15px;
    font-weight: 450;
    color: rgb(72, 77, 77);
  }

  .trait {
    border-top: 1px solid #000;
  }

  .total > button:active {
    background-color: unset;
    border: 1px solid #FFD814;
  }

  @media (max-width: 800px) {
    .total {
      width: unset;
      text-align: center;
    }
  }

  @media (max-width: 900px) {
    .total {
      min-width: unset;
    }
  }
`;