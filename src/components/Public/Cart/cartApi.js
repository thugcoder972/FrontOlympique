// cartApi.js
export async function createAchat(token, item, userId) {
  const response = await fetch('https://srv881328.hstgr.cloud/api/achats/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          user: userId,
          ticketIds: [item.id],
          dateAchat: new Date().toISOString()
      })
  });

  if (!response.ok) {
      const errorData = await response.json();
      console.error('Create Achat Error:', errorData);
      throw new Error('Failed to create purchase: ' + JSON.stringify(errorData));
  }

  return await response.json();
}
