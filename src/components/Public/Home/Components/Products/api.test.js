import { getTicketsByLevel } from './api';

describe('API functions', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('getTicketsByLevel fetches tickets by level', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ data: 'mockData' }),
    };
    global.fetch.mockResolvedValue(mockResponse);

    const data = await getTicketsByLevel('level1');

    expect(global.fetch).toHaveBeenCalledWith('https://backend-strapi.online/api.jeuxolympiques.com/api/epreuves/by_level/?niveau_epreuve=level1');
    expect(mockResponse.json).toHaveBeenCalled();
    expect(data).toEqual({ data: 'mockData' });
  });
});
