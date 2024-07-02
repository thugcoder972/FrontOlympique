// cartApi.js
export async function createAchat(token, item, userId) {
  const response = await fetch('https://backend-strapi.online/api.jeuxolympiques.com/api/achats/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          ticket: item.id,
          nombre_tickets: item.quantity,
          prix_ticket: item.price,
          prix_total: item.price * item.quantity,
          user_acheteur: userId
      })
  });

  if (!response.ok) {
      const errorData = await response.json();
      console.error('Create Achat Error:', errorData);
      throw new Error('Failed to create purchase: ' + JSON.stringify(errorData));
  }

  return await response.json();
}
