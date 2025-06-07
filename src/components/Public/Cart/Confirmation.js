import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Confirmation = () => {
  const location = useLocation();
  const state = location.state || {}; // Ajouter une vérification de l'état
  const { cart = [], totalPrice = 0 } = state;

  return (
    <Wrapper>
      <Header>Merci pour votre achat </Header>
      <Message>votre commande est bien confirmé vous pouvez voir votre historique d'achat dans le dashboard.</Message>
      <SectionTitle>Order Summary</SectionTitle>
      <OrderList>
        {cart.map((item, index) => (
          <OrderItem key={index}>
            {item.title} - {item.quantity} x ${item.price.toFixed(2)}
          </OrderItem>
        ))}
      </OrderList>
      <TotalPrice>Total Price: ${totalPrice.toFixed(2)}</TotalPrice>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #808080;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  font-size: 2.5em;
  color: #ffffff;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.2em;
  color: #ffffff;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: #ffffff;
  margin-bottom: 20px;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const OrderItem = styled.li`
  margin: 10px 0;
  font-size: 1.1em;
  color: #333;
`;

const TotalPrice = styled.p`
  font-size: 1.5em;
  color: #ffffff;
  margin-top: 20px;
`;

export default Confirmation;
