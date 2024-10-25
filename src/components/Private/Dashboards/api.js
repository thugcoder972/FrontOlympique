// api.js
export async function fetchUserAchats(token) {
    const response = await fetch('http://localhost:8081/api/epreuves-sportives/api/user-achats/', {
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
    const response = await fetch(`http://localhost:8081/api/epreuves-sportives/api/ticket-details/${ticketIds}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch ticket details');
    }
    return await response.json();
}
