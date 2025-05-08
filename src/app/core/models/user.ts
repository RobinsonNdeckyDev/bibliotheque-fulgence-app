export interface User {
    id?: number;
    email: string;
    password: string;
    prenom: string;
    nom: string;
    adresse: string;
    telephone: string;
    photo_profil: string;
    description: string;
    role: "MEMBRE" | "ADMIN" | "SUPER_ADMIN" | "AUTEUR"| "ETUDIANT" | "FORMATEUR" | "PARTENAIRE";
    userId: number;
    token?: string;
    etat: "actif";
}
