import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LivreService } from '../../../core/services/livreService/livre.service';
import { AuthService } from '../../../core/services/authService/auth.service';
import { MessageService } from '../../../core/services/messageService/message.service';
import { Livre } from '../../../core/models/livre';

@Component({
    selector: 'app-auteur-dash',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        TableModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule
    ],
    templateUrl: './auteur-dash.component.html'
})
export class AuteurDashComponent implements OnInit {
    auteur: any;
    livres: Livre[] = [];
    filteredLivres: Livre[] = [];
    totalLivres: number = 0;
    totalPages: number = 0;
    searchTerm: string = '';
    addModalVisible: boolean = false;
    viewModalVisible: boolean = false;
    editModalVisible: boolean = false;
    livreFormAdd: FormGroup;
    livreFormUpdate: FormGroup;
    selectedLivre: any = null;

    private livreService = inject(LivreService);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);
    private fb = inject(FormBuilder);

    constructor() {
        this.livreFormAdd = this.fb.group({
            titre: ['', Validators.required],
            isbn: ['', Validators.required],
            langue: ['', Validators.required],
            nbrePage: ['', [Validators.required, Validators.min(1)]],
            nom: ['', Validators.required]
        });

        this.livreFormUpdate = this.fb.group({
            titre: ['', Validators.required],
            isbn: ['', Validators.required],
            langue: ['', Validators.required],
            nbrePage: ['', [Validators.required, Validators.min(1)]],
            nom: ['', Validators.required]
        });
    }


    ngOnInit() {
        console.log('ngOnInit appelé');
        this.loadLivres();
    }

    loadLivres() {
        const userId = this.authService.getCurrentUser()?.id;
        if (userId) {
            this.livreService.getLivres().subscribe({
                next: (data) => {
                    console.log('Données reçues:', data);
                    this.livres = data.filter(livre => livre.auteurId === userId);
                    this.filteredLivres = [...this.livres];
                    this.calculateStats();
                    console.log('Livres filtrés:', this.filteredLivres);
                },
                error: (error) => {
                    console.error('Erreur lors du chargement des livres:', error);
                    this.messageService.showError('Erreur lors du chargement des livres');
                }
            });
        }
    }

    filterLivres() {
        if (this.searchTerm && this.searchTerm.trim() !== '') {
            const searchTermLower = this.searchTerm.toLowerCase();
            this.filteredLivres = this.livres.filter(livre =>
                livre.titre.toLowerCase().includes(searchTermLower) ||
                livre.nom.toLowerCase().includes(searchTermLower) ||
                livre.isbn.toString().includes(searchTermLower)
            );
        } else {
            this.filteredLivres = [...this.livres];
        }
    }

    calculateStats() {
        this.totalLivres = this.livres.length;
        this.totalPages = this.livres.reduce((acc, livre) => acc + livre.nbrePage, 0);
    }

    onAddLivre() {
        if (this.livreFormAdd.valid) {
            const idAuteur = this.authService.getCurrentUser()?.id;

            if (!idAuteur) {
                this.messageService.showError('Session invalide');
                return;
            }

            // Créer l'objet avec les types corrects
            const newLivre = {
                titre: String(this.livreFormAdd.value.titre).trim(),
                nom: String(this.livreFormAdd.value.titre).trim(), // Même valeur que le titre
                isbn: Math.floor(Number(this.livreFormAdd.value.isbn)), // S'assurer que c'est un entier
                langue: String(this.livreFormAdd.value.langue).trim(),
                nbrePage: Math.max(1, Math.floor(Number(this.livreFormAdd.value.nbrePage))), // Au moins 1 page
                auteurId: idAuteur
            };

            // Validation supplémentaire
            if (isNaN(newLivre.isbn) || isNaN(newLivre.nbrePage)) {
                this.messageService.showError('ISBN et nombre de pages doivent être des nombres valides');
                return;
            }

            // Log de debug
            console.log('Données envoyées:', JSON.stringify(newLivre));

            this.livreService.addLivre(newLivre).subscribe({
                next: (response) => {
                    console.log('Réponse du serveur:', response);
                    this.messageService.showSuccess('Livre ajouté avec succès');
                    this.loadLivres();
                    this.addModalVisible = false;
                    this.livreFormAdd.reset();
                },
                error: (error) => {
                    console.error('Erreur détaillée:', error);
                    let errorMessage = 'Erreur lors de l\'ajout du livre';

                    if (error.error && error.error.message) {
                        errorMessage += ': ' + error.error.message;
                    }

                    this.messageService.showError(errorMessage);
                }
            });
        } else {
            this.messageService.showError('Veuillez remplir tous les champs requis');
        }
    }

    deleteLivre(id: number) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
            this.livreService.deleteLivre(id).subscribe({
                next: () => {
                    this.messageService.showSuccess('Livre supprimé avec succès');
                    this.loadLivres();
                },
                error: (error) => {
                    console.error('Erreur lors de la suppression:', error);
                    this.messageService.showError('Erreur lors de la suppression du livre');
                }
            });
        }
    }

    viewLivre(livre: any) {
        this.selectedLivre = livre;
        this.viewModalVisible = true;
    }

    editLivre(livre: any) {
        this.selectedLivre = livre;
        this.livreFormUpdate.patchValue({
            titre: livre.titre,
            nom: livre.nom,
            isbn: livre.isbn,
            langue: livre.langue,
            nbrePage: livre.nbrPage
        });
        this.editModalVisible = true;
    }

    onUpdateLivre() {
        if (this.livreFormUpdate.valid && this.selectedLivre) {
            const idAuteur = this.authService.getCurrentUser()?.id;

            if (!idAuteur) {
                this.messageService.showError('Session invalide');
                return;
            }

            const updatedLivre: Livre = {
                ...this.livreFormUpdate.value,
                id: this.selectedLivre.id,
                auteurId: idAuteur
            };

            this.livreService.updateLivre(this.selectedLivre.id, updatedLivre).subscribe({
                next: () => {
                    this.messageService.showSuccess('Livre mis à jour avec succès');
                    this.loadLivres();
                    this.editModalVisible = false;
                    this.livreFormUpdate.reset();
                },
                error: (error) => {
                    console.error('Erreur lors de la mise à jour:', error);
                    this.messageService.showError('Erreur lors de la mise à jour du livre');
                }
            });
        } else {
            this.messageService.showError('Veuillez remplir tous les champs requis');
        }
    }

    closeViewModal() {
        this.viewModalVisible = false;
        this.selectedLivre = null;
    }

    closeEditModal() {
        this.editModalVisible = false;
        this.selectedLivre = null;
        this.livreFormUpdate.reset();
    }

    // Gestion des modales
    openAddModal() {
        this.addModalVisible = true;
    }

    closeAddModal() {
        this.addModalVisible = false;
        this.livreFormAdd.reset();
    }
}
