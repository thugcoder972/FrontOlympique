export class Achat {
    constructor(id, ticket, nombre_tickets, prix_ticket, prix_total, date_achat, user_acheteur, qr_code) {
        this.id = id;
        this.ticket = ticket;
        this.nombre_tickets = nombre_tickets;
        this.prix_ticket = prix_ticket;
        this.prix_total = prix_total;
        this.date_achat = date_achat;
        this.user_acheteur = user_acheteur;
        this.qr_code = qr_code;
    }
}
