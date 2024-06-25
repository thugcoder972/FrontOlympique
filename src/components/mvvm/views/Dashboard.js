// components/Dashboard.js
import React from 'react';
import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import { useDashboardViewModel } from '../../viewmodels/DashboardViewModel';

const Dashboard = () => {
  const { achats, loading, getTicketDetails, colors } = useDashboardViewModel();

  if (loading) {
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
          const qrCodeData = JSON.stringify({
            ticketId: achat.ticket,
            userId: achat.user_acheteur,
            purchaseId: achat.id,
          });
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
              <QRCodeCanvas value={qrCodeData} size={128} />
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
