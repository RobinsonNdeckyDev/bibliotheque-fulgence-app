export interface Livre {
    id?: number,
    nom: string,
    titre: string,
    isbn: number,
    langue: string,
    nbrePage: number,
    auteurId?: number,
    auteur?: {
        id: number;
        nom: string;
        prenom: string;
    };
}