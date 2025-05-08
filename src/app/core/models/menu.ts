export interface Menu {
    title: string;
    icon: string;
    route: string;
    access: string[];
    children?: Menu[]; // Ajout des sous-menus
}
