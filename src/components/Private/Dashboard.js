import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Contexts/authContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user-profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchUserPurchases = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user-achats/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        setUserPurchases(data);
      } catch (error) {
        console.error('Failed to fetch user purchases:', error);
      }
    };

    if (user) {
      fetchUserData();
      fetchUserPurchases();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {userData.username}</h2>
      <p>Email: {userData.email}</p>
      <p>Phone: {userData.tel}</p>
      <button onClick={handleLogout}>Logout</button>

      <h2>Your Purchases</h2>
      {userPurchases.length > 0 ? (
        <ul>
          {userPurchases.map((purchase) => (
            <li key={purchase.id}>
              <p>Ticket ID: {purchase.ticket.id}</p>
              <p>Event: {purchase.ticket.epreuve_sportive.name_epreuve_sportive}</p>
              <p>Complex: {purchase.ticket.complexe_sportif.name_complexe}</p>
              <p>Hall: {purchase.ticket.hall.name}</p>
              <p>Price: {purchase.prix_total} EUR</p>
              <p>Date of Purchase: {new Date(purchase.date_achat).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No purchases found.</p>
      )}
    </div>
  );
};

export default Dashboard;