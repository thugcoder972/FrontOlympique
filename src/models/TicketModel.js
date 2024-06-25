export class Ticket {
    constructor(id, start_time_epreuve, administration, complexe_sportif, epreuve_sportive, hall, tarifs, remaining_places) {
        this.id = id;
        this.start_time_epreuve = start_time_epreuve;
        this.administration = administration;
        this.complexe_sportif = complexe_sportif;
        this.epreuve_sportive = epreuve_sportive;
        this.hall = hall;
        this.tarifs = tarifs;
        this.remaining_places = remaining_places;
    }
}
