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

// export default DashboardViewModel;
import { makeAutoObservable, runInAction } from "mobx";
import { Achat } from "../../../models/AchatModel";
import { Ticket } from "../../../models/TicketModel";

class DashboardViewModel {
    achats = [];
    tickets = [];
    loading = true;
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
        this.loadAchats();
    }

    async createAchat(achatData) {
        if (!this.user) return;

        try {
            await this.fetchCreateAchat(this.user.token, achatData);
            await this.loadAchats(); // Recharge les achats pour les afficher à jour
        } catch (error) {
            console.error("Erreur lors de la création d'un achat", error);
        }
    }

    async loadAchats() {
        if (!this.user) {
            runInAction(() => {
                this.loading = false;
            });
            return;
        }

        try {
            // On utilise maintenant l'ID utilisateur si disponible
            const userId = this.user.id; // Supposons que l'objet user contient un id
            const achatsData = await this.fetchUserAchats(this.user.token, userId);
            
            const achats = achatsData.map(achat => new Achat(achat));

            // Récupération des tickets
            const ticketIds = achats.flatMap(achat => 
                achat.tickets ? achat.tickets.map(t => t.id) : []
            ).join(',');
            
            if (ticketIds) {
                const ticketsData = await this.fetchTicketDetails(this.user.token, ticketIds);
                const tickets = ticketsData.map(ticket => new Ticket(ticket));
                
                runInAction(() => {
                    this.tickets = tickets;
                });
            }

            runInAction(() => {
                this.achats = achats;
                this.loading = false;
                console.log("Loaded data", this.achats, this.tickets);
            });
            
        } catch (error) {
            console.error("Failed to load data", error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    getTicketDetails(ticketId) {
        return this.tickets.find(ticket => ticket.id === ticketId) || {};
    }
}

export default DashboardViewModel;