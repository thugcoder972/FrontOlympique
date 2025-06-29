const API_URL = 'https://srv881328.hstgr.cloud/api';

export const getTicketsByLevel = async (level) => {
  const response = await fetch(`${API_URL}/epreuves-sportives/epreuves/by_level/?niveau_epreuve=${encodeURIComponent(level)}`);
  const data = await response.json();
  return data;
};
