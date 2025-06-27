
export async function createAchat(token, achatData) {
  const response = await fetch('http://31.97.142.99:8081/api/achats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(achatData),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création d'un achat");
  }
  return await response.json();
}

// Nouvelle version plus flexible de fetchUserAchats
export async function fetchUserAchats(token, userId = null) {
    console.log("TOKEN utilisé pour fetchUserAchats:", token);

    // Construire l'URL en fonction des paramètres
    const url = userId 
        ? `http://31.97.142.99:8081/api/achats/by-user?userId=${userId}`
        : 'http://31.97.142.99:8081/api/achats/by-user';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch purchases');
    }
    return await response.json();
}

export async function fetchTicketDetails(token, ticketIds) {
    const response = await fetch(`http://31.97.142.99:8081/api/tickets/ticket-details/${ticketIds}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch ticket details');
    }
    return await response.json();
}