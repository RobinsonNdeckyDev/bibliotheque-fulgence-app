import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChartOptions } from 'chart.js';
import { UserService } from '../../../core/services/userService/user.service';
import { AuteurService } from '../../../core/services/auteurService/auteur.service';
import { LivreService } from '../../../core/services/livreService/livre.service';
import { MessageService } from '../../../core/services/messageService/message.service';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChartModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})
export class DashAdminComponent implements OnInit {
    // Variables
    tabMembres: any[] = [];
    tabAuteurs: any[] = [];
    tabLivres: any[] = [];
    chartData: any;
    chartOptions: any;
    viewModalVisible: boolean = false;
    selectedAuteur: any = null;
    globalFilter: string = '';

    private membreService = inject(UserService);
    private messageService = inject(MessageService);
    private auteurService = inject(AuteurService);
    private livreService = inject(LivreService);

    constructor(
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.initChart();
        this.loadLivresAndAuteurs();
    }

    private initChart() {
        const documentStyle = getComputedStyle(document.documentElement);

        this.chartData = {
            labels: ['Livres', 'Auteurs', 'Membres'],
            datasets: [
                {
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#E67E22',  // Orange pour les livres
                        '#2C3E50',  // Bleu marine pour les auteurs
                        '#3498DB'   // Bleu pour les membres
                    ],
                    hoverBackgroundColor: [
                        '#D35400',
                        '#1B2631',
                        '#2874A6'
                    ]
                }
            ]
        };

        this.chartOptions = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: '#2C3E50',
                        font: {
                            family: 'system-ui'
                        }
                    },
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Distribution',
                    color: '#2C3E50',
                    font: {
                        size: 16,
                        family: 'system-ui'
                    }
                }
            },
            responsive: true
        };
    }

    private updateChartData() {
        if (this.chartData) {
            this.chartData = {
                ...this.chartData,
                datasets: [{
                    ...this.chartData.datasets[0],
                    data: [
                        this.tabLivres?.length || 0,
                        this.tabAuteurs?.length || 0,
                        this.tabMembres?.length || 0
                    ]
                }]
            };
        }
    }

    loadLivresAndAuteurs() {
        // Charger d'abord les auteurs
        this.auteurService.getAuteurs().subscribe({
            next: (auteurs) => {
                this.tabAuteurs = auteurs;

                // Puis charger les livres
                this.livreService.getLivres().subscribe({
                    next: (livres) => {
                        this.tabLivres = livres;

                        // Associer les livres à chaque auteur
                        this.tabAuteurs = this.tabAuteurs.map(auteur => ({
                            ...auteur,
                            livres: this.tabLivres.filter(livre => livre.auteurId === auteur.id)
                        }));

                        // Mettre à jour les statistiques
                        this.updateChartData();
                    },
                    error: (error) => {
                        console.error('Erreur lors de la récupération des livres:', error);
                        this.messageService.showError('Erreur lors de la récupération des livres');
                    }
                });
            },
            error: (error) => {
                console.error('Erreur lors de la récupération des auteurs:', error);
                this.messageService.showError('Erreur lors de la récupération des auteurs');
            }
        });
    }

    voirDetails(auteur: any) {
        this.selectedAuteur = {
            ...auteur,
            livres: this.tabLivres.filter(livre => livre.auteurId === auteur.id)
        };
        this.viewModalVisible = true;
    }

    supprimerAuteur(auteur: any) {
        this.confirmationService.confirm({
            message: `Êtes-vous sûr de vouloir supprimer l'auteur ${auteur.prenom} ${auteur.nom} ?`,
            header: 'Confirmation de suppression',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.auteurService.deleteAuteur(auteur.id).subscribe({
                    next: () => {
                        this.messageService.showSuccess('Auteur supprimé avec succès');
                        this.loadLivresAndAuteurs();
                    },
                    error: (error) => {
                        console.error('Erreur lors de la suppression:', error);
                        this.messageService.showError('Erreur lors de la suppression');
                    }
                });
            }
        });
    }

    closeViewModal() {
        this.viewModalVisible = false;
        this.selectedAuteur = null;
    }

    onGlobalFilter(event: any) {
        this.globalFilter = event.target.value;
        const table = document.querySelector('p-table');
        if (table) {
            // @ts-ignore
            table.filterGlobal(this.globalFilter, 'contains');
        }
    }
}
