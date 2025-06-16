// import { makeAutoObservable, runInAction } from "mobx";
// import { Achat } from "../../../models/AchatModel";
// import { Ticket } from "../../../models/TicketModel";




// class DashboardViewModel {
//     achats = [];
//     tickets = [];
//     loading = true;
//     user = null;
//     fetchUserAchats;
//     fetchTicketDetails;

//     constructor(user, fetchUserAchats, fetchTicketDetails, fetchCreateAchat) {
//         makeAutoObservable(this);
//         this.user = user;
//         this.fetchUserAchats = fetchUserAchats;
//         this.fetchTicketDetails = fetchTicketDetails;
//         this.loadAchats();
//         this.fetchCreateAchat = fetchCreateAchat;
//     }


// async createAchat(achatData) {
//   if (!this.user) return;

//   try {
//     await this.fetchCreateAchat(this.user.token, achatData);
//     await this.loadAchats(); // Recharge les achats pour les afficher à jour
//   } catch (error) {
//     console.error("Erreur lors de la création d'un achat", error);
//   }
// }



//     async loadAchats() {
//         if (!this.user) {
//             runInAction(() => {
//                 this.loading = false;
//             });
//             return;
//         }

//         try {
//             const achatsData = await this.fetchUserAchats(this.user.token);
//             const achats = achatsData.map(achat => new Achat(achat));

//             const ticketIds = achatsData.map(achat => achat.ticket).join(',');
//             const ticketsData = await this.fetchTicketDetails(this.user.token, ticketIds);
//             const tickets = ticketsData.map(ticket => new Ticket(ticket));

//             runInAction(() => {
//                 this.achats = achats;
//                 this.tickets = tickets;
//                 this.loading = false;
//                 console.log("Loaded data", this.achats, this.tickets);
                
//             });
//         } catch (error) {
//             console.error("Failed to load data", error);
//             runInAction(() => {
//                 this.loading = false;
//             });
//         }
//     }

//     getTicketDetails(ticketId) {
//         return this.tickets.find(ticket => ticket.id === ticketId) || {};
//     }
// }

import { makeAutoObservable, runInAction } from "mobx";
import { Achat } from "../../../models/AchatModel";
import { Ticket } from "../../../models/TicketModel";

class DashboardViewModel {
    achats = [];
    tickets = [];
    loading = true;
    error = null;
    user = null;
    fetchUserAchats;
    fetchTicketDetails;
    fetchCreateAchat;

    constructor(user, fetchUserAchats, fetchTicketDetails, fetchCreateAchat) {
        makeAutoObservable(this);
        this.user = user;
        this.fetchUserAchats = fetchUserAchats;
        this.fetchTicketDetails = fetchTicketDetails;
        this.fetchCreateAchat = fetchCreateAchat;
        this.initialize();
    }

    initialize() {
        this.loadAchats();
    }

    async createAchat(achatData) {
        if (!this.user?.token) {
            this.setError("Utilisateur non authentifié");
            return;
        }

        try {
            this.setLoading(true);
            await this.fetchCreateAchat(this.user.token, achatData);
            await this.loadAchats(); // Recharge les données après création
        } catch (error) {
            this.setError(`Échec création achat: ${error.message}`);
        } finally {
            this.setLoading(false);
        }
    }

    async loadAchats() {
        if (!this.user?.token) {
            this.setError("Token utilisateur manquant");
            this.setLoading(false);
            return;
        }

        try {
            this.setLoading(true);
            this.clearError();

            // 1. Récupération des achats
            const achatsData = await this.fetchUserAchats(this.user.token);
            console.debug("Achats chargés:", achatsData);

            if (!achatsData?.length) {
                runInAction(() => {
                    this.achats = [];
                    this.tickets = [];
                });
                return;
            }

            // 2. Extraire les IDs des tickets
            const ticketIds = achatsData
                .map(achat => achat.ticket)
                .filter(Boolean);

            let tickets = [];
            if (ticketIds.length > 0) {
                tickets = await this.loadTickets(ticketIds);
            }

            // 3. Mise à jour du state
            runInAction(() => {
                this.achats = achatsData.map(a => new Achat(
                    a.id,
                    a.ticket,
                    a.nombre_tickets,
                    a.prix_ticket,
                    a.prix_total,
                    a.date_achat,
                    a.user_acheteur,
                    a.qr_code
                ));
                this.tickets = tickets;
            });

        } catch (error) {
            this.setError(`Erreur chargement: ${error.message}`);
        } finally {
            this.setLoading(false);
        }
    }

    async loadTickets(ticketIds) {
        try {
            const ticketsData = await this.fetchTicketDetails(
                this.user.token,
                ticketIds.join(',')
            );
            return ticketsData.map(t => new Ticket(t));
        } catch (error) {
            console.error("Erreur chargement tickets:", error);
            return [];
        }
    }

    getTicketDetails(ticketId) {
        return this.tickets.find(t => t.id === ticketId) || {};
    }

    // Helpers
    setLoading(state) {
        runInAction(() => {
            this.loading = state;
        });
    }

    setError(message) {
        runInAction(() => {
            this.error = message;
        });
    }

    clearError() {
        runInAction(() => {
            this.error = null;
        });
    }
}

export default DashboardViewModel;
