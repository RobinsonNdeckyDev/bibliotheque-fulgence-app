import { Auteur } from './../../models/auteur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { AuthService } from '../authService/auth.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

    // URL de base de l'API
    private apiUrl = `${environment.apiEndpoint}`;

    private authService = inject(AuthService);
    private httpClient = inject(HttpClient);

    // Méthode pour récupérer tous les auteurs
    getAuteurs() {
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


        return this.httpClient.get<Auteur[]>(
            `${this.apiUrl}/auteurs`,
            { headers }
        );
    }

    getAuteurById(id: number) {
        const token = localStorage.getItem('token');


        if (!this.authService.isAuteur() && !this.authService.isAdmin() && !this.authService.isSuperAdmin()) {
            throw new Error(
                'Vous devez être un administrateur pour effectuer cette action.'
            );
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.httpClient.get(`${this.apiUrl}/auteurs/${id}`, { headers });
    }

    // Méthode pour ajouter un auteur
    addAuteur(auteur: Auteur) {
        const token = localStorage.getItem('token');


        if (!this.authService.isAdmin() && !this.authService.isSuperAdmin()) {
            throw new Error(
                'Vous devez être un administrateur pour effectuer cette action.'
            );
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.httpClient.post<Auteur>(
            `${this.apiUrl}/auteurs`,
            auteur,
            { headers }
        );
    }

    // Méthode pour mettre à jour un auteur
    updateAuteur(id: number, auteur: Auteur) {
        const token = localStorage.getItem('token');

        if (!this.authService.isAdmin() && !this.authService.isSuperAdmin()) {
            throw new Error('Vous devez être un administrateur pour effectuer cette action.');
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.httpClient.put<Auteur>(
            `${this.apiUrl}/auteurs/${id}`,
            auteur,
            { headers }
        );
    }

    // Méthode pour supprimer un auteur
    deleteAuteur(id: number) {
        const token = localStorage.getItem('token');

        if (!this.authService.isAdmin() && !this.authService.isSuperAdmin()) {
            throw new Error(
                'Vous devez être un administrateur pour effectuer cette action.'
            );
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.httpClient.delete<void>(`${this.apiUrl}/auteurs/${id}`, { headers });
    }
}
