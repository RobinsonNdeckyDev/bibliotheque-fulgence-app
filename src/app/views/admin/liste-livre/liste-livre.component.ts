import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { LivreService } from '../../../core/services/livreService/livre.service';
import { MessageService } from '../../../core/services/messageService/message.service';
import { AuteurService } from '../../../core/services/auteurService/auteur.service';
import { Livre } from '../../../core/models/livre';
import { Auteur } from '../../../core/models/auteur';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
    selector: 'app-liste-livre',
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        PaginatorModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService],
    templateUrl: './liste-livre.component.html',
    styleUrl: './liste-livre.component.css',
})
export class ListeLivreComponent {

    tabLivres: Livre[] = [];
    tabAuteurs: Auteur[] = [];
    viewModalVisible: boolean = false;
    selectedLivre: Livre | null = null;
    searchText: string = '';
    first: number = 0;
    rows: number = 3;

    private livreService = inject(LivreService);
    private messageService = inject(MessageService);
    private confirmationService = inject(ConfirmationService);
    private auteurService = inject(AuteurService);
    private fb = inject(FormBuilder);

    // Initialisation du composant
    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.getAllAuteurs();
        this.getAllLivres();
    }

    // Récupération de tous les livres
    getAllLivres() {
        this.livreService.getLivres().subscribe({
            next: (data) => {
                this.tabLivres = data.map(livre => {
                    // Trouver l'auteur correspondant au livre
                    const auteur = this.tabAuteurs.find(a => a.id === livre.auteurId);
                    return { ...livre, auteur };
                });
                console.log('Livres avec auteurs:', this.tabLivres);
            },
            error: (error) => {
                console.error('Erreur lors du chargement des livres:', error);
            }
        });
    }

    // Liste des auteurs
    getAllAuteurs() {
        this.auteurService.getAuteurs().subscribe({
            next: (data) => {
                this.tabAuteurs = data;
                console.log('Auteurs récupérés:', this.tabAuteurs);
            },
            error: (error) => {
                console.error('Erreur lors du chargement des auteurs:', error);
            }
        })
    }


    // Modal Détail d'un Livre
    openViewModal(livre: any) {
        this.selectedLivre = livre;
        this.viewModalVisible = true;
    }

    closeViewModal(){
        this.viewModalVisible = false;
    }

    get filteredLivres() {
        return this.tabLivres.filter(livre =>
            livre.titre.toLowerCase().includes(this.searchText.toLowerCase()) ||
            livre.auteur?.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
            livre.auteur?.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
            livre.langue.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }

    get pagedLivres() {
        return this.filteredLivres.slice(this.first, this.first + this.rows);
    }

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    confirmDelete(livre: Livre) {
        this.confirmationService.confirm({
            message: `Êtes-vous sûr de vouloir supprimer le livre "${livre.titre}" ?`,
            header: 'Confirmation de suppression',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.deleteLivre(livre.id!);
            }
        });
    }

    deleteLivre(id: number) {
        this.livreService.deleteLivre(id).subscribe({
            next: () => {
                this.messageService.showSuccess('Livre supprimé avec succès');
                this.loadData(); // Recharge la liste des livres
            },
            error: (error) => {
                this.messageService.showError('Erreur lors de la suppression du livre');
                console.error('Erreur:', error);
            }
        });
    }


}
