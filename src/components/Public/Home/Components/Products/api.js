const API_URL = 'http://31.97.142.99:8081/api';

export const getTicketsByLevel = async (level) => {
  const response = await fetch(`${API_URL}/epreuves-sportives/epreuves/by_level/?niveau_epreuve=${encodeURIComponent(level)}`);
  const data = await response.json();
  return data;
};
