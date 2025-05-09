import { Auteur } from "./auteur";

export interface Livre {
    id?: number;
    nom: string;
    titre: string;
    isbn: number;  // Changé en number pour correspondre au backend
    langue: string;
    nbrePage: number;
    auteurId?: number;
    auteur?: Auteur;
}
