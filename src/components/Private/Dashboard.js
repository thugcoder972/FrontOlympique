import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Contexts/authContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Dashboard = () => {
  const [achats, setAchats] = useState([]);
  const [tickets, setTickets] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchats = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/user-achats/', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch purchases');
        }
        const data = await response.json();
        setAchats(data);

        const ticketIds = data.map(achat => achat.ticket).join(',');
        const ticketResponse = await fetch(`http://127.0.0.1:8000/api/ticket-details/${ticketIds}/`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!ticketResponse.ok) {
          throw new Error('Failed to fetch ticket details');
        }
        const ticketData = await ticketResponse.json();
        setTickets(ticketData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAchats();
  }, [user, navigate]);

  const getTicketDetails = (ticketId) => {
    return tickets.find(ticket => ticket.id === ticketId) || {};
  };

  const colors = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFA07A', '#D3D3D3', '#FFD700'];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Header>Dashboard</Header>
      <SectionTitle>Tickets achetés</SectionTitle>
      <div className="achats-list">
        {achats.map((achat, index) => {
          const ticketDetails = getTicketDetails(achat.ticket);
          const color = colors[index % colors.length];
          return (
            <div key={index} className="achat-item" style={{ backgroundColor: color }}>
              <img src="https://cdn.pixabay.com/photo/2016/07/22/16/39/olympia-1535220_1280.png" alt="Olympic Logo" className="olympic-logo" />
              <h2>Ticket des Jeux Olympiques</h2>
              <p><strong>Epreuve:</strong> {ticketDetails.epreuve_sportive?.name_epreuve_sportive || 'N/A'}</p>
              <p><strong>Niveau:</strong> {ticketDetails.epreuve_sportive?.niveau_epreuve || 'N/A'}</p>
              <p><strong>Complexe:</strong> {ticketDetails.complexe_sportif?.name_complexe || 'N/A'}</p>
              <p><strong>Tarif:</strong> {ticketDetails.tarifs?.[0]?.name_tarif || 'N/A'}</p>
              <p><strong>Nombre de tickets:</strong> {achat.nombre_tickets}</p>
              <p><strong>Prix total:</strong> ${achat.prix_total}</p>
            </div>
          );
        })}
      </div>
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

  .achats-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    max-width: 800px;
  }

  .achat-item {
    flex: 1 1 calc(50% - 20px);
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    position: relative;
    
    &:hover {
      transform: translateY(-5px);
    }

    .olympic-logo {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 50px;
      height: 50px;
    }

    h2 {
      margin-bottom: 10px;
      font-size: 1.5em;
      color: #333;
    }

    p {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.5;
    }
  }
`;

const Header = styled.h1`
  font-size: 2.5em;
  color: #ffffff;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: #ffffff;
  margin-bottom: 20px;
`;

export default Dashboard;
