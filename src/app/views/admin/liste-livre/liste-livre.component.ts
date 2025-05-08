import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { LivreService } from '../../../core/services/livreService/livre.service';
import { MessageService } from '../../../core/services/messageService/message.service';


@Component({
  selector: 'app-liste-livre',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './liste-livre.component.html',
  styleUrl: './liste-livre.component.css'
})
export class ListeLivreComponent {
    // Variables
    tabLivre: any[] = [];
    tabLivreFiltered: any[] = [];
    searchTerm: string = '';
    addModalVisible: boolean = false;
    viewModalVisible: boolean = false;
    editModalVisible: boolean = false;
    selectedLivre: any = null;

    
    private livreService = new LivreService();
    private messageService = new MessageService();
    private fb = new FormBuilder();


    // Initialisation du composant
    ngOnInit(): void {
        this.getAllLivre();
    }

    // Récupération de tous les livres
    getAllLivre() {
        this.livreService.getLivres().subscribe({
            next: (data) => {
                this.tabLivre = data;
                // this.tabLivreFiltered = data;
                console.log("Livres: ", this.tabLivre);
            },
            error: (error) => {
                console.error('Erreur lors de la récupération des livres', error);
                this.messageService.showError('Erreur lors de la récupération des livres');
            }
        });
    }

    // Supprimer un livre
    deleteLivre(id: number) {
        this.livreService.deleteLivre(id).subscribe({
            next: (data) => {
                this.messageService.showSuccess('Livre supprimé avec succès');
                this.getAllLivre();
            },
            error: (error) => {
                console.error('Erreur lors de la suppression du livre', error);
                this.messageService.showError('Erreur lors de la suppression du livre');
            }
        });
    }

    // Rechercher un livre
    searchLivre(event: any) {
        if (this.searchTerm) {
            this.tabLivreFiltered = this.tabLivre.filter(livre => livre.titre.toLowerCase().includes(this.searchTerm.toLowerCase()));
        } else {
            this.tabLivreFiltered = this.tabLivre;
        }
    }

    // Modal Détail d'un auteur
    openViewModal(auteur: any) {
        this.selectedLivre = auteur;
        this.viewModalVisible = true;
    }

    closeViewModal(){
        this.viewModalVisible = false;
    }

}
