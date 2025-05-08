import { Component, inject, OnInit } from '@angular/core';
import { AuteurService } from '../../../core/services/auteurService/auteur.service';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auteur } from '../../../core/models/auteur';
import { MessageService } from '../../../core/services/messageService/message.service';

@Component({
  selector: 'app-liste-auteur',
  imports: [TableModule, CommonModule, DialogModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './liste-auteur.component.html',
  styleUrl: './liste-auteur.component.css'
})
export class ListeAuteurComponent {
    tabAuteur: any[] = [];
    tabAuteurFiltered: any[] = [];
    searchTerm: string = '';
    addModalVisible: boolean = false;
    viewModalVisible: boolean = false;
    editModalVisible: boolean = false;
    selectedAuteur: any = null;
    showPassword: boolean = false;
    auteurFormAdd: FormGroup;
    auteurFormUpdate: FormGroup;


    private auteurService = inject(AuteurService);
    private messageService = inject(MessageService);
    private fb = inject(FormBuilder);

    constructor() {
        this.auteurFormAdd = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            adresse: ['', Validators.required],
            telephone: ['', Validators.required],
            description: ['', Validators.required],
            photoProfil: [''],
        });
        this.auteurFormUpdate = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            adresse: ['', Validators.required],
            telephone: ['', Validators.required],
            description: ['', Validators.required],
            photoProfil: [''],
        });
    }

    // Initialisation du composant
    ngOnInit(): void {
        this.getAllAuteur();
    }

    // Lister tous les auteurs
    getAllAuteur() {
        this.auteurService.getAuteurs().subscribe({
            next: (data) => {
                this.tabAuteur = data;
                console.log("Auteurs: ", this.tabAuteur);
                // this.tabAuteurFiltered = data;
            },
            error: (error) => {
                console.error('Error fetching authors:', error);
                this.messageService.showError('Failed to load authors');
            }
        })
    }

    // Ajouter un auteur
    addAuteur(newAuteur: Auteur) {
        this.auteurService.addAuteur(newAuteur).subscribe({
            next: (data) => {
                this.messageService.showSuccess('Auteur ajouté avec succès');
                this.getAllAuteur();
                this.addModalVisible = false;
            },
            error: (error) => {
                console.error('Erreur lors de l\'ajout de l\'auteur:', error);
                this.messageService.showError('Erreur lors de l\'ajout de l\'auteur');
            }
        });
    }

    onAddAuteur() {
        if (this.auteurFormAdd.valid) {
            const newAuteur: Auteur = {
                email: this.auteurFormAdd.value.email,
                password: this.auteurFormAdd.value.password,
                prenom: this.auteurFormAdd.value.prenom,
                nom: this.auteurFormAdd.value.nom,
                adresse: this.auteurFormAdd.value.adresse,
                telephone: this.auteurFormAdd.value.telephone,
                description: this.auteurFormAdd.value.description,
                photoProfil: this.auteurFormAdd.value.photoProfil || 'default.jpg',
            };

            console.log("newAuteur: ", newAuteur);
            this.addAuteur(newAuteur);
            this.auteurFormAdd.reset();
            this.addModalVisible = false;
        }else {
            this.messageService.showError('Veuillez remplir correctement tous les champs requis ,Erreur de validation');
        }
    }

    // Modification d'un user
    updateAuteur(auteuId: number, updatedAuteur: any) {
        this.auteurService.updateAuteur(auteuId, updatedAuteur).subscribe({
            next: (response) => {
                const index = this.tabAuteur.findIndex(
                    (auteur) => auteur.id === auteuId
                );
                if (index !== -1) {
                    this.tabAuteur[index] = response;
                }
                // Rafraîchir la liste après mise à jour
                this.getAllAuteur();
                this.messageService.showSuccess('auteur modifié avec success');
            },
            error: (error) => {
                this.messageService.showError('Erreur lors de la modification de l\'auteur ');
                console.error('Erreur lors de la mise à jour ', error);
            },
        });
    }

    onUpdateAuteur() {
        if (this.auteurFormUpdate.valid) {
            const updateUser = {...this.auteurFormUpdate.value};

            // S'assurer qu'on n'envoie pas le mot de passe s'il est vide
            if (!updateUser.password || updateUser.password.trim() === '') {
                delete updateUser.password;
            }

            console.log("Données envoyées au serveur:", updateUser);
            this.updateAuteur(this.selectedAuteur.id, updateUser);
            this.editModalVisible = false;
        }
    }

    // Suppression d'un user
    deleteAuteur(auteurId: number) {
        this.auteurService.deleteAuteur(auteurId).subscribe({
            next: (response) => {
                console.log("Response de la suppression:", response);
                // Mettre à jour la liste des auteurs après suppression
                this.getAllAuteur();
                this.messageService.showSuccess('Utilisateur supprimé avec success');
            },
            error: (error) =>  {
                this.messageService.showError('Erreur lors de la suppression du user');
                console.error('Erreur lors de la suppression du rôle', error);
            }
        });
    }

    // Modal Détail d'un auteur
    openViewModal(auteur: any) {
        this.selectedAuteur = auteur;
        this.viewModalVisible = true;
    }

    closeViewModal(){
        this.viewModalVisible = false;
    }

    // Modal ajout auteur
    openAddModal() {
        this.addModalVisible = true;
    }

    closeAddModal(){
        this.addModalVisible = false;
    }

    // Modal update d'un user
    openEditModal(auteur: any) {
        this.selectedAuteur = auteur;
        this.auteurFormUpdate.patchValue({
            prenom: auteur.prenom,
            nom: auteur.nom,
            email: auteur.email,
            telephone: auteur.telephone,
            adresse: auteur.adresse,
            description: auteur.description,
            photoProfil: auteur.photoProfil,
            roleId: auteur.role.id
        });
        this.editModalVisible = true;
    }

    closeEditModal(){
        this.editModalVisible = false;
    }

    // Recherche de user
    searchAuteur(event: any) {
        event?.preventDefault();

        if (!this.searchTerm.trim()) {
            this.tabAuteurFiltered = [...this.tabAuteur];
        } else {
            const term = this.searchTerm.toLowerCase().trim();
            this.tabAuteurFiltered = this.tabAuteur.filter(auteur =>
                auteur.prenom.toLowerCase().includes(term)
            );
        }
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

}
