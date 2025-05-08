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
    ChartModule
  ]
})
export class DashAdminComponent implements OnInit {
onGlobalFilter($event: Event) {
throw new Error('Method not implemented.');
}
    // Variables
    tabMembres: any[] = [];
    tabAuteurs: any[] = [];
    tabLivres: any[] = [];
    chartData: any;
    chartOptions: any;

    private membreService = inject(UserService);
    private messageService = inject(MessageService);
    private auteurService = inject(AuteurService);
    private livreService = inject(LivreService);

    ngOnInit() {
        this.initChart();
        this.loadDashboardData();
    }

    private loadDashboardData(): void {
        // Chargement des livres
        this.livreService.getLivres().subscribe({
            next: (livres) => {
                this.tabLivres = livres;
                this.updateChartData();
            },
            error: (error) => {
                console.error('Erreur lors du chargement des livres:', error);
                this.messageService.showError('Erreur lors du chargement des livres');
            }
        });

        // Chargement des auteurs
        this.auteurService.getAuteurs().subscribe({
            next: (auteurs) => {
                this.tabAuteurs = auteurs;
                this.updateChartData();
            },
            error: (error) => {
                console.error('Erreur lors du chargement des auteurs:', error);
                this.messageService.showError('Erreur lors du chargement des auteurs');
            }
        });

        // Chargement des membres
        this.membreService.getUsers().subscribe({
            next: (membres: any) => {
                this.tabMembres = membres;
                this.updateChartData();
            },
            error: (error: any) => {
                console.error('Erreur lors du chargement des membres:', error);
                this.messageService.showError('Erreur lors du chargement des membres');
            }
        });
    }

    // Initialisation du graphique
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
}
