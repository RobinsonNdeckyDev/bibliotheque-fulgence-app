import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuService } from '../../core/services/menuService/menu.service';
import { AuthService } from '../../core/services/authService/auth.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-dash-layout',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dash-layout.component.html',
  styleUrl: './dash-layout.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-10px)', opacity: 0 }))
      ])
    ])
  ]
})
export class DashLayoutComponent {
    infoUser: any;
    isSidebarVisible = true;
    MenuItems: any[] = [];
    isDropdownOpen = false;

    private route = inject(Router);
    private authService = inject(AuthService);
    private menuService = inject(MenuService);

    // @Input() menuItem!: MenuItem;

    // toggleSubmenu() {
    //     this.menuItem.isExpanded = !this.menuItem.isExpanded;
    // }

    // Initialisatin du composant
    ngOnInit(): void {
        this.userConnected();
        this.MenuItems = this.menuService.getMenusDash();
    //   console.log("liste des menus", this.MenuItems);
    }

    // recupération de la liste des menus
    getMenuItems() {
        return this.MenuItems;
    }

    logout() {
        this.authService.logout();
        // this.toastr.success('Déconnexion réussie');
        window.location.href = '/login';
    }

    userConnected() {
        const user = this.authService.getCurrentUser();
        if (user) {
            this.infoUser = user
            return true;
        }
        return false;
    }

    // sidebar toggle
    toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible;
    }

    // sidebar close
    closeSidebar() {
        this.isSidebarVisible = true;
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    // Fermer le dropdown quand on clique ailleurs
    @HostListener('document:click', ['$event'])
    closeDropdown(event: any) {
        if (!event.target.closest('.dropdown-container')) {
            this.isDropdownOpen = false;
        }
    }
}
