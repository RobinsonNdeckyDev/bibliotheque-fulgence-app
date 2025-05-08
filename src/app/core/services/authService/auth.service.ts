import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';
import { RegisterRequest } from '../../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // URL de base de l'API
  private apiUrl = `${environment.apiEndpoint}/auth`;

  // ComportementSubject pour stocker l'utilisateur courant
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Chargement automatique de l'utilisateur depuis le localStorage au démarrage
    this.autoLogin();
  }

  /**
   * Envoi de la requête de connexion au backend
   * @param loginRequest Données { email, password }
   * @returns Observable avec le token et les infos utilisateur
   */
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest);
  }

  /**
   * Envoi de la requête d'inscription au backend
   * @param registerRequest Données du formulaire d'inscription
   * @returns Observable de la réponse d'inscription
   */
  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest);
  }

  /**
   * Stocke les données de l'utilisateur après un login réussi
   * @param response Réponse contenant token et infos utilisateur
   */
  setUserData(response: LoginResponse): void {
    // Sauvegarde du token JWT
    localStorage.setItem('token', response.token);
    // Sauvegarde des informations utilisateur
    localStorage.setItem('infosUser', JSON.stringify(response.infosUser));
    // Met à jour le BehaviorSubject
    this.currentUserSubject.next(response.infosUser);
  }

  /**
   * Supprime les données d'authentification et redirige vers la page login
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('infosUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Retourne l'utilisateur actuellement connecté (ou null)
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifie si l'utilisateur a le rôle SUPER_ADMIN
   */
  isSuperAdmin(): boolean {
    return this.getCurrentUser()?.role === 'SUPER_ADMIN';
  }

  /**
   * Vérifie si l'utilisateur a le rôle AUTEUR
   */
  isAuteur(): boolean {
    return this.getCurrentUser()?.role === 'AUTEUR';
  }

  /**
   * Vérifie si l'utilisateur a le rôle ADMIN
   */
  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'ADMIN';
  }

  /**
   * Vérifie si l'utilisateur a le rôle ETUDIANT
   */
  isEtudiant(): boolean {
    return this.getCurrentUser()?.role === 'ETUDIANT';
  }

  /**
   * Vérifie si l'utilisateur a le rôle FORMATEUR
   */
  isFormateur(): boolean {
    return this.getCurrentUser()?.role === 'FORMATEUR';
  }

  /**
   * Vérifie si l'utilisateur a le rôle PARTENAIRE
   */
  isPartenaire(): boolean {
    return this.getCurrentUser()?.role === 'PARTENAIRE';
  }



  /**
   * Vérifie si un utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !!localStorage.getItem('infosUser');
  }

  /**
   * Charge automatiquement l'utilisateur depuis le localStorage
   * Retourne true si un utilisateur a été restauré
   */
  autoLogin(): boolean {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('infosUser');
    if (token && userJson) {
      const user: User = JSON.parse(userJson);
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }
}
