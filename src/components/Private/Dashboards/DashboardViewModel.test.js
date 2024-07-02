import { act } from "react-dom/test-utils";
import DashboardViewModel from "./DashboardViewModel";
import { Achat } from "../../../models/AchatModel";
import { Ticket } from "../../../models/TicketModel";
import { autorun } from "mobx";

// Mock des fonctions API
const mockFetchUserAchats = jest.fn();
const mockFetchTicketDetails = jest.fn();

describe("DashboardViewModel", () => {
  let viewModel;
  let user;

  beforeEach(() => {
    user = { token: "dummy-token" };
    viewModel = new DashboardViewModel(user, mockFetchUserAchats, mockFetchTicketDetails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    expect(viewModel.achats).toEqual([]);
    expect(viewModel.tickets).toEqual([]);
    expect(viewModel.loading).toBe(true);
    expect(viewModel.user).toEqual(user);
  });

  it("should load achats and tickets successfully", async () => {
    const achatsData = [
      { id: 1, ticket: 101, nombre_tickets: 2, prix_ticket: "20.00", prix_total: "40.00", date_achat: "2024-01-01", user_acheteur: 1, qr_code: "code1" },
      { id: 2, ticket: 102, nombre_tickets: 1, prix_ticket: "30.00", prix_total: "30.00", date_achat: "2024-01-02", user_acheteur: 1, qr_code: "code2" }
    ];
    const ticketsData = [
      { id: 101, start_time_epreuve: "2024-01-10T10:00:00Z", administration: {}, complexe_sportif: {}, epreuve_sportive: {}, hall: {}, tarifs: [], remaining_places: 100 },
      { id: 102, start_time_epreuve: "2024-01-11T11:00:00Z", administration: {}, complexe_sportif: {}, epreuve_sportive: {}, hall: {}, tarifs: [], remaining_places: 200 }
    ];

    mockFetchUserAchats.mockResolvedValue(achatsData);
    mockFetchTicketDetails.mockResolvedValue(ticketsData);

    await act(async () => {
      await viewModel.loadAchats();
    });

    autorun(() => {
      expect(viewModel.achats).toHaveLength(2);
      expect(viewModel.achats[0]).toBeInstanceOf(Achat);
      expect(viewModel.tickets).toHaveLength(2);
      expect(viewModel.tickets[0]).toBeInstanceOf(Ticket);
      expect(viewModel.loading).toBe(false);
    });
  });

  it("should handle errors during loading achats and tickets", async () => {
    mockFetchUserAchats.mockRejectedValue(new Error("Failed to fetch purchases"));
    mockFetchTicketDetails.mockResolvedValue([]);

    await act(async () => {
      await viewModel.loadAchats();
    });

    autorun(() => {
      expect(viewModel.achats).toEqual([]);
      expect(viewModel.tickets).toEqual([]);
      expect(viewModel.loading).toBe(false);
    });
  });

  it("should return ticket details by ticketId", () => {
    const ticket = new Ticket({ id: 101, start_time_epreuve: "2024-01-10T10:00:00Z", administration: {}, complexe_sportif: {}, epreuve_sportive: {}, hall: {}, tarifs: [], remaining_places: 100 });
    viewModel.tickets = [ticket];

    const result = viewModel.getTicketDetails(101);
    expect(result).toEqual(ticket);
  });

  it("should return empty object if ticketId not found", () => {
    const result = viewModel.getTicketDetails(999);
    expect(result).toEqual({});
  });
});
