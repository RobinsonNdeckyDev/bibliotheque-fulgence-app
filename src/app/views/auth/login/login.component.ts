import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/authService/auth.service';
import { MessageService } from '../../../core/services/messageService/message.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    showPassword: boolean = false;
    loginForm!: FormGroup;

    private fb = inject(FormBuilder);
    private router = inject(Router);
    private messageService = inject(MessageService);
    private authService = inject(AuthService);


    // Initialisation du composant
    ngOnInit(): void {
        this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
        });
      }

    // login.component.ts (extrait)
    onSubmit() {
        if (!this.loginForm.valid) return;

        this.authService.login(this.loginForm.value).subscribe({
        next: async (response) => {
            console.log("response login", response);
            this.authService.setUserData(response);

            // Redirection basée sur le rôle stocké
            if (this.authService.isSuperAdmin() || this.authService.isAdmin()) {
            await this.router.navigate(['/dash-admin']);
            } else if (this.authService.isAuteur()) {
            await this.router.navigate(['/dash-auteur']);
            } else {
            console.error('Aucun rôle correspondant trouvé');
            await this.router.navigate(['/login']);
            }

            this.messageService.showSuccess('Connexion réussie avec succés');
            // console.log("success login");

        },
        error: (error) => {
            this.messageService.showError('Erreur survenue lors de la connexion');
            console.error(error);
            // this.router.navigate(['/login']);
        }
        });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
}
