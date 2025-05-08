import { inject, Injectable } from '@angular/core';
import { Menu } from '../../models/menu';
import { AuthService } from '../authService/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
    /**
     * Liste complète des menus disponibles (non mutée)
     */
    private readonly allMenus: Menu[] = [
        // Admin menus
        {
            title: 'Dashboard',
            route: '/dash-admin',
            icon: 'bi bi-speedometer',
            access: ['SUPER_ADMIN', 'ADMIN'],
        },
        {
            title: 'Auteur',
            route: 'auteurs',
            icon: 'pi pi-users',
            access: ['SUPER_ADMIN', 'ADMIN'],
        },
        {
            title: 'Livres',
            route: 'livres',
            icon: 'pi pi-megaphone',
            access: ['SUPER_ADMIN', 'ADMIN'],
        },

        // Auteur menus
        {
            title: 'Dashboard',
            route: '/dash-auteur',
            icon: 'bi bi-speedometer',
            access: ['AUTEUR'],
        },
    ];


    private authService = inject(AuthService);
    private router = inject(Router)

    /**
     * Retourne la liste des menus filtrés selon le rôle de l'utilisateur connecté
     */
    getMenusDash(): Menu[] {
        const user = this.authService.getCurrentUser();
        if (!user) {
            // Aucun utilisateur connecté
            return [];
        }

        const userRole = (user.role || '').toUpperCase();

        // Filtrer les menus sans muter allMenus
        return this.allMenus
            .filter((menu) =>
                menu.access.map((r) => r.toUpperCase()).includes(userRole)
            )
            .map((menu) => ({ ...menu })); // retourne une copie
    }

    /**
     * Redirection vers la route associée à un item de menu
     * @param route Chemin de navigation
     */
    navigateTo(route: string): void {
        this.router.navigate([route]);
    }

}
