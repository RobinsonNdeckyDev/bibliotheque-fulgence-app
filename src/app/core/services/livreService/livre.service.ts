import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../authService/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Livre } from '../../models/livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
    // URL de base de l'API
    private apiUrl = `${environment.apiEndpoint}`;

    private authService = inject(AuthService);
    private httpClient = inject(HttpClient);

    // Méthode pour récupérer tous les livres
    getLivres() {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token manquant');
            return throwError(
                // Retourner si le token est absent
                () => new Error('Token manquant')
            );
        }
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );


        return this.httpClient.get<Livre[]>(
            `${this.apiUrl}/livres`,
            { headers }
        );
    }

    // Méthode pour ajouter un livre
    addLivre(livre: Livre) {
        const token = localStorage.getItem('token');


        if (!this.authService.isAuteur()) {
            throw new Error(
                'Vous devez être un auteur pour effectuer cette action.'
            );
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.httpClient.post<any>(
            `${this.apiUrl}/livres/create-livre`,
            livre,
            { headers }
        );
    }

    // Méthode pour mettre à jour un livre
    updateLivre(id: number, livre: Livre) {
        const token = localStorage.getItem('token');

        if (!this.authService.isAuteur()) {
            throw new Error('Vous devez être un auteur pour effectuer cette action.');
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.httpClient.put<Livre>(
            `${this.apiUrl}/livres/${id}`,
            livre,
            { headers }
        );
    }

    // Méthode pour supprimer un livre
    deleteLivre(id: number) {
        const token = localStorage.getItem('token');

        if (!this.authService.isAuteur() && !this.authService.isAdmin() && !this.authService.isSuperAdmin()) {
            throw new Error(
                'Vous devez être un auteur pour effectuer cette action.'
            );
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.httpClient.delete<void>(`${this.apiUrl}/livres/${id}`, { headers });
    }
}
