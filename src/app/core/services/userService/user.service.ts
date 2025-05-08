import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../authService/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    // URL de base de l'API
    private apiUrl = `${environment.apiEndpoint}`;

    private authService = inject(AuthService);
    private httpClient = inject(HttpClient);

    // Méthode pour récupérer tous les users
    getUsers() {
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


        return this.httpClient.get<User[]>(
            `${this.apiUrl}/users`,
            { headers }
        );
    }

    // Méthode pour ajouter un user
    addUser(role: User) {
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

        return this.httpClient.post<User>(
            `${this.apiUrl}/users/register`,
            role,
            { headers }
        );
    }

    // Méthode pour mettre à jour un user
    updateUser(id: number, role: User) {
        const token = localStorage.getItem('token');

        if (!this.authService.isAdmin() && !this.authService.isSuperAdmin()) {
            throw new Error('Vous devez être un administrateur pour effectuer cette action.');
        }

        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${token}`
        );

        return this.httpClient.put<User>(
            `${this.apiUrl}/users/${id}`,
            role,
            { headers }
        );
    }

    // Méthode pour supprimer un user
    deleteUser(id: number) {
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

        return this.httpClient.delete<void>(`${this.apiUrl}/users/${id}`, { headers });
    }
}
