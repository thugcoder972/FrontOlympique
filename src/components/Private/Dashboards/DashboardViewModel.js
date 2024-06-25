// src/components/Dashboard/DashboardViewModel.js
import { makeAutoObservable } from "mobx";
import { Achat } from "../../../models/AchatModel";
import { Ticket } from "../../../models/TicketModel";

class DashboardViewModel {
    achats = [];
    tickets = [];
    loading = true;
    user = null;
    fetchUserAchats;
    fetchTicketDetails;

    constructor(user, fetchUserAchats, fetchTicketDetails) {
        makeAutoObservable(this);
        this.user = user;
        this.fetchUserAchats = fetchUserAchats;
        this.fetchTicketDetails = fetchTicketDetails;
    }

    async loadAchats() {
        if (!this.user) {
            this.loading = false;
            return;
        }

        try {
            const achatsData = await this.fetchUserAchats(this.user.token);
            this.achats = achatsData.map(achat => new Achat(achat));

            const ticketIds = achatsData.map(achat => achat.ticket).join(',');
            const ticketsData = await this.fetchTicketDetails(this.user.token, ticketIds);
            this.tickets = ticketsData.map(ticket => new Ticket(ticket));
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            this.loading = false;
        }
    }

    getTicketDetails(ticketId) {
        return this.tickets.find(ticket => ticket.id === ticketId) || {};
    }
}

export default DashboardViewModel;
