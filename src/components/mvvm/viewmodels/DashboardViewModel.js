// viewmodels/DashboardViewModel.js
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../Contexts/authContext';
import AchatModel from '../models/AchatModel';
import { useNavigate } from 'react-router-dom';

export const useDashboardViewModel = () => {
  const [achats, setAchats] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const colors = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFA07A', '#D3D3D3', '#FFD700'];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const achatsData = await AchatModel.fetchAchats(user.token);
        setAchats(achatsData);

        const ticketIds = achatsData.map(achat => achat.ticket).join(',');
        const ticketsData = await AchatModel.fetchTicketDetails(user.token, ticketIds);
        setTickets(ticketsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const getTicketDetails = (ticketId) => {
    return tickets.find(ticket => ticket.id === ticketId) || {};
  };

  return { achats, tickets, loading, getTicketDetails, colors };
};
