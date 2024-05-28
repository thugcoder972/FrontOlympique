// src/components/Public/Home/Components/Carousel/api.test.js
import { getCategories, getTicketsByCategory, getTicketsByLevel } from './api';

const API_URL = 'https://backend-strapi.online/api.jeuxolympiques.com/api';

describe('API functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getCategories fetches categories', async () => {
    const data = await getCategories();
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/epreuves/categories/`);
    expect(data).toEqual([]);
  });

  test('getTicketsByCategory fetches tickets by category', async () => {
    const category = 'football';
    const data = await getTicketsByCategory(category);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/tickets/by_category/?type_epreuve_sportive=${category}`);
    expect(data).toEqual([]);
  });

  test('getTicketsByLevel fetches tickets by level', async () => {
    const niveau = 'high';
    const data = await getTicketsByLevel(niveau);
    expect(fetch).toHaveBeenCalledWith(`https://backend-strapi.online/api.jeuxolympiques.com/api/epreuves/by_level/?niveau_epreuve=${niveau}`);
    expect(data).toEqual([]);
  });
});
